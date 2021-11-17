import {utilService} from '../../../services/util-service.js';
import {storageService} from '../../../services/async-storage-service.js';
import {emailsDB} from './emails-db.js';

const EMAILS_KEY = 'emails';
const DRAFTS_KEY = 'drafts';
let demoData = emailsDB.emailsData();
 _createEmails();
 utilService.loadFromStorage(DRAFTS_KEY) || utilService.saveToStorage(DRAFTS_KEY,[]);

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
 }
 

export const emailService = {
  query,
  getById,
  save,
  remove,
  toggleRead,
  setAsRead,
  toggleStar,
  addEmail,
  getEmailsByFolder,
  saveDraft,
  removeDraft,
  getDraftById,
  noteToEmailEntity
};

function query() {
  return storageService.query(EMAILS_KEY);
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}


function save(email) {
  if (email.id) return storageService.put(EMAILS_KEY, email);
  else return storageService.post(EMAILS_KEY, email);
}

function addEmail(email) {
  const formatEmail = {
    id: utilService.makeId(),
    subject: email.subject,
    body:  email.body,
    isRead: false,
    isStar:false,
    sentAt: Date.now(),
    to: 'user@appsus.com'
  };
  if(email.imageUrl){
    formatEmail.imageUrl = email.imageUrl;
  }
  return storageService.post(EMAILS_KEY, formatEmail);
}

function noteToEmailEntity(note) {
  const noteEmail = {
    subject: null,
    body: null,
    isRead: false,
    isStar:false,
    sentAt: Date.now(),
    to: 'user@appsus.com'
  }
    if(note.body.includes('http')){
       noteEmail.imageUrl = note.body
    }else{
      noteEmail.body = note.body;
    }
    noteEmail.subject = note.subject;
    return Promise.resolve(noteEmail);
}

function remove(emailId) {
   return storageService.remove(EMAILS_KEY,emailId);
}

function toggleRead(email) {
  email.isRead = !email.isRead;
  return storageService.put(EMAILS_KEY, email);
}

function toggleStar(email) {
  email.isStar = !email.isStar;
  return storageService.put(EMAILS_KEY, email);
}

function setAsRead(email) {
  email.isRead = true;
  return storageService.put(EMAILS_KEY, email);
}

function getEmailsByFolder(folder){
  if(folder === 'sent'){
    return query().then( emails=> {
      return emails.filter(e => e.to === loggedinUser.email && !e.removedAt);
    })
  }
  else if(folder === 'inbox') return query().then(emails => emails.filter(e => e.to !== loggedinUser.email && !e.removedAt));
  else if(folder === 'star') return query().then(emails => emails.filter(e => e.isStar && !e.removedAt));
  else if(folder === 'trash') return query().then(emails => emails.filter(e => e.removedAt));
  else if(folder === 'draft') return storageService.query(DRAFTS_KEY);
}


//draft logic
function saveDraft(draft){
  if (draft.id) return storageService.put(DRAFTS_KEY, draft);
  else{
    draft.isDraft = true;
    return storageService.post(DRAFTS_KEY, draft);
  } 
}

function removeDraft(draftId) {
  return storageService.remove(DRAFTS_KEY,draftId);
}

function getDraftById(draftId) {
  return storageService.get(DRAFTS_KEY, draftId);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = demoData;
    utilService.saveToStorage(EMAILS_KEY, emails);
  }
  // return emails;
}


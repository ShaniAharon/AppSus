export const emailsDB = {
   emailsData,
};

function emailsData() {
  return [
    {
      //makeId() fix bug
      id: 'qwer',
      subject:
        "What's up with you? Here's how to find out from yolo",
      body: "The opening keynote of water US this year was You , giving his State of the address. He walked us through the journey of getting  from a prototype to a reality the past year. He also dove into overall growth in the community.",
      isRead: false,
      isStar:false,
      sentAt: 1636552405400,//new Date(),
      to: 'user1@appsus.com'
    },
    {
      id: 'abcd',
      subject:
        "What's up with you? Here's how to find out from yolo",
      body: "The opening keynote of water US this year was You , giving his State of the address. He walked us through the journey of getting  from a prototype to a reality the past year. He also dove into overall growth in the community.",
      isRead: false,
      isStar:false,
      sentAt: 1636552305402,//new Date(),
      to: 'user2@appsus.com'
    },
    {
      id: 'jkhy',
      subject:
        "What's up with you? Here's how to find out from yolo",
      body: "The opening keynote of water US this year was You , giving his State of the address. He walked us through the journey of getting  from a prototype to a reality the past year. He also dove into  overall growth in the community.",
      isRead: false,
      isStar:false,
      sentAt: 1636552205403,//new Date(),
      to: 'user3@appsus.com'
    },
    {
      id: 'lopr',
      subject:
        "What's up with you? Here's how to find out from yolo",
      body: "The opening keynote of water US this year was You , giving his State of the address. He walked us through the journey of getting  from a prototype to a reality the past year. He also dove into  overall growth in the community.",
      isRead: false,
      isStar:false,
      sentAt: 1636552105404,//new Date(),
      to: 'user4@appsus.com'
    },
  ];
}

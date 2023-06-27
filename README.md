# ApolloTickets - (Under Development)

#### MERN GraphQL Apollo Server / Apollo Client - Ticketing System

Fake company website - and ticketing system

## Todos

- App Styling
  - Responsive Styling
- ~~User Create (Agent Created User)~~
- ~~User Ticket Dashboard~~
- ~~Search Tickets~~
- ~~Add Ticket fields~~
  - ~~Priority~~
  - ~~Solved Status Type~~
- ~~BreadCrumbs~~
- ~~Ticket page Customer / Agent~~
- ~~Status chip for ticket table~~
- Protect ticket graphlql q/m
- ~~Fix Customer Bulk Ticket Update~~
- ~~Fix Padding in Arrow in Status Selection List~~
- Dashboard Open Context?
- ~~handle error~~
  - ~~bad id caste error~~
    - ~~user~~
    - ~~company~~
    - ~~profile~~
    - ~~ticket~~
- ~~format mongo dup errors on server~~
- ~~forgot password/reset password~~
  - ~~request reset on FE~~
  - ~~send token to email in link on BE~~
  - ~~send token from fe with updated password~~
  - ~~verify token and update password~~
- Organize Schema Type File

## Feature Ideas

- ~~Add User Company Model~~
  - ~~CRUD~~
- Public Homepage
  - Products, Sales, Services etc Page
  - Public-facing blog
- Developer Portal?
- ~~Agent Private Comments~~
- Agent Groups
- Knowledge base for users
- Knowledge base for agents
- Agent Admin Dashboard
  - Delete Tickets
  - CRUD Users
- ~~ingest email tickets?~~
  - ~~ingest new email tickets~~
  - ~~allow for ticket code in subject comment on ticket~~
- Send email on ticket update to requester
  - allow for user to reply to the email
    - ingest only the user's reply (reply above line or something)
- Merge Tickets
- Close Tickets
  - Run Scheduler to close solved tickets after x days
  - Lock closed tickets from being updated
    - BE
    - FE
- Ticket Feedback
  - ~~Ticket Review Model~~
  - ~~BE Create Review Type/Resolver~~
  - ~~BE Update Review Type/Resolver~~
  - FE Submit Review
  - FE Update Review if ticket isnt closed

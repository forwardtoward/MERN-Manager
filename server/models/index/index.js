const Temp = require("../Temp");
const UserToken = require("../UserToken");
const Authenticate = require("../Authenticate");
const Admin = require("../Admin");
const AEmployee = require("../AEmployee");
const User = require("../User");
const UEmployee = require("../UEmployee");
const Contact = require("../Contact");
const ContactType = require("../ContactType");
const ClientContact = require("../ClientContact");
const ClientPosition = require("../ClientPosition");
const LeadPosition = require("../LeadPosition");
const LeadContact = require("../LeadContact");
const MembershipType = require("../MembershipType");
const VendorPosition = require("../VendorPosition");
const VendorContact = require("../VendorContact");
const TaskContact = require("../TaskContact");
const Project = require("../Project");
const Task = require("../Tasks");
const FreezeTask = require("../FreezeTask");
const Employee = require("../Employee");
const EmployeeContact = require("../EmployeeContact");
const EmployeePosition = require("../EmployeePosition");
const CheckList = require("../CheckList");
const BuyMembership = require("../BuyMembership");
const BuyProduct = require("../BuyProduct");
const { ScheduleCheckList, ScheduleTask } = require("../CheckListAns");
const ResetPass = require("../resetPass");
//const Element = require("../Element");
const Document = require("../Document");
const DocumentRecipient = require("../DocumentRecipient");
const DocumentFolder = require("../DocumentFolder");
const DocumentSubfolder = require("../DocumentSubfolder");
const DocumentSignature = require("../DocumentSignature");
const Shop = require("../Shop");
const ProductUserCart = require("../ProductUserCart");
const Course = require("../Course");
const CourseLesson = require("../CourseLesson");
const CourseAssignment = require("../CourseAssignment");
const CourseAssignmentSolution = require("../CourseAssignmentSolution");
const CourseQuiz = require("../CourseQuiz");
const CourseQuizSolution = require("../CourseQuizSolution");
const Membership = require("../Membership");
const MemberContact = require("../Member");
const Customer = require("../Customer");
const Invoice = require("../Invoice");
const Product = require("../product");
const ApplicationRole = require("../ApplicationRole");
const ApplicationPermission = require("../ApplicationPermission");
const Roles = require("../Roles");
const StripeCustomer = require("../StripeCustomer");
const Cart = require("../Cart");
const Candidate = require("../Candidate");
const Program = require("../Program");
const ProgramRank = require("../ProgramRank");
const CandidateStripe = require("../CandidateStripe");
const EmailComposeCategory = require("../EmailComposeCategory");
const EmailComposeFolder = require("../EmailComposeFolder");
const EmailKey = require("../EmailKey");
const EmailLibraryCategory = require("../EmailLibraryCategory");
const EmailLibraryFolder = require("../EmailLibraryFolder");
const EmailNurturingCategory = require("../EmailNurturingCategory");
const EmailNurturingFolder = require("../EmailNurturingFolder");
const EmailSentSave = require("../EmailSentSave");
const EmailSystemCategory = require("../EmailSystemCategory");
const EmailSystemFolder = require("../EmailSystemFolder");
const EmailSystemTemplate = require("../EmailSystemTemplate");
const EmailTemplates = require("../EmailTemplates");
const MarketingEmail = require("../MarketingEmail");
const Kanban = require("../Kanban");
const Label = require("../Label");
const Board = require("../Board");
const Workspace = require("../Workspace");
const QRCodeLibrary = require("../QRCodeLibrary");
const Appointment = require("../Appointment");
const Notes = require("../Notes");
const Progression = require("../Progression");
const Category = require("../Category");
const RankCategory = require("../RankCategory");
const Organization = require("../Organization");
const OrganizationLocation = require("../OrganizationLocation");
const Goal = require("../Goal");
const EmployeeTask = require("../EmployeeTask");
const SmartList = require("../SmartList");
const SmartListItem = require("../SmartListItem");
const EmployeeTaskRecipient = require("../EmployeeTaskRecipient");
const Expense = require("../Expense");
const Income = require("../Income");
const FinanceCategory = require("../FinanceCategory");
const UserGoal = require("../UserGoal");
const ActionPlans = require("../ActionPlans");
const TemplateFolder = require("../TemplateFolder");
const TemplateSubfolder = require("../TemplateSubfolder");
const Template = require("../Template");
const Notification = require("../Notification");
const Ticket = require("../Ticket");
const LivechatContact = require("../LivechatContact");
const TextContact = require("../Text_contact");
const FormBuilder = require("../FormBuilder");
const ClientRanks = require("../ClientRanks");
const RecentActvity
  = require("../recent_activity");



//NLM
const NLMAdmin = require("../NLMAdmin");
// Booking
const Booking = require("../Booking");
const BookingType = require("../BookingType");
const CourseVideo = require("../CourseVideo");
const Video = require("../Video");
//Form builder entry
const FormEntry = require("../FormEntry");
const ImageLibrary = require("../ImageLibrary");
const RelationContact = require("../RelationContact");
const Tag = require("../Tag");
const ContactLeadSource = require("../ContactLeadSource");
const Retention = require("../Retention");
const SubscriptionPlan = require("../SubscriptionPlan");
//const Permission = require("../Permission");
const myJournalCat = require("../MyjournalCategory");
const Compose = require("../compose");
const Comment = require("../Comment");
const PlnableWrkspace = require("../PlanableWorkspace");
const CGoal = require("../create_goal");
const Campaign = require("../Campaign");
const cmpCategory = require("../CamCategory.js");
const UprrofNotification = require("../uProof_notification");
const SubscriptionBought = require("../SubscriptionBought");
const DefaultElement = require("../DefaultElement");

const Myjournal = require("../Myjournal");



const models = {
  // Client
  Authenticate,
  Admin,
  AEmployee,
  User,
  UEmployee,
  Temp,
  Contact,
  ContactType,
  ClientContact,
  ClientPosition,
  Course,
  CourseLesson,
  CourseVideo,
  CourseAssignment,
  CourseAssignmentSolution,
  CourseQuiz,
  CourseQuizSolution,
  LeadPosition,
  LeadContact,
  VendorPosition,
  VendorContact,
  UserToken,
  TaskContact,
  Project,
  Task,
  FreezeTask,
  ApplicationRole,
  ApplicationPermission,
  Roles,
  Employee,
  EmployeeContact,
  EmployeePosition,
  CheckList,
  ScheduleCheckList,
  ScheduleTask,
  ResetPass,
  //Element,
  // NLM Admin
  NLMAdmin,
  Document,
  DocumentRecipient,
  DocumentFolder,
  DocumentSubfolder,
  DocumentSignature,
  Shop,
  ProductUserCart,
  Customer,
  Invoice,
  Membership,
  MemberContact,
  Product,
  StripeCustomer,
  Candidate,
  CandidateStripe,
  MarketingEmail,
  EmailComposeCategory,
  EmailComposeFolder,
  EmailKey,
  EmailLibraryCategory,
  EmailLibraryFolder,
  EmailNurturingCategory,
  EmailNurturingFolder,
  EmailSentSave,
  EmailSystemCategory,
  EmailSystemFolder,
  EmailSystemTemplate,
  EmailTemplates,
  Program,
  ProgramRank,
  //New
  Cart,
  Kanban,
  Label,
  Board,
  Workspace,
  QRCodeLibrary,
  Appointment,
  Notes,
  Progression,
  Category,
  RankCategory,
  Organization,
  OrganizationLocation,
  Goal,
  SmartList,
  SmartListItem,
  EmployeeTask,
  Cart,
  BuyMembership,
  MembershipType,
  BuyProduct,
  //MembershipSales,
  //Position,
  //Shift
  Booking,
  BookingType,
  EmployeeTaskRecipient,
  Expense,
  Income,
  FinanceCategory,
  UserGoal,
  FormEntry,
  ImageLibrary,
  ActionPlans,
  RelationContact,
  Video,
  TemplateFolder,
  TemplateSubfolder,
  Template,
  Tag,
  ContactLeadSource,
  Notification,
  Ticket,
  LivechatContact,
  TextContact,
  FormBuilder,
  Retention,
  ClientRanks,
  SubscriptionPlan,
  //Permission,
  myJournalCat,
  Compose,
  Comment,
  PlnableWrkspace,
  CGoal,
  Campaign,
  cmpCategory,
  UprrofNotification,
  SubscriptionBought,
  DefaultElement,
  Myjournal,
  RecentActvity
};

module.exports = models;

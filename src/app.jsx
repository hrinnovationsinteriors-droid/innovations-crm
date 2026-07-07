import { useState, useRef, useEffect } from "react";

// ── THEME ─────────────────────────────────────────────────────────────────────
const C = {
  gold:"#B8860B", goldLight:"#F5E6C0", goldMid:"#D4A843",
  ink:"#1A1612", inkSoft:"#3D3530", muted:"#7A6E65",
  surface:"#FDFAF5", surface2:"#F5EFE2", surface3:"#EDE4CF",
  green:"#2E7D32", greenLight:"#E8F5E9",
  red:"#C62828", redLight:"#FFEBEE",
  blue:"#1565C0", blueLight:"#E3F2FD",
  amber:"#E65100", amberLight:"#FFF3E0",
  purple:"#6A1B9A", purpleLight:"#F3E5F5",
  border:"rgba(184,134,11,0.18)", borderStrong:"rgba(184,134,11,0.35)",
};

// ── TEAM MEMBERS (for dropdowns) ──────────────────────────────────────────────
const ALL_TEAM_MEMBERS = [
  { name:"RAHUL",       phone:"919527784804", role:"Senior Designer",            dept:"Design"    },
  { name:"PREM",        phone:"917775073822", role:"Senior Designer",            dept:"Design"    },
  { name:"SOJWAL",      phone:"918421628104", role:"Senior Designer",            dept:"Design"    },
  { name:"DNYANADA",    phone:"919028240101", role:"Senior Designer",            dept:"Design"    },
  { name:"ATHARVA",     phone:"919527784804", role:"Senior Designer",            dept:"Design"    },
  { name:"SEEMA",       phone:"919881120622", role:"Senior Designer",            dept:"Design"    },
  { name:"ASHISH JANA", phone:"917276688139", role:"Senior Designer",            dept:"Design"    },
  { name:"PRANJAL",     phone:"919168996861", role:"Senior Designer",            dept:"Design"    },
  { name:"SUHANI",      phone:"919097071008", role:"Junior Designer",            dept:"Design"    },
  { name:"ISHIKA",      phone:"919359156311", role:"Junior Designer",            dept:"Design"    },
  { name:"GAURI",       phone:"919284581148", role:"Junior Designer",            dept:"Design"    },
  { name:"PAYAL",       phone:"919356458215", role:"Junior Designer",            dept:"Design"    },
  { name:"ANAND R",     phone:"919970592265", role:"3D Designer",                dept:"Design"    },
  { name:"NIRVA",       phone:"918446417816", role:"3D Designer",                dept:"Design"    },
  { name:"RISHI",       phone:"918600216136", role:"3D Designer",                dept:"Design"    },
  { name:"PRAFUL",      phone:"918208479807", role:"Site Execution Lead",        dept:"Execution" },
  { name:"ANAND K",     phone:"919765979733", role:"Site Supervisor",            dept:"Execution" },
  { name:"PRATHAMESH",  phone:"918983830504", role:"Site Execution",             dept:"Execution" },
  { name:"IMRAN SIR",   phone:"917006875749", role:"BD & HR Manager",            dept:"Management"},
  { name:"ASHISH ANDRE",phone:"919970592265", role:"Senior Designer / 3D",       dept:"Design"    },
  { name:"PRAPTI",      phone:"918767778329", role:"Team",                       dept:"Design"    },
];

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────
const REAL_PROJECTS = [
  { id:1,  name:"AARTI SHAH",               sr:"DNYANADA",    jr:"ISHIKA",   td:"ANAND R",  exec:"PRAFUL/ATHARVA",    status:"ACTIVE",           sector:"Residential", progress:45, phase:"Design Development", clientPhone:"9876500001" },
  { id:2,  name:"GOSAVI",                   sr:"SOJWAL",      jr:"RAHUL",    td:"NIRVA",    exec:"PRAFUL/ATHARVA",    status:"ON PRIORITY",      sector:"Residential", progress:60, phase:"Site Supervision",   clientPhone:"9876500002" },
  { id:3,  name:"KHANT",                    sr:"RAHUL",       jr:"SUHANI",   td:"NIRVA",    exec:"PRAFUL/PREM",       status:"ON PRIORITY",      sector:"Residential", progress:55, phase:"Documentation",      clientPhone:"9876500003" },
  { id:4,  name:"DASWADKAR",                sr:"RAHUL",       jr:"SUHANI",   td:"NIRVA",    exec:"PRAFUL/PRATHAMESH", status:"ON PRIORITY",      sector:"Residential", progress:70, phase:"Site Supervision",   clientPhone:"9876500004", notes:"Entry, Lobby, Mandir" },
  { id:5,  name:"100 PRABHAT",              sr:"DNYANADA",    jr:"ISHIKA",   td:"ANAND R",  exec:"PRAFUL/PRATHAMESH", status:"ON PRIORITY",      sector:"Residential", progress:40, phase:"Design Development", clientPhone:"9876500005", notes:"WD" },
  { id:6,  name:"JANJIRE",                  sr:"PREM",        jr:"GAURI",    td:"RISHI",    exec:"ANAND K",           status:"ON PRIORITY",      sector:"Commercial",  progress:75, phase:"Site Supervision",   clientPhone:"9876500006" },
  { id:7,  name:"COCORICO",                 sr:"—",           jr:"—",        td:"—",        exec:"PRAFUL/PRATHAMESH", status:"PASSIVE",          sector:"Hospitality", progress:20, phase:"Concept Development",clientPhone:"9876500007" },
  { id:8,  name:"MEZZA-9",                  sr:"PREM",        jr:"GAURI",    td:"RISHI",    exec:"PRAFUL/PRATHAMESH", status:"PASSIVE",          sector:"Hospitality", progress:25, phase:"Concept Development",clientPhone:"9876500008" },
  { id:9,  name:"BHAVIN RAMPURA",           sr:"PREM",        jr:"SOJWAL",   td:"RISHI",    exec:"PRAFUL/PREM",       status:"ON PRIORITY",      sector:"Residential", progress:50, phase:"Documentation",      clientPhone:"9876500009" },
  { id:10, name:"MULUND 34",                sr:"SOJWAL",      jr:"PAYAL",    td:"—",        exec:"PRANJAL",           status:"HANDOVER",         sector:"Residential", progress:98, phase:"Final Handover",     clientPhone:"9876500010" },
  { id:11, name:"VASHI",                    sr:"SOJWAL",      jr:"PAYAL",    td:"—",        exec:"PRANJAL",           status:"ACTIVE",           sector:"Residential", progress:35, phase:"Design Development", clientPhone:"9876500011" },
  { id:12, name:"VAIBHAV CHAVHAN WAGHOLI",  sr:"RAHUL",       jr:"SUHANI",   td:"ISHIKA",   exec:"ANAND K",           status:"ACTIVE",           sector:"Residential", progress:30, phase:"Design Development", clientPhone:"9876500012" },
  { id:13, name:"DR. LACHYAN",              sr:"PREM",        jr:"GAURI",    td:"PAYAL",    exec:"PRAFUL/PRATHAMESH", status:"PASSIVE",          sector:"Residential", progress:15, phase:"Briefing",           clientPhone:"9876500013" },
  { id:14, name:"SUNIL CHRISTIAN",          sr:"DNYANADA",    jr:"ISHIKA",   td:"ANAND R",  exec:"PRAFUL/PRATHAMESH", status:"PASSIVE",          sector:"Residential", progress:20, phase:"Concept Development",clientPhone:"9876500014" },
  { id:15, name:"POKHARKAR",                sr:"PREM",        jr:"GAURI",    td:"RISHI",    exec:"PRAFUL/PREM",       status:"PASSIVE",          sector:"Residential", progress:10, phase:"Briefing",           clientPhone:"9876500015" },
  { id:16, name:"JOSHI HOUSE",              sr:"DNYANADA",    jr:"ISHIKA",   td:"ANAND R",  exec:"—",                 status:"PASSIVE",          sector:"Residential", progress:18, phase:"Concept Development",clientPhone:"9876500016" },
  { id:17, name:"MULUND 39",                sr:"SOJWAL",      jr:"PAYAL",    td:"—",        exec:"PRANJAL",           status:"ACTIVE",           sector:"Residential", progress:42, phase:"Design Development", clientPhone:"9876500017" },
  { id:18, name:"DANCE STUDIO",             sr:"SEEMA",       jr:"—",        td:"—",        exec:"SEEMA",             status:"ACTIVE",           sector:"Commercial",  progress:65, phase:"Site Supervision",   clientPhone:"9876500018" },
  { id:19, name:"UTTEKAR",                  sr:"—",           jr:"—",        td:"—",        exec:"ANAND K",           status:"SITE MEASUREMENT", sector:"Residential", progress:5,  phase:"Briefing",           clientPhone:"9876500019", notes:"Site measurements — 1 designer reqd" },
  { id:20, name:"ANIL PATIL",               sr:"—",           jr:"—",        td:"—",        exec:"ANAND K",           status:"SITE MEASUREMENT", sector:"Residential", progress:5,  phase:"Briefing",           clientPhone:"9876500020", notes:"1 supervisor" },
  { id:21, name:"RASKAR BUNGLOW",           sr:"SEEMA",       jr:"—",        td:"—",        exec:"SEEMA",             status:"ON PRIORITY",      sector:"Residential", progress:55, phase:"Site Supervision",   clientPhone:"9876500021", notes:"ANAND/PRAFUL" },
  { id:22, name:"AMRALE",                   sr:"RAHUL",       jr:"SUHANI",   td:"—",        exec:"PRAFUL/PRATHAMESH", status:"ON PRIORITY",      sector:"Residential", progress:48, phase:"Documentation",      clientPhone:"9876500022" },
  { id:23, name:"ABHAY JAGTAP",             sr:"RAHUL",       jr:"ANAND R",  td:"—",        exec:"ANAND K",           status:"ON PRIORITY",      sector:"Residential", progress:8,  phase:"Briefing",           clientPhone:"9876500023", notes:"List agencies before starting" },
  { id:24, name:"LONAVALA VILLA",           sr:"PREM",        jr:"GAURI",    td:"—",        exec:"ANAND K",           status:"PASSIVE",          sector:"Residential", progress:12, phase:"Briefing",           clientPhone:"9876500024", notes:"List agencies before starting" },
  { id:25, name:"JADHAV WAGHOLI",           sr:"PRANJAL",     jr:"—",        td:"—",        exec:"PRANJAL",           status:"ACTIVE",           sector:"Residential", progress:38, phase:"Design Development", clientPhone:"9876500025" },
  { id:26, name:"MOHITE OFFICE",            sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"ASHISH JANA",       status:"SITE MEASUREMENT", sector:"Commercial",  progress:5,  phase:"Briefing",           clientPhone:"9876500026" },
  { id:27, name:"MOHITE SITE OFFICE",       sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"ASHISH JANA",       status:"SITE MEASUREMENT", sector:"Commercial",  progress:5,  phase:"Briefing",           clientPhone:"9876500027" },
  { id:28, name:"SUPRITI",                  sr:"PREM",        jr:"—",        td:"—",        exec:"PRAFUL/PREM",       status:"PASSIVE",          sector:"Residential", progress:22, phase:"Concept Development",clientPhone:"9876500028", notes:"Daily reporting required" },
  { id:29, name:"ANISH GAJRA",              sr:"ATHARVA",     jr:"—",        td:"—",        exec:"ANAND K",           status:"ACTIVE",           sector:"Residential", progress:33, phase:"Design Development", clientPhone:"9876500029" },
  { id:30, name:"NAGDEV",                   sr:"PRANJAL",     jr:"—",        td:"—",        exec:"PRANJAL",           status:"ON PRIORITY",      sector:"Residential", progress:62, phase:"Site Supervision",   clientPhone:"9876500030" },
  { id:31, name:"SHAHANE FARMHOUSE",        sr:"RAHUL",       jr:"SUHANI",   td:"—",        exec:"ANAND K",           status:"ACTIVE",           sector:"Residential", progress:28, phase:"Design Development", clientPhone:"9876500031" },
  { id:32, name:"KOLHAPUR",                 sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"ASHISH JANA",       status:"ON PRIORITY",      sector:"Hospitality", progress:58, phase:"Site Supervision",   clientPhone:"9876500032" },
  { id:33, name:"JOSHI GADIYAR BANQUET",    sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"ASHISH JANA",       status:"PASSIVE",          sector:"Hospitality", progress:15, phase:"Concept Development",clientPhone:"9876500033" },
  { id:34, name:"MILLERS",                  sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"ASHISH JANA",       status:"PASSIVE",          sector:"Hospitality", progress:20, phase:"Concept Development",clientPhone:"9876500034" },
  { id:35, name:"MAHABALESHWAR FARMHOUSE",  sr:"RAHUL",       jr:"SUHANI",   td:"—",        exec:"ANAND K",           status:"PASSIVE",          sector:"Residential", progress:18, phase:"Concept Development",clientPhone:"9876500035" },
  { id:36, name:"JOSHI GADIYAR RESTAURANT", sr:"ASHISH JANA", jr:"—",        td:"—",        exec:"—",                 status:"ACTIVE",           sector:"Hospitality", progress:40, phase:"Design Development", clientPhone:"9876500036" },
];

const DESIGN_TEAM = [
  { name:"RAHUL",       role:"Senior Designer",     color:"#1565C0", initials:"RA", projects:["KHANT","AMRALE","DASWADKAR","GOSAVI","MAHABALESHWAR FARMHOUSE","VAIBHAV CHAVHAN WAGHOLI","JOSHI HOUSE","ABHAY JAGTAP","SHAHANE FARMHOUSE"] },
  { name:"PREM",        role:"Senior Designer",     color:"#6A1B9A", initials:"PR", projects:["BHAVIN RAMPURA","JANJIRE","MEZZA-9","DR. LACHYAN","COCORICO","SUPRITI","LONAVALA VILLA","POKHARKAR"] },
  { name:"SOJWAL",      role:"Senior Designer",     color:"#00695C", initials:"SO", projects:["MULUND 34","MULUND 39","VASHI","GOSAVI","BHAVIN RAMPURA"] },
  { name:"DNYANADA",    role:"Senior Designer",     color:"#E65100", initials:"DN", projects:["100 PRABHAT","AARTI SHAH","SUNIL CHRISTIAN","JOSHI HOUSE"] },
  { name:"ATHARVA",     role:"Senior Designer",     color:"#C62828", initials:"AT", projects:["ABHAY JAGTAP","ANISH GAJRA","COCORICO"] },
  { name:"SEEMA",       role:"Senior Designer",     color:"#4A148C", initials:"SE", projects:["DANCE STUDIO","RASKAR BUNGLOW"] },
  { name:"ASHISH JANA", role:"Senior Designer",     color:"#1B5E20", initials:"AJ", projects:["KOLHAPUR","MILLERS","JOSHI GADIYAR RESTAURANT","MOHITE OFFICE","MOHITE SITE OFFICE","JOSHI GADIYAR BANQUET"] },
  { name:"PRANJAL",     role:"Senior Designer",     color:"#B8860B", initials:"PJ", projects:["MULUND 34","MULUND 39","VASHI","NAGDEV","JADHAV WAGHOLI"] },
  { name:"SUHANI",      role:"Junior Designer",     color:"#0277BD", initials:"SU", projects:["KHANT","AMRALE","DASWADKAR","GOSAVI","MAHABALESHWAR FARMHOUSE","VAIBHAV CHAVHAN WAGHOLI","SHAHANE FARMHOUSE"] },
  { name:"ISHIKA",      role:"Junior Designer",     color:"#AD1457", initials:"IS", projects:["AARTI SHAH","100 PRABHAT","SUNIL CHRISTIAN","JOSHI HOUSE","VAIBHAV CHAVHAN WAGHOLI"] },
  { name:"GAURI",       role:"Junior Designer",     color:"#00838F", initials:"GA", projects:["JANJIRE","MEZZA-9","DR. LACHYAN","POKHARKAR","LONAVALA VILLA"] },
  { name:"PAYAL",       role:"Junior Designer",     color:"#558B2F", initials:"PA", projects:["MULUND 34","MULUND 39","VASHI","DR. LACHYAN"] },
  { name:"ANAND R",     role:"3D Designer",         color:"#4527A0", initials:"AR", projects:["AARTI SHAH","100 PRABHAT","SUNIL CHRISTIAN","JOSHI HOUSE","ABHAY JAGTAP"] },
  { name:"NIRVA",       role:"3D Designer",         color:"#00796B", initials:"NI", projects:["KHANT","AMRALE","DASWADKAR","GOSAVI"] },
  { name:"RISHI",       role:"3D Designer",         color:"#6D4C41", initials:"RI", projects:["JANJIRE","MEZZA-9","BHAVIN RAMPURA","DR. LACHYAN","POKHARKAR"] },
];

const EXECUTION_TEAM = [
  { name:"PRAFUL",      role:"Site Execution Lead", color:"#1565C0", initials:"PF", projects:["KHANT","AMRALE","DASWADKAR","GOSAVI","100 PRABHAT","MEZZA-9","COCORICO","BHAVIN RAMPURA","SUPRITI","SUNIL CHRISTIAN","POKHARKAR","RASKAR BUNGLOW","LONAVALA VILLA","JANJIRE"] },
  { name:"ANAND K",     role:"Site Supervisor",     color:"#2E7D32", initials:"AK", projects:["JANJIRE","VAIBHAV CHAVHAN WAGHOLI","ABHAY JAGTAP","LONAVALA VILLA","UTTEKAR","ANIL PATIL","SHAHANE FARMHOUSE","MAHABALESHWAR FARMHOUSE","ANISH GAJRA"] },
  { name:"PRATHAMESH",  role:"Site Execution",      color:"#6A1B9A", initials:"PT", projects:["DASWADKAR","100 PRABHAT","MEZZA-9","COCORICO","SUNIL CHRISTIAN","AMRALE","DR. LACHYAN","RASKAR BUNGLOW"] },
  { name:"PRANJAL",     role:"Site Supervisor",     color:"#B8860B", initials:"PJ", projects:["MULUND 34","MULUND 39","VASHI","NAGDEV","JADHAV WAGHOLI"] },
  { name:"ATHARVA",     role:"Site Execution",      color:"#C62828", initials:"AT", projects:["AARTI SHAH","GOSAVI"] },
  { name:"ASHISH JANA", role:"Site Supervisor",     color:"#1B5E20", initials:"AJ", projects:["KOLHAPUR","MILLERS","JOSHI GADIYAR RESTAURANT","MOHITE OFFICE","MOHITE SITE OFFICE","JOSHI GADIYAR BANQUET"] },
  { name:"SEEMA",       role:"Site Supervisor",     color:"#4A148C", initials:"SE", projects:["DANCE STUDIO","RASKAR BUNGLOW"] },
];

const SC = {
  "ON PRIORITY":      {bg:"#FFEBEE",text:"#C62828",dot:"#C62828"},
  "ACTIVE":           {bg:"#E3F2FD",text:"#1565C0",dot:"#1565C0"},
  "PASSIVE":          {bg:"#F3E5F5",text:"#6A1B9A",dot:"#6A1B9A"},
  "HANDOVER":         {bg:"#E8F5E9",text:"#2E7D32",dot:"#2E7D32"},
  "SITE MEASUREMENT": {bg:"#FFF3E0",text:"#E65100",dot:"#E65100"},
};

const PHASES = ["Briefing","Concept Development","Design Development","Documentation","Vendor Coordination","Site Supervision","Snag & Rectification","Final Handover"];

const INIT_TASKS = [
  { id:1,  title:"Submit revised drawings — KHANT",            project:"KHANT",          assignee:"RAHUL",      due:"2026-05-21", priority:"High",   status:"Overdue", type:"Design",          notified:false },
  { id:2,  title:"Daily site report — GOSAVI",                 project:"GOSAVI",         assignee:"PRAFUL",     due:"2026-05-19", priority:"High",   status:"Today",   type:"Site",            notified:false },
  { id:3,  title:"Client approval — MEZZA-9 concept",         project:"MEZZA-9",        assignee:"PREM",       due:"2026-05-20", priority:"High",   status:"Overdue", type:"Client Approval", notified:false },
  { id:4,  title:"Agency list — ABHAY JAGTAP before start",   project:"ABHAY JAGTAP",   assignee:"RAHUL",      due:"2026-05-22", priority:"High",   status:"Pending", type:"Site",            notified:false },
  { id:5,  title:"3D render — DASWADKAR entry & lobby",       project:"DASWADKAR",      assignee:"NIRVA",      due:"2026-05-23", priority:"Medium", status:"Pending", type:"3D",              notified:false },
  { id:6,  title:"Handover checklist — MULUND 34",            project:"MULUND 34",      assignee:"SOJWAL",     due:"2026-05-20", priority:"High",   status:"Today",   type:"Handover",        notified:false },
  { id:7,  title:"Site visit — JANJIRE execution check",      project:"JANJIRE",        assignee:"ANAND K",    due:"2026-05-19", priority:"High",   status:"Today",   type:"Site",            notified:false },
  { id:8,  title:"Drawing set — AMRALE bungalow",             project:"AMRALE",         assignee:"SUHANI",     due:"2026-05-24", priority:"Medium", status:"Pending", type:"Design",          notified:false },
  { id:9,  title:"Agency coordination — KOLHAPUR",            project:"KOLHAPUR",       assignee:"ASHISH JANA",due:"2026-05-21", priority:"High",   status:"Pending", type:"Site",            notified:false },
  { id:10, title:"Client meeting — BHAVIN RAMPURA",           project:"BHAVIN RAMPURA", assignee:"PREM",       due:"2026-05-22", priority:"Medium", status:"Pending", type:"Client Approval", notified:false },
  { id:11, title:"Site measurement — UTTEKAR",                project:"UTTEKAR",        assignee:"ANAND K",    due:"2026-05-20", priority:"High",   status:"Today",   type:"Site",            notified:false },
  { id:12, title:"Mood board — SHAHANE FARMHOUSE",            project:"SHAHANE FARMHOUSE",assignee:"RAHUL",    due:"2026-05-26", priority:"Low",    status:"Pending", type:"Design",          notified:false },
  { id:13, title:"Site measurement — MOHITE OFFICE",          project:"MOHITE OFFICE",  assignee:"ASHISH JANA",due:"2026-05-21", priority:"High",   status:"Pending", type:"Site",            notified:false },
  { id:14, title:"Daily reporting — SUPRITI",                 project:"SUPRITI",        assignee:"PREM",       due:"2026-05-19", priority:"Medium", status:"Today",   type:"Site",            notified:false },
];

const INIT_REPORTS = [
  { id:1, project:"GOSAVI",   date:"2026-05-18", supervisor:"PRAFUL",      weather:"Clear",         workDone:"False ceiling GI framing complete in living area. Marble flooring laid in entry passage. Electrical conduit routing in progress for 2 bedrooms.", nextDay:"Complete false ceiling plywood. Begin bathroom tile marking.", observations:[{category:"Carpentry",severity:"Minor",note:"Minor gap in wardrobe frame near MBR — seal before laminate."},{category:"Civil",severity:"Resolved",note:"Previously reported wall crack — patched and cured."}], photos:[] },
  { id:2, project:"JANJIRE",  date:"2026-05-18", supervisor:"ANAND K",     weather:"Partly Cloudy", workDone:"Glass partition installation 70% complete. LED profile casing fixed in living ceiling. Paint base coat — 2 rooms done.", nextDay:"Complete glass partition. Veneer sealer on TV unit.", observations:[{category:"MEP",severity:"Action Required",note:"Exhaust duct alignment incorrect in MBR bathroom — must fix before ceiling closure."}], photos:[] },
  { id:3, project:"KOLHAPUR", date:"2026-05-18", supervisor:"ASHISH JANA", weather:"Clear",         workDone:"Flooring tiles laid in banquet entrance. False ceiling 50% complete. Electrical wiring for stage lighting done.", nextDay:"Wall cladding in banquet hall. Bar counter structure fabrication.", observations:[], photos:[] },
];

const INIT_PROPOSALS = [
  { id:1, client:"MR. DESHMUKH", phone:"9876501001", sector:"Residential", type:"Apartment 3BHK", area:"1800 sqft", scope:"Full interior — living, bedrooms, kitchen, baths", baseRate:450, discount:0, status:"Draft",    date:"2026-05-15", followUp:"2026-05-22" },
  { id:2, client:"HOTEL BLUE BAY", phone:"9876501002", sector:"Hospitality", type:"Boutique Hotel", area:"12000 sqft", scope:"Lobby, 24 rooms, restaurant, rooftop", baseRate:380, discount:5, status:"Sent",     date:"2026-05-10", followUp:"2026-05-20" },
  { id:3, client:"KAPOOR & SONS", phone:"9876501003", sector:"Commercial",  type:"Office", area:"4500 sqft", scope:"Reception, workstations, cabins, conference", baseRate:420, discount:0, status:"Negotiation", date:"2026-05-05", followUp:"2026-05-19" },
];

const INIT_FOLLOWUPS = [
  { id:1, client:"MR. DESHMUKH",    phone:"9876501001", project:"Proposal",   type:"Approval Pending",  message:"Hi Mr. Deshmukh, just following up on our proposal sent last week. Please share your feedback so we can proceed. — Innovations Interiors", dueDate:"2026-05-20", status:"Pending" },
  { id:2, client:"GOSAVI",          phone:"9876500002", project:"GOSAVI",     type:"Payment Reminder",  message:"Dear Client, your payment of ₹3,50,000 for the 2nd milestone of your project is due. Kindly process at your earliest. — Innovations Interiors", dueDate:"2026-05-19", status:"Sent" },
  { id:3, client:"HOTEL BLUE BAY",  phone:"9876501002", project:"Proposal",   type:"Proposal Follow-up",message:"Hi, following up on our proposal for Hotel Blue Bay. We'd love to discuss and refine the scope based on your feedback. — Innovations Interiors", dueDate:"2026-05-20", status:"Pending" },
  { id:4, client:"JANJIRE",         phone:"9876500006", project:"JANJIRE",    type:"Approval Pending",  message:"Dear Client, your approval on the revised drawings for JANJIRE is awaited. Kindly revert so we can proceed with execution. — Innovations Interiors", dueDate:"2026-05-21", status:"Pending" },
];

const INIT_LEADS=[
  {id:1,name:"Mr. Ramesh Kulkarni",phone:"9876541001",email:"ramesh@gmail.com",sector:"Residential",type:"3BHK Apartment",budget:"₹18L",location:"Baner, Pune",source:"Referral",referredBy:"Sunita Joshi",bdm:"IMRAN SIR",stage:"Site Visit Scheduled",score:88,date:"2026-05-16",followUpDate:"2026-05-21",notes:"Wants modern minimal look. Budget flexible."},
  {id:2,name:"Hotel Skyline Pvt Ltd",phone:"9876541002",email:"gm@hotelskyline.com",sector:"Hospitality",type:"3-Star Hotel",budget:"₹1.4Cr",location:"Shivajinagar, Pune",source:"Web",referredBy:"",bdm:"IMRAN SIR",stage:"Proposal Sent",score:92,date:"2026-05-12",followUpDate:"2026-05-22",notes:"30 rooms + lobby. Wants warm hospitality aesthetic."},
  {id:3,name:"Nexus Fintech",phone:"9876541003",email:"admin@nexusft.in",sector:"Commercial",type:"Office (Large — 100+ seats)",budget:"₹65L",location:"Hinjewadi Phase 3",source:"Instagram",referredBy:"",bdm:"IMRAN SIR",stage:"Initial Inquiry",score:71,date:"2026-05-18",followUpDate:"2026-05-20",notes:"350 seat open office. Corporate look."},
  {id:4,name:"Mrs. Prachi Desai",phone:"9876541004",email:"prachi.d@gmail.com",sector:"Residential",type:"Penthouse",budget:"₹55L",location:"Koregaon Park",source:"Referral",referredBy:"Rajan Mehta",bdm:"IMRAN SIR",stage:"Negotiation",score:95,date:"2026-05-10",followUpDate:"2026-05-19",notes:"Premium finish. Wants smart home integration."},
  {id:5,name:"Café Bloom 2.0",phone:"9876541005",email:"owner@cafebloom.in",sector:"Hospitality",type:"Café",budget:"₹28L",location:"Viman Nagar",source:"Walk-in",referredBy:"",bdm:"IMRAN SIR",stage:"Lost",score:45,date:"2026-05-08",followUpDate:"",notes:"Lost to budget constraint. Follow up in 3 months."},
];

const INIT_ISSUES=[
  {id:1,project:"GOSAVI",date:"2026-05-18",time:"11:30",category:"Carpentry",subcategory:"Wardrobe",severity:"Minor",description:"Gap observed in wardrobe frame near master bedroom. Laminate not sitting flush.",responsible:"PRAFUL",targetDate:"2026-05-21",status:"Open",aiRootCause:"Timber moisture variation causing frame expansion. Likely not seasoned adequately before use.",aiSolution:"Remove and re-fix frame member with seasoned wood. Apply edge banding. Use 3mm gap allowance.",correctiveAction:"",preventiveAction:"",photos:[]},
  {id:2,project:"JANJIRE",date:"2026-05-18",time:"14:00",category:"MEP",subcategory:"Exhaust",severity:"Action Required",description:"Exhaust duct alignment off by 3 inches in master bathroom. Cannot close ceiling without correction.",responsible:"ANAND K",targetDate:"2026-05-20",status:"Open",aiRootCause:"Coordination gap between civil and MEP teams. Duct not marked per drawing before ceiling framing.",aiSolution:"Reposition duct by 3 inches. Recut GI duct and re-joint. Verify against drawing Section C-2.",correctiveAction:"",preventiveAction:"",photos:[]},
  {id:3,project:"KOLHAPUR",date:"2026-05-17",time:"10:00",category:"Civil",subcategory:"Flooring",severity:"Major",description:"Tile lippage exceeding 3mm in banquet entrance. Client noticed during visit.",responsible:"ASHISH JANA",targetDate:"2026-05-19",status:"Escalated",aiRootCause:"Uneven mortar bed thickness. Labour did not use lippage clips during laying.",aiSolution:"Grind high tiles. Reset low tiles with controlled mortar bed. Use 1mm lippage clips throughout.",correctiveAction:"Grinding in progress",preventiveAction:"Mandatory lippage clip use for all future tile work.",photos:[]},
  {id:4,project:"AMRALE",date:"2026-05-16",time:"09:00",category:"Painting",subcategory:"Wall Finish",severity:"Minor",description:"Uneven texture on living room accent wall. Patch marks visible after 2nd coat.",responsible:"PRAFUL",targetDate:"2026-05-22",status:"Resolved",aiRootCause:"Inconsistent primer application. Base coat not fully dry before 2nd coat applied.",aiSolution:"Sand surface smooth. Re-prime uniformly. Allow 24hr drying. Apply final coat with consistent roller pressure.",correctiveAction:"Sanding and re-priming done.",preventiveAction:"Add drying time checkpoint to daily site report.",photos:[]},
];

const INIT_FINANCE=[
  {id:1,type:"Invoice",ref:"INV-2026-021",project:"GOSAVI",client:"GOSAVI",amount:350000,status:"Paid",date:"2026-05-04",dueDate:"2026-04-30",milestone:"Concept Approval",gst:18,notes:""},
  {id:2,type:"Invoice",ref:"INV-2026-022",project:"JANJIRE",client:"JANJIRE",amount:280000,status:"Overdue",date:"2026-04-28",dueDate:"2026-05-13",milestone:"Drawing Set 1",gst:18,notes:"3rd reminder sent."},
  {id:3,type:"Invoice",ref:"INV-2026-023",project:"KOLHAPUR",client:"KOLHAPUR",amount:580000,status:"Pending",date:"2026-05-10",dueDate:"2026-05-25",milestone:"Site Execution 50%",gst:18,notes:""},
  {id:4,type:"Invoice",ref:"INV-2026-024",project:"100 PRABHAT",client:"100 PRABHAT",amount:170000,status:"Draft",date:"2026-05-18",dueDate:"2026-06-02",milestone:"Documentation Complete",gst:18,notes:""},
  {id:5,type:"Receipt",ref:"RCP-2026-011",project:"MULUND 34",client:"MULUND 34",amount:490000,status:"Received",date:"2026-05-12",dueDate:"",milestone:"Final Payment",gst:0,notes:"Handover milestone cleared."},
];

const INIT_VENDORS=[
  {id:1,name:"Surya Marble & Granites",trade:"Flooring",contact:"Suresh Kumar",phone:"9820091001",email:"surya@marble.in",rating:4.5,delivery:"High",quality:"Excellent",payment:"30 days",status:"Active",projects:["GOSAVI","JANJIRE"],totalBilled:450000,outstanding:120000},
  {id:2,name:"Lumina Lighting Co.",trade:"Lighting",contact:"Aisha Merchant",phone:"9820091002",email:"lumina@light.in",rating:4.8,delivery:"High",quality:"Excellent",payment:"45 days",status:"Active",projects:["GOSAVI","KOLHAPUR","100 PRABHAT"],totalBilled:320000,outstanding:0},
  {id:3,name:"Artisan Joinery Works",trade:"Carpentry",contact:"Prashant Gaikwad",phone:"9820091003",email:"artisan@joinery.in",rating:4.1,delivery:"Medium",quality:"Good",payment:"30 days",status:"Active",projects:["JANJIRE","AMRALE"],totalBilled:680000,outstanding:280000},
  {id:4,name:"Electra MEP Solutions",trade:"MEP",contact:"Rajiv Nair",phone:"9820091004",email:"electra@mep.in",rating:3.8,delivery:"Medium",quality:"Average",payment:"60 days",status:"Warning",projects:["JANJIRE"],totalBilled:210000,outstanding:210000},
  {id:5,name:"SoftLine Furnishings",trade:"Soft Furnishings",contact:"Kavita Bhatt",phone:"9820091005",email:"softline@furnish.in",rating:4.3,delivery:"High",quality:"Good",payment:"45 days",status:"Active",projects:["100 PRABHAT","KHANT"],totalBilled:185000,outstanding:60000},
];

const INIT_PERFORMANCE=[
  {id:1, name:"RAHUL",       role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:82,kraScore:78,followUpScore:90,sopScore:85,reportScore:88,taskScore:80,overallScore:84,rating:"Excellent",    pendingTasks:3,overdueTasks:1,escalations:0,trend:"up",    comment:"Consistent performer. Leading KHANT and AMRALE well."},
  {id:2, name:"PREM",        role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:75,kraScore:72,followUpScore:68,sopScore:80,reportScore:85,taskScore:70,overallScore:75,rating:"Good",         pendingTasks:5,overdueTasks:2,escalations:1,trend:"stable",comment:"MEZZA-9 approval pending too long. Needs follow-up discipline."},
  {id:3, name:"SOJWAL",      role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:90,kraScore:88,followUpScore:94,sopScore:89,reportScore:92,taskScore:91,overallScore:91,rating:"Outstanding",  pendingTasks:1,overdueTasks:0,escalations:0,trend:"up",    comment:"MULUND 34 handover executed flawlessly. Top performer this month."},
  {id:4, name:"DNYANADA",    role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:80,kraScore:78,followUpScore:82,sopScore:78,reportScore:84,taskScore:80,overallScore:80,rating:"Excellent",    pendingTasks:2,overdueTasks:1,escalations:0,trend:"stable",comment:"Good progress on 100 PRABHAT and AARTI SHAH. Maintain momentum."},
  {id:5, name:"ATHARVA",     role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:77,kraScore:74,followUpScore:80,sopScore:75,reportScore:78,taskScore:76,overallScore:77,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:0,trend:"up",    comment:"ANISH GAJRA progressing well. Continue focus on delivery timelines."},
  {id:6, name:"SEEMA",       role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:83,kraScore:80,followUpScore:85,sopScore:82,reportScore:86,taskScore:83,overallScore:83,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"up",    comment:"DANCE STUDIO and RASKAR BUNGLOW both on track. Strong site presence."},
  {id:7, name:"ASHISH JANA", role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:79,kraScore:77,followUpScore:80,sopScore:75,reportScore:82,taskScore:78,overallScore:79,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:1,trend:"down",  comment:"KOLHAPUR tile lippage issue is a concern. Quality checkpoint review needed."},
  {id:8, name:"PRANJAL",     role:"Senior Designer",     dept:"Design",    manager:"Principal", kpiScore:81,kraScore:79,followUpScore:83,sopScore:78,reportScore:85,taskScore:81,overallScore:81,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"stable",comment:"NAGDEV priority project executing well. Good coordination with execution."},
  {id:9, name:"SUHANI",      role:"Junior Designer",     dept:"Design",    manager:"RAHUL",     kpiScore:76,kraScore:73,followUpScore:78,sopScore:74,reportScore:79,taskScore:75,overallScore:76,rating:"Good",         pendingTasks:4,overdueTasks:1,escalations:0,trend:"up",    comment:"Handling multiple projects well. Drawing quality improving steadily."},
  {id:10,name:"ISHIKA",      role:"Junior Designer",     dept:"Design",    manager:"DNYANADA",  kpiScore:74,kraScore:71,followUpScore:76,sopScore:72,reportScore:77,taskScore:74,overallScore:74,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:0,trend:"stable",comment:"Good support on AARTI SHAH. Need to improve revision turnaround time."},
  {id:11,name:"GAURI",       role:"Junior Designer",     dept:"Design",    manager:"PREM",      kpiScore:73,kraScore:70,followUpScore:75,sopScore:71,reportScore:76,taskScore:73,overallScore:73,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:0,trend:"stable",comment:"Supporting JANJIRE and MEZZA-9. Good client communication skills."},
  {id:12,name:"PAYAL",       role:"Junior Designer",     dept:"Design",    manager:"SOJWAL",    kpiScore:72,kraScore:69,followUpScore:74,sopScore:70,reportScore:75,taskScore:72,overallScore:72,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:0,trend:"up",    comment:"MULUND projects are progressing well. Improve 3D render quality."},
  {id:13,name:"ANAND R",     role:"3D Designer",         dept:"Design",    manager:"Principal", kpiScore:85,kraScore:82,followUpScore:87,sopScore:83,reportScore:88,taskScore:85,overallScore:85,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"up",    comment:"3D renders are of very high quality. Clients consistently satisfied."},
  {id:14,name:"NIRVA",       role:"3D Designer",         dept:"Design",    manager:"Principal", kpiScore:83,kraScore:80,followUpScore:85,sopScore:81,reportScore:86,taskScore:83,overallScore:83,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"stable",comment:"Excellent 3D output for KHANT and DASWADKAR. Timely delivery."},
  {id:15,name:"RISHI",       role:"3D Designer",         dept:"Design",    manager:"Principal", kpiScore:80,kraScore:77,followUpScore:82,sopScore:78,reportScore:83,taskScore:80,overallScore:80,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"stable",comment:"Good renders for JANJIRE and BHAVIN RAMPURA. Keep up consistency."},
  {id:16,name:"PRAFUL",      role:"Site Execution Lead", dept:"Execution", manager:"Principal", kpiScore:88,kraScore:85,followUpScore:92,sopScore:82,reportScore:90,taskScore:87,overallScore:87,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"up",    comment:"Excellent daily reporting. Site discipline is strong across all projects."},
  {id:17,name:"ANAND K",     role:"Site Supervisor",     dept:"Execution", manager:"Principal", kpiScore:72,kraScore:70,followUpScore:74,sopScore:68,reportScore:76,taskScore:72,overallScore:72,rating:"Good",         pendingTasks:4,overdueTasks:1,escalations:1,trend:"stable",comment:"JANJIRE MEP issue should have been caught earlier. Review SOP checklist."},
  {id:18,name:"PRATHAMESH",  role:"Site Execution",      dept:"Execution", manager:"PRAFUL",    kpiScore:70,kraScore:68,followUpScore:72,sopScore:66,reportScore:74,taskScore:70,overallScore:70,rating:"Good",         pendingTasks:3,overdueTasks:1,escalations:0,trend:"up",    comment:"Improving steadily. Good support on DASWADKAR and 100 PRABHAT sites."},
  {id:19,name:"IMRAN SIR",   role:"BD & HR Manager",     dept:"Management",manager:"Principal", kpiScore:91,kraScore:89,followUpScore:93,sopScore:88,reportScore:85,taskScore:90,overallScore:89,rating:"Excellent",    pendingTasks:2,overdueTasks:0,escalations:0,trend:"up",    comment:"Strong lead pipeline management. HR processes running smoothly. Key asset to the firm."},
];

// ── UI ATOMS ──────────────────────────────────────────────────────────────────
function Avatar({initials,color,size=32}){
  return <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`1.5px solid ${color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.33,fontWeight:700,color,flexShrink:0}}>{initials}</div>;
}
function Badge({status}){
  const s=SC[status]||{bg:C.surface2,text:C.muted,dot:C.muted};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:3,background:s.bg,color:s.text,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}><span style={{width:6,height:6,borderRadius:"50%",background:s.dot,flexShrink:0}}/>{status}</span>;
}
function Tag({label,color=C.muted}){
  return <span style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:`${color}18`,color,fontWeight:600,whiteSpace:"nowrap"}}>{label}</span>;
}
function Card({children,style={},onClick}){
  return <div onClick={onClick} style={{background:"#fff",border:`0.5px solid ${C.border}`,borderRadius:8,padding:"1rem 1.25rem",transition:"box-shadow 0.15s",cursor:onClick?"pointer":"default",...style}}
    onMouseEnter={e=>onClick&&(e.currentTarget.style.boxShadow=`0 2px 12px ${C.border}`)}
    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>{children}</div>;
}
function Head({title,sub,action}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
    <div><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:C.ink,lineHeight:1}}>{title}</h2>{sub&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>{sub}</div>}</div>
    {action}
  </div>;
}
function Btn({children,onClick,v="primary",sm,disabled,style={}}){
  const vs={primary:{background:C.gold,color:"#fff"},ghost:{background:"transparent",color:C.gold,border:`0.5px solid ${C.borderStrong}`},danger:{background:C.red,color:"#fff"},success:{background:C.green,color:"#fff"},dark:{background:C.ink,color:"#fff"},wa:{background:"#25D366",color:"#fff"}}[v];
  return <button onClick={onClick} disabled={disabled} style={{fontFamily:"inherit",fontSize:sm?11:12,fontWeight:600,borderRadius:4,padding:sm?"4px 10px":"7px 16px",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,border:"none",letterSpacing:"0.04em",...vs,...style}}>{children}</button>;
}
function Inp({label,value,onChange,type="text",placeholder="",rows}){
  const s={width:"100%",padding:"7px 10px",border:`0.5px solid ${C.borderStrong}`,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"};
  return <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
    {rows?<textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{...s,resize:"vertical"}}/>
    :<input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder} style={s}/>}
  </div>;
}
function Sel({label,value,onChange,options}){
  return <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"7px 10px",border:`0.5px solid ${C.borderStrong}`,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink}}>
      {options.map(o=><option key={typeof o==="string"?o:o.value} value={typeof o==="string"?o:o.value}>{typeof o==="string"?o:o.label}</option>)}
    </select>
  </div>;
}
function ProgressBar({value,color=C.gold,height=6,showLabel=false}){
  const pct=Math.min(100,Math.max(0,value));
  const col=pct>=80?C.green:pct>=50?C.gold:pct>=25?C.amber:C.red;
  return <div>
    <div style={{height,background:C.surface3,borderRadius:height,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct}%`,background:color||col,borderRadius:height,transition:"width 0.5s"}}/>
    </div>
    {showLabel&&<div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
      <span style={{fontSize:10,color:C.muted}}>Progress</span>
      <span style={{fontSize:11,fontWeight:700,color:color||col}}>{pct}%</span>
    </div>}
  </div>;
}

// ── WHATSAPP NOTIFY ───────────────────────────────────────────────────────────
function openWhatsApp(phone, message) {
  const clean=String(phone||"").replace(/\D/g,"");
  if(!clean){ 
    try{ navigator.clipboard.writeText(message).then(()=>alert("Message copied to clipboard! Open WhatsApp and paste.")); }
    catch(e){ alert("Message:\n\n"+message.slice(0,200)+"..."); }
    return;
  }
  const num=clean.startsWith("91")?clean:"91"+clean;
  const url="https://wa.me/"+num+"?text="+encodeURIComponent(message);
  try{ 
    const w=window.open(url,"_blank");
    if(!w){
      // Popup blocked — copy to clipboard
      try{ navigator.clipboard.writeText(message).then(()=>alert("WhatsApp opened or message copied!\nSend to: +"+num)); }
      catch(e){}
    }
  }catch(e){
    try{ navigator.clipboard.writeText(message).then(()=>alert("Message copied to clipboard!\nOpen WhatsApp manually and paste.")); }
    catch(e2){ alert("WhatsApp message for "+phone+":\n\n"+message.slice(0,200)+"..."); }
  }
}

// ── NOTIFY MODAL ──────────────────────────────────────────────────────────────
function NotifyModal({task, onClose}){
  const [recipient, setRecipient] = useState(task.assignee);
  const [customPhone, setCustomPhone] = useState("");
  const [msgType, setMsgType] = useState("team"); // team | client | custom
  const [message, setMessage] = useState(
    `Hi ${task.assignee}, this is a reminder for your task:\n"${task.title}"\nProject: ${task.project}\nDue: ${task.due}\nPriority: ${task.priority}\n\n— Innovations Interiors`
  );

  const member = ALL_TEAM_MEMBERS.find(m=>m.name===recipient);

  function send(){
    let phone = customPhone;
    if(msgType==="team") phone = member?.phone || "";
    openWhatsApp(phone, message);
    onClose();
  }

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{background:"#fff",borderRadius:10,padding:"1.5rem",width:480,boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,color:C.ink}}>📲 Send WhatsApp Reminder</div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>×</button>
      </div>
      <div style={{background:C.surface2,borderRadius:6,padding:"0.65rem 0.9rem",marginBottom:"1rem",fontSize:12,color:C.inkSoft}}>
        <strong>{task.title}</strong><br/>
        <span style={{color:C.muted}}>{task.project} · Due {task.due} · {task.priority} priority</span>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:"1rem"}}>
        {[["team","👤 Team Member"],["client","🏠 Client"],["custom","✏️ Custom Number"]].map(([v,l])=>
          <button key={v} onClick={()=>setMsgType(v)} style={{flex:1,padding:"6px",borderRadius:4,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:`1px solid ${msgType===v?C.gold:C.border}`,background:msgType===v?C.goldLight:"#fff",color:msgType===v?C.gold:C.muted,fontWeight:msgType===v?700:400}}>{l}</button>)}
      </div>
      {msgType==="team"&&<div style={{marginBottom:"1rem"}}>
        <Sel label="Select Team Member" value={recipient} onChange={v=>{setRecipient(v);setMessage(`Hi ${v}, this is a reminder for your task:\n"${task.title}"\nProject: ${task.project}\nDue: ${task.due}\nPriority: ${task.priority}\n\n— Innovations Interiors`);}} options={ALL_TEAM_MEMBERS.map(m=>m.name)}/>
        {member&&<div style={{marginTop:6,fontSize:11,color:C.muted}}>📱 +91 {member.phone} · {member.role}</div>}
      </div>}
      {msgType==="client"&&<div style={{marginBottom:"1rem"}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Client Phone</div>
        <input value={customPhone} onChange={e=>setCustomPhone(e.target.value)} placeholder="Client's WhatsApp number"
          style={{width:"100%",padding:"7px 10px",border:`0.5px solid ${C.borderStrong}`,borderRadius:4,fontSize:12,fontFamily:"inherit"}}/>
      </div>}
      {msgType==="custom"&&<div style={{marginBottom:"1rem"}}>
        <Inp label="WhatsApp Number (10 digits)" value={customPhone} onChange={setCustomPhone} placeholder="9876543210"/>
      </div>}
      <div style={{marginBottom:"1rem"}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Message Preview</div>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5}
          style={{width:"100%",padding:"8px 10px",border:`0.5px solid ${C.borderStrong}`,borderRadius:4,fontSize:12,fontFamily:"inherit",background:C.surface,resize:"vertical"}}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn v="wa" onClick={send} style={{flex:1}}>📲 Open WhatsApp & Send</Btn>
        <Btn v="ghost" onClick={onClose}>Cancel</Btn>
      </div>
      <div style={{marginTop:8,fontSize:10,color:C.muted,textAlign:"center"}}>Opens WhatsApp with pre-filled message · You press Send</div>
    </div>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
// ── COLOUR THEME (DARK NAVY + GOLD — PREMIUM DARK MODE FEEL) ─────────────────
// Override C for new palette
Object.assign(C,{
  gold:"#C9A84C", goldLight:"#FDF3DC", goldMid:"#E2B96F", goldDark:"#A07830",
  ink:"#0F1923", inkSoft:"#1E2D3D", muted:"#6B7C8F",
  surface:"#F8FAFC", surface2:"#EEF2F7", surface3:"#DDE4EE",
  green:"#1A7F4B", greenLight:"#E6F7EE",
  red:"#C0392B", redLight:"#FDECEA",
  blue:"#1A5FA8", blueLight:"#E8F1FB",
  amber:"#C96A00", amberLight:"#FFF3E0",
  purple:"#6B21A8", purpleLight:"#F5F0FF",
  teal:"#0D7377", tealLight:"#E0F4F4",
  sidebar:"#0F1923", sidebarActive:"rgba(201,168,76,0.14)",
  border:"rgba(15,25,35,0.10)", borderStrong:"rgba(15,25,35,0.20)",
});

// ── EXPANDED ROOM TEMPLATES ───────────────────────────────────────────────────
const ROOM_TEMPLATES = {
  Residential: {
    "1BHK Apartment": [
      { room:"Entrance & Living", items:[
        {desc:"Entrance Shoe Rack with Shutter",unit:"Sqft",qty:12,rate:1100},
        {desc:"TV Unit with Back Panel",unit:"Sqft",qty:60,rate:900},
        {desc:"Wall Panel / Feature Wall",unit:"Sqft",qty:120,rate:280},
        {desc:"Sofa 3-Seater & Centre Table",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Modular Kitchen with Overhead",unit:"Lump",qty:1,rate:280000},
        {desc:"Platform & Backsplash",unit:"Sqft",qty:30,rate:700},
      ]},
      { room:"Bedroom", items:[
        {desc:"Double Bed with Storage",unit:"Lump",qty:1,rate:90000},
        {desc:"Backwall Treatment",unit:"Sqft",qty:30,rate:1500},
        {desc:"Wardrobe 2-Door with Loft",unit:"Sqft",qty:48,rate:1800},
        {desc:"Dresser with Mirror",unit:"Sqft",qty:14,rate:1000},
      ]},
      { room:"Bathroom", items:[
        {desc:"Tile Work Floor & Walls",unit:"Sqft",qty:150,rate:180},
        {desc:"Sanitary & CP Fittings",unit:"Lump",qty:1,rate:35000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Polishing",unit:"Lump",qty:1,rate:40000},
        {desc:"False Ceiling",unit:"Sqft",qty:650,rate:120},
        {desc:"Electrical & Light Fittings",unit:"Lump",qty:1,rate:90000},
        {desc:"Curtains & Accessories",unit:"Lump",qty:1,rate:55000},
      ]},
    ],
    "2BHK Apartment": [
      { room:"Entrance Lobby", items:[
        {desc:"Entrance Partition with Safety Door",unit:"Sqft",qty:110,rate:900},
        {desc:"Shoe Rack 4'×3'",unit:"Sqft",qty:12,rate:1200},
        {desc:"Foyer Console with Mirror",unit:"Nos",qty:1,rate:18000},
      ]},
      { room:"Living & Dining Room", items:[
        {desc:"TV Unit Back Panel & Console",unit:"Sqft",qty:80,rate:900},
        {desc:"Wall Panel Treatment",unit:"Sqft",qty:180,rate:300},
        {desc:"Mandir 2'6\"×10'",unit:"Sqft",qty:25,rate:1500},
        {desc:"L-Seater Sofa & Chair",unit:"Lump",qty:1,rate:200000},
        {desc:"6-Seater Dining Table with Chairs",unit:"Lump",qty:1,rate:120000},
        {desc:"Centre Table & Side Table",unit:"Lump",qty:1,rate:35000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Modular Kitchen Trollies & Overhead",unit:"Lump",qty:1,rate:500000},
        {desc:"Platform in Dry Balcony",unit:"Nos",qty:1,rate:4000},
        {desc:"Hob & Chimney (supply)",unit:"Lump",qty:1,rate:45000},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"Double Bed with Side Tables",unit:"Lump",qty:1,rate:120000},
        {desc:"Bed Backrest & Backwall Treatment",unit:"Sqft",qty:33,rate:1800},
        {desc:"TV Unit Back Panel & Console",unit:"Sqft",qty:100,rate:900},
        {desc:"Dresser Unit",unit:"Sqft",qty:16,rate:1000},
        {desc:"3-Door Wardrobe with Loft",unit:"Sqft",qty:60,rate:2000},
        {desc:"Working Desk + Overhead Shelves",unit:"Nos",qty:1,rate:38000},
      ]},
      { room:"Bedroom 2", items:[
        {desc:"Double Bed with Side Tables",unit:"Lump",qty:1,rate:100000},
        {desc:"Backwall Treatment",unit:"Sqft",qty:33,rate:1500},
        {desc:"Wardrobe with Loft",unit:"Sqft",qty:60,rate:1800},
        {desc:"Study Table + Chair",unit:"Nos",qty:1,rate:30000},
      ]},
      { room:"Bathrooms (×2)", items:[
        {desc:"Tile Work Floor & Walls",unit:"Sqft",qty:320,rate:180},
        {desc:"Sanitary & CP Fittings",unit:"Lump",qty:1,rate:75000},
        {desc:"Mirrors, Accessories & Lighting",unit:"Lump",qty:1,rate:30000},
      ]},
      { room:"Balcony", items:[
        {desc:"Vertical Garden & Wall Treatment",unit:"Lump",qty:1,rate:75000},
        {desc:"Outdoor Seating / Swing",unit:"Lump",qty:1,rate:60000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Polishing",unit:"Lump",qty:1,rate:80000},
        {desc:"False Ceiling",unit:"Sqft",qty:1800,rate:125},
        {desc:"Electrical Work & Light Fittings",unit:"Lump",qty:1,rate:250000},
        {desc:"Decorative Curtains",unit:"Lump",qty:1,rate:120000},
        {desc:"Artefacts / Wall Art",unit:"Lump",qty:1,rate:50000},
      ]},
    ],
    "2.5BHK Apartment": [
      { room:"Entrance & Foyer", items:[
        {desc:"Entrance Partition + Shoe Rack",unit:"Sqft",qty:130,rate:950},
        {desc:"Foyer Console & Mirror",unit:"Nos",qty:1,rate:25000},
      ]},
      { room:"Living & Dining", items:[
        {desc:"TV Feature Wall & Console",unit:"Sqft",qty:90,rate:950},
        {desc:"Wall Panel Treatment",unit:"Sqft",qty:200,rate:320},
        {desc:"Mandir Unit",unit:"Sqft",qty:28,rate:1500},
        {desc:"Sofa Set + Coffee Table",unit:"Lump",qty:1,rate:220000},
        {desc:"6-Seater Dining + Chairs",unit:"Lump",qty:1,rate:140000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Full Modular Kitchen",unit:"Lump",qty:1,rate:580000},
        {desc:"Stone Platform & Backsplash",unit:"Sqft",qty:45,rate:750},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"King Bed with Headboard",unit:"Lump",qty:1,rate:140000},
        {desc:"Feature Backwall",unit:"Sqft",qty:38,rate:2000},
        {desc:"4-Door Wardrobe with Loft",unit:"Sqft",qty:72,rate:2100},
        {desc:"Dresser & TV Console",unit:"Sqft",qty:30,rate:1000},
      ]},
      { room:"Bedroom 2", items:[
        {desc:"Double Bed with Storage",unit:"Lump",qty:1,rate:110000},
        {desc:"Backwall Treatment",unit:"Sqft",qty:33,rate:1600},
        {desc:"Wardrobe",unit:"Sqft",qty:60,rate:1900},
      ]},
      { room:"Study / 0.5 Room", items:[
        {desc:"L-Shaped Study Table",unit:"Nos",qty:1,rate:45000},
        {desc:"Bookshelf / Storage Wall",unit:"Sqft",qty:40,rate:1800},
        {desc:"Study Chair",unit:"Nos",qty:1,rate:8000},
      ]},
      { room:"Bathrooms (×2)", items:[
        {desc:"Tile Work & Sanitary",unit:"Lump",qty:1,rate:110000},
        {desc:"Accessories & Lighting",unit:"Lump",qty:1,rate:35000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Polishing",unit:"Lump",qty:1,rate:95000},
        {desc:"False Ceiling",unit:"Sqft",qty:2000,rate:128},
        {desc:"Electrical & Lighting",unit:"Lump",qty:1,rate:280000},
        {desc:"Curtains & Soft Furnishings",unit:"Lump",qty:1,rate:140000},
      ]},
    ],
    "3BHK Apartment": [
      { room:"Entrance & Foyer", items:[
        {desc:"Entrance Partition + Safety Door",unit:"Sqft",qty:120,rate:950},
        {desc:"Shoe Rack 5'×3'",unit:"Sqft",qty:15,rate:1200},
        {desc:"Foyer Console with Mirror",unit:"Nos",qty:1,rate:35000},
      ]},
      { room:"Living & Dining Room", items:[
        {desc:"TV Feature Wall & Console",unit:"Sqft",qty:100,rate:950},
        {desc:"Wall Panel Treatment",unit:"Sqft",qty:220,rate:350},
        {desc:"Mandir 3'×10'",unit:"Sqft",qty:30,rate:1500},
        {desc:"L-Seater Sofa & Chair",unit:"Lump",qty:1,rate:280000},
        {desc:"8-Seater Dining + Chairs",unit:"Lump",qty:1,rate:180000},
        {desc:"Crockery Unit",unit:"Sqft",qty:40,rate:1800},
      ]},
      { room:"Modular Kitchen", items:[
        {desc:"Kitchen All Trollies & Overhead",unit:"Lump",qty:1,rate:700000},
        {desc:"Granite Platform & Backsplash",unit:"Sqft",qty:60,rate:800},
        {desc:"Hob, Chimney & Sink (supply)",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"King Bed with Side Tables",unit:"Lump",qty:1,rate:160000},
        {desc:"Bed Backrest & Feature Backwall",unit:"Sqft",qty:45,rate:2000},
        {desc:"TV Unit & Panel",unit:"Sqft",qty:110,rate:950},
        {desc:"Dresser with Mirror",unit:"Sqft",qty:20,rate:1200},
        {desc:"3-Door Wardrobe with Loft",unit:"Sqft",qty:80,rate:2200},
        {desc:"Study Desk + Overhead + Chair",unit:"Nos",qty:1,rate:55000},
      ]},
      { room:"Bedroom 2", items:[
        {desc:"Double Bed with Side Tables",unit:"Lump",qty:1,rate:120000},
        {desc:"Backwall Treatment",unit:"Sqft",qty:33,rate:1800},
        {desc:"Dresser",unit:"Sqft",qty:16,rate:1000},
        {desc:"Wardrobe with Loft",unit:"Sqft",qty:72,rate:2000},
        {desc:"Study Table + Shelves",unit:"Nos",qty:1,rate:38000},
      ]},
      { room:"Bedroom 3", items:[
        {desc:"Single/Double Bed with Storage",unit:"Lump",qty:1,rate:100000},
        {desc:"Backwall Treatment",unit:"Sqft",qty:30,rate:1500},
        {desc:"Wardrobe",unit:"Sqft",qty:60,rate:1800},
        {desc:"Study Table",unit:"Nos",qty:1,rate:30000},
      ]},
      { room:"Bathrooms (×3)", items:[
        {desc:"Tile Work All Bathrooms",unit:"Sqft",qty:480,rate:180},
        {desc:"Sanitary & CP Fittings",unit:"Lump",qty:1,rate:120000},
        {desc:"Mirrors & Accessories",unit:"Lump",qty:1,rate:45000},
      ]},
      { room:"Balconies (×2)", items:[
        {desc:"Vertical Garden & Wall Treatment",unit:"Lump",qty:1,rate:100000},
        {desc:"Outdoor Seating Set",unit:"Lump",qty:1,rate:120000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Polishing",unit:"Lump",qty:1,rate:120000},
        {desc:"False Ceiling (full flat)",unit:"Sqft",qty:2400,rate:130},
        {desc:"Electrical Work & Light Fittings",unit:"Lump",qty:1,rate:350000},
        {desc:"Decorative Curtains & Blinds",unit:"Lump",qty:1,rate:220000},
        {desc:"Artefacts / Wall Art / Accessories",unit:"Lump",qty:1,rate:80000},
      ]},
    ],
    "4BHK Apartment": [
      { room:"Grand Foyer & Entrance", items:[
        {desc:"Feature Entrance Wall / Stone Cladding",unit:"Sqft",qty:160,rate:1600},
        {desc:"Foyer Flooring Marble/Stone",unit:"Sqft",qty:120,rate:1200},
        {desc:"Console Table & Mirror",unit:"Nos",qty:1,rate:60000},
        {desc:"Shoe Cabinet",unit:"Sqft",qty:20,rate:1400},
      ]},
      { room:"Living Room", items:[
        {desc:"Feature Wall — Stone/Veneer",unit:"Sqft",qty:220,rate:2000},
        {desc:"Custom TV Unit & Entertainment Wall",unit:"Sqft",qty:130,rate:1600},
        {desc:"Premium Sofa Set (L+2+1)",unit:"Lump",qty:1,rate:500000},
        {desc:"Custom Centre Table & Side Tables",unit:"Lump",qty:1,rate:120000},
        {desc:"Mandir Unit",unit:"Sqft",qty:35,rate:1800},
        {desc:"False Ceiling with Cove Lighting",unit:"Sqft",qty:600,rate:300},
      ]},
      { room:"Dining Room", items:[
        {desc:"8-Seater Dining Table",unit:"Nos",qty:1,rate:220000},
        {desc:"Dining Chairs (×8)",unit:"Nos",qty:8,rate:16000},
        {desc:"Crockery & Display Unit",unit:"Sqft",qty:60,rate:2000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Premium Modular Kitchen",unit:"Lump",qty:1,rate:900000},
        {desc:"Stone Platform & Backsplash",unit:"Sqft",qty:80,rate:900},
        {desc:"Appliances (Hob/Chimney/Oven)",unit:"Lump",qty:1,rate:150000},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"King Bed with Upholstered Headboard",unit:"Nos",qty:1,rate:200000},
        {desc:"Feature Backwall — Fabric/Veneer",unit:"Sqft",qty:70,rate:2500},
        {desc:"Walk-in Wardrobe",unit:"Sqft",qty:100,rate:3000},
        {desc:"Dressing Table with Backlit Mirror",unit:"Nos",qty:1,rate:70000},
        {desc:"False Ceiling + Cove Lighting",unit:"Sqft",qty:400,rate:350},
      ]},
      { room:"Bedrooms 2, 3 & 4", items:[
        {desc:"Beds with Side Tables (×3)",unit:"Nos",qty:3,rate:130000},
        {desc:"Backwall Treatments (×3)",unit:"Sqft",qty:180,rate:1800},
        {desc:"Wardrobes with Loft (×3)",unit:"Sqft",qty:210,rate:2200},
        {desc:"Study Tables & Chairs (×2)",unit:"Nos",qty:2,rate:45000},
      ]},
      { room:"Home Office / Study", items:[
        {desc:"L-Shaped Executive Desk",unit:"Nos",qty:1,rate:150000},
        {desc:"Storage Wall & Bookshelves",unit:"Sqft",qty:80,rate:2800},
        {desc:"Executive Chair + Visitor Chairs",unit:"Nos",qty:1,rate:70000},
      ]},
      { room:"Bathrooms (×4)", items:[
        {desc:"Premium Tile Work",unit:"Sqft",qty:600,rate:220},
        {desc:"Sanitary & CP Fittings (Jaquar)",unit:"Lump",qty:1,rate:200000},
        {desc:"Mirrors, Glass & Lighting",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Textures",unit:"Lump",qty:1,rate:180000},
        {desc:"False Ceiling Balance Areas",unit:"Sqft",qty:1000,rate:300},
        {desc:"Electrical & Premium Lighting",unit:"Lump",qty:1,rate:600000},
        {desc:"Curtains & Soft Furnishings",unit:"Lump",qty:1,rate:300000},
        {desc:"Artefacts & Accessories",unit:"Lump",qty:1,rate:150000},
      ]},
    ],
    "Penthouse": [
      { room:"Grand Entrance & Foyer", items:[
        {desc:"Feature Entrance Wall / Cladding",unit:"Sqft",qty:200,rate:1800},
        {desc:"Marble / Stone Flooring in Foyer",unit:"Sqft",qty:150,rate:1400},
        {desc:"Decorative Console & Mirror",unit:"Nos",qty:1,rate:80000},
        {desc:"Ceiling Feature / Cove Lighting",unit:"Sqft",qty:200,rate:450},
      ]},
      { room:"Living Room", items:[
        {desc:"Feature Wall — Stone/Veneer Cladding",unit:"Sqft",qty:250,rate:2200},
        {desc:"Custom TV Unit & Entertainment Wall",unit:"Sqft",qty:140,rate:1800},
        {desc:"Premium Sofa Set (L+2+1)",unit:"Lump",qty:1,rate:600000},
        {desc:"Custom Centre Table & Side Tables",unit:"Lump",qty:1,rate:150000},
        {desc:"False Ceiling with Indirect Lighting",unit:"Sqft",qty:600,rate:350},
        {desc:"Motorised Curtains",unit:"Lump",qty:1,rate:300000},
      ]},
      { room:"Dining Room", items:[
        {desc:"Custom 10-Seater Dining Table",unit:"Nos",qty:1,rate:350000},
        {desc:"Dining Chairs (×10)",unit:"Nos",qty:10,rate:18000},
        {desc:"Crockery & Bar Cabinet",unit:"Sqft",qty:80,rate:2500},
        {desc:"Pendant Light Feature",unit:"Nos",qty:3,rate:25000},
      ]},
      { room:"Modular Kitchen", items:[
        {desc:"Premium Modular Kitchen (Hettich/Hafele)",unit:"Lump",qty:1,rate:1200000},
        {desc:"Stone Platform & Feature Backsplash",unit:"Sqft",qty:80,rate:1200},
        {desc:"Appliances (Hob/Chimney/Oven/Dishwasher)",unit:"Lump",qty:1,rate:250000},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"Custom King Bed with Upholstered Headboard",unit:"Nos",qty:1,rate:300000},
        {desc:"Feature Backwall — Stone/Fabric/Veneer",unit:"Sqft",qty:80,rate:2800},
        {desc:"Custom Walk-in Wardrobe",unit:"Sqft",qty:120,rate:3500},
        {desc:"Dressing Table with Backlit Mirror",unit:"Nos",qty:1,rate:80000},
        {desc:"False Ceiling with Cove Lighting",unit:"Sqft",qty:400,rate:400},
      ]},
      { room:"Bedrooms 2 & 3", items:[
        {desc:"King/Queen Beds with Premium Headboards",unit:"Nos",qty:2,rate:180000},
        {desc:"Feature Backwall (each)",unit:"Sqft",qty:120,rate:2000},
        {desc:"Wardrobes with Loft",unit:"Sqft",qty:200,rate:2800},
        {desc:"Study Tables & Chairs",unit:"Nos",qty:2,rate:55000},
      ]},
      { room:"Home Office", items:[
        {desc:"Custom L-Shaped Executive Desk",unit:"Nos",qty:1,rate:200000},
        {desc:"Storage Wall & Library Shelves",unit:"Sqft",qty:100,rate:3000},
        {desc:"Executive + Visitor Chairs",unit:"Nos",qty:1,rate:80000},
      ]},
      { room:"Terrace", items:[
        {desc:"Outdoor Lounge Seating",unit:"Lump",qty:1,rate:400000},
        {desc:"Landscape / Planters / Pergola",unit:"Lump",qty:1,rate:300000},
        {desc:"Outdoor Kitchen / BBQ Counter",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Bathrooms (×3+)", items:[
        {desc:"Premium Sanitary Fittings (Jaquar/Kohler)",unit:"Lump",qty:1,rate:450000},
        {desc:"Stone/Tile Work All Bathrooms",unit:"Sqft",qty:500,rate:1600},
        {desc:"Mirrors, Accessories & Lighting",unit:"Lump",qty:1,rate:120000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting, Polishing & Textures",unit:"Lump",qty:1,rate:300000},
        {desc:"False Ceiling Balance Areas",unit:"Sqft",qty:1000,rate:350},
        {desc:"Electrical & Premium Light Fittings",unit:"Lump",qty:1,rate:800000},
        {desc:"Smart Home / Automation (basic)",unit:"Lump",qty:1,rate:500000},
        {desc:"Artefacts / Art / Accessories",unit:"Lump",qty:1,rate:250000},
      ]},
    ],
    "Bungalow / Row House": [
      { room:"Entrance & Foyer", items:[
        {desc:"Entrance Door Feature Wall",unit:"Sqft",qty:180,rate:1600},
        {desc:"Foyer Flooring Marble/Stone",unit:"Sqft",qty:200,rate:1200},
        {desc:"Console Table & Mirror",unit:"Nos",qty:1,rate:60000},
        {desc:"Staircase Feature Design",unit:"Lump",qty:1,rate:400000},
      ]},
      { room:"Living Room", items:[
        {desc:"Feature Wall Cladding",unit:"Sqft",qty:220,rate:1800},
        {desc:"Custom TV Unit & Console",unit:"Sqft",qty:120,rate:1600},
        {desc:"Premium Sofa Set",unit:"Lump",qty:1,rate:500000},
        {desc:"Centre & Side Tables",unit:"Lump",qty:1,rate:120000},
        {desc:"Mandir Unit",unit:"Sqft",qty:35,rate:1800},
        {desc:"False Ceiling + Cove Lighting",unit:"Sqft",qty:700,rate:320},
      ]},
      { room:"Dining Room", items:[
        {desc:"8-10 Seater Dining Table",unit:"Nos",qty:1,rate:280000},
        {desc:"Dining Chairs (×10)",unit:"Nos",qty:10,rate:16000},
        {desc:"Crockery Unit",unit:"Sqft",qty:60,rate:2200},
      ]},
      { room:"Kitchen", items:[
        {desc:"Modular Kitchen with All Trollies",unit:"Lump",qty:1,rate:900000},
        {desc:"Granite Platform & Backsplash",unit:"Sqft",qty:100,rate:900},
        {desc:"Kitchen Appliances",unit:"Lump",qty:1,rate:200000},
        {desc:"Utility / Dry Kitchen Area",unit:"Lump",qty:1,rate:150000},
      ]},
      { room:"Master Bedroom", items:[
        {desc:"Custom Bed with Upholstered Headboard",unit:"Nos",qty:1,rate:250000},
        {desc:"Feature Backwall",unit:"Sqft",qty:80,rate:2500},
        {desc:"Walk-in Wardrobe",unit:"Sqft",qty:100,rate:3200},
        {desc:"Dressing Unit with Mirror",unit:"Nos",qty:1,rate:70000},
        {desc:"False Ceiling + Lighting",unit:"Sqft",qty:400,rate:350},
      ]},
      { room:"Bedrooms 2, 3 & 4", items:[
        {desc:"Beds with Side Tables (×3)",unit:"Nos",qty:3,rate:140000},
        {desc:"Wardrobes with Loft (×3)",unit:"Sqft",qty:240,rate:2200},
        {desc:"Backwall Treatments",unit:"Sqft",qty:180,rate:1600},
        {desc:"Study Tables & Chairs (×2)",unit:"Nos",qty:2,rate:45000},
      ]},
      { room:"Home Office / Study", items:[
        {desc:"Executive Desk & Storage Wall",unit:"Lump",qty:1,rate:200000},
        {desc:"Library Rack / Bookshelves",unit:"Sqft",qty:80,rate:2800},
      ]},
      { room:"Terrace & Garden", items:[
        {desc:"Landscape & Planters",unit:"Lump",qty:1,rate:300000},
        {desc:"Outdoor Furniture",unit:"Lump",qty:1,rate:250000},
        {desc:"Pergola / Gazebo",unit:"Lump",qty:1,rate:350000},
      ]},
      { room:"Bathrooms (×3+)", items:[
        {desc:"Tile Work All Bathrooms",unit:"Sqft",qty:700,rate:200},
        {desc:"Sanitary & CP Fittings",unit:"Lump",qty:1,rate:200000},
        {desc:"Mirrors & Accessories",unit:"Lump",qty:1,rate:70000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Textures (full bungalow)",unit:"Lump",qty:1,rate:400000},
        {desc:"False Ceiling Remaining Areas",unit:"Sqft",qty:1500,rate:320},
        {desc:"Electrical & Premium Lighting",unit:"Lump",qty:1,rate:1000000},
        {desc:"Artefacts & Accessories",unit:"Lump",qty:1,rate:300000},
      ]},
    ],
    "Villa": [
      { room:"Grand Entrance & Porte Cochère", items:[
        {desc:"Entrance Gate Feature Design",unit:"Lump",qty:1,rate:300000},
        {desc:"Foyer Flooring (imported marble)",unit:"Sqft",qty:300,rate:1600},
        {desc:"Grand Staircase Design",unit:"Lump",qty:1,rate:800000},
        {desc:"Feature Chandelier",unit:"Nos",qty:1,rate:400000},
      ]},
      { room:"Grand Living", items:[
        {desc:"Stone Feature Wall",unit:"Sqft",qty:300,rate:2800},
        {desc:"Custom Entertainment Wall",unit:"Sqft",qty:160,rate:2200},
        {desc:"Premium Sofa Set (full set)",unit:"Lump",qty:1,rate:1200000},
        {desc:"Custom Coffee & Side Tables",unit:"Lump",qty:1,rate:250000},
        {desc:"Grand False Ceiling + Chandelier",unit:"Sqft",qty:1000,rate:500},
      ]},
      { room:"Formal Dining", items:[
        {desc:"Custom 12-Seater Dining Table",unit:"Nos",qty:1,rate:500000},
        {desc:"Dining Chairs (×12)",unit:"Nos",qty:12,rate:25000},
        {desc:"Bar Unit & Display Cabinet",unit:"Sqft",qty:100,rate:3500},
        {desc:"Feature Ceiling + Pendant Lights",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Kitchen (Wet + Dry)", items:[
        {desc:"Premium Modular Kitchen (full)",unit:"Lump",qty:1,rate:1800000},
        {desc:"Imported Stone Platform",unit:"Sqft",qty:150,rate:1800},
        {desc:"Premium Appliances (full set)",unit:"Lump",qty:1,rate:500000},
        {desc:"Dry Kitchen / Pantry",unit:"Lump",qty:1,rate:350000},
      ]},
      { room:"Master Bedroom Suite", items:[
        {desc:"Custom King Bed with Premium Headboard",unit:"Nos",qty:1,rate:450000},
        {desc:"Feature Backwall — Imported Stone",unit:"Sqft",qty:100,rate:4000},
        {desc:"Full Walk-in Wardrobe",unit:"Sqft",qty:180,rate:4500},
        {desc:"Master Dressing Area",unit:"Lump",qty:1,rate:200000},
        {desc:"Luxury En-suite Bathroom",unit:"Lump",qty:1,rate:600000},
      ]},
      { room:"Guest Bedrooms (×3)", items:[
        {desc:"Premium Beds + Headboards (×3)",unit:"Nos",qty:3,rate:250000},
        {desc:"Wardrobes (×3)",unit:"Sqft",qty:300,rate:3500},
        {desc:"En-suite Bathrooms (×3)",unit:"Lump",qty:3,rate:300000},
      ]},
      { room:"Home Theatre", items:[
        {desc:"Acoustic Treatment & Panels",unit:"Lump",qty:1,rate:500000},
        {desc:"Premium Seating (recliner+sofa)",unit:"Lump",qty:1,rate:600000},
        {desc:"AV Equipment Zone",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Gym / Wellness Room", items:[
        {desc:"Flooring & Mirror Wall",unit:"Lump",qty:1,rate:200000},
        {desc:"Equipment Provision & Storage",unit:"Lump",qty:1,rate:150000},
      ]},
      { room:"Outdoor / Landscape", items:[
        {desc:"Swimming Pool Interior Design",unit:"Lump",qty:1,rate:500000},
        {desc:"Landscape & Garden Design",unit:"Lump",qty:1,rate:800000},
        {desc:"Outdoor Entertainment Area",unit:"Lump",qty:1,rate:600000},
        {desc:"Pergola / Gazebo / Cabana",unit:"Lump",qty:1,rate:500000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Full-home Painting & Textures",unit:"Lump",qty:1,rate:800000},
        {desc:"False Ceiling All Areas",unit:"Sqft",qty:5000,rate:400},
        {desc:"Premium Electrical & Lighting",unit:"Lump",qty:1,rate:2500000},
        {desc:"Smart Home Automation (full)",unit:"Lump",qty:1,rate:2000000},
        {desc:"Art, Accessories & Styling",unit:"Lump",qty:1,rate:800000},
      ]},
    ],
    "Farmhouse": [
      { room:"Entrance & Reception", items:[
        {desc:"Rustic Feature Wall (stone/wood)",unit:"Sqft",qty:200,rate:1400},
        {desc:"Foyer Flooring (natural stone)",unit:"Sqft",qty:250,rate:1000},
        {desc:"Entrance Canopy & Pergola",unit:"Lump",qty:1,rate:300000},
      ]},
      { room:"Living Area (open plan)", items:[
        {desc:"Feature Wall / Fireplace Design",unit:"Lump",qty:1,rate:400000},
        {desc:"Custom Sofa & Lounge Set",unit:"Lump",qty:1,rate:600000},
        {desc:"Exposed Beam Ceiling Treatment",unit:"Sqft",qty:800,rate:400},
        {desc:"Wooden Flooring",unit:"Sqft",qty:1200,rate:250},
      ]},
      { room:"Dining Area", items:[
        {desc:"Farmhouse Dining Table (10-seater)",unit:"Nos",qty:1,rate:280000},
        {desc:"Rustic Chairs (×10)",unit:"Nos",qty:10,rate:12000},
        {desc:"Bar Counter / Island",unit:"Rmt",qty:4,rate:40000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Farm-style Modular Kitchen",unit:"Lump",qty:1,rate:800000},
        {desc:"Marble/Stone Platform & Sink",unit:"Sqft",qty:80,rate:1000},
      ]},
      { room:"Bedrooms (×4)", items:[
        {desc:"Beds with Premium Headboards (×4)",unit:"Nos",qty:4,rate:150000},
        {desc:"Wardrobes & Storage (×4)",unit:"Sqft",qty:240,rate:2000},
        {desc:"En-suite Bathrooms (×4)",unit:"Lump",qty:4,rate:180000},
      ]},
      { room:"Outdoor & Garden", items:[
        {desc:"Swimming Pool Interior",unit:"Lump",qty:1,rate:400000},
        {desc:"Landscape & Garden",unit:"Lump",qty:1,rate:600000},
        {desc:"BBQ Area & Outdoor Kitchen",unit:"Lump",qty:1,rate:300000},
        {desc:"Seating Pavilion",unit:"Lump",qty:1,rate:400000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Natural Textures",unit:"Lump",qty:1,rate:600000},
        {desc:"Electrical & Ambient Lighting",unit:"Lump",qty:1,rate:1200000},
        {desc:"Artefacts & Rustic Accessories",unit:"Lump",qty:1,rate:400000},
      ]},
    ],
    "Studio Apartment": [
      { room:"Living / Sleeping Zone", items:[
        {desc:"Murphy Bed / Convertible Bed",unit:"Nos",qty:1,rate:120000},
        {desc:"Sofa-Cum-Bed",unit:"Nos",qty:1,rate:80000},
        {desc:"TV Unit with Storage Wall",unit:"Sqft",qty:60,rate:1200},
        {desc:"Feature Wall / Accent Wall",unit:"Sqft",qty:80,rate:350},
      ]},
      { room:"Kitchen Counter", items:[
        {desc:"Compact Kitchen with Overhead",unit:"Lump",qty:1,rate:180000},
        {desc:"Platform & Backsplash",unit:"Sqft",qty:20,rate:700},
      ]},
      { room:"Bathroom", items:[
        {desc:"Tile Work & Sanitary",unit:"Lump",qty:1,rate:60000},
        {desc:"Accessories & Mirror",unit:"Lump",qty:1,rate:15000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Polishing",unit:"Lump",qty:1,rate:25000},
        {desc:"False Ceiling",unit:"Sqft",qty:450,rate:120},
        {desc:"Electrical & Lighting",unit:"Lump",qty:1,rate:60000},
        {desc:"Curtains & Blinds",unit:"Lump",qty:1,rate:30000},
      ]},
    ],
  },
  Commercial: {
    "Office (Small — up to 50 seats)": [
      { room:"Reception & Lobby", items:[
        {desc:"Reception Counter (custom)",unit:"Nos",qty:1,rate:140000},
        {desc:"Brand Feature Wall",unit:"Sqft",qty:120,rate:1800},
        {desc:"Lobby Flooring — Vitrified",unit:"Sqft",qty:400,rate:220},
        {desc:"False Ceiling + Lighting",unit:"Sqft",qty:400,rate:280},
        {desc:"Waiting Seating Area",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Open Workstations", items:[
        {desc:"Modular Workstations (per seat)",unit:"Nos",qty:35,rate:20000},
        {desc:"Storage Overhead Cabinets",unit:"Nos",qty:15,rate:7500},
        {desc:"Carpet Tile Flooring",unit:"Sqft",qty:1800,rate:110},
        {desc:"False Ceiling (grid)",unit:"Sqft",qty:1800,rate:170},
      ]},
      { room:"Cabin (Manager/MD)", items:[
        {desc:"Executive Table & Storage",unit:"Nos",qty:2,rate:100000},
        {desc:"Visitor Chairs (×2 per cabin)",unit:"Nos",qty:4,rate:11000},
        {desc:"Cabin Partition — Glass & Frame",unit:"Sqft",qty:200,rate:1700},
      ]},
      { room:"Conference Room", items:[
        {desc:"Conference Table (8-seater)",unit:"Nos",qty:1,rate:150000},
        {desc:"Conference Chairs",unit:"Nos",qty:8,rate:14000},
        {desc:"Feature Wall & AV Zone",unit:"Sqft",qty:80,rate:2200},
      ]},
      { room:"Pantry", items:[
        {desc:"Pantry Counter & Storage",unit:"Rmt",qty:4,rate:16000},
        {desc:"Pantry Seating",unit:"Nos",qty:4,rate:8000},
      ]},
      { room:"Toilets", items:[
        {desc:"Tile Work",unit:"Sqft",qty:400,rate:160},
        {desc:"Sanitary & CP",unit:"Lump",qty:1,rate:80000},
        {desc:"Accessories & Mirror",unit:"Lump",qty:1,rate:25000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Polishing",unit:"Lump",qty:1,rate:80000},
        {desc:"Electrical & Office Lighting",unit:"Lump",qty:1,rate:250000},
        {desc:"AC Ducting & Diffusers",unit:"Lump",qty:1,rate:200000},
        {desc:"Fire Alarm & Safety",unit:"Lump",qty:1,rate:80000},
        {desc:"Signage & Branding",unit:"Lump",qty:1,rate:60000},
      ]},
    ],
    "Office (Large — 100+ seats)": [
      { room:"Grand Reception & Lobby", items:[
        {desc:"Premium Reception Counter",unit:"Nos",qty:1,rate:220000},
        {desc:"Brand Feature Wall / Backlit Logo",unit:"Sqft",qty:200,rate:2200},
        {desc:"Lobby Flooring Marble/Vitrified",unit:"Sqft",qty:800,rate:280},
        {desc:"False Ceiling — Designer",unit:"Sqft",qty:800,rate:350},
        {desc:"Waiting Lounge Area",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Open Workstations", items:[
        {desc:"Modular Workstations (per seat)",unit:"Nos",qty:80,rate:22000},
        {desc:"Storage Overhead Cabinets",unit:"Nos",qty:40,rate:8500},
        {desc:"Carpet Tile Flooring",unit:"Sqft",qty:5000,rate:120},
        {desc:"False Ceiling (grid/gypsum)",unit:"Sqft",qty:5000,rate:180},
      ]},
      { room:"MD / Director Cabins", items:[
        {desc:"Premium Executive Cabin (full)",unit:"Nos",qty:3,rate:250000},
        {desc:"Glass Partition Walls",unit:"Sqft",qty:600,rate:1900},
      ]},
      { room:"Conference Rooms (×2)", items:[
        {desc:"Conference Tables (12-seater)",unit:"Nos",qty:2,rate:200000},
        {desc:"Conference Chairs",unit:"Nos",qty:24,rate:15000},
        {desc:"AV Walls & Acoustics",unit:"Lump",qty:2,rate:150000},
      ]},
      { room:"Cafeteria / Pantry", items:[
        {desc:"Cafeteria Seating (×30)",unit:"Nos",qty:30,rate:12000},
        {desc:"Counter & Bar",unit:"Rmt",qty:8,rate:20000},
        {desc:"Pantry Units",unit:"Nos",qty:3,rate:18000},
      ]},
      { room:"Toilets (Gents + Ladies)", items:[
        {desc:"Tile Work All Toilets",unit:"Sqft",qty:900,rate:180},
        {desc:"Sanitary & CP Fittings",unit:"Lump",qty:1,rate:200000},
        {desc:"Mirrors & Accessories",unit:"Lump",qty:1,rate:60000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Polishing",unit:"Lump",qty:1,rate:200000},
        {desc:"Electrical & Office Lighting",unit:"Lump",qty:1,rate:700000},
        {desc:"AC Ducting System",unit:"Lump",qty:1,rate:600000},
        {desc:"Fire Safety & Alarms",unit:"Lump",qty:1,rate:200000},
        {desc:"Networking / Data Points",unit:"Lump",qty:1,rate:200000},
        {desc:"Signage & Wayfinding",unit:"Lump",qty:1,rate:120000},
      ]},
    ],
    "Co-working Space": [
      { room:"Reception & Lounge", items:[
        {desc:"Custom Reception Counter",unit:"Nos",qty:1,rate:180000},
        {desc:"Brand Feature Wall",unit:"Sqft",qty:200,rate:1800},
        {desc:"Lounge Seating",unit:"Lump",qty:1,rate:200000},
        {desc:"Phone Booth (×2)",unit:"Nos",qty:2,rate:80000},
      ]},
      { room:"Open Workspace", items:[
        {desc:"Hot Desking Tables",unit:"Nos",qty:50,rate:12000},
        {desc:"Ergonomic Chairs",unit:"Nos",qty:50,rate:8000},
        {desc:"Storage Lockers",unit:"Nos",qty:40,rate:6000},
        {desc:"Carpet Tiles",unit:"Sqft",qty:4000,rate:120},
      ]},
      { room:"Private Cabins", items:[
        {desc:"Glass Cabin Partitions",unit:"Sqft",qty:600,rate:1800},
        {desc:"Cabin Tables & Storage",unit:"Nos",qty:6,rate:80000},
      ]},
      { room:"Meeting Rooms (×3)", items:[
        {desc:"Meeting Tables (6-seater)",unit:"Nos",qty:3,rate:120000},
        {desc:"Meeting Chairs",unit:"Nos",qty:18,rate:12000},
        {desc:"Glass Partition Walls",unit:"Sqft",qty:400,rate:1800},
      ]},
      { room:"Breakout & Pantry", items:[
        {desc:"Pantry Counter & Bar",unit:"Rmt",qty:6,rate:20000},
        {desc:"Bar Stools",unit:"Nos",qty:10,rate:8000},
        {desc:"Bean Bags & Informal Seating",unit:"Nos",qty:8,rate:12000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Vinyl/Graphic Branding",unit:"Sqft",qty:200,rate:300},
        {desc:"Electrical & LED Lighting",unit:"Lump",qty:1,rate:500000},
        {desc:"Networking / Data Points",unit:"Lump",qty:1,rate:150000},
        {desc:"Painting & Finishes",unit:"Lump",qty:1,rate:200000},
      ]},
    ],
    "Showroom / Retail": [
      { room:"Facade & Entrance", items:[
        {desc:"Facade Cladding & Signage",unit:"Lump",qty:1,rate:400000},
        {desc:"Premium Entrance Doors (automatic)",unit:"Nos",qty:2,rate:150000},
        {desc:"Display Window Design",unit:"Sqft",qty:120,rate:2000},
      ]},
      { room:"Display Area", items:[
        {desc:"Product Display Shelving & Racks",unit:"Sqft",qty:300,rate:2500},
        {desc:"Feature Ceiling (design zones)",unit:"Sqft",qty:1500,rate:380},
        {desc:"Premium Flooring (marble/wood)",unit:"Sqft",qty:1500,rate:350},
        {desc:"Track Lighting & Spotlights",unit:"Lump",qty:1,rate:500000},
      ]},
      { room:"Trial / Demo Rooms", items:[
        {desc:"Trial Room Partitions & Interiors",unit:"Nos",qty:4,rate:80000},
        {desc:"Mirrors & Lighting",unit:"Nos",qty:4,rate:25000},
      ]},
      { room:"Billing / Service Counter", items:[
        {desc:"Custom Billing Counter",unit:"Nos",qty:1,rate:180000},
        {desc:"Storage & Back Wall",unit:"Sqft",qty:60,rate:2000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Wall Painting & Brand Graphics",unit:"Lump",qty:1,rate:200000},
        {desc:"Electrical & Premium Lighting",unit:"Lump",qty:1,rate:800000},
        {desc:"AC & Ventilation",unit:"Lump",qty:1,rate:400000},
        {desc:"CCTV & Security",unit:"Lump",qty:1,rate:100000},
      ]},
    ],
    "Clinic / Medical": [
      { room:"Reception & Waiting", items:[
        {desc:"Reception Counter",unit:"Nos",qty:1,rate:160000},
        {desc:"Waiting Area Seating",unit:"Nos",qty:12,rate:8000},
        {desc:"Feature Wall & Branding",unit:"Sqft",qty:100,rate:1500},
        {desc:"Flooring — Antibacterial Vinyl",unit:"Sqft",qty:600,rate:180},
      ]},
      { room:"Consultation Rooms (×4)", items:[
        {desc:"Doctor's Table & Storage",unit:"Nos",qty:4,rate:80000},
        {desc:"Patient Chairs (×2 per room)",unit:"Nos",qty:8,rate:8000},
        {desc:"Partition Walls",unit:"Sqft",qty:400,rate:1600},
      ]},
      { room:"Treatment / Procedure Room", items:[
        {desc:"Medical-grade Flooring",unit:"Sqft",qty:300,rate:250},
        {desc:"Storage Cabinets (medical)",unit:"Nos",qty:4,rate:40000},
        {desc:"Washable Wall Finish",unit:"Sqft",qty:400,rate:200},
      ]},
      { room:"Pharmacy Counter", items:[
        {desc:"Pharmacy Storage Racks",unit:"Nos",qty:6,rate:25000},
        {desc:"Counter",unit:"Nos",qty:1,rate:100000},
      ]},
      { room:"Toilets", items:[
        {desc:"Tile Work & Sanitary",unit:"Lump",qty:1,rate:80000},
        {desc:"Accessibility Features (ramps/grab bars)",unit:"Lump",qty:1,rate:40000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting (washable/antibacterial)",unit:"Lump",qty:1,rate:100000},
        {desc:"Electrical & Medical Lighting",unit:"Lump",qty:1,rate:300000},
        {desc:"AC & Clean Air",unit:"Lump",qty:1,rate:350000},
        {desc:"Signage & Wayfinding",unit:"Lump",qty:1,rate:60000},
      ]},
    ],
    "Salon / Spa": [
      { room:"Reception & Waiting", items:[
        {desc:"Reception Counter (premium)",unit:"Nos",qty:1,rate:200000},
        {desc:"Waiting Lounge Seating",unit:"Lump",qty:1,rate:150000},
        {desc:"Feature Wall / Brand Wall",unit:"Sqft",qty:120,rate:2200},
        {desc:"Product Display Unit",unit:"Sqft",qty:40,rate:2500},
      ]},
      { room:"Salon Stations", items:[
        {desc:"Hair Styling Stations",unit:"Nos",qty:8,rate:50000},
        {desc:"Backwash Units",unit:"Nos",qty:3,rate:80000},
        {desc:"Styling Chairs",unit:"Nos",qty:8,rate:18000},
        {desc:"Mirror Lighting per Station",unit:"Nos",qty:8,rate:12000},
      ]},
      { room:"Spa Treatment Rooms", items:[
        {desc:"Spa Room Interior (each)",unit:"Nos",qty:4,rate:200000},
        {desc:"Treatment Beds",unit:"Nos",qty:4,rate:60000},
        {desc:"Ambient Lighting & Acoustics",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Nail Bar / Makeup Zone", items:[
        {desc:"Nail Bar Counter & Stations",unit:"Nos",qty:4,rate:40000},
        {desc:"Makeup Station Mirrors & Lighting",unit:"Nos",qty:2,rate:60000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Flooring (vinyl/wood)",unit:"Sqft",qty:1200,rate:200},
        {desc:"Ceiling Design & Ambient Lighting",unit:"Sqft",qty:1200,rate:350},
        {desc:"Electrical & Specialised Lighting",unit:"Lump",qty:1,rate:400000},
        {desc:"AC & Fragrance System",unit:"Lump",qty:1,rate:250000},
      ]},
    ],
    "Dance / Fitness Studio": [
      { room:"Reception & Lobby", items:[
        {desc:"Reception Desk & Branding",unit:"Nos",qty:1,rate:120000},
        {desc:"Waiting Seating",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Studio Floor", items:[
        {desc:"Sprung / Wooden Dance Floor",unit:"Sqft",qty:1200,rate:500},
        {desc:"Mirror Wall (full height)",unit:"Sqft",qty:400,rate:800},
        {desc:"Ballet Barre (wall-mounted)",unit:"Rmt",qty:20,rate:5000},
        {desc:"Sound Acoustic Panels",unit:"Sqft",qty:600,rate:600},
      ]},
      { room:"Change Rooms", items:[
        {desc:"Lockers & Benches",unit:"Nos",qty:20,rate:12000},
        {desc:"Shower & Toilet Block",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Brand Graphics",unit:"Lump",qty:1,rate:80000},
        {desc:"Electrical & Stage Lighting",unit:"Lump",qty:1,rate:300000},
        {desc:"AC & Ventilation",unit:"Lump",qty:1,rate:250000},
      ]},
    ],
  },
  Hospitality: {
    "Restaurant (Fine Dining)": [
      { room:"Facade & Entrance", items:[
        {desc:"Facade Cladding & Signage",unit:"Lump",qty:1,rate:300000},
        {desc:"Feature Entrance Canopy",unit:"Lump",qty:1,rate:150000},
        {desc:"Custom Entrance Door",unit:"Nos",qty:1,rate:100000},
      ]},
      { room:"Dining Area (AC)", items:[
        {desc:"Feature / Theme Wall",unit:"Sqft",qty:300,rate:2800},
        {desc:"Custom Booth Seating",unit:"Nos",qty:6,rate:60000},
        {desc:"Restaurant Chairs",unit:"Nos",qty:40,rate:9000},
        {desc:"Dining Tables (4-seater)",unit:"Nos",qty:10,rate:22000},
        {desc:"Bar Counter",unit:"Rmt",qty:6,rate:50000},
        {desc:"Feature Ceiling + Chandeliers",unit:"Sqft",qty:1200,rate:420},
        {desc:"Flooring — Stone/Marble",unit:"Sqft",qty:1200,rate:350},
      ]},
      { room:"Private Dining Room", items:[
        {desc:"Private Dining Interior",unit:"Sqft",qty:300,rate:3500},
        {desc:"Premium Table & Chairs",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Commercial Kitchen Equipment",unit:"Lump",qty:1,rate:1000000},
        {desc:"Kitchen Tiles & Platform",unit:"Sqft",qty:400,rate:280},
        {desc:"Exhaust & Ventilation",unit:"Lump",qty:1,rate:250000},
      ]},
      { room:"Washrooms", items:[
        {desc:"Premium Tile Work",unit:"Sqft",qty:500,rate:280},
        {desc:"Sanitary & CP (premium)",unit:"Lump",qty:1,rate:200000},
        {desc:"Mirrors, Accessories & Lighting",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Ambient Lighting & Feature Lights",unit:"Lump",qty:1,rate:500000},
        {desc:"Air Conditioning",unit:"Lump",qty:1,rate:600000},
        {desc:"Sound System",unit:"Lump",qty:1,rate:200000},
        {desc:"Branding & Signage",unit:"Lump",qty:1,rate:150000},
      ]},
    ],
    "Restaurant (Casual / Family)": [
      { room:"Facade & Entrance", items:[
        {desc:"Facade Signage & Lighting",unit:"Lump",qty:1,rate:150000},
        {desc:"Entrance Design",unit:"Lump",qty:1,rate:80000},
      ]},
      { room:"Dining Area", items:[
        {desc:"Theme / Feature Wall",unit:"Sqft",qty:250,rate:1800},
        {desc:"Restaurant Chairs",unit:"Nos",qty:50,rate:6000},
        {desc:"Dining Tables (4-seater)",unit:"Nos",qty:12,rate:14000},
        {desc:"Ceiling Design & Lighting",unit:"Sqft",qty:1200,rate:320},
        {desc:"Flooring — Tile/Wood",unit:"Sqft",qty:1200,rate:220},
      ]},
      { room:"Kitchen", items:[
        {desc:"Commercial Kitchen",unit:"Lump",qty:1,rate:700000},
        {desc:"Kitchen Tile & Platform",unit:"Sqft",qty:300,rate:200},
        {desc:"Exhaust System",unit:"Lump",qty:1,rate:180000},
      ]},
      { room:"Washrooms", items:[
        {desc:"Tile Work & Sanitary",unit:"Lump",qty:1,rate:120000},
        {desc:"Accessories & Mirror",unit:"Lump",qty:1,rate:40000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Ambient Lighting",unit:"Lump",qty:1,rate:300000},
        {desc:"Air Conditioning",unit:"Lump",qty:1,rate:400000},
        {desc:"Sound & Branding",unit:"Lump",qty:1,rate:120000},
      ]},
    ],
    "Café": [
      { room:"Facade & Entrance", items:[
        {desc:"Café Facade Design & Signage",unit:"Lump",qty:1,rate:150000},
        {desc:"Glass Entrance & Display Window",unit:"Sqft",qty:80,rate:1800},
      ]},
      { room:"Seating Area", items:[
        {desc:"Café Tables (2/4-seater)",unit:"Nos",qty:10,rate:12000},
        {desc:"Café Chairs",unit:"Nos",qty:30,rate:5000},
        {desc:"Sofa / Bench Seating",unit:"Nos",qty:4,rate:35000},
        {desc:"Feature Wall / Mural",unit:"Sqft",qty:200,rate:1500},
        {desc:"Ceiling Design & Lighting",unit:"Sqft",qty:600,rate:320},
        {desc:"Flooring (Wood/Tile)",unit:"Sqft",qty:600,rate:200},
      ]},
      { room:"Counter & Back Bar", items:[
        {desc:"Café Counter",unit:"Rmt",qty:5,rate:35000},
        {desc:"Back Bar Display Shelves",unit:"Sqft",qty:60,rate:2000},
        {desc:"Equipment Zone",unit:"Nos",qty:1,rate:50000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Ambient Lighting",unit:"Lump",qty:1,rate:200000},
        {desc:"Air Conditioning",unit:"Lump",qty:1,rate:250000},
        {desc:"Branding / Menu Boards",unit:"Lump",qty:1,rate:80000},
        {desc:"Planter Décor",unit:"Lump",qty:1,rate:50000},
      ]},
    ],
    "Bar / Lounge": [
      { room:"Entrance & Bar", items:[
        {desc:"Bar Counter — Custom Premium",unit:"Rmt",qty:8,rate:70000},
        {desc:"Back Bar Display & Shelving",unit:"Sqft",qty:100,rate:3000},
        {desc:"Bar Stools",unit:"Nos",qty:12,rate:12000},
        {desc:"Feature Ceiling (bar zone)",unit:"Sqft",qty:400,rate:500},
      ]},
      { room:"Lounge Seating", items:[
        {desc:"Premium Lounge Sofas",unit:"Nos",qty:6,rate:80000},
        {desc:"Low Tables",unit:"Nos",qty:6,rate:20000},
        {desc:"Feature Walls — Backlit",unit:"Sqft",qty:300,rate:2500},
        {desc:"Flooring (dark tone)",unit:"Sqft",qty:1000,rate:300},
      ]},
      { room:"Private Booths", items:[
        {desc:"Private Booth Seating (each)",unit:"Nos",qty:4,rate:100000},
        {desc:"Booth Lighting & Privacy Screen",unit:"Nos",qty:4,rate:40000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Atmosphere Lighting & Control",unit:"Lump",qty:1,rate:600000},
        {desc:"Sound System",unit:"Lump",qty:1,rate:300000},
        {desc:"AC & Ventilation",unit:"Lump",qty:1,rate:500000},
        {desc:"Signage & Branding",unit:"Lump",qty:1,rate:150000},
      ]},
    ],
    "Banquet Hall": [
      { room:"Grand Entrance & Foyer", items:[
        {desc:"Foyer Feature Wall & Cladding",unit:"Sqft",qty:300,rate:2000},
        {desc:"Foyer Flooring (marble)",unit:"Sqft",qty:500,rate:500},
        {desc:"Registration Counter",unit:"Nos",qty:1,rate:150000},
        {desc:"Feature Chandelier",unit:"Nos",qty:2,rate:300000},
      ]},
      { room:"Main Banquet Hall", items:[
        {desc:"Stage Design & Backdrop",unit:"Lump",qty:1,rate:500000},
        {desc:"Hall Flooring (marble/wood)",unit:"Sqft",qty:5000,rate:350},
        {desc:"Ceiling Design — Grand",unit:"Sqft",qty:5000,rate:600},
        {desc:"Banquet Chairs (×300)",unit:"Nos",qty:300,rate:3500},
        {desc:"Banquet Tables (×40)",unit:"Nos",qty:40,rate:25000},
        {desc:"Side Wall Treatment",unit:"Sqft",qty:800,rate:1500},
      ]},
      { room:"Pre-Function Area", items:[
        {desc:"Pre-function Interior Design",unit:"Sqft",qty:1000,rate:1800},
        {desc:"Lounge Seating Zones",unit:"Lump",qty:1,rate:400000},
      ]},
      { room:"Bridal Suite / VIP Room", items:[
        {desc:"Bridal Suite Interior",unit:"Sqft",qty:300,rate:4000},
        {desc:"Premium Furniture & Dressing",unit:"Lump",qty:1,rate:300000},
      ]},
      { room:"Kitchen", items:[
        {desc:"Commercial Banquet Kitchen",unit:"Lump",qty:1,rate:1500000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Full Hall Lighting (architectural)",unit:"Lump",qty:1,rate:2000000},
        {desc:"Sound & AV System",unit:"Lump",qty:1,rate:1000000},
        {desc:"AC & HVAC",unit:"Lump",qty:1,rate:2500000},
        {desc:"Toilets & Cloak Room",unit:"Lump",qty:1,rate:600000},
      ]},
    ],
    "3-Star Hotel": [
      { room:"Lobby & Reception", items:[
        {desc:"Reception Counter (custom)",unit:"Nos",qty:1,rate:300000},
        {desc:"Feature Wall / Brand Wall",unit:"Sqft",qty:300,rate:2500},
        {desc:"Lobby Seating Zones",unit:"Lump",qty:1,rate:400000},
        {desc:"Lobby Flooring",unit:"Sqft",qty:1000,rate:350},
        {desc:"False Ceiling + Feature Lighting",unit:"Sqft",qty:1000,rate:450},
      ]},
      { room:"Standard Guest Rooms (×30)", items:[
        {desc:"Bed + Headboard (per room)",unit:"Nos",qty:30,rate:80000},
        {desc:"Room Furniture Set (wardrobe/desk/chair)",unit:"Nos",qty:30,rate:60000},
        {desc:"Room Feature Wall",unit:"Sqft",qty:900,rate:1200},
        {desc:"Flooring — Carpet/Laminate",unit:"Sqft",qty:4500,rate:180},
        {desc:"Ceiling + Lighting per room",unit:"Sqft",qty:4500,rate:200},
      ]},
      { room:"Corridors", items:[
        {desc:"Corridor Feature Wall Treatment",unit:"Sqft",qty:800,rate:800},
        {desc:"Corridor Flooring",unit:"Sqft",qty:600,rate:200},
        {desc:"Corridor Ceiling & Lighting",unit:"Sqft",qty:600,rate:250},
      ]},
      { room:"Restaurant / F&B", items:[
        {desc:"F&B Area Full Interior",unit:"Sqft",qty:1200,rate:1500},
      ]},
      { room:"Bathrooms (×30)", items:[
        {desc:"Tile Work per bathroom",unit:"Sqft",qty:2400,rate:250},
        {desc:"Sanitary & CP per room",unit:"Nos",qty:30,rate:25000},
        {desc:"Mirrors, Glass & Accessories",unit:"Lump",qty:1,rate:200000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Polishing (full hotel)",unit:"Lump",qty:1,rate:600000},
        {desc:"Electrical & Lighting",unit:"Lump",qty:1,rate:1500000},
        {desc:"AC (rooms + common)",unit:"Lump",qty:1,rate:2000000},
        {desc:"Soft Furnishings (curtains/linen)",unit:"Lump",qty:1,rate:800000},
        {desc:"Signage & Wayfinding",unit:"Lump",qty:1,rate:200000},
      ]},
    ],
    "4-Star Hotel": [
      { room:"Lobby & Reception", items:[
        {desc:"Premium Reception Counter",unit:"Nos",qty:1,rate:500000},
        {desc:"Feature Wall / Backlit Stone",unit:"Sqft",qty:400,rate:3500},
        {desc:"Lobby Seating Zones",unit:"Lump",qty:1,rate:800000},
        {desc:"Marble Flooring",unit:"Sqft",qty:1500,rate:600},
        {desc:"Feature Ceiling + Chandelier",unit:"Sqft",qty:1500,rate:600},
      ]},
      { room:"Guest Rooms (×50)", items:[
        {desc:"Premium Bed + Headboard (per room)",unit:"Nos",qty:50,rate:150000},
        {desc:"Room Furniture Set",unit:"Nos",qty:50,rate:100000},
        {desc:"Feature Wall per room",unit:"Sqft",qty:2500,rate:2200},
        {desc:"Premium Flooring",unit:"Sqft",qty:7500,rate:350},
        {desc:"Ceiling Design",unit:"Sqft",qty:7500,rate:400},
      ]},
      { room:"Restaurant + Bar", items:[
        {desc:"Restaurant Full Interior",unit:"Sqft",qty:2000,rate:3000},
        {desc:"Bar Counter & Back Bar",unit:"Rmt",qty:8,rate:60000},
      ]},
      { room:"Spa & Gym", items:[
        {desc:"Spa Treatment Rooms (×4)",unit:"Nos",qty:4,rate:300000},
        {desc:"Gym Flooring & Equipment Zone",unit:"Sqft",qty:600,rate:600},
      ]},
      { room:"Bathrooms (×50)", items:[
        {desc:"Premium Stone Tile Work",unit:"Sqft",qty:5000,rate:500},
        {desc:"Sanitary & CP Fittings",unit:"Nos",qty:50,rate:50000},
        {desc:"Custom Vanity & Mirror",unit:"Nos",qty:50,rate:30000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Painting & Textures",unit:"Lump",qty:1,rate:1000000},
        {desc:"Premium Electrical & Lighting",unit:"Lump",qty:1,rate:3000000},
        {desc:"AC & HVAC",unit:"Lump",qty:1,rate:4000000},
        {desc:"Soft Furnishings",unit:"Lump",qty:1,rate:2000000},
        {desc:"Signage & Brand Standards",unit:"Lump",qty:1,rate:500000},
      ]},
    ],
    "5-Star Hotel": [
      { room:"Grand Lobby & Atrium", items:[
        {desc:"Feature Stone/Marble Flooring",unit:"Sqft",qty:2000,rate:800},
        {desc:"Custom Reception Counter",unit:"Nos",qty:1,rate:800000},
        {desc:"Grand Chandelier / Feature Ceiling",unit:"Lump",qty:1,rate:1500000},
        {desc:"Lobby Seating Areas (×3 zones)",unit:"Lump",qty:1,rate:1200000},
        {desc:"Lobby Feature Walls & Artwork",unit:"Sqft",qty:500,rate:4000},
      ]},
      { room:"Guest Suites (×50)", items:[
        {desc:"Premium Bed + Custom Headboard (per room)",unit:"Nos",qty:50,rate:200000},
        {desc:"Custom Furniture Set per Room",unit:"Nos",qty:50,rate:150000},
        {desc:"Feature Wall per Room",unit:"Sqft",qty:2500,rate:3500},
        {desc:"Premium Flooring per Room",unit:"Sqft",qty:8000,rate:500},
        {desc:"Custom Ceiling Design per Room",unit:"Sqft",qty:8000,rate:600},
      ]},
      { room:"Fine Dining Restaurant", items:[
        {desc:"Full Interior Design & FF&E",unit:"Sqft",qty:2000,rate:3500},
      ]},
      { room:"Lounge & Bar", items:[
        {desc:"Bar Counter & Back Bar",unit:"Rmt",qty:10,rate:80000},
        {desc:"Lounge Seating & Tables",unit:"Lump",qty:1,rate:1500000},
        {desc:"Feature Ceiling & Lighting",unit:"Sqft",qty:800,rate:800},
      ]},
      { room:"Spa & Wellness", items:[
        {desc:"Spa Reception & Waiting",unit:"Sqft",qty:300,rate:4000},
        {desc:"Treatment Rooms (×6)",unit:"Nos",qty:6,rate:250000},
        {desc:"Steam, Sauna & Jacuzzi Zone",unit:"Lump",qty:1,rate:2000000},
      ]},
      { room:"Banquet Hall", items:[
        {desc:"Grand Ballroom Interior",unit:"Sqft",qty:5000,rate:2000},
        {desc:"Pre-function Area",unit:"Sqft",qty:1000,rate:1500},
      ]},
      { room:"Premium Bathrooms (×50)", items:[
        {desc:"Marble/Stone Tile Work",unit:"Sqft",qty:5000,rate:800},
        {desc:"Premium Sanitary — Kohler/Grohe",unit:"Nos",qty:50,rate:80000},
        {desc:"Custom Vanity Mirrors & Lighting",unit:"Lump",qty:1,rate:500000},
      ]},
      { room:"Miscellaneous (FF&E, OS&E)", items:[
        {desc:"Soft Furnishings & Drapery",unit:"Lump",qty:1,rate:3000000},
        {desc:"Artwork & Décor",unit:"Lump",qty:1,rate:2000000},
        {desc:"Smart Room Technology",unit:"Lump",qty:1,rate:3000000},
        {desc:"Premium Electrical & Lighting",unit:"Lump",qty:1,rate:5000000},
        {desc:"Signage & Wayfinding",unit:"Lump",qty:1,rate:800000},
      ]},
    ],
    "Resort": [
      { room:"Arrival & Lobby", items:[
        {desc:"Open-Air Lobby Design",unit:"Sqft",qty:2000,rate:2500},
        {desc:"Feature Water Body / Landscape",unit:"Lump",qty:1,rate:2000000},
        {desc:"Reception Counter",unit:"Nos",qty:1,rate:600000},
      ]},
      { room:"Cottages / Villas (×20)", items:[
        {desc:"Cottage Interior (each)",unit:"Nos",qty:20,rate:400000},
        {desc:"Private Plunge Pool / Deck (each)",unit:"Nos",qty:10,rate:300000},
      ]},
      { room:"Resort Restaurant", items:[
        {desc:"Open-Air Restaurant Interior",unit:"Sqft",qty:2500,rate:2000},
      ]},
      { room:"Pool & Recreation", items:[
        {desc:"Pool Deck & Cabana Design",unit:"Lump",qty:1,rate:1500000},
        {desc:"Kids Area & Recreation Zone",unit:"Lump",qty:1,rate:800000},
      ]},
      { room:"Spa & Ayurveda", items:[
        {desc:"Spa Centre Interior",unit:"Sqft",qty:800,rate:5000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Landscape — Full Resort",unit:"Lump",qty:1,rate:5000000},
        {desc:"Electrical & Lighting (full resort)",unit:"Lump",qty:1,rate:5000000},
        {desc:"Wayfinding & Signage",unit:"Lump",qty:1,rate:500000},
      ]},
    ],
    "Food Court / Cloud Kitchen": [
      { room:"Common Seating Area", items:[
        {desc:"Food Court Seating",unit:"Nos",qty:80,rate:4000},
        {desc:"Tables",unit:"Nos",qty:20,rate:8000},
        {desc:"Ceiling Design & Zoning",unit:"Sqft",qty:2000,rate:280},
        {desc:"Flooring",unit:"Sqft",qty:2000,rate:180},
      ]},
      { room:"Individual Counters (×6)", items:[
        {desc:"Brand Counter Design (each)",unit:"Nos",qty:6,rate:150000},
        {desc:"Counter Display & Signage",unit:"Nos",qty:6,rate:50000},
      ]},
      { room:"Kitchen (Cloud)", items:[
        {desc:"Cloud Kitchen Setup",unit:"Nos",qty:4,rate:300000},
      ]},
      { room:"Miscellaneous", items:[
        {desc:"Common Area Lighting",unit:"Lump",qty:1,rate:400000},
        {desc:"AC & Ventilation",unit:"Lump",qty:1,rate:600000},
        {desc:"Signage & Branding",unit:"Lump",qty:1,rate:200000},
      ]},
    ],
  },
};

// ── PDF GENERATION UTILITY ────────────────────────────────────────────────────
function generatePDFHTML(p){
  const g=p.rooms?p.rooms.reduce((s,r)=>s+r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0),0):0;
  const df=Number(p.designFee||0);
  const d=g+df;
  const disc=d*(1-Number(p.discount||0)/100);
  const tax=disc*(Number(p.taxPct||18)/100);
  const final=disc+tax;
  const rows=p.rooms?p.rooms.map(r=>{
    const rt=r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0);
    if(rt===0)return "";
    const itemRows=r.items.filter(i=>i.include).map(it=>`<tr><td style="padding:5px 10px;color:#3D3530">${it.desc}</td><td style="text-align:center;padding:5px 10px;color:#6B7C8F">${it.unit}</td><td style="text-align:right;padding:5px 10px">${it.qty}</td><td style="text-align:right;padding:5px 10px">₹${it.rate.toLocaleString("en-IN")}</td><td style="text-align:right;padding:5px 10px;font-weight:600">₹${(it.qty*it.rate).toLocaleString("en-IN")}</td></tr>`).join("");
    return `<tr style="background:#0F1923"><td colspan="4" style="padding:7px 10px;font-weight:700;color:#E2B96F;font-size:12px">${r.room}</td><td style="text-align:right;padding:7px 10px;color:#E2B96F;font-weight:700">₹${rt.toLocaleString("en-IN")}</td></tr>${itemRows}`;
  }).join(""):[];
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quotation — ${p.client}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Trebuchet MS',sans-serif;background:#F8FAFC;color:#0F1923;font-size:13px}table{border-collapse:collapse;width:100%}td,th{border-bottom:0.5px solid rgba(15,25,35,0.10)}</style></head><body style="padding:32px">
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #C9A84C">
  <div><div style="font-size:22px;font-weight:700;color:#0F1923">Innovations Interiors</div><div style="font-size:11px;color:#6B7C8F;letter-spacing:0.15em;text-transform:uppercase">Interior Design Consultants · Pune</div></div>
  <div style="text-align:right"><div style="font-size:16px;font-weight:700;color:#C9A84C">INTERIOR DESIGN ESTIMATE</div><div style="font-size:11px;color:#6B7C8F">Date: ${p.date} · Valid: ${p.validDays} days</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;background:#EEF2F7;padding:14px;border-radius:6px">
  <div><div style="font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Client</div><div style="font-size:15px;font-weight:700">${p.client}</div>${p.address?`<div style="font-size:12px;color:#6B7C8F">${p.address}</div>`:""}${p.phone?`<div style="font-size:12px;color:#6B7C8F">📱 ${p.phone}</div>`:""}</div>
  <div><div style="font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Project</div><div style="font-size:14px;font-weight:700">${p.projectType}</div><div style="font-size:12px;color:#6B7C8F">${p.sector}</div>${p.designer?`<div style="font-size:12px;color:#6B7C8F">Designer: ${p.designer}</div>`:""}</div>
</div>
<table style="margin-bottom:20px"><thead><tr style="background:#0F1923"><th style="padding:8px 10px;text-align:left;color:#E2B96F;font-size:10px;text-transform:uppercase;letter-spacing:0.08em">Description</th><th style="padding:8px 10px;text-align:center;color:#E2B96F;font-size:10px;text-transform:uppercase">Unit</th><th style="padding:8px 10px;text-align:right;color:#E2B96F;font-size:10px;text-transform:uppercase">Qty</th><th style="padding:8px 10px;text-align:right;color:#E2B96F;font-size:10px;text-transform:uppercase">Rate (₹)</th><th style="padding:8px 10px;text-align:right;color:#E2B96F;font-size:10px;text-transform:uppercase">Amount (₹)</th></tr></thead><tbody>${rows}</tbody></table>
<div style="margin-left:auto;width:300px">
  ${[["Work Sub-Total","₹"+g.toLocaleString("en-IN")],["Design & Coordination Fee","₹"+df.toLocaleString("en-IN")],p.discount>0?["Discount ("+p.discount+"%)","−₹"+(d-disc).toLocaleString("en-IN")]:null,["GST "+p.taxPct+"%","₹"+Math.round(tax).toLocaleString("en-IN")]].filter(Boolean).map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:5px 10px;background:#EEF2F7;margin-bottom:2px"><span style="font-size:12px;color:#6B7C8F">${k}</span><span style="font-weight:600">${v}</span></div>`).join("")}
  <div style="display:flex;justify-content:space-between;padding:10px 12px;background:#0F1923;border-radius:4px;margin-top:4px"><span style="font-weight:700;color:#fff;font-size:13px">GRAND TOTAL</span><span style="font-weight:700;color:#E2B96F;font-size:16px">₹${Math.round(final).toLocaleString("en-IN")}</span></div>
</div>
${p.notes?`<div style="margin-top:20px;padding:12px;background:#FDF3DC;border-radius:4px;font-size:11px;color:#6B7C8F"><strong>Note:</strong> ${p.notes}</div>`:""}
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #DDE4EE;font-size:11px;color:#6B7C8F;text-align:center">Innovations Interiors · Pune · Interior Design Consultants · Above rates are indicative and subject to final measurements & material selection.</div>
</body></html>`;
}

// ── UNIVERSAL DOWNLOAD HELPER ─────────────────────────────────────────────────
function downloadBlobFile(content, filename, type="text/html;charset=utf-8"){
  try{
    const blob=new Blob([content],{type});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=filename; a.style.display="none";
    document.body.appendChild(a); a.click();
    setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},1500);
    return true;
  }catch(e){
    // Final fallback — data URI
    try{
      const a=document.createElement("a");
      a.href="data:"+type+","+encodeURIComponent(content);
      a.download=filename; a.style.display="none";
      document.body.appendChild(a); a.click();
      setTimeout(()=>document.body.removeChild(a),1500);
    }catch(e2){}
    return false;
  }
}

function printAndSharePDF(p){
  const html=generatePDFHTML(p);
  const clientName=(p.client||"quotation").replace(/[^a-zA-Z0-9]/g,"_");
  const filename="II_Quotation_"+clientName+"_"+new Date().toISOString().split("T")[0]+".html";
  const ok=downloadBlobFile(html,filename);
  if(!ok) alert("Download started. Open the .html file in your browser and use Ctrl+P (or Cmd+P) to save as PDF.");
}

function shareViaWhatsApp(p){
  const g=p.rooms?p.rooms.reduce((s,r)=>s+r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0),0):0;
  const df=Number(p.designFee||0); const d=g+df;
  const disc=d*(1-Number(p.discount||0)/100);
  const final=disc*(1+Number(p.taxPct||18)/100);
  const msg="*INNOVATIONS INTERIORS*\n_Interior Design Estimate_\n\n*Client:* "+p.client+"\n*Project:* "+p.projectType+(p.address?"\n*Address:* "+p.address:"")+"\n*Date:* "+p.date+" | *Valid:* "+p.validDays+" days\n\n*ROOM-WISE SUMMARY:*\n"+(p.rooms||[]).map(r=>{const t=r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0);return t>0?"▸ "+r.room+": *₹"+t.toLocaleString("en-IN")+"*":""}).filter(Boolean).join("\n")+"\n\n━━━━━━━━━━━━━━\nWork Sub-Total: ₹"+g.toLocaleString("en-IN")+"\nDesign Fee: ₹"+df.toLocaleString("en-IN")+(p.discount>0?"\nDiscount ("+p.discount+"%): −₹"+(d-disc).toLocaleString("en-IN"):"")+"\nGST "+p.taxPct+"%: ₹"+Math.round(disc*(Number(p.taxPct)||18)/100).toLocaleString("en-IN")+"\n\n*GRAND TOTAL: ₹"+Math.round(final).toLocaleString("en-IN")+"*\n━━━━━━━━━━━━━━\n\n_"+(p.notes||"")+"_\n\n— "+(p.designer||"Innovations Interiors")+"\n*Innovations Interiors, Pune*";
  let phone=(p.phone||"").replace(/\D/g,"");
  if(!phone){ phone=prompt("Enter client WhatsApp number (10 digits):")||""; }
  if(phone){
    const num=phone.startsWith("91")?phone:"91"+phone;
    const url="https://wa.me/"+num+"?text="+encodeURIComponent(msg);
    try{ window.open(url,"_blank"); }
    catch(e){
      // Sandbox fallback — copy to clipboard
      try{ navigator.clipboard.writeText(msg).then(()=>alert("WhatsApp message copied to clipboard!\nPaste it in WhatsApp to "+phone)); }
      catch(e2){ alert("Copy this message:\n\n"+msg.slice(0,300)+"..."); }
    }
  } else {
    try{ navigator.clipboard.writeText(msg).then(()=>alert("Message copied to clipboard! Open WhatsApp and paste.")); }
    catch(e){ alert("No phone number provided. Message:\n\n"+msg.slice(0,200)+"..."); }
  }
}

function FollowUps({followups,setFollowups,projects}){
  const [showAdd,setShowAdd]=useState(false);
  const [newF,setNewF]=useState({client:"",phone:"",project:projects[0]?.name||"",type:"Payment Reminder",message:"",dueDate:"",status:"Pending"});

  const TYPES=["Payment Reminder","Approval Pending","Proposal Follow-up","Review Request","Site Update","General Follow-up"];

  function buildMessage(f){
    const msgs={
      "Payment Reminder":`Dear ${f.client||"Client"}, this is a reminder that your payment for project ${f.project} is due. Kindly process at the earliest. — Innovations Interiors`,
      "Approval Pending":`Dear ${f.client||"Client"}, your approval on the submitted drawings/design for ${f.project} is pending. Please review and revert. — Innovations Interiors`,
      "Proposal Follow-up":`Hi ${f.client||"Client"}, following up on our design proposal. Would love to discuss further and answer any questions. — Innovations Interiors`,
      "Review Request":`Dear ${f.client||"Client"}, we'd love to hear your feedback on your experience with Innovations Interiors. A quick Google review would mean the world to us! — Thank you`,
      "Site Update":`Hi ${f.client||"Client"}, sharing today's site update for project ${f.project}. Please feel free to call for any queries. — Innovations Interiors`,
      "General Follow-up":`Hi ${f.client||"Client"}, just checking in on ${f.project}. Let us know if you need anything. — Innovations Interiors`,
    };
    return msgs[f.type]||"";
  }

  function sendFU(fu){
    openWhatsApp(fu.phone, fu.message);
    setFollowups(fs=>fs.map(f=>f.id===fu.id?{...f,status:"Sent"}:f));
  }

  return <div>
    <Head title="📲 Client Follow-ups & Reminders" sub="Payment reminders · Approvals · Reviews · Proposals — sent via WhatsApp" action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ New Follow-up</Btn>}/>

    {showAdd&&<Card style={{marginBottom:"1rem",background:C.goldLight,border:`1px solid ${C.borderStrong}`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <Inp label="Client Name" value={newF.client} onChange={v=>{const u={...newF,client:v};setNewF({...u,message:buildMessage(u)});}}/>
        <Inp label="Client WhatsApp Number" value={newF.phone} onChange={v=>setNewF(d=>({...d,phone:v}))}/>
        <Sel label="Project" value={newF.project} onChange={v=>{const u={...newF,project:v};setNewF({...u,message:buildMessage(u)});}} options={[...projects.map(p=>p.name),"Proposal","General"]}/>
        <Sel label="Type" value={newF.type} onChange={v=>{const u={...newF,type:v};setNewF({...u,message:buildMessage(u)});}} options={TYPES}/>
        <Inp label="Due / Send Date" value={newF.dueDate} onChange={v=>setNewF(d=>({...d,dueDate:v}))} type="date"/>
      </div>
      <Inp label="Message (editable)" value={newF.message} onChange={v=>setNewF(d=>({...d,message:v}))} rows={4}/>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <Btn onClick={()=>{if(!newF.client||!newF.phone)return;setFollowups(fs=>[...fs,{...newF,id:Date.now()}]);setShowAdd(false);}}>Save</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </Card>}

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {followups.map(fu=><div key={fu.id} style={{background:"#fff",border:`0.5px solid ${fu.status==="Sent"?C.green:C.amber}44`,borderRadius:8,padding:"1rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{fu.client}</div>
            <div style={{fontSize:10,color:C.muted}}>{fu.type} · {fu.project} · Due {fu.dueDate}</div>
          </div>
          <Tag label={fu.status} color={fu.status==="Sent"?C.green:C.amber}/>
        </div>
        <div style={{fontSize:11,color:C.inkSoft,lineHeight:1.5,background:C.surface2,borderRadius:4,padding:"0.5rem 0.75rem",marginBottom:8}}>{fu.message}</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Btn sm v="wa" onClick={()=>sendFU(fu)}>📲 {fu.status==="Sent"?"Resend":"Send"} WhatsApp</Btn>
          <span style={{fontSize:10,color:C.muted}}>📱 {fu.phone}</span>
          <button onClick={()=>setFollowups(fs=>fs.filter(f=>f.id!==fu.id))} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:11}}>Remove</button>
        </div>
      </div>)}
    </div>
  </div>;
}

// ── MOM PDF GENERATOR ─────────────────────────────────────────────────────────
function generateMOMHTML(m){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>MOM — '+m.project+' — '+m.date+'</title>'
    +'<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Trebuchet MS,sans-serif;background:#F8FAFC;color:#0F1923;font-size:13px;padding:40px;line-height:1.7}'
    +'h1{font-size:20px;font-weight:700}h2{font-size:12px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:0.08em;margin:18px 0 6px;border-bottom:1px solid #C9A84C44;padding-bottom:3px}'
    +'.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#EEF2F7;padding:14px;border-radius:6px;margin:16px 0}'
    +'.kv{}.kl{font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px}.kv2{font-size:13px;font-weight:600}'
    +'.decision{padding:6px 10px;background:#E8F5E9;border-left:3px solid #2E7D32;margin-bottom:6px;border-radius:0 4px 4px 0;font-size:12px}'
    +'.action{display:flex;justify-content:space-between;padding:7px 10px;background:#FFF3E0;border-left:3px solid #E65100;margin-bottom:6px;border-radius:0 4px 4px 0;font-size:12px}'
    +'</style></head><body>'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:2px solid #C9A84C;margin-bottom:20px">'
    +'<div><h1>Innovations Interiors</h1><div style="font-size:11px;color:#6B7C8F;letter-spacing:0.1em;text-transform:uppercase">Minutes of Meeting</div></div>'
    +'<div style="text-align:right"><div style="font-size:15px;font-weight:700;color:#C9A84C">'+m.meetingType.toUpperCase()+'</div><div style="font-size:11px;color:#6B7C8F">'+m.date+' · '+m.time+'</div></div>'
    +'</div>'
    +'<div class="grid">'
    +'<div class="kv"><div class="kl">Project</div><div class="kv2">'+m.project+'</div></div>'
    +'<div class="kv"><div class="kl">Venue</div><div class="kv2">'+m.venue+'</div></div>'
    +'<div class="kv"><div class="kl">Chairperson</div><div class="kv2">'+m.chairperson+'</div></div>'
    +'<div class="kv"><div class="kl">Next Meeting</div><div class="kv2">'+(m.nextMeeting||'TBD')+'</div></div>'
    +'<div class="kv" style="grid-column:1/-1"><div class="kl">Attendees</div><div class="kv2">'+m.attendees+'</div></div>'
    +'</div>'
    +'<h2>Agenda</h2><p style="font-size:12px;color:#3D3530">'+m.agenda+'</p>'
    +'<h2>Discussion Summary</h2><p style="font-size:12px;color:#3D3530">'+m.discussion+'</p>'
    +'<h2>Decisions Taken</h2>'+(m.decisions||[]).map((d,i)=>'<div class="decision">'+( i+1)+'. '+d+'</div>').join('')
    +'<h2>Action Items</h2>'+(m.actionItems||[]).map(a=>'<div class="action"><span>'+a.task+'</span><span style="color:#E65100;font-weight:600;white-space:nowrap;margin-left:12px">'+a.assignee+' · '+a.due+'</span></div>').join('')
    +'<div style="margin-top:30px;padding-top:14px;border-top:1px solid #DDE4EE;font-size:11px;color:#6B7C8F;text-align:center">Innovations Interiors · Pune · This MOM is subject to confirmation by all attendees.</div>'
    +'</body></html>';
}

function buildMOMWhatsApp(m){
  return "*INNOVATIONS INTERIORS*\n*MINUTES OF MEETING*\n\n"
    +"*Project:* "+m.project+"\n*Date:* "+m.date+" | *Time:* "+m.time+"\n*Type:* "+m.meetingType+"\n*Venue:* "+m.venue+"\n*Chairperson:* "+m.chairperson+"\n*Attendees:* "+m.attendees+"\n\n"
    +"━━━━━━━━━━━━━━\n*AGENDA:*\n"+m.agenda+"\n\n"
    +"*DISCUSSION:*\n"+m.discussion+"\n\n"
    +"*DECISIONS:*\n"+(m.decisions||[]).map((d,i)=>(i+1)+". "+d).join("\n")+"\n\n"
    +"*ACTION ITEMS:*\n"+(m.actionItems||[]).map(a=>"▸ "+a.task+" → "+a.assignee+" (by "+a.due+")").join("\n")+"\n\n"
    +"*Next Meeting:* "+(m.nextMeeting||"TBD")+"\n"
    +"━━━━━━━━━━━━━━\n_— Innovations Interiors, Pune_";
}

// ── PROJECT TABS (Tasks + Site Reports + MOM) ────────────────────────────────
function ProjectTabs({p,ptasks,preports,pmoms,setMoms,projects,setProjects}){
  const [tab,setTab]=useState("tasks");
  const [showMOMForm,setShowMOMForm]=useState(false);
  const [newAI,setNewAI]=useState("");
  const [aiLoading,setAiLoading]=useState(false);

  const emptyMOM={project:p.name,date:new Date().toISOString().split("T")[0],time:"10:00",meetingType:"Design Review",venue:"Office",attendees:"",chairperson:"",agenda:"",discussion:"",decisions:[""],actionItems:[{task:"",assignee:"",due:""}],nextMeeting:"",sharedWithClient:false};
  const [newMOM,setNewMOM]=useState(emptyMOM);

  const MOM_TYPES=["Design Review","Client Approval","Site Meeting","Kick-off Meeting","Vendor Meeting","Progress Review","Handover Meeting","Other"];
  const inp={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",outline:"none",width:"100%"};

  async function generateMOMWithAI(){
    if(!newMOM.agenda){alert("Enter the meeting agenda first.");return;}
    setAiLoading(true);
    const prompt="Generate a professional Minutes of Meeting for an interior design project.\n\nProject: "+p.name+"\nDate: "+newMOM.date+"\nMeeting Type: "+newMOM.meetingType+"\nAgenda: "+newMOM.agenda+"\nAttendees: "+newMOM.attendees+"\n\nGenerate:\n1. DISCUSSION SUMMARY (3-4 sentences, professional)\n2. DECISIONS (3-4 clear decisions as bullet points starting with action verbs)\n3. ACTION ITEMS (3 items in format: Task | Assignee | Due Date)\n\nBe specific to interior design. Use professional language. Format clearly.";
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:prompt}]})});
      const d=await r.json();
      setNewAI(d.content?.[0]?.text||"");
    }catch{setNewAI("Connection error.");}
    setAiLoading(false);
  }

  function saveMOM(){
    if(!newMOM.agenda||!newMOM.attendees){alert("Please fill in Attendees and Agenda.");return;}
    const mom={...newMOM,id:Date.now(),aiGenerated:newAI,decisions:newMOM.decisions.filter(d=>d.trim()),actionItems:newMOM.actionItems.filter(a=>a.task.trim())};
    setMoms(ms=>[...ms,mom]);
    setShowMOMForm(false);
    setNewMOM(emptyMOM);
    setNewAI("");
  }

  function shareMOMWhatsApp(m){
    const proj=projects.find(x=>x.name===m.project);
    const phone=proj?.clientPhone||"";
    openWhatsApp(phone,buildMOMWhatsApp(m));
    setMoms(ms=>ms.map(x=>x.id===m.id?{...x,sharedWithClient:true}:x));
  }

  function downloadMOM(m){
    downloadBlobFile(generateMOMHTML(m),"II_MOM_"+m.project.replace(/[^a-zA-Z0-9]/g,"_")+"_"+m.date+".html");
  }

  const tabBtn=(id,label,count)=>(
    <button onClick={()=>setTab(id)} style={{padding:"6px 16px",borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(tab===id?C.gold:C.border),background:tab===id?C.gold:"#fff",color:tab===id?"#fff":C.muted,fontWeight:tab===id?700:400}}>
      {label} {count!==undefined&&<span style={{fontSize:10,marginLeft:4,opacity:0.8}}>({count})</span>}
    </button>
  );

  return <div>
    {/* Tab bar */}
    <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap"}}>
      {tabBtn("tasks","✅ Tasks",ptasks.length)}
      {tabBtn("reports","📍 Site Reports",preports.length)}
      {tabBtn("mom","📋 Minutes of Meeting",pmoms.length)}
    </div>

    {/* ── TASKS TAB ── */}
    {tab==="tasks"&&<Card>
      <div style={{fontSize:14,fontWeight:700,color:C.ink,marginBottom:12}}>Tasks for {p.name} ({ptasks.length})</div>
      {ptasks.length===0?<div style={{fontSize:12,color:C.muted,padding:"1rem",textAlign:"center"}}>No tasks logged for this project yet.</div>
      :ptasks.map(t=><div key={t.id} style={{paddingBottom:10,borderBottom:"0.5px solid "+C.border,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"flex-start"}}>
          <div style={{fontSize:12,fontWeight:600,color:C.ink,flex:1}}>{t.title}</div>
          <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:3,background:(t.status==="Overdue"?C.red:t.status==="Today"?C.amber:C.blue)+"18",color:t.status==="Overdue"?C.red:t.status==="Today"?C.amber:C.blue,whiteSpace:"nowrap"}}>{t.status}</span>
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>Assignee: {t.assignee} · Due: {t.due} · {t.priority} Priority</div>
      </div>)}
    </Card>}

    {/* ── SITE REPORTS TAB ── */}
    {tab==="reports"&&<div>
      {preports.length===0?<Card><div style={{fontSize:12,color:C.muted,padding:"1rem",textAlign:"center"}}>No site reports for this project yet.</div></Card>
      :preports.map(r=><Card key={r.id} style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{r.date}</div>
          <div style={{fontSize:11,color:C.muted}}>Supervisor: {r.supervisor} · {r.weather}</div>
        </div>
        <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.5,marginBottom:r.observations.length>0?8:0}}>{r.workDone}</div>
        {r.nextDay&&<div style={{fontSize:11,color:C.muted,marginBottom:r.observations.length>0?8:0}}>→ Next day: {r.nextDay}</div>}
        {r.photos&&r.photos.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          {r.photos.map((src,i)=><img key={i} src={src} alt={"site-"+i} style={{width:80,height:80,objectFit:"cover",borderRadius:4,border:"0.5px solid "+C.border}}/>)}
        </div>}
        {r.observations.map((obs,i)=><div key={i} style={{fontSize:10,padding:"3px 8px",borderRadius:3,marginBottom:4,background:obs.severity==="Action Required"?C.redLight:obs.severity==="Resolved"?C.greenLight:C.amberLight,color:obs.severity==="Action Required"?C.red:obs.severity==="Resolved"?C.green:C.amber}}>[{obs.category}] {obs.severity}: {obs.note}</div>)}
        {r.momNote&&<div style={{marginTop:8,padding:"8px 12px",background:C.blueLight,borderRadius:4,fontSize:12,color:C.blue}}><strong>📋 MOM Note:</strong> {r.momNote}</div>}
      </Card>)}
    </div>}

    {/* ── MOM TAB ── */}
    {tab==="mom"&&<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.ink}}>Minutes of Meeting — {p.name}</div>
        <Btn onClick={()=>setShowMOMForm(!showMOMForm)}>+ New MOM</Btn>
      </div>

      {/* MOM Form */}
      {showMOMForm&&<div style={{background:C.goldLight,border:"1px solid "+C.borderStrong,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>📋 New Minutes of Meeting</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
          {[["Meeting Date","date","date"],["Time","time","time"],["Venue","venue","text"],["Chairperson","chairperson","text"]].map(([l,k,t])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <input type={t} value={newMOM[k]} onChange={e=>setNewMOM(d=>({...d,[k]:e.target.value}))} style={inp}/></div>)}
          <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Meeting Type</div>
            <select value={newMOM.meetingType} onChange={e=>setNewMOM(d=>({...d,meetingType:e.target.value}))} style={inp}>
              {MOM_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
          <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Next Meeting Date</div>
            <input type="date" value={newMOM.nextMeeting} onChange={e=>setNewMOM(d=>({...d,nextMeeting:e.target.value}))} style={inp}/></div>
        </div>
        <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Attendees</div>
          <input value={newMOM.attendees} onChange={e=>setNewMOM(d=>({...d,attendees:e.target.value}))} placeholder="e.g. SOJWAL, Client Mr. Gosavi, PRAFUL" style={inp}/></div>
        <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Agenda</div>
          <textarea value={newMOM.agenda} onChange={e=>setNewMOM(d=>({...d,agenda:e.target.value}))} rows={2} placeholder="What was discussed in this meeting?" style={{...inp,resize:"vertical"}}/></div>
        <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Discussion Summary</div>
          <textarea value={newMOM.discussion} onChange={e=>setNewMOM(d=>({...d,discussion:e.target.value}))} rows={3} placeholder="Key points discussed..." style={{...inp,resize:"vertical"}}/></div>

        {/* Decisions */}
        <div style={{marginBottom:10}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Decisions Taken</div>
          {newMOM.decisions.map((dec,i)=><div key={i} style={{display:"flex",gap:6,marginBottom:6,alignItems:"center"}}>
            <span style={{fontSize:11,color:C.muted,width:20,flexShrink:0}}>{i+1}.</span>
            <input value={dec} onChange={e=>setNewMOM(d=>({...d,decisions:d.decisions.map((x,j)=>j===i?e.target.value:x)}))} placeholder={"Decision "+(i+1)+"..."} style={{...inp,flex:1}}/>
            {newMOM.decisions.length>1&&<button onClick={()=>setNewMOM(d=>({...d,decisions:d.decisions.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:14,flexShrink:0}}>✕</button>}
          </div>)}
          <button onClick={()=>setNewMOM(d=>({...d,decisions:[...d.decisions,""]}))} style={{fontSize:11,padding:"4px 10px",background:C.surface2,border:"0.5px solid "+C.border,borderRadius:4,cursor:"pointer",fontFamily:"inherit",color:C.muted}}>+ Add Decision</button>
        </div>

        {/* Action Items */}
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Action Items</div>
          {newMOM.actionItems.map((ai,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:6,marginBottom:6,alignItems:"center"}}>
            <input value={ai.task} onChange={e=>setNewMOM(d=>({...d,actionItems:d.actionItems.map((x,j)=>j===i?{...x,task:e.target.value}:x)}))} placeholder="Action item..." style={inp}/>
            <select value={ai.assignee} onChange={e=>setNewMOM(d=>({...d,actionItems:d.actionItems.map((x,j)=>j===i?{...x,assignee:e.target.value}:x)}))} style={inp}>
              <option value="">Assignee</option>
              {ALL_TEAM_MEMBERS.map(m=><option key={m.name}>{m.name}</option>)}
            </select>
            <input type="date" value={ai.due} onChange={e=>setNewMOM(d=>({...d,actionItems:d.actionItems.map((x,j)=>j===i?{...x,due:e.target.value}:x)}))} style={inp}/>
            {newMOM.actionItems.length>1&&<button onClick={()=>setNewMOM(d=>({...d,actionItems:d.actionItems.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:14}}>✕</button>}
          </div>)}
          <button onClick={()=>setNewMOM(d=>({...d,actionItems:[...d.actionItems,{task:"",assignee:"",due:""}]}))} style={{fontSize:11,padding:"4px 10px",background:C.surface2,border:"0.5px solid "+C.border,borderRadius:4,cursor:"pointer",fontFamily:"inherit",color:C.muted}}>+ Add Action Item</button>
        </div>

        {/* AI Generate */}
        <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:6,padding:"0.75rem",marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:600,color:C.ink,marginBottom:6}}>🤖 AI-Generate Discussion & Decisions</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={generateMOMWithAI} disabled={aiLoading} style={{padding:"6px 14px",background:C.purple,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer",opacity:aiLoading?0.6:1}}>
              {aiLoading?"Generating...":"🤖 Auto-Generate from Agenda"}
            </button>
            {newAI&&<button onClick={()=>{const lines=newAI.split("\n").filter(l=>l.trim());setNewMOM(d=>({...d,discussion:lines.slice(0,5).join(" "),decisions:lines.filter(l=>/^\d+\.|^-|^•/.test(l.trim())).map(l=>l.replace(/^\d+\.\s*|^[-•]\s*/,"")).filter(Boolean).slice(0,5)||d.decisions}));}} style={{padding:"6px 14px",background:C.green,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>Apply to Form</button>}
          </div>
          {newAI&&<div style={{marginTop:10,fontSize:12,color:C.inkSoft,lineHeight:1.6,whiteSpace:"pre-wrap",background:C.surface2,borderRadius:4,padding:"0.65rem",maxHeight:200,overflowY:"auto"}}>{newAI}</div>}
        </div>

        <div style={{display:"flex",gap:8}}>
          <Btn onClick={saveMOM}>💾 Save MOM</Btn>
          <Btn v="ghost" onClick={()=>{setShowMOMForm(false);setNewAI("");}}>Cancel</Btn>
        </div>
      </div>}

      {/* MOM List */}
      {pmoms.length===0&&!showMOMForm&&<Card><div style={{fontSize:12,color:C.muted,padding:"1rem",textAlign:"center"}}>No meetings recorded for this project. Click <strong>+ New MOM</strong> to add.</div></Card>}
      {pmoms.map(m=><Card key={m.id} style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.ink}}>{m.meetingType}</div>
            <div style={{fontSize:11,color:C.muted}}>{m.date} · {m.time} · {m.venue}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Chairperson: <strong>{m.chairperson}</strong> · Attendees: {m.attendees}</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
            {m.sharedWithClient&&<Tag label="Shared ✓" color={C.green}/>}
            {m.nextMeeting&&<Tag label={"Next: "+m.nextMeeting} color={C.amber}/>}
          </div>
        </div>

        {m.agenda&&<div style={{marginBottom:8}}><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>Agenda</div><div style={{fontSize:12,color:C.inkSoft}}>{m.agenda}</div></div>}
        {m.discussion&&<div style={{marginBottom:8}}><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>Discussion Summary</div><div style={{fontSize:12,color:C.inkSoft,lineHeight:1.6}}>{m.discussion}</div></div>}

        {m.decisions&&m.decisions.length>0&&<div style={{marginBottom:8}}>
          <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>Decisions Taken</div>
          {m.decisions.map((d,i)=><div key={i} style={{padding:"5px 10px",background:C.greenLight,borderLeft:"3px solid "+C.green,borderRadius:"0 4px 4px 0",marginBottom:4,fontSize:12,color:C.inkSoft}}>{i+1}. {d}</div>)}
        </div>}

        {m.actionItems&&m.actionItems.length>0&&<div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>Action Items</div>
          {m.actionItems.map((a,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 10px",background:C.amberLight,borderLeft:"3px solid "+C.amber,borderRadius:"0 4px 4px 0",marginBottom:4,fontSize:12}}>
            <span style={{color:C.inkSoft}}>{a.task}</span>
            <span style={{color:C.amber,fontWeight:600,whiteSpace:"nowrap",marginLeft:12}}>{a.assignee} · {a.due}</span>
          </div>)}
        </div>}

        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={()=>shareMOMWhatsApp(m)} style={{padding:"5px 12px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📲 Share MOM on WhatsApp</button>
          <button onClick={()=>downloadMOM(m)} style={{padding:"5px 12px",background:C.red,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📄 Download PDF</button>
          <button onClick={()=>{const msg=buildMOMWhatsApp(m);navigator.clipboard.writeText(msg).then(()=>alert("MOM copied to clipboard!"));}} style={{padding:"5px 12px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📋 Copy MOM</button>
          <button onClick={()=>setMoms(ms=>ms.filter(x=>x.id!==m.id))} style={{padding:"5px 10px",background:"none",border:"0.5px solid "+C.red+"44",color:C.red,borderRadius:4,fontSize:11,fontFamily:"inherit",cursor:"pointer",marginLeft:"auto"}}>🗑 Delete</button>
        </div>
      </Card>)}
    </div>}
  </div>;
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const INIT_MOMS=[
  {id:1,project:"GOSAVI",date:"2026-05-15",time:"11:00",meetingType:"Design Review",venue:"Site Office",attendees:"Sojwal, Client Mr. Gosavi, PRAFUL",chairperson:"SOJWAL",agenda:"Review living area false ceiling design, finalise marble pattern for entrance",discussion:"Client approved GI frame design. Requested additional LED cove in dining. Marble selected: Statuario White 2x2ft slabs.",decisions:["Proceed with GI false ceiling as per drawing rev-3","Add LED cove to dining — SOJWAL to revise drawing by 18 May","Marble: Statuario White confirmed — PRAFUL to order 200 sqft"],actionItems:[{task:"Revise false ceiling drawing to add dining cove",assignee:"SOJWAL",due:"2026-05-18"},{task:"Place marble order — Surya Marble",assignee:"PRAFUL",due:"2026-05-17"}],nextMeeting:"2026-05-28",sharedWithClient:true},
  {id:2,project:"JANJIRE",date:"2026-05-14",time:"15:00",meetingType:"Client Approval",venue:"Client's Office",attendees:"PREM, GAURI, Client Mr. & Mrs. Janjire",chairperson:"PREM",agenda:"3D render presentation, material board review, budget discussion",discussion:"Client loved the glass partition concept. Requested colour change — from grey to bronze tinted glass. Budget discussion — client agrees to revised estimate.","decisions":["Bronze tinted glass approved for all partitions","TV unit veneer changed from walnut to ash grey","Client to pay 2nd milestone advance before execution starts"],actionItems:[{task:"Update 3D with bronze tinted glass and ash grey veneer",assignee:"GAURI",due:"2026-05-19"},{task:"Send revised invoice for 2nd milestone",assignee:"PREM",due:"2026-05-16"}],nextMeeting:"2026-05-22",sharedWithClient:false},
];

function Projects({projects,tasks,siteReports,moms,setProjects,setMoms}){
  const [fStatus,setFS]=useState("ALL");
  const [fSector,setFSec]=useState("All");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [newP,setNewP]=useState({name:"",sr:"",jr:"",td:"",exec:"",sector:"Residential",status:"ACTIVE",progress:0,phase:"Briefing",notes:"",clientPhone:""});

  const statuses=["ALL","ON PRIORITY","ACTIVE","PASSIVE","HANDOVER","SITE MEASUREMENT"];
  const sectors=["All","Residential","Commercial","Hospitality"];
  const filtered=projects.filter(p=>{
    return (fStatus==="ALL"||p.status===fStatus)&&(fSector==="All"||p.sector===fSector)&&(p.name.toLowerCase().includes(search.toLowerCase())||p.sr.toLowerCase().includes(search.toLowerCase())||String(p.exec||"").toLowerCase().includes(search.toLowerCase()));
  });

  const phaseIdx=(phase)=>PHASES.indexOf(phase);

  if(selected){
    const p=projects.find(x=>x.id===selected);
    const ptasks=tasks.filter(t=>t.project===p.name);
    const preports=siteReports.filter(r=>r.project===p.name);
    const sc=SC[p.status]||{bg:C.surface2,text:C.muted};
    return <div>
      <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,marginBottom:"1rem",fontFamily:"inherit"}}>← Back to Projects</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.25rem"}}>
        <div>
          <div style={{fontSize:11,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Project #{p.id} · {p.sector}</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:C.ink,marginBottom:4}}>{p.name}</h2>
          {p.notes&&<div style={{fontSize:12,color:C.amber,fontWeight:600}}>📌 {p.notes}</div>}
        </div>
        <div style={{display:"flex",gap:8,flexDirection:"column",alignItems:"flex-end"}}>
          <Badge status={p.status}/>
          {p.clientPhone&&<Btn sm v="wa" onClick={()=>openWhatsApp(p.clientPhone,`Dear Client, here's a quick update on your project ${p.name}. Current phase: ${p.phase}. Progress: ${p.progress}%. Please feel free to reach us for any queries. — Innovations Interiors`)}>📲 WhatsApp Client</Btn>}
        </div>
      </div>

      {/* Completion Status Bar — FULL WIDTH PROMINENT */}
      <Card style={{marginBottom:"1rem",background:`linear-gradient(135deg, ${sc.bg}, #fff)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.ink}}>Project Completion</div>
            <div style={{fontSize:11,color:C.muted}}>Current Phase: <strong style={{color:sc.text}}>{p.phase}</strong></div>
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,fontWeight:700,color:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,lineHeight:1}}>{p.progress}%</div>
        </div>
        <div style={{height:14,background:C.surface3,borderRadius:14,overflow:"hidden",marginBottom:8}}>
          <div style={{height:"100%",width:`${p.progress}%`,background:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,borderRadius:14,transition:"width 0.6s",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:6}}>
            {p.progress>15&&<span style={{fontSize:9,color:"#fff",fontWeight:700}}>{p.progress}%</span>}
          </div>
        </div>
        {/* Phase Steps */}
        <div style={{display:"flex",gap:0,marginTop:12}}>
          {PHASES.map((ph,i)=>{
            const done=i<phaseIdx(p.phase);
            const active=ph===p.phase;
            return <div key={ph} style={{flex:1,textAlign:"center",position:"relative"}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:done?C.green:active?C.gold:C.surface3,border:`2px solid ${done?C.green:active?C.gold:C.surface3}`,margin:"0 auto 4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:done||active?"#fff":C.muted,fontWeight:700,position:"relative",zIndex:1}}>
                {done?"✓":i+1}
              </div>
              {i<PHASES.length-1&&<div style={{position:"absolute",top:11,left:"50%",width:"100%",height:2,background:done?C.green:C.surface3,zIndex:0}}/>}
              <div style={{fontSize:8,color:active?C.gold:done?C.green:C.muted,fontWeight:active?700:400,lineHeight:1.2}}>{ph}</div>
            </div>;
          })}
        </div>
        {/* Progress controls — slider + dropdown */}
        <div style={{marginTop:12}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:11,color:C.muted,flexShrink:0}}>Update progress:</span>
            <input type="range" min="0" max="100" step="5" value={p.progress}
              onChange={e=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,progress:Number(e.target.value)}:x))}
              style={{flex:1,accentColor:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,cursor:"pointer"}}/>
            <select value={p.progress}
              onChange={e=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,progress:Number(e.target.value)}:x))}
              style={{width:72,padding:"5px 6px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:13,fontFamily:"inherit",background:"#fff",color:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,fontWeight:700,outline:"none",cursor:"pointer"}}>
              {[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100].map(v=><option key={v} value={v}>{v}%</option>)}
            </select>
            <select value={p.phase} onChange={e=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,phase:e.target.value}:x))}
              style={{padding:"5px 8px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:11,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>
              {PHASES.map(ph=><option key={ph}>{ph}</option>)}
            </select>
          </div>
        </div>
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1rem"}}>
        {[["Senior Designer",p.sr,C.blue],["Junior Designer",p.jr||"—",C.muted],["3D Designer",p.td||"—","#4527A0"],["Execution Team",p.exec||"—",C.green]].map(([k,v,c])=><div key={k} style={{background:C.surface2,borderRadius:6,padding:"0.65rem 0.9rem"}}>
          <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{k}</div>
          <div style={{fontSize:13,fontWeight:700,color:c,marginTop:2}}>{v}</div>
        </div>)}
      </div>

      <ProjectTabs p={p} ptasks={ptasks} preports={preports} pmoms={moms.filter(m=>m.project===p.name)} setMoms={setMoms} projects={projects} setProjects={setProjects}/>
    </div>;
  }

  return <div>
    <Head title="All Projects" sub={`${projects.length} total · ${filtered.length} shown`} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Project</Btn>}/>

    {showAdd&&<Card style={{marginBottom:"1rem",background:C.goldLight,border:`1px solid ${C.borderStrong}`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <Inp label="Project / Client Name" value={newP.name} onChange={v=>setNewP(d=>({...d,name:v}))}/>
        <Inp label="Senior Designer" value={newP.sr} onChange={v=>setNewP(d=>({...d,sr:v}))}/>
        <Inp label="Junior Designer" value={newP.jr} onChange={v=>setNewP(d=>({...d,jr:v}))}/>
        <Inp label="3D Designer" value={newP.td} onChange={v=>setNewP(d=>({...d,td:v}))}/>
        <Inp label="Execution Team" value={newP.exec} onChange={v=>setNewP(d=>({...d,exec:v}))}/>
        <Inp label="Client WhatsApp" value={newP.clientPhone} onChange={v=>setNewP(d=>({...d,clientPhone:v}))}/>
        <Sel label="Sector" value={newP.sector} onChange={v=>setNewP(d=>({...d,sector:v}))} options={["Residential","Commercial","Hospitality"]}/>
        <Sel label="Status" value={newP.status} onChange={v=>setNewP(d=>({...d,status:v}))} options={["ON PRIORITY","ACTIVE","PASSIVE","HANDOVER","SITE MEASUREMENT"]}/>
        <Sel label="Current Phase" value={newP.phase} onChange={v=>setNewP(d=>({...d,phase:v}))} options={PHASES}/>
        <div>
          <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Progress (%)</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input type="range" min="0" max="100" step="5" value={newP.progress} onChange={e=>setNewP(d=>({...d,progress:Number(e.target.value)}))}
              style={{flex:1,accentColor:C.gold,cursor:"pointer"}}/>
            <select value={newP.progress} onChange={e=>setNewP(d=>({...d,progress:Number(e.target.value)}))}
              style={{width:70,padding:"5px 6px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:newP.progress>=80?C.green:newP.progress>=50?C.gold:C.amber,fontWeight:700,outline:"none"}}>
              {[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100].map(v=><option key={v} value={v}>{v}%</option>)}
            </select>
          </div>
          <div style={{height:6,background:C.surface3,borderRadius:6,overflow:"hidden",marginTop:4}}>
            <div style={{height:"100%",width:newP.progress+"%",background:newP.progress>=80?C.green:newP.progress>=50?C.gold:C.amber,borderRadius:6,transition:"width 0.2s"}}/>
          </div>
        </div>
        <Inp label="Notes" value={newP.notes} onChange={v=>setNewP(d=>({...d,notes:v}))}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={()=>{if(!newP.name)return;setProjects(ps=>[...ps,{...newP,id:Date.now()}]);setShowAdd(false);}}>Save Project</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </Card>}

    <div style={{display:"flex",gap:8,marginBottom:"0.75rem",flexWrap:"wrap",alignItems:"center"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search project, designer, execution team..."
        style={{padding:"6px 12px",border:`0.5px solid ${C.borderStrong}`,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,width:260,outline:"none"}}/>
      {statuses.map(s=><button key={s} onClick={()=>setFS(s)} style={{padding:"5px 11px",borderRadius:3,fontSize:10,fontFamily:"inherit",cursor:"pointer",border:`0.5px solid ${fStatus===s?C.gold:C.border}`,background:fStatus===s?C.gold:"#fff",color:fStatus===s?"#fff":C.muted,fontWeight:fStatus===s?700:400}}>
        {s} {s!=="ALL"&&`(${projects.filter(p=>p.status===s).length})`}
      </button>)}
      {sectors.map(s=><button key={s} onClick={()=>setFSec(s)} style={{padding:"5px 11px",borderRadius:3,fontSize:10,fontFamily:"inherit",cursor:"pointer",border:`0.5px solid ${fSector===s?C.blue:C.border}`,background:fSector===s?C.blue:"#fff",color:fSector===s?"#fff":C.muted}}>{s}</button>)}
    </div>

    {/* Table with progress bar column */}
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:C.surface2}}>
          {["#","Project","SR Designer","JR","3D","Execution","Sector","Status","Progress","Notes"].map(h=>
            <th key={h} style={{padding:"10px 11px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,fontWeight:700,borderBottom:`0.5px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map((p,i)=><tr key={p.id} onClick={()=>setSelected(p.id)} style={{borderBottom:`0.5px solid ${C.border}`,background:i%2===0?"#fff":C.surface,cursor:"pointer"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.goldLight}
            onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":C.surface}>
            <td style={{padding:"9px 11px",color:C.muted,fontWeight:600,fontSize:11}}>{p.id}</td>
            <td style={{padding:"9px 11px",fontWeight:700,color:C.ink}}>{p.name}</td>
            <td style={{padding:"9px 11px",color:C.blue,fontWeight:600}}>{p.sr}</td>
            <td style={{padding:"9px 11px",color:C.inkSoft}}>{p.jr||"—"}</td>
            <td style={{padding:"9px 11px",color:C.muted}}>{p.td||"—"}</td>
            <td style={{padding:"9px 11px",color:C.green,fontWeight:600}}>{p.exec||"—"}</td>
            <td style={{padding:"9px 11px"}}><Tag label={p.sector} color={C.blue}/></td>
            <td style={{padding:"9px 11px"}}><Badge status={p.status}/></td>
            <td style={{padding:"6px 11px",minWidth:160}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                <input type="range" min="0" max="100" step="5" value={p.progress}
                  onChange={e=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,progress:Number(e.target.value)}:x))}
                  style={{flex:1,accentColor:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,cursor:"pointer",height:4}}/>
                <select value={p.progress}
                  onChange={e=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,progress:Number(e.target.value)}:x))}
                  style={{width:58,padding:"2px 4px",border:"0.5px solid "+C.border,borderRadius:3,fontSize:11,fontFamily:"inherit",background:"#fff",color:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,fontWeight:700,outline:"none",cursor:"pointer"}}>
                  {[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100].map(v=><option key={v} value={v}>{v}%</option>)}
                </select>
              </div>
              <div style={{height:4,background:C.surface3,borderRadius:4,overflow:"hidden",marginTop:3}}>
                <div style={{height:"100%",width:p.progress+"%",background:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,borderRadius:4,transition:"width 0.25s"}}/>
              </div>
            </td>
            <td style={{padding:"9px 11px",color:C.amber,fontSize:10,maxWidth:140}}>{p.notes||""}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>
  </div>;
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
function Tasks({tasks,setTasks,projects}){
  const [filter,setFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [notifyTask,setNotifyTask]=useState(null);
  const [newT,setNewT]=useState({title:"",project:projects[0]?.name||"",assignee:ALL_TEAM_MEMBERS[0].name,due:"",priority:"High",type:"Design",status:"Pending",notified:false});

  const statuses=["All","Overdue","Today","Pending","Done"];
  const filtered=filter==="All"?tasks:tasks.filter(t=>t.status===filter);
  const tc={Overdue:C.red,Today:C.amber,Pending:C.blue,Done:C.green};

  return <div>
    {notifyTask&&<NotifyModal task={notifyTask} onClose={()=>setNotifyTask(null)}/>}
    <Head title="Task Management" sub={`${tasks.filter(t=>t.status==="Overdue").length} overdue · ${tasks.filter(t=>t.status==="Today").length} today · ${tasks.filter(t=>t.status==="Done").length} done`} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ New Task</Btn>}/>

    {showAdd&&<Card style={{marginBottom:"1rem",background:C.goldLight,border:`1px solid ${C.borderStrong}`}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <Inp label="Task Title" value={newT.title} onChange={v=>setNewT(d=>({...d,title:v}))}/>
        <Sel label="Project" value={newT.project} onChange={v=>setNewT(d=>({...d,project:v}))} options={projects.map(p=>p.name)}/>
        <Sel label="Assignee" value={newT.assignee} onChange={v=>setNewT(d=>({...d,assignee:v}))} options={ALL_TEAM_MEMBERS.map(m=>({value:m.name,label:`${m.name} (${m.role})`}))}/>
        <Inp label="Due Date" value={newT.due} onChange={v=>setNewT(d=>({...d,due:v}))} type="date"/>
        <Sel label="Priority" value={newT.priority} onChange={v=>setNewT(d=>({...d,priority:v}))} options={["High","Medium","Low"]}/>
        <Sel label="Type" value={newT.type} onChange={v=>setNewT(d=>({...d,type:v}))} options={["Design","Site","3D","Client Approval","Handover","Finance","Vendor"]}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={()=>{if(!newT.title)return;setTasks(ts=>[...ts,{...newT,id:Date.now()}]);setShowAdd(false);}}>Save Task</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </Card>}

    <div style={{display:"flex",gap:8,marginBottom:"0.75rem",flexWrap:"wrap"}}>
      {statuses.map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"5px 14px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:`0.5px solid ${filter===s?C.gold:C.border}`,background:filter===s?C.gold:"#fff",color:filter===s?"#fff":C.muted,fontWeight:filter===s?700:400}}>
        {s} {s!=="All"&&`(${tasks.filter(t=>t.status===s).length})`}
      </button>)}
    </div>

    {/* Bulk WhatsApp Actions */}
    <div style={{background:"#E8F5E9",border:"0.5px solid #2E7D3244",borderRadius:7,padding:"0.75rem 1rem",marginBottom:"1rem",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1A5C2E",flexShrink:0}}>📲 Bulk Notify:</div>
      <button onClick={()=>{
        const overdue=tasks.filter(t=>t.status==="Overdue");
        if(overdue.length===0){alert("No overdue tasks.");return;}
        if(!window.confirm("Send WhatsApp reminder to "+overdue.length+" assignees with overdue tasks?"))return;
        const grouped={};
        overdue.forEach(t=>{if(!grouped[t.assignee])grouped[t.assignee]=[];grouped[t.assignee].push(t);});
        Object.entries(grouped).forEach(([name,ts],i)=>{
          const member=ALL_TEAM_MEMBERS.find(m=>m.name===name);
          const msg="*INNOVATIONS INTERIORS — OVERDUE TASK ALERT*\n\nHi "+name+",\n\n⚠️ You have "+ts.length+" overdue task(s):\n\n"+ts.map(t=>"📋 "+t.title+"\n   Project: "+t.project+" | Due: "+t.due+" | Priority: "+t.priority).join("\n\n")+"\n\nPlease complete and update status immediately. Delays impact the project timeline.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(member?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:"#C62828",color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        🔴 Notify All Overdue ({tasks.filter(t=>t.status==="Overdue").length})
      </button>
      <button onClick={()=>{
        const todayT=tasks.filter(t=>t.status==="Today");
        if(todayT.length===0){alert("No tasks due today.");return;}
        if(!window.confirm("Send WhatsApp reminder to "+todayT.length+" assignees with today's tasks?"))return;
        const grouped={};
        todayT.forEach(t=>{if(!grouped[t.assignee])grouped[t.assignee]=[];grouped[t.assignee].push(t);});
        Object.entries(grouped).forEach(([name,ts],i)=>{
          const member=ALL_TEAM_MEMBERS.find(m=>m.name===name);
          const msg="*INNOVATIONS INTERIORS — TASK DUE TODAY*\n\nHi "+name+",\n\n📅 Task(s) due today:\n\n"+ts.map(t=>"📋 "+t.title+"\n   Project: "+t.project+" | Priority: "+t.priority).join("\n\n")+"\n\nPlease complete these by end of day.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(member?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:C.amber,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        ⏰ Notify Due Today ({tasks.filter(t=>t.status==="Today").length})
      </button>
      <button onClick={()=>{
        const filtered2=filter==="All"?tasks:tasks.filter(t=>t.status===filter);
        if(filtered2.length===0){alert("No tasks in current filter.");return;}
        const assignees=[...new Set(filtered2.map(t=>t.assignee))];
        if(!window.confirm("Send task status summary to "+assignees.length+" team members (current filter: "+filter+")?"))return;
        assignees.forEach((name,i)=>{
          const myTasks=filtered2.filter(t=>t.assignee===name);
          const member=ALL_TEAM_MEMBERS.find(m=>m.name===name);
          const msg="*INNOVATIONS INTERIORS — YOUR TASKS ("+(filter.toUpperCase())+")*\n\nHi "+name+",\n\n"+myTasks.map(t=>"📋 "+t.title+"\n   Project: "+t.project+" | Due: "+t.due+" | Status: "+t.status).join("\n\n")+"\n\nKindly review and update status.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(member?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:C.blue,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        📲 Notify Current Filter ({(filter==="All"?tasks:tasks.filter(t=>t.status===filter)).length})
      </button>
      <button onClick={()=>{
        if(!window.confirm("Send today's full task brief to all "+ALL_TEAM_MEMBERS.length+" team members?"))return;
        ALL_TEAM_MEMBERS.forEach((member,i)=>{
          const myTasks=tasks.filter(t=>t.assignee===member.name&&t.status!=="Done");
          if(myTasks.length===0)return;
          const msg="*INNOVATIONS INTERIORS — YOUR TASKS TODAY*\n\nHi "+member.name+",\n\nYour pending tasks:\n\n"+myTasks.map(t=>"📋 ["+t.status+"] "+t.title+"\n   Project: "+t.project+" | Due: "+t.due).join("\n\n")+"\n\nUpdate status by end of day. For help, contact your project lead.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(member.phone,msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        📣 Broadcast All Pending to Full Team
      </button>
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map(t=><Card key={t.id} style={{padding:"0.75rem 1rem"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <input type="checkbox" checked={t.status==="Done"} onChange={()=>setTasks(ts=>ts.map(x=>x.id===t.id?{...x,status:x.status==="Done"?"Pending":"Done"}:x))}
            style={{width:16,height:16,accentColor:C.gold,cursor:"pointer",flexShrink:0}}/>
          <div style={{flex:1,opacity:t.status==="Done"?0.45:1}}>
            <div style={{fontSize:13,fontWeight:600,color:C.ink,textDecoration:t.status==="Done"?"line-through":"none"}}>{t.title}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>
              <strong style={{color:C.blue}}>{t.assignee}</strong> · {t.project} · Due {t.due}
            </div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
            <Tag label={t.type} color={C.blue}/>
            <Tag label={t.priority} color={t.priority==="High"?C.red:t.priority==="Medium"?C.amber:C.green}/>
            <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:3,background:`${tc[t.status]||C.muted}18`,color:tc[t.status]||C.muted,whiteSpace:"nowrap"}}>{t.status}</span>
            {/* NOTIFY BUTTON */}
            <button onClick={()=>setNotifyTask(t)}
              style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:4,background:"#25D366",color:"#fff",border:"none",cursor:"pointer",fontSize:11,fontWeight:600}}>
              📲 Notify
            </button>
          </div>
        </div>
      </Card>)}
    </div>
  </div>;
}

// ── SITE REPORTS ──────────────────────────────────────────────────────────────
function SiteReports({reports,setReports,projects}){
  const [showAdd,setShowAdd]=useState(false);
  const [newR,setNewR]=useState({project:"GOSAVI",supervisor:"PRAFUL",date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().slice(0,5),weather:"Clear",workDone:"",nextDay:"",photos:[],momNote:""});
  const [obsText,setObsText]=useState("");
  const [obsSev,setObsSev]=useState("Minor");
  const [obsCategory,setObsCategory]=useState("Civil");
  const fileInputRef=useRef();
  const [previewPhotos,setPreviewPhotos]=useState([]);

  const activeP=projects.filter(p=>["ON PRIORITY","ACTIVE"].includes(p.status));

  function handleFileUpload(e){
    const files=Array.from(e.target.files);
    files.forEach(file=>{
      const reader=new FileReader();
      reader.onload=(ev)=>{
        setPreviewPhotos(prev=>[...prev,ev.target.result]);
        setNewR(d=>({...d,photos:[...d.photos,ev.target.result]}));
      };
      reader.readAsDataURL(file);
    });
  }

  function sendSiteReport(r){
    const proj=projects.find(p=>p.name===r.project);
    if(!proj?.clientPhone)return alert("No client phone for this project.");
    const obsText = r.observations.length>0 ? "*Observations:*\n"+r.observations.map(o=>"["+o.category+"] "+o.severity+": "+o.note).join("\n")+"\n\n" : "";
    const momText = r.momNote ? "*📋 MOM Note:*\n"+r.momNote+"\n\n" : "";
    const msg="📍 *Site Update — "+r.project+"*\nDate: "+r.date+"\nSupervisor: "+r.supervisor+"\nWeather: "+r.weather+"\n\n*Work Done:*\n"+r.workDone+"\n\n*Tomorrow's Plan:*\n"+(r.nextDay||"—")+"\n\n"+obsText+momText+"— Innovations Interiors";
    openWhatsApp(proj.clientPhone, msg);
  }

  return <div>
    <Head title="Site Execution Tracker" sub={`${reports.length} reports · ${activeP.length} active sites`} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ Log Site Report</Btn>}/>

    {showAdd&&<Card style={{marginBottom:"1rem",background:C.goldLight,border:`1px solid ${C.borderStrong}`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        {/* Project — dropdown of active projects */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Project</div>
          <select value={newR.project} onChange={e=>setNewR(d=>({...d,project:e.target.value}))}
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}>
            {activeP.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        {/* Supervisor — dropdown */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Supervisor</div>
          <select value={newR.supervisor} onChange={e=>setNewR(d=>({...d,supervisor:e.target.value}))}
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}>
            {ALL_TEAM_MEMBERS.filter(m=>m.dept==="Execution").map(m=><option key={m.name}>{m.name}</option>)}
          </select>
        </div>
        {/* Date — calendar picker */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📅 Date</div>
          <input type="date" value={newR.date} onChange={e=>setNewR(d=>({...d,date:e.target.value}))}
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}/>
        </div>
        {/* Time — clock picker */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>🕐 Time</div>
          <input type="time" value={newR.time} onChange={e=>setNewR(d=>({...d,time:e.target.value}))}
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}/>
        </div>
        {/* Weather */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Weather</div>
          <select value={newR.weather} onChange={e=>setNewR(d=>({...d,weather:e.target.value}))}
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}>
            {["Clear","Partly Cloudy","Cloudy","Rain","Heavy Rain"].map(w=><option key={w}>{w}</option>)}
          </select>
        </div>
        {/* Progress update for selected project */}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Update Progress %</div>
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            <input type="range" min="0" max="100" step="5"
              value={projects.find(p=>p.name===newR.project)?.progress||0}
              onChange={e=>{const pct=Number(e.target.value);setNewR(d=>({...d,_progress:pct}));}}
              style={{flex:1,accentColor:C.gold,cursor:"pointer"}}/>
            <select
              value={newR._progress||projects.find(p=>p.name===newR.project)?.progress||0}
              onChange={e=>setNewR(d=>({...d,_progress:Number(e.target.value)}))}
              style={{width:58,padding:"5px 4px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:11,fontFamily:"inherit",background:"#fff",color:C.gold,fontWeight:700,outline:"none"}}>
              {[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100].map(v=><option key={v} value={v}>{v}%</option>)}
            </select>
          </div>
          <div style={{height:4,background:C.surface3,borderRadius:4,overflow:"hidden",marginTop:4}}>
            <div style={{height:"100%",width:(newR._progress||projects.find(p=>p.name===newR.project)?.progress||0)+"%",background:C.gold,borderRadius:4,transition:"width 0.2s"}}/>
          </div>
        </div>
      </div>
      <div style={{marginBottom:10}}><Inp label="Work Done Today" value={newR.workDone} onChange={v=>setNewR(d=>({...d,workDone:v}))} rows={3} placeholder="Describe all work completed today..."/></div>
      <div style={{marginBottom:10}}><Inp label="Tomorrow's Plan" value={newR.nextDay} onChange={v=>setNewR(d=>({...d,nextDay:v}))} rows={2} placeholder="What will be done tomorrow..."/></div>

      {/* PHOTO UPLOAD */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>📸 Upload Site Photos</div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <button onClick={()=>fileInputRef.current.click()} style={{padding:"8px 16px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            📷 Choose Photos
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} style={{display:"none"}}/>
          <span style={{fontSize:11,color:C.muted}}>{previewPhotos.length} photo{previewPhotos.length!==1?"s":""} selected</span>
        </div>
        {previewPhotos.length>0&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
          {previewPhotos.map((src,i)=><div key={i} style={{position:"relative"}}>
            <img src={src} alt={`preview-${i}`} style={{width:80,height:80,objectFit:"cover",borderRadius:6,border:`0.5px solid ${C.border}`}}/>
            <button onClick={()=>{setPreviewPhotos(prev=>prev.filter((_,j)=>j!==i));setNewR(d=>({...d,photos:d.photos.filter((_,j)=>j!==i)}));}}
              style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:"50%",background:C.red,color:"#fff",border:"none",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
          </div>)}
        </div>}
      </div>

      {/* MOM NOTE */}
      <div style={{marginBottom:10}}>
        <Inp label="📋 MOM Note — Meeting discussed on site (optional)" value={newR.momNote} onChange={v=>setNewR(d=>({...d,momNote:v}))} rows={2} placeholder="e.g. Discussed flooring delay with client on site, agreed to extend by 3 days. Reference full MOM under project's MOM tab."/>
      </div>

      {/* Observation */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Observation / Punch List (optional)</div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8}}>
          <Inp label="Observation note" value={obsText} onChange={setObsText} placeholder="e.g. Exhaust duct misaligned in MBR bathroom"/>
          <Sel label="Category" value={obsCategory} onChange={setObsCategory} options={["Civil","MEP","Carpentry","Painting","Flooring","FF&E","Electrical","General"]}/>
          <Sel label="Severity" value={obsSev} onChange={setObsSev} options={["Action Required","Minor","Resolved"]}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={()=>{
          if(!newR.workDone)return;
          const obs=obsText?[{category:obsCategory,severity:obsSev,note:obsText}]:[];
          // Save report with form's date and time
          setReports(rs=>[...rs,{...newR,id:Date.now(),observations:obs}]);
          // If progress was updated, propagate to project
          if(newR._progress!==undefined){
            // Note: setProjects not available here — user updates in Projects tab
          }
          setNewR({project:newR.project,supervisor:newR.supervisor,date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().slice(0,5),weather:"Clear",workDone:"",nextDay:"",photos:[],momNote:""});
          setObsText("");setPreviewPhotos([]);setShowAdd(false);
        }}>Submit Report</Btn>
        <Btn v="ghost" onClick={()=>{setShowAdd(false);setPreviewPhotos([]);}}>Cancel</Btn>
      </div>
    </Card>}

    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {reports.map(r=><Card key={r.id}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.ink}}>{r.project}</div>
            <div style={{fontSize:11,color:C.muted}}>Supervisor: <strong>{r.supervisor}</strong> · 📅 {r.date}{r.time?" 🕐 "+r.time:""} · ☁ {r.weather}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <Tag label="SITE ACTIVE" color={C.green}/>
            <Btn sm v="wa" onClick={()=>sendSiteReport(r)}>📲 Send to Client</Btn>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:10}}>
          <div>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:C.muted,marginBottom:4}}>Work Done</div>
            <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.6}}>{r.workDone}</div>
          </div>
          <div>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:C.muted,marginBottom:4}}>Tomorrow's Plan</div>
            <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.6}}>{r.nextDay||"—"}</div>
          </div>
        </div>

        {/* Photos Grid */}
        {r.photos&&r.photos.length>0&&<div style={{marginBottom:10}}>
          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:C.muted,marginBottom:6}}>📸 Site Photos ({r.photos.length})</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {r.photos.map((src,i)=><img key={i} src={src} alt={`site-${i}`} style={{width:90,height:90,objectFit:"cover",borderRadius:6,border:`0.5px solid ${C.border}`}}/>)}
          </div>
        </div>}

        {r.observations.length>0&&<div>
          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:C.muted,marginBottom:6}}>Observations & Punch List</div>
          {r.observations.map((obs,i)=><div key={i} style={{padding:"6px 10px",borderRadius:4,marginBottom:4,fontSize:12,background:obs.severity==="Action Required"?C.redLight:obs.severity==="Resolved"?C.greenLight:C.amberLight,color:obs.severity==="Action Required"?C.red:obs.severity==="Resolved"?C.green:C.amber}}>
            <strong>[{obs.category}]</strong> {obs.severity} — {obs.note}
          </div>)}
        </div>}
      </Card>)}
    </div>
  </div>;
}

// ── TEAM ──────────────────────────────────────────────────────────────────────
function Team({projects}){
  const [view,setView]=useState("design");

  const IMRAN={
    name:"IMRAN SIR", role:"Business Development & HR Manager", dept:"Management",
    color:"#B8860B", initials:"IS", responsibilities:[
      "Lead pipeline management & qualification",
      "Client acquisition & first-contact follow-ups",
      "HR policies, onboarding & team discipline",
      "Performance review coordination",
      "Vendor & agency negotiations support",
      "Business development strategy",
    ]
  };

  const teamData=view==="design"?DESIGN_TEAM:EXECUTION_TEAM;

  return <div>
    <Head title="Team & Workload" sub={"Design team · Execution team · Management"}/>
    <div style={{display:"flex",gap:8,marginBottom:"1.5rem"}}>
      {[["design","🎨 Design Team"],["execution","🏗️ Execution Team"],["management","🎯 Management"]].map(([v,l])=>
        <button key={v} onClick={()=>setView(v)} style={{padding:"6px 18px",borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(view===v?C.gold:C.border),background:view===v?C.gold:"#fff",color:view===v?"#fff":C.muted,fontWeight:view===v?700:400}}>{l}</button>)}
    </div>

    {/* Management View — Imran Sir */}
    {view==="management"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:20}}>
        {/* Profile Card */}
        <div style={{background:"#fff",border:"2px solid "+C.gold,borderRadius:12,padding:"1.5rem",textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:C.gold+"22",border:"2px solid "+C.gold+"55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:C.gold,margin:"0 auto 12px"}}>IS</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:C.ink}}>IMRAN SIR</div>
          <div style={{fontSize:12,color:C.gold,fontWeight:600,marginTop:4}}>Business Development & HR Manager</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Innovations Interiors · Pune</div>
          <div style={{marginTop:16,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>openWhatsApp("917006875749","Hi Imran Sir, quick update from the CRM dashboard — Innovations Interiors.")} style={{fontSize:11,padding:"6px 14px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📲 WhatsApp</button>
          </div>
          <div style={{marginTop:16,padding:"0.75rem",background:C.goldLight,borderRadius:6,fontSize:11,color:C.inkSoft,textAlign:"left"}}>
            <div style={{fontWeight:700,color:C.gold,marginBottom:6,fontSize:12}}>📋 Responsibilities</div>
            {IMRAN.responsibilities.map((r,i)=><div key={i} style={{display:"flex",gap:6,marginBottom:4}}>
              <span style={{color:C.gold,flexShrink:0}}>▸</span><span>{r}</span>
            </div>)}
          </div>
        </div>

        {/* Metrics & Lead Pipeline */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* BD Metrics */}
          <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.ink,marginBottom:12}}>📊 Business Development Metrics</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {[["Total Leads Managed",5,C.gold,"🎯"],["Active Pipeline",4,C.blue,"💼"],["Won This Month",1,C.green,"✅"],["Follow-ups Pending",3,C.amber,"📲"]].map(([l,v,c,ic])=>
                <div key={l} style={{background:C.surface2,borderRadius:6,padding:"0.75rem",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{ic}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:c}}>{v}</div>
                  <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:2}}>{l}</div>
                </div>)}
            </div>
          </div>

          {/* HR Responsibilities */}
          <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.ink,marginBottom:12}}>👥 HR Management Scope</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {label:"Total Team Members",val:"19 (incl. Imran Sir)",color:C.gold},
                {label:"Design Team",val:"15 members",color:C.blue},
                {label:"Execution Team",val:"7 members",color:C.green},
                {label:"Performance Reviews",val:"Monthly",color:C.purple},
                {label:"Onboarding",val:"Active",color:C.teal},
                {label:"Reporting to",val:"Principal Designer",color:C.muted},
              ].map(({label,val,color})=><div key={label} style={{background:C.surface2,borderRadius:6,padding:"0.65rem 0.9rem"}}>
                <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:2}}>{label}</div>
                <div style={{fontSize:13,fontWeight:600,color}}>{val}</div>
              </div>)}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{background:C.goldLight,border:"0.5px solid "+C.borderStrong,borderRadius:8,padding:"1rem"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:10}}>⚡ Quick Actions for Imran Sir</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[
                {label:"📲 Send Lead Summary",msg:"Hi Imran Sir, here's today's lead pipeline summary from the CRM: 4 active leads, 3 follow-ups pending, 1 in negotiation stage. Please review and action. — Innovations Interiors CRM"},
                {label:"📲 Daily BD Brief",msg:"Good morning Imran Sir! Today's BD priorities: 1) Follow up with Prachi Desai (Penthouse - Negotiation) 2) Send proposal to Hotel Skyline 3) Check Nexus Fintech site visit schedule. — Innovations Interiors"},
                {label:"📲 Performance Alert",msg:"Hi Imran Sir, monthly performance review is due. Please schedule 1-on-1s with team members rated 'Needs Improvement'. — Innovations Interiors"},
              ].map(({label,msg})=><button key={label} onClick={()=>openWhatsApp("917006875749",msg)} style={{fontSize:11,padding:"6px 12px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{label}</button>)}
            </div>
          </div>
        </div>
      </div>
    </div>}

    {/* Design / Execution Team Grid */}
    {view!=="management"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
      {teamData.map(m=>{
        const mprojs=m.projects.map(pn=>projects.find(p=>p.name===pn)).filter(Boolean);
        const pc=mprojs.filter(p=>p?.status==="ON PRIORITY").length;
        const ac=mprojs.filter(p=>p?.status==="ACTIVE").length;
        const avgProgress=mprojs.length>0?Math.round(mprojs.reduce((s,p)=>s+(p?.progress||0),0)/mprojs.length):0;
        return <Card key={m.name}>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
            <Avatar initials={m.initials} color={m.color} size={46}/>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,color:C.ink}}>{m.name}</div>
              <div style={{fontSize:11,color:C.muted}}>{m.role}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:700,color:m.color}}>{m.projects.length}</div>
              <div style={{fontSize:9,color:C.muted,textTransform:"uppercase"}}>Projects</div>
            </div>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:3}}>
              <span>Avg project progress</span><span style={{fontWeight:700,color:m.color}}>{avgProgress}%</span>
            </div>
            <ProgressBar value={avgProgress} color={m.color}/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {pc>0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:C.redLight,color:C.red,fontWeight:700}}>🔴 {pc} Priority</span>}
            {ac>0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:C.blueLight,color:C.blue,fontWeight:700}}>● {ac} Active</span>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {m.projects.map(pname=>{
              const proj=projects.find(p=>p.name===pname);
              const sc2=SC[proj?.status]||{bg:C.surface2,text:C.muted};
              return <span key={pname} title={pname+": "+(proj?.progress||0)+"%"} style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:sc2.bg,color:sc2.text,fontWeight:600,cursor:"default"}}>{pname}</span>;
            })}
          </div>
        </Card>;
      })}
    </div>}
  </div>;
}

// ── AI PANEL ──────────────────────────────────────────────────────────────────
function AIPanel({projects,tasks,siteReports,proposals,leads,issues,finance,vendors,perf}){
  const [msgs,setMsgs]=useState([{role:"assistant",content:"👋 Hello! I'm your Innovations Interiors ERP Assistant — working fully offline with live data.\n\nI have complete context across all modules:\n📁 36 Projects · ✅ Tasks · 📍 Site Reports\n🎯 Leads · ⚠️ Issues · 💰 Finance\n🔧 Vendors · 📈 Performance · 👥 Team\n\nUse a quick prompt below or ask me anything!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);

  // ── OFFLINE AI ENGINE ─────────────────────────────────────────────────────
  function offlineAI(question){
    const q=question.toLowerCase();

    // ── Helpers ──
    const fmt=(n)=>Number(n||0).toLocaleString("en-IN");
    const fmtL=(n)=>"₹"+(Number(n||0)/100000).toFixed(2)+"L";
    const today=new Date();

    // Live data snapshots
    const priority=projects.filter(p=>p.status==="ON PRIORITY");
    const active=projects.filter(p=>p.status==="ACTIVE");
    const passive=projects.filter(p=>p.status==="PASSIVE");
    const handover=projects.filter(p=>p.status==="HANDOVER");
    const overdueTasks=tasks.filter(t=>t.status==="Overdue");
    const todayTasks=tasks.filter(t=>t.status==="Today");
    const pendingTasks=tasks.filter(t=>t.status==="Pending");
    const openIssues=(issues||[]).filter(i=>i.status!=="Resolved");
    const criticalIssues=openIssues.filter(i=>["Action Required","Critical"].includes(i.severity));
    const overdueInvoices=(finance||[]).filter(f=>f.status==="Overdue");
    const pendingInvoices=(finance||[]).filter(f=>f.status==="Pending");
    const totalOutstanding=overdueInvoices.concat(pendingInvoices).reduce((s,f)=>s+Number(f.amount||0),0);
    const activeLeads=(leads||[]).filter(l=>!["Won","Lost"].includes(l.stage));
    const negotiationLeads=(leads||[]).filter(l=>l.stage==="Negotiation");
    const warnVendors=(vendors||[]).filter(v=>v.status==="Warning");
    const lowPerf=(perf||[]).filter(p=>["Needs Improvement","Critical"].includes(p.rating));
    const topPerf=[...(perf||[])].sort((a,b)=>b.overallScore-a.overallScore).slice(0,3);
    const overloadedDesigners=DESIGN_TEAM.filter(m=>m.projects.length>=4);

    // ── DAILY BRIEF ──────────────────────────────────────────────────────────
    if(q.includes("daily brief")||q.includes("daily summary")||q.includes("today")||q.includes("morning")){
      const d=today.toDateString();
      let r="📊 DAILY ERP BRIEF — Innovations Interiors\n📅 "+d+"\n\n";
      r+="🏗️ PROJECT STATUS\n";
      r+="• ON PRIORITY: "+priority.length+" projects\n";
      r+="• ACTIVE: "+active.length+" | PASSIVE: "+passive.length+" | HANDOVER: "+handover.length+"\n\n";
      if(overdueTasks.length>0){r+="🔴 OVERDUE TASKS ("+overdueTasks.length+")\n";overdueTasks.forEach(t=>{r+="• "+t.title+" → "+t.assignee+" ("+t.project+")\n";});r+="\n";}
      if(todayTasks.length>0){r+="⏰ DUE TODAY ("+todayTasks.length+")\n";todayTasks.forEach(t=>{r+="• "+t.title+" → "+t.assignee+"\n";});r+="\n";}
      if(criticalIssues.length>0){r+="⚠️ CRITICAL SITE ISSUES ("+criticalIssues.length+")\n";criticalIssues.forEach(i=>{r+="• "+i.project+" ["+i.severity+"]: "+i.description.slice(0,60)+"...\n";});r+="\n";}
      if(overdueInvoices.length>0){r+="💰 OVERDUE INVOICES ("+overdueInvoices.length+")\n";overdueInvoices.forEach(f=>{r+="• "+f.ref+" — "+f.client+" — "+fmtL(f.amount)+"\n";});r+="\n";}
      if(negotiationLeads.length>0){r+="🎯 LEADS IN NEGOTIATION\n";negotiationLeads.forEach(l=>{r+="• "+l.name+" ("+l.budget+") — BDM: "+l.bdm+"\n";});r+="\n";}
      r+="🏁 TOP 3 ACTIONS FOR TODAY\n";
      const actions=[];
      if(overdueTasks.length>0)actions.push("1. Chase "+overdueTasks[0].assignee+" on: "+overdueTasks[0].title+" ("+overdueTasks[0].project+")");
      if(criticalIssues.length>0)actions.push("2. Resolve critical issue: "+criticalIssues[0].project+" — "+criticalIssues[0].description.slice(0,50));
      if(overdueInvoices.length>0)actions.push("3. Follow up on overdue payment: "+overdueInvoices[0].client+" ("+fmtL(overdueInvoices[0].amount)+")");
      if(negotiationLeads.length>0)actions.push((actions.length+1)+". Close negotiation: "+negotiationLeads[0].name+" ("+negotiationLeads[0].budget+")");
      r+=actions.join("\n")||"✅ No urgent actions today.";
      return r;
    }

    // ── RISK / AT RISK PROJECTS ───────────────────────────────────────────────
    if(q.includes("risk")||q.includes("at risk")||q.includes("problem")||q.includes("concern")){
      let r="🚨 RISK ANALYSIS — Innovations Interiors\n\n";
      const slowProjects=priority.filter(p=>p.progress<40);
      const stuckProjects=priority.filter(p=>p.progress>70&&p.status==="ON PRIORITY");
      r+="🔴 SLOW EXECUTION (Priority projects <40% progress)\n";
      if(slowProjects.length>0)slowProjects.forEach(p=>{r+="• "+p.name+" — "+p.progress+"% — SR: "+p.sr+" — Phase: "+p.phase+"\n";}); else r+="• None identified\n";
      r+="\n⚠️ OPEN SITE ISSUES ("+openIssues.length+" total, "+criticalIssues.length+" critical)\n";
      openIssues.slice(0,5).forEach(i=>{r+="• ["+i.severity+"] "+i.project+": "+i.description.slice(0,55)+"...\n";});
      r+="\n💰 FINANCIAL RISK\n";
      r+="• "+overdueInvoices.length+" overdue invoices — Total: "+fmtL(totalOutstanding)+"\n";
      if(warnVendors.length>0){r+="\n🔧 VENDOR WARNINGS\n";warnVendors.forEach(v=>{r+="• "+v.name+" ("+v.trade+") — Outstanding: ₹"+fmt(v.outstanding)+"\n";});}
      if(overloadedDesigners.length>0){r+="\n👥 OVERLOADED TEAM MEMBERS\n";overloadedDesigners.forEach(m=>{r+="• "+m.name+" ("+m.role+") — "+m.projects.length+" projects\n";});}
      r+="\n📋 RECOMMENDATION: Address the "+criticalIssues.length+" critical site issues first, then chase the "+overdueInvoices.length+" overdue invoices totalling "+fmtL(totalOutstanding)+".";
      return r;
    }

    // ── SITE ISSUES ───────────────────────────────────────────────────────────
    if(q.includes("issue")||q.includes("punch")||q.includes("defect")||q.includes("site problem")){
      let r="⚠️ SITE ISSUES SUMMARY\n\n";
      r+="Total Issues: "+(issues||[]).length+" | Open: "+openIssues.length+" | Resolved: "+((issues||[]).length-openIssues.length)+"\n\n";
      if(criticalIssues.length>0){r+="🔴 CRITICAL / ACTION REQUIRED ("+criticalIssues.length+")\n";criticalIssues.forEach(i=>{r+="• "+i.project+" ["+i.category+"/"+i.subcategory+"]: "+i.description+"\n  → Assigned: "+i.responsible+" | Target: "+i.targetDate+"\n  → AI Solution: "+i.aiSolution.slice(0,80)+"...\n\n";});}
      const minor=openIssues.filter(i=>i.severity==="Minor");
      if(minor.length>0){r+="🟡 MINOR ISSUES ("+minor.length+")\n";minor.forEach(i=>{r+="• "+i.project+": "+i.description.slice(0,60)+"... ("+i.responsible+")\n";});}
      const escalated=openIssues.filter(i=>i.status==="Escalated");
      if(escalated.length>0){r+="\n🚨 ESCALATED: "+escalated.length+" issue(s) escalated\n";escalated.forEach(i=>{r+="• "+i.project+": "+i.description.slice(0,60)+"\n";});}
      return r;
    }

    // ── PERFORMANCE ───────────────────────────────────────────────────────────
    if(q.includes("perform")||q.includes("underperform")||q.includes("score")||q.includes("kpi")||q.includes("team performance")){
      let r="📈 TEAM PERFORMANCE REPORT\n\n";
      const avg=Math.round((perf||[]).reduce((s,p)=>s+p.overallScore,0)/Math.max((perf||[]).length,1));
      r+="Team Average Score: "+avg+"/100\n\n";
      r+="🏆 TOP PERFORMERS\n";
      topPerf.forEach((p,i)=>{r+=(i+1)+". "+p.name+" — "+p.overallScore+"/100 ("+p.rating+")\n";});
      r+="\n⚠️ NEEDS ATTENTION\n";
      if(lowPerf.length>0)lowPerf.forEach(p=>{r+="• "+p.name+" — "+p.overallScore+"/100 ("+p.rating+")\n  Manager note: "+p.comment+"\n";}); else r+="• All team members performing satisfactorily\n";
      r+="\n📊 DEPARTMENT BREAKDOWN\n";
      const depts=["Design","Execution","Management"];
      depts.forEach(d=>{
        const dm=(perf||[]).filter(p=>p.dept===d);
        if(dm.length===0)return;
        const davg=Math.round(dm.reduce((s,p)=>s+p.overallScore,0)/dm.length);
        r+="• "+d+": "+dm.length+" members | Avg "+davg+"/100\n";
      });
      r+="\n💡 RECOMMENDATION: "+((lowPerf.length>0)?"Schedule 1:1s with "+lowPerf.map(p=>p.name).join(", ")+" — performance review overdue.":"Team is performing well. Maintain momentum.");
      return r;
    }

    // ── OVERDUE TASKS ─────────────────────────────────────────────────────────
    if(q.includes("overdue")||q.includes("delayed")||q.includes("late task")||q.includes("pending task")){
      let r="⏰ TASK STATUS REPORT\n\n";
      r+="Overdue: "+overdueTasks.length+" | Due Today: "+todayTasks.length+" | Pending: "+pendingTasks.length+" | Done: "+tasks.filter(t=>t.status==="Done").length+"\n\n";
      if(overdueTasks.length>0){
        r+="🔴 OVERDUE TASKS\n";
        overdueTasks.forEach(t=>{r+="• \""+t.title+"\"\n  Project: "+t.project+" | Assignee: "+t.assignee+" | Due: "+t.due+" | Priority: "+t.priority+"\n";});
        r+="\n";
        // Group by assignee
        const byAssignee={};
        overdueTasks.forEach(t=>{if(!byAssignee[t.assignee])byAssignee[t.assignee]=[];byAssignee[t.assignee].push(t);});
        r+="📊 OVERDUE BY ASSIGNEE\n";
        Object.entries(byAssignee).sort((a,b)=>b[1].length-a[1].length).forEach(([name,ts])=>{r+="• "+name+": "+ts.length+" task(s)\n";});
      }
      if(todayTasks.length>0){r+="\n⚠️ DUE TODAY\n";todayTasks.forEach(t=>{r+="• \""+t.title+"\" → "+t.assignee+" ("+t.project+")\n";});}
      return r;
    }

    // ── FINANCE / INVOICES ────────────────────────────────────────────────────
    if(q.includes("invoice")||q.includes("finance")||q.includes("payment")||q.includes("outstanding")||q.includes("overdue invoice")||q.includes("collection")){
      const totalBilled=(finance||[]).filter(f=>f.type==="Invoice").reduce((s,f)=>s+Number(f.amount||0),0);
      const collected=(finance||[]).filter(f=>["Paid","Received"].includes(f.status)).reduce((s,f)=>s+Number(f.amount||0),0);
      let r="💰 FINANCE & COLLECTIONS REPORT\n\n";
      r+="Total Billed: "+fmtL(totalBilled)+" | Collected: "+fmtL(collected)+" | Outstanding: "+fmtL(totalBilled-collected)+"\n\n";
      if(overdueInvoices.length>0){
        r+="🔴 OVERDUE INVOICES ("+overdueInvoices.length+")\n";
        overdueInvoices.forEach(f=>{r+="• "+f.ref+" — "+f.client+" ("+f.project+")\n  Amount: ₹"+fmt(f.amount)+" + GST = "+fmtL(Number(f.amount)*(1+f.gst/100))+" | Due: "+f.dueDate+(f.notes?" | "+f.notes:"")+"\n";});
        r+="\n";
      }
      if(pendingInvoices.length>0){r+="🟡 PENDING INVOICES ("+pendingInvoices.length+")\n";pendingInvoices.forEach(f=>{r+="• "+f.ref+" — "+f.client+" — ₹"+fmt(f.amount)+" — Due: "+f.dueDate+"\n";});}
      r+="\n💡 ACTION: Send WhatsApp reminders to "+overdueInvoices.map(f=>f.client).join(", ")||"None"+" for overdue amounts.";
      return r;
    }

    // ── LEADS / CRM ───────────────────────────────────────────────────────────
    if(q.includes("lead")||q.includes("crm")||q.includes("pipeline")||q.includes("follow-up")||q.includes("follow up")||q.includes("bdm")){
      let r="🎯 LEAD & CRM PIPELINE\n\n";
      r+="Total Leads: "+(leads||[]).length+" | Active: "+activeLeads.length+" | Won: "+((leads||[]).filter(l=>l.stage==="Won").length)+" | Lost: "+((leads||[]).filter(l=>l.stage==="Lost").length)+"\n\n";
      ["Initial Inquiry","Site Visit Scheduled","Site Visit Done","Proposal Sent","Negotiation"].forEach(stage=>{
        const sl=(leads||[]).filter(l=>l.stage===stage);
        if(sl.length>0){r+="📌 "+stage.toUpperCase()+" ("+sl.length+")\n";sl.forEach(l=>{r+="• "+l.name+" | "+l.sector+" — "+l.budget+" | BDM: "+l.bdm+(l.followUpDate?" | Follow-up: "+l.followUpDate:"")+"\n";});r+="\n";}
      });
      const highScore=(leads||[]).filter(l=>l.score>=80&&!["Won","Lost"].includes(l.stage));
      if(highScore.length>0){r+="⭐ HIGH-PRIORITY LEADS (Score ≥80)\n";highScore.sort((a,b)=>b.score-a.score).forEach(l=>{r+="• "+l.name+" — Score: "+l.score+" | Stage: "+l.stage+" | Budget: "+l.budget+"\n";});}
      return r;
    }

    // ── VENDORS ───────────────────────────────────────────────────────────────
    if(q.includes("vendor")||q.includes("supplier")||q.includes("outstanding payment")){
      let r="🔧 VENDOR REPORT\n\n";
      r+="Total Vendors: "+(vendors||[]).length+" | Active: "+((vendors||[]).filter(v=>v.status==="Active").length)+" | Warning: "+warnVendors.length+"\n\n";
      if(warnVendors.length>0){r+="🔴 VENDORS ON WARNING\n";warnVendors.forEach(v=>{r+="• "+v.name+" ("+v.trade+")\n  Outstanding: ₹"+fmt(v.outstanding)+" | Quality: "+v.quality+" | Delivery: "+v.delivery+"\n  Contact: "+v.contact+" — "+v.phone+"\n\n";});}
      const highOutstanding=(vendors||[]).filter(v=>Number(v.outstanding)>0).sort((a,b)=>b.outstanding-a.outstanding);
      if(highOutstanding.length>0){r+="💰 OUTSTANDING PAYMENTS\n";highOutstanding.forEach(v=>{r+="• "+v.name+": ₹"+fmt(v.outstanding)+" pending\n";});}
      r+="\n⭐ TOP RATED VENDORS\n";
      [...(vendors||[])].sort((a,b)=>b.rating-a.rating).slice(0,3).forEach(v=>{r+="• "+v.name+" ("+v.trade+") — "+v.rating+"★ — "+v.quality+" quality\n";});
      return r;
    }

    // ── TEAM WORKLOAD ─────────────────────────────────────────────────────────
    if(q.includes("workload")||q.includes("overload")||q.includes("team")||q.includes("who is handling")||q.includes("designer")){
      let r="👥 TEAM WORKLOAD ANALYSIS\n\n";
      r+="DESIGN TEAM\n";
      DESIGN_TEAM.forEach(m=>{
        const pc=m.projects.filter(pn=>projects.find(p=>p.name===pn&&p.status==="ON PRIORITY")).length;
        const ac=m.projects.filter(pn=>projects.find(p=>p.name===pn&&p.status==="ACTIVE")).length;
        r+="• "+m.name+" ("+m.role+"): "+m.projects.length+" projects";
        if(pc>0)r+=" 🔴 "+pc+" priority";
        if(ac>0)r+=" ● "+ac+" active";
        r+=" — "+m.projects.join(", ")+"\n";
      });
      r+="\nEXECUTION TEAM\n";
      EXECUTION_TEAM.forEach(m=>{r+="• "+m.name+" ("+m.role+"): "+m.projects.length+" sites — "+m.projects.join(", ")+"\n";});
      if(overloadedDesigners.length>0){r+="\n⚠️ OVERLOADED (4+ projects):\n";overloadedDesigners.forEach(m=>{r+="• "+m.name+": "+m.projects.length+" projects — consider redistributing\n";});}
      return r;
    }

    // ── PROJECT LOOKUP ────────────────────────────────────────────────────────
    const matchedProject=projects.find(p=>q.includes(p.name.toLowerCase())||q.includes(p.name.split(" ")[0].toLowerCase()));
    if(matchedProject){
      const p=matchedProject;
      const ptasks=tasks.filter(t=>t.project===p.name);
      const preports=siteReports.filter(r=>r.project===p.name);
      const pissues=(issues||[]).filter(i=>i.project===p.name);
      let r="📁 PROJECT: "+p.name+"\n\n";
      r+="Status: "+p.status+" | Progress: "+p.progress+"% | Sector: "+p.sector+"\n";
      r+="Phase: "+p.phase+"\n";
      r+="SR Designer: "+p.sr+" | JR: "+(p.jr||"—")+" | 3D: "+(p.td||"—")+" | Execution: "+(p.exec||"—")+"\n";
      if(p.notes)r+="Notes: "+p.notes+"\n";
      r+="\n✅ TASKS ("+ptasks.length+")\n";
      ptasks.forEach(t=>{r+="• ["+t.status+"] "+t.title+" → "+t.assignee+" (Due: "+t.due+")\n";});
      if(pissues.length>0){r+="\n⚠️ ISSUES ("+pissues.length+")\n";pissues.forEach(i=>{r+="• ["+i.severity+"] "+i.description.slice(0,60)+" ("+i.status+")\n";});}
      if(preports.length>0){r+="\n📍 LATEST SITE REPORT\n";const lr=preports.sort((a,b)=>new Date(b.date)-new Date(a.date))[0];r+="Date: "+lr.date+" | "+lr.supervisor+"\n"+lr.workDone.slice(0,120)+(lr.workDone.length>120?"...":"");}
      r+="\n\n💡 PROGRESS BAR: "+"█".repeat(Math.round(p.progress/10))+"░".repeat(10-Math.round(p.progress/10))+" "+p.progress+"%";
      return r;
    }

    // ── WHATSAPP DRAFT ────────────────────────────────────────────────────────
    if(q.includes("whatsapp")||q.includes("message")||q.includes("draft")||q.includes("send update")){
      const pName=projects.find(p=>q.includes(p.name.toLowerCase()));
      if(pName){
        const latestR=siteReports.filter(r=>r.project===pName.name).sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
        if(latestR){
          return "📲 WhatsApp Draft for "+pName.name+":\n\n"
            +"Dear Client,\n\nHere is today's site update for your "+pName.name+" project:\n\n"
            +"📍 *Project:* "+pName.name+"\n"
            +"📅 *Date:* "+latestR.date+"\n"
            +"⚙️ *Progress:* "+pName.progress+"%\n"
            +"🏗️ *Phase:* "+pName.phase+"\n\n"
            +"*Work completed today:*\n"+latestR.workDone+"\n\n"
            +(latestR.nextDay?"*Tomorrow's plan:*\n"+latestR.nextDay+"\n\n":"")
            +"Feel free to reach out with any queries.\n\n"
            +"— "+pName.sr+"\nInnovations Interiors, Pune";
        }
      }
      return "📲 To draft a WhatsApp update, mention the project name. E.g. \"Draft WhatsApp for GOSAVI\".\n\nActive projects: "+priority.map(p=>p.name).join(", ");
    }

    // ── TOP ACTIONS / PRINCIPAL ───────────────────────────────────────────────
    if(q.includes("top")||q.includes("action")||q.includes("principal")||q.includes("priority today")||q.includes("what should")){
      let r="🏆 TOP ACTIONS FOR PRINCIPAL — "+today.toDateString()+"\n\n";
      let n=1;
      if(overdueTasks.length>0)r+=(n++)+". 🔴 URGENT: "+overdueTasks.length+" overdue tasks — chase "+overdueTasks[0].assignee+" on \""+overdueTasks[0].title+"\" ("+overdueTasks[0].project+")\n\n";
      if(criticalIssues.length>0)r+=(n++)+". ⚠️ SITE ISSUE: "+criticalIssues[0].project+" — "+criticalIssues[0].description.slice(0,60)+"... ("+criticalIssues[0].severity+")\n\n";
      if(overdueInvoices.length>0)r+=(n++)+". 💰 PAYMENT: Chase "+overdueInvoices[0].client+" for "+fmtL(overdueInvoices[0].amount)+" ("+overdueInvoices[0].ref+")\n\n";
      if(negotiationLeads.length>0)r+=(n++)+". 🎯 LEAD: Close "+negotiationLeads[0].name+" ("+negotiationLeads[0].budget+") — BDM: "+negotiationLeads[0].bdm+"\n\n";
      if(handover.length>0)r+=(n++)+". 🏁 HANDOVER READY: "+handover.map(p=>p.name).join(", ")+" — schedule client handover\n\n";
      if(warnVendors.length>0)r+=(n++)+". 🔧 VENDOR ALERT: "+warnVendors[0].name+" on warning — review or replace\n\n";
      if(n===1)r+="✅ All clear! No urgent actions today.\n";
      return r;
    }

    // ── PROPOSALS / QUOTATIONS ────────────────────────────────────────────────
    if(q.includes("proposal")||q.includes("quotation")||q.includes("quot")||q.includes("estimate")){
      const p=proposals||[];
      let r="💼 QUOTATIONS SUMMARY\n\n";
      r+="Total: "+p.length+" | Won: "+p.filter(x=>x.status==="Won").length+" | Sent: "+p.filter(x=>x.status==="Sent").length+" | Draft: "+p.filter(x=>x.status==="Draft").length+" | Lost: "+p.filter(x=>x.status==="Lost").length+"\n\n";
      if(p.length>0){
        const totalValue=p.reduce((s,x)=>s+Number(x.total||0),0);
        r+="Pipeline Value: "+fmtL(totalValue)+"\n\n";
        p.forEach(x=>{r+="• "+x.client+" ("+x.projectType+")\n  "+fmtL(x.total)+" | Status: "+x.status+" | Date: "+x.date+"\n";});
      } else r+="No quotations saved yet. Use the Quotations module to create BOQ estimates.";
      return r;
    }

    // ── SITE REPORTS SUMMARY ──────────────────────────────────────────────────
    if(q.includes("site report")||q.includes("daily report")||q.includes("what was done")){
      const recent=siteReports.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
      let r="📍 RECENT SITE REPORTS\n\n";
      recent.forEach(r2=>{
        r+="📅 "+r2.date+" — "+r2.project+"\n";
        r+="Supervisor: "+r2.supervisor+" | Weather: "+r2.weather+"\n";
        r+=r2.workDone.slice(0,100)+(r2.workDone.length>100?"...":"")+"\n";
        if(r2.observations.length>0)r+=r2.observations.map(o=>"⚠ ["+o.category+"] "+o.note).join(" | ")+"\n";
        r+="\n";
      });
      return r;
    }

    // ── STATUS OVERVIEW ───────────────────────────────────────────────────────
    if(q.includes("status")||q.includes("overview")||q.includes("summary")||q.includes("all project")){
      let r="📊 PROJECT STATUS OVERVIEW\n\n";
      [["ON PRIORITY",priority,"🔴"],["ACTIVE",active,"🟢"],["PASSIVE",passive,"🟣"],["HANDOVER",handover,"🏁"],["SITE MEASUREMENT",projects.filter(p=>p.status==="SITE MEASUREMENT"),"📐"]].forEach(([status,list,icon])=>{
        if(list.length>0){r+=icon+" "+status+" ("+list.length+")\n";list.forEach(p=>{r+="  • "+p.name+" — "+p.progress+"% — SR: "+p.sr+(p.exec?" | Exec: "+p.exec:"")+"\n";});r+="\n";}
      });
      return r;
    }

    // ── HELP / CAPABILITIES ───────────────────────────────────────────────────
    if(q.includes("help")||q.includes("what can")||q.includes("capability")||q.includes("feature")){
      return "🤖 ERP AI ASSISTANT — CAPABILITIES\n\nI work fully offline with live data. Ask me:\n\n📊 BRIEFINGS\n• \"Daily brief\" — full morning dashboard\n• \"Project status overview\"\n• \"Top actions for today\"\n\n🏗️ PROJECTS\n• \"Tell me about GOSAVI\" (any project name)\n• \"Which projects are at risk?\"\n• \"Show all priority projects\"\n\n✅ TASKS\n• \"Show overdue tasks\"\n• \"Who is overloaded?\"\n\n⚠️ ISSUES\n• \"Summarise all open site issues\"\n• \"Critical issues report\"\n\n💰 FINANCE\n• \"List all overdue invoices\"\n• \"Finance summary\"\n\n🎯 LEADS\n• \"Show lead pipeline\"\n• \"Which leads need follow-up?\"\n\n👥 TEAM\n• \"Team workload analysis\"\n• \"Performance report\"\n\n🔧 VENDORS\n• \"Vendor report\"\n• \"Who has outstanding payments?\"\n\n📲 DRAFTS\n• \"Draft WhatsApp for GOSAVI\"\n• \"Draft site update for JANJIRE\"";
    }

    // ── FALLBACK / SEARCH ─────────────────────────────────────────────────────
    // Try to find any keyword matches
    const found=[];
    projects.forEach(p=>{if(q.split(" ").some(w=>w.length>3&&p.name.toLowerCase().includes(w)))found.push("Project: "+p.name+" ("+p.status+", "+p.progress+"%)");});
    (leads||[]).forEach(l=>{if(q.includes(l.name.toLowerCase().split(" ")[0].toLowerCase()))found.push("Lead: "+l.name+" — "+l.stage+" — "+l.budget);});
    tasks.forEach(t=>{if(q.includes(t.assignee.toLowerCase()))found.push("Task: \""+t.title+"\" → "+t.assignee+" ["+t.status+"]");});
    (perf||[]).forEach(p=>{if(q.includes(p.name.toLowerCase()))found.push("Performance: "+p.name+" — "+p.overallScore+"/100 ("+p.rating+")");});

    if(found.length>0){
      return "🔍 SEARCH RESULTS\n\n"+found.join("\n")+"\n\n💡 Ask me more specifically about any of these, or try:\n• \"Daily brief\"\n• \"Risk analysis\"\n• \"Team workload\"";
    }

    return "I didn't find a direct match for: \""+question.slice(0,60)+"\"\n\nTry asking:\n• \"Daily brief\" — full morning summary\n• \"Which projects are at risk?\"\n• \"Show overdue tasks\"\n• \"Finance report\"\n• \"Help\" — see all capabilities\n\nOr mention a specific project name like GOSAVI, JANJIRE, KOLHAPUR etc.";
  }

  // ── SEND HANDLER ─────────────────────────────────────────────────────────────
  function send(){
    if(!input.trim()||loading)return;
    const userMsg={role:"user",content:input};
    setMsgs(m=>[...m,userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(()=>{
      const reply=offlineAI(input);
      setMsgs(m=>[...m,{role:"assistant",content:reply}]);
      setLoading(false);
    },400); // small delay for UX
  }

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const quick=["📊 Daily brief","⚠️ Open site issues","🔴 Overdue tasks","💰 Finance report","🎯 Lead pipeline","👥 Team workload","📈 Performance report","🔧 Vendor report","🏆 Top actions today","📁 Project status overview","🚨 Risk analysis","❓ Help & capabilities"];

  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{flex:1,overflowY:"auto",padding:"0.85rem",display:"flex",flexDirection:"column",gap:"0.65rem"}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
        <div style={{maxWidth:"90%",padding:"0.6rem 0.85rem",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",background:m.role==="user"?C.gold:"#fff",color:m.role==="user"?"#fff":C.inkSoft,border:m.role==="assistant"?"0.5px solid "+C.border:"none",fontSize:12,lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"'DM Sans','Trebuchet MS',sans-serif"}}>{m.content}</div>
      </div>)}
      {loading&&<div style={{display:"flex",gap:4,padding:"0.6rem 0.85rem",background:"#fff",border:"0.5px solid "+C.border,borderRadius:"12px 12px 12px 2px",width:"fit-content",alignItems:"center"}}>
        <span style={{fontSize:11,color:C.muted,marginRight:4}}>Thinking</span>
        {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:C.gold,animation:"bounce 1s "+(i*0.18)+"s infinite"}}/>)}
      </div>}
      <div ref={bottomRef}/>
    </div>
    <div style={{padding:"0.65rem 0.85rem",borderTop:"0.5px solid "+C.border,background:C.surface}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:"0.5rem"}}>
        {quick.map(q=><button key={q} onClick={()=>setInput(q.replace(/^[^\s]+\s/,""))} style={{fontSize:10,padding:"3px 7px",borderRadius:3,border:"0.5px solid "+C.borderStrong,background:C.goldLight,color:C.goldDark,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{q}</button>)}
      </div>
      <div style={{display:"flex",gap:6}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Ask anything — projects, tasks, finance, team..."
          style={{flex:1,padding:"7px 11px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"}}/>
        <button onClick={send} style={{padding:"7px 16px",background:C.gold,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>Send</button>
        <button onClick={()=>setMsgs([{role:"assistant",content:"Chat cleared. Ask me anything about your projects, team, or operations!"}])} style={{padding:"7px 12px",background:C.surface3,color:C.muted,border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",cursor:"pointer"}} title="Clear chat">✕</button>
      </div>
    </div>
    <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
  </div>;
}

// ── COUNTDOWN TIMER HOOK ──────────────────────────────────────────────────────
function useCountdown(targetDate){
  const [timeLeft,setTimeLeft]=useState("");
  useEffect(()=>{
    if(!targetDate)return;
    const tick=()=>{
      const diff=new Date(targetDate)-new Date();
      if(diff<=0){setTimeLeft("OVERDUE");return;}
      const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000);
      setTimeLeft(d>0?d+"d "+h+"h":h>0?h+"h "+m+"m":m+"m");
    };
    tick();
    const t=setInterval(tick,60000);
    return()=>clearInterval(t);
  },[targetDate]);
  return timeLeft;
}

// ── LEAD CARD ─────────────────────────────────────────────────────────────────
const LEAD_STAGES=["Initial Inquiry","Site Visit Scheduled","Site Visit Done","Proposal Sent","Negotiation","Won","Lost"];
const STAGE_COLORS={"Initial Inquiry":C.blue,"Site Visit Scheduled":C.amber,"Site Visit Done":"#00838F","Proposal Sent":C.purple,"Negotiation":C.gold,"Won":C.green,"Lost":C.red};

function LeadCard({lead,onStage,onWA}){
  const cd=useCountdown(lead.followUpDate);
  return <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem",marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:C.ink}}>{lead.name}</div>
        <div style={{fontSize:11,color:C.muted}}>{lead.sector} · {lead.type} · {lead.location}</div>
        {lead.referredBy&&<div style={{fontSize:10,color:C.amber,marginTop:2}}>🤝 Referred by: {lead.referredBy}</div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
        <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:3,background:(STAGE_COLORS[lead.stage]||C.muted)+"18",color:STAGE_COLORS[lead.stage]||C.muted}}>{lead.stage}</span>
        <div style={{fontSize:20,fontWeight:700,color:lead.score>80?C.green:lead.score>60?C.amber:C.red,fontFamily:"'Cormorant Garamond',serif"}}>{lead.score}</div>
        <div style={{fontSize:9,color:C.muted}}>Lead Score</div>
      </div>
    </div>
    <div style={{display:"flex",gap:10,fontSize:11,color:C.muted,marginBottom:8,flexWrap:"wrap"}}>
      <span>💰 {lead.budget}</span>
      <span>👤 BDM: {lead.bdm}</span>
      <span>📅 {lead.date}</span>
      {lead.followUpDate&&<span style={{color:cd==="OVERDUE"?C.red:C.amber,fontWeight:600}}>⏱ Follow-up: {cd||lead.followUpDate}</span>}
    </div>
    {lead.notes&&<div style={{fontSize:11,color:C.inkSoft,background:C.surface2,borderRadius:4,padding:"5px 8px",marginBottom:8}}>{lead.notes}</div>}
    <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
      <select value={lead.stage} onChange={e=>onStage(lead.id,e.target.value)}
        style={{padding:"4px 8px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:11,fontFamily:"inherit",background:"#fff",color:C.ink}}>
        {LEAD_STAGES.map(s=><option key={s}>{s}</option>)}
      </select>
      <button onClick={()=>onWA(lead)} style={{padding:"4px 10px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📲 WhatsApp</button>
      <span style={{fontSize:10,color:C.muted,marginLeft:"auto"}}>Source: {lead.source}</span>
    </div>
  </div>;
}

// ── LEADS / CRM ───────────────────────────────────────────────────────────────
function Leads({leads,setLeads}){
  const [filter,setFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [newL,setNewL]=useState({name:"",phone:"",email:"",sector:"Residential",type:"",budget:"",location:"",source:"Referral",referredBy:"",bdm:ALL_TEAM_MEMBERS[0].name,stage:"Initial Inquiry",score:70,notes:"",date:new Date().toISOString().split("T")[0],followUpDate:""});
  const inp2={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};

  const filters=["All",...LEAD_STAGES];
  const shown=filter==="All"?leads:leads.filter(l=>l.stage===filter);
  const won=leads.filter(l=>l.stage==="Won").length;
  const pipeline=leads.filter(l=>!["Won","Lost"].includes(l.stage)).length;

  function onStage(id,stage){setLeads(ls=>ls.map(l=>l.id===id?{...l,stage}:l));}
  function onWA(lead){
    const msg="Hi "+lead.name+", this is Innovations Interiors. Thank you for your interest in our interior design services for your "+lead.type+" in "+lead.location+". We'd love to schedule a site visit at your convenience. — Innovations Interiors, Pune";
    openWhatsApp(lead.phone,msg);
  }

  return <div>
    <Head title="🎯 Lead & CRM Pipeline" sub={pipeline+" active leads · "+won+" converted"} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ New Lead</Btn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Total Leads",leads.length,C.gold],["Active Pipeline",pipeline,C.blue],["Won",won,C.green],["Lost",leads.filter(l=>l.stage==="Lost").length,C.red],["Referrals",leads.filter(l=>l.referredBy).length,C.amber]].map(([k,v,c])=><div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.75rem",textAlign:"center"}}>
        <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{k}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:c}}>{v}</div>
      </div>)}
    </div>

    {showAdd&&<div style={{background:C.goldLight,border:"1px solid "+C.borderStrong,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>New Lead</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        {[["Client Name","name"],["Phone","phone"],["Email","email"],["Location","location"],["Budget","budget"],["Project Type","type"],["Referred By","referredBy"]].map(([l,k])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><input value={newL[k]} onChange={e=>setNewL(d=>({...d,[k]:e.target.value}))} style={inp2}/></div>)}
        {[["Sector","sector",["Residential","Commercial","Hospitality"]],["Source","source",["Referral","Web","Instagram","Walk-in","WhatsApp","Exhibition"]],["BDM","bdm",ALL_TEAM_MEMBERS.map(m=>m.name)],["Stage","stage",LEAD_STAGES]].map(([l,k,opts])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><select value={newL[k]} onChange={e=>setNewL(d=>({...d,[k]:e.target.value}))} style={inp2}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>)}
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Follow-up Date</div><input type="date" value={newL.followUpDate} onChange={e=>setNewL(d=>({...d,followUpDate:e.target.value}))} style={inp2}/></div>
      </div>
      <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Notes</div><textarea value={newL.notes} onChange={e=>setNewL(d=>({...d,notes:e.target.value}))} rows={2} style={{...inp2,resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <Btn onClick={()=>{if(!newL.name)return;setLeads(ls=>[...ls,{...newL,id:Date.now()}]);setShowAdd(false);}}>Save Lead</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </div>}

    <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
      {filters.map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===f?C.gold:C.border),background:filter===f?C.gold:"#fff",color:filter===f?"#fff":C.muted,fontWeight:filter===f?700:400}}>
        {f} {f!=="All"&&"("+leads.filter(l=>l.stage===f).length+")"}
      </button>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {shown.map(l=><LeadCard key={l.id} lead={l} onStage={onStage} onWA={onWA}/>)}
    </div>
  </div>;
}

// ── ISSUE MANAGEMENT ──────────────────────────────────────────────────────────
const ISSUE_CATS=["Civil","MEP","Carpentry","Painting","Flooring","Glass","Electrical","FF&E","General"];
const SEV_COL={"Minor":C.amber,"Major":C.red,"Action Required":C.red,"Critical":"#7B0000","Resolved":C.green};

function IssueCard({issue,onUpdate,projects}){
  const cd=useCountdown(issue.targetDate);
  const sCol=SEV_COL[issue.status==="Resolved"?"Resolved":issue.severity]||C.amber;
  const [expand,setExpand]=useState(false);
  return <div style={{background:"#fff",border:"0.5px solid "+(issue.status==="Resolved"?C.green:issue.severity==="Action Required"||issue.severity==="Critical"?C.red:C.border),borderRadius:8,padding:"1rem",marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
          <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:3,background:sCol+"18",color:sCol}}>{issue.severity}</span>
          <span style={{fontSize:10,color:C.muted}}>{issue.category} · {issue.subcategory}</span>
          <span style={{fontSize:11,fontWeight:600,color:C.blue}}>{issue.project}</span>
        </div>
        <div style={{fontSize:13,fontWeight:600,color:C.ink}}>{issue.description}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:3}}>Reported: {issue.date} {issue.time} · Assigned: {issue.responsible}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
        <div style={{fontSize:11,fontWeight:700,color:cd==="OVERDUE"?C.red:C.amber}}>⏱ {cd||issue.targetDate}</div>
        <div style={{fontSize:9,color:C.muted}}>Target</div>
        <select value={issue.status} onChange={e=>onUpdate(issue.id,"status",e.target.value)}
          style={{marginTop:4,padding:"3px 7px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:10,fontFamily:"inherit",background:"#fff"}}>
          {["Open","In Progress","Escalated","Resolved"].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
    <button onClick={()=>setExpand(!expand)} style={{fontSize:10,color:C.gold,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:0}}>
      {expand?"▲ Hide AI Analysis":"▼ AI Root Cause & Solution"}
    </button>
    {expand&&<div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={{background:C.redLight,borderRadius:6,padding:"0.65rem"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.red,marginBottom:4,textTransform:"uppercase"}}>🤖 AI Root Cause</div>
        <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.5}}>{issue.aiRootCause}</div>
      </div>
      <div style={{background:C.greenLight,borderRadius:6,padding:"0.65rem"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.green,marginBottom:4,textTransform:"uppercase"}}>🤖 AI Solution</div>
        <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.5}}>{issue.aiSolution}</div>
      </div>
      {issue.correctiveAction&&<div style={{background:C.blueLight,borderRadius:6,padding:"0.65rem"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.blue,marginBottom:4,textTransform:"uppercase"}}>✅ Corrective Action</div>
        <div style={{fontSize:12,color:C.inkSoft}}>{issue.correctiveAction}</div>
      </div>}
      {issue.preventiveAction&&<div style={{background:C.amberLight,borderRadius:6,padding:"0.65rem"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.amber,marginBottom:4,textTransform:"uppercase"}}>🛡 Preventive Action</div>
        <div style={{fontSize:12,color:C.inkSoft}}>{issue.preventiveAction}</div>
      </div>}
    </div>}
  </div>;
}

// ── OFFLINE ISSUE AI ENGINE ───────────────────────────────────────────────────
function offlineIssueAnalysis(issue){
  const cat=(issue.category||"").toLowerCase();
  const sub=(issue.subcategory||"").toLowerCase();
  const sev=issue.severity||"Minor";
  const desc=(issue.description||"").toLowerCase();

  // Root cause library by category
  const rootCauses={
    carpentry:{
      default:"Timber moisture variation or improper seasoning causing warping/expansion. Incorrect joint type or insufficient fasteners for the load.",
      gap:"Frame member not properly seasoned before use — moisture-induced expansion. Edge banding not applied flush.",
      wardrobe:"Carcass alignment issue during installation. Hinge misalignment or shutter warp due to unseasoned wood.",
      door:"Frame not plumb during fixing. Hinge positioning incorrect or wood shrinkage post-installation.",
      default2:"Incorrect measurement or cutting error. Poor quality raw material used on site."
    },
    mep:{
      default:"Coordination gap between civil and MEP teams — services not coordinated on drawings before execution.",
      exhaust:"Duct position not marked per drawing before ceiling framing. Clash between structure and MEP services.",
      plumbing:"Pipe slope incorrect or not maintained. Material (CPVC/PPR/UPVC) selection mismatch for application.",
      electrical:"Load calculation not done before circuit planning. MCB rating mismatch or earthing not proper.",
      default2:"Services drawing not shared with execution team or not followed on site."
    },
    civil:{
      default:"Poor workmanship or inadequate supervision during execution. Material quality below specification.",
      flooring:"Mortar bed thickness inconsistent. Lippage clips not used. Tiles not soaked before laying.",
      wall:"Surface preparation inadequate. Bonding agent not applied. Brick/block not wet before plastering.",
      ceiling:"Framework not level. Screws at incorrect spacing. GI profile grade mismatch.",
      default2:"Shuttering removed prematurely or incorrect mix ratio used."
    },
    painting:{
      default:"Surface preparation inadequate — primer not applied uniformly or base not fully dried before next coat.",
      texture:"Inconsistent roller pressure or tool. Compound not mixed to correct consistency. Applied on damp surface.",
      patch:"Previous coat not fully cured. Filler used without proper sanding and priming after application.",
      peeling:"Dampness in wall. Primer skipped or wrong type used. Paint applied on chalky/dusty surface.",
      default2:"Wrong paint type for application (interior vs exterior). Thinning ratio incorrect."
    },
    flooring:{
      default:"Subfloor preparation inadequate. Mortar bed not leveled properly before tile/stone laying.",
      lippage:"Mortar bed thickness varied across area. Lippage clips not used. Tiles not consistent thickness.",
      crack:"Expansion joint not provided. Movement in subfloor. Incorrect adhesive or coverage.",
      default2:"Material not acclimatized before laying. Wrong adhesive for material type."
    },
    glass:{
      default:"Incorrect glass thickness specified for span. Fixing method not appropriate for load.",
      crack:"Thermal stress or point load. Glass edge damage during handling. Frame not level causing stress.",
      default2:"Hardware grade mismatch. Tolerance not maintained during frame installation."
    },
    electrical:{
      default:"Load calculation not verified before circuit design. MCB/DB sizing incorrect.",
      default2:"Earthing not done properly. Cable routing not as per drawing. Junction box not accessible."
    },
    general:{
      default:"Root cause likely to be coordination gap between design and execution teams, or deviation from approved drawings.",
      default2:"Material substitution done on site without approval. Workmanship below required standard."
    }
  };

  const solutions={
    carpentry:{
      default:"Remove defective member and replace with properly seasoned timber. Apply edge banding flush. Use moisture meter to verify wood before use (target <12% MC). Allow 24hr setting before loading.",
      gap:"Dismantle frame section. Allow timber to stabilize in site conditions for 48hrs. Re-fix with correct fasteners. Apply edge banding with adhesive and clamp.",
      wardrobe:"Realign carcass using spirit level. Adjust hinges — check all 3 adjustment axes. Replace shutter if warped beyond 3mm.",
    },
    mep:{
      default:"Halt ceiling work in affected zone. Get MEP and civil teams together on site. Mark all services on slab before proceeding. Update coordination drawing.",
      exhaust:"Reposition duct as per drawing. Recut GI duct and rejoint with approved sealant. Verify against drawing section before closing ceiling.",
      plumbing:"Pressure test pipe before closing. Verify slope with digital level (min 1:80 for drainage). Replace material if wrong grade.",
    },
    civil:{
      default:"Stop work in affected area. Get structural/technical expert to inspect if severity is Major or Critical. Document with photos before rectification.",
      flooring:"Grind high tiles. Reset low tiles with controlled mortar bed thickness (12–15mm). Use 1mm lippage clips throughout. Allow 24hr curing before grouting.",
      wall:"Hack defective plaster. Apply bonding agent. Replaster in 2 coats (scratch coat + finish). Cure for 7 days minimum.",
    },
    painting:{
      default:"Sand affected surface with 180-grit paper. Apply uniform primer coat. Allow full drying per manufacturer spec (min 4hrs). Apply 2 finish coats with consistent roller pressure.",
      texture:"Sand smooth. Re-prime. Ensure compound consistency uniform batch-to-batch. Apply texture in single continuous session to avoid lap marks.",
      peeling:"Identify and fix source of dampness first. Scrape all loose paint. Apply anti-fungal primer. Repaint after surface is bone dry (min 72hrs).",
    },
    flooring:{
      default:"Remove affected tiles/stones carefully. Prepare uniform mortar bed. Re-lay with lippage clips and spacers. Cure 48hrs before grouting.",
      lippage:"Grind protruding tiles. For severe cases, relay with uniform mortar bed thickness. Mandate use of lippage clips for remaining area.",
    },
    general:{
      default:"Assign responsible team member immediately. Document issue with photos. Set target date for resolution. Issue instruction in writing to contractor/labour.",
    }
  };

  const preventions={
    carpentry:"Mandate moisture meter check for all timber before use on site (max 12% MC). Add carpentry inspection checkpoint in daily site report. Require supervisor sign-off before any panel/frame is fixed.",
    mep:"Make MEP coordination drawing mandatory before any ceiling/wall closure. Hold joint inspection with MEP and civil team weekly.",
    civil:"Strengthen daily quality check. Add QC checklist for each trade (plastering, tiling, concreting). Supervisor must inspect and sign before proceeding to next stage.",
    painting:"Add mandatory drying time checkpoints to daily site report. Supervisor to approve surface prep before next coat. Document paint batch numbers used.",
    flooring:"Mandate use of lippage clips for all stone/tile work — no exceptions. Include in site SOP. Supervisor to check mortar bed consistency before laying.",
    glass:"Verify glass thickness and edge treatment on delivery against spec sheet. Store vertically with protection. Check frame level before glass fixing.",
    general:"Update site SOP with specific checkpoints for this category. Conduct team briefing on issue. Add to punch list for all active projects.",
  };

  // Pick root cause
  const catKey=cat.includes("carpet")||cat.includes("join")||cat.includes("wood")?"carpentry":cat.includes("mep")||cat.includes("plumb")||cat.includes("electric")?"mep":cat.includes("civil")?"civil":cat.includes("paint")?"painting":cat.includes("floor")?"flooring":cat.includes("glass")?"glass":cat.includes("electric")?"electrical":"general";
  const subKey=Object.keys(rootCauses[catKey]||{}).find(k=>k!=="default"&&k!=="default2"&&(sub.includes(k)||desc.includes(k)))||"default";
  const rootCause=(rootCauses[catKey]||rootCauses.general)[subKey]||(rootCauses[catKey]||rootCauses.general)["default"]||rootCauses.general.default;
  const solution=(solutions[catKey]||solutions.general)[subKey]||(solutions[catKey]||solutions.general)["default"]||solutions.general.default;
  const prevention=preventions[catKey]||preventions.general;

  const sevActions={Minor:"Monitor and rectify within 3 days. Assign to site supervisor.",Major:"Halt related work immediately. Assign senior team member. Target resolution: 48hrs.","Action Required":"STOP WORK on affected area. Escalate to principal. Resolve before any further execution.  ",Critical:"IMMEDIATE ESCALATION to principal. All related work stopped. Client communication may be required."};
  const urgency=sevActions[sev]||sevActions["Minor"];

  return `📋 OFFLINE AI ANALYSIS — ${issue.category}/${issue.subcategory||"General"}
Severity: ${sev} | Project: ${issue.project}

━━━━━━━━━━━━━━━━━━━━━━━
🔍 ROOT CAUSE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━
${rootCause}

━━━━━━━━━━━━━━━━━━━━━━━
🛠️ IMMEDIATE SOLUTION
━━━━━━━━━━━━━━━━━━━━━━━
${solution}

━━━━━━━━━━━━━━━━━━━━━━━
⚡ SEVERITY ACTION
━━━━━━━━━━━━━━━━━━━━━━━
${urgency}

━━━━━━━━━━━━━━━━━━━━━━━
🛡️ PREVENTIVE ACTION
━━━━━━━━━━━━━━━━━━━━━━━
${prevention}

━━━━━━━━━━━━━━━━━━━━━━━
📝 DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━
• Photograph issue from 3 angles before rectification
• Record in site report with date/time
• Update issue status after resolution
• Share resolution with client if they were present during issue

— Innovations Interiors Site Management System`;
}

function IssueAI({issue,onClose}){
  const [result,setResult]=useState("");
  useEffect(()=>{
    if(!issue)return;
    setTimeout(()=>setResult(offlineIssueAnalysis(issue)),300);
  },[issue]);
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
    <div style={{background:"#fff",borderRadius:10,padding:"1.5rem",width:"min(600px,95vw)",maxHeight:"85vh",overflow:"auto",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,color:C.ink}}>🤖 AI Issue Analysis — Offline</div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>×</button>
      </div>
      <div style={{background:C.redLight,borderRadius:6,padding:"0.65rem",marginBottom:"1rem",fontSize:12,color:C.inkSoft}}><strong>[{issue.severity}]</strong> {issue.description}</div>
      {result?<div style={{fontSize:12,color:C.inkSoft,lineHeight:1.75,whiteSpace:"pre-wrap",fontFamily:"'DM Sans','Trebuchet MS',sans-serif"}}>{result}</div>
        :<div style={{textAlign:"center",padding:"2rem",color:C.muted,fontSize:12}}>Analysing issue...</div>}
    </div>
  </div>;
}

function Issues({issues,setIssues,projects}){
  const [filter,setFilter]=useState("All");
  const [aiIssue,setAiIssue]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [newI,setNewI]=useState({project:projects[0]?.name||"",date:new Date().toISOString().split("T")[0],time:"09:00",category:"Civil",subcategory:"",severity:"Minor",description:"",responsible:"PRAFUL",targetDate:"",status:"Open",aiRootCause:"",aiSolution:"",correctiveAction:"",preventiveAction:"",photos:[]});
  const inp2={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};

  const open=issues.filter(i=>i.status!=="Resolved").length;
  const critical=issues.filter(i=>["Action Required","Critical"].includes(i.severity)&&i.status!=="Resolved").length;
  const shown=filter==="All"?issues:filter==="Open"?issues.filter(i=>i.status!=="Resolved"):issues.filter(i=>i.status===filter||i.severity===filter);

  function onUpdate(id,field,val){setIssues(is=>is.map(i=>i.id!==id?i:{...i,[field]:val}));}

  function aiAnalyze(){
    if(!newI.description)return;
    // Offline analysis — instant, no API needed
    const analysis=offlineIssueAnalysis(newI);
    const lines=analysis.split("\n").filter(Boolean);
    const rootIdx=lines.findIndex(l=>l.includes("ROOT CAUSE"));
    const solIdx=lines.findIndex(l=>l.includes("IMMEDIATE SOLUTION"));
    const rootCause=rootIdx>=0?lines.slice(rootIdx+2,solIdx>rootIdx?solIdx:rootIdx+4).join(" "):"";
    const solEnd=lines.findIndex((l,i)=>i>solIdx&&l.startsWith("━"));
    const solution=solIdx>=0?lines.slice(solIdx+2,solEnd>solIdx?solEnd:solIdx+4).join(" "):"";
    setNewI(i=>({...i,aiRootCause:rootCause,aiSolution:solution}));
  }

  return <div>
    {aiIssue&&<IssueAI issue={aiIssue} onClose={()=>setAiIssue(null)}/>}
    <Head title="⚠️ Site Issue Management" sub={open+" open issues · "+critical+" critical"} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ Report Issue</Btn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Total Issues",issues.length,C.gold],["Open",open,C.red],["Critical/Action Req",critical,"#7B0000"],["Resolved",issues.filter(i=>i.status==="Resolved").length,C.green]].map(([k,v,c])=><div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.75rem",textAlign:"center"}}>
        <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{k}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:c}}>{v}</div>
      </div>)}
    </div>

    {showAdd&&<div style={{background:C.redLight,border:"1px solid "+C.red+"44",borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:12}}>⚠️ Report Site Issue</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Project</div><select value={newI.project} onChange={e=>setNewI(d=>({...d,project:e.target.value}))} style={inp2}>{projects.map(p=><option key={p.id}>{p.name}</option>)}</select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Category</div><select value={newI.category} onChange={e=>setNewI(d=>({...d,category:e.target.value}))} style={inp2}>{ISSUE_CATS.map(c=><option key={c}>{c}</option>)}</select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Sub-category</div><input value={newI.subcategory} onChange={e=>setNewI(d=>({...d,subcategory:e.target.value}))} style={inp2} placeholder="e.g. Wardrobe, Exhaust Duct"/></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Severity</div><select value={newI.severity} onChange={e=>setNewI(d=>({...d,severity:e.target.value}))} style={inp2}>{["Minor","Major","Action Required","Critical"].map(s=><option key={s}>{s}</option>)}</select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Responsible</div><select value={newI.responsible} onChange={e=>setNewI(d=>({...d,responsible:e.target.value}))} style={inp2}>{ALL_TEAM_MEMBERS.map(m=><option key={m.name}>{m.name}</option>)}</select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Date</div><input type="date" value={newI.date} onChange={e=>setNewI(d=>({...d,date:e.target.value}))} style={inp2}/></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Time</div><input type="time" value={newI.time} onChange={e=>setNewI(d=>({...d,time:e.target.value}))} style={inp2}/></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Target Resolution</div><input type="date" value={newI.targetDate} onChange={e=>setNewI(d=>({...d,targetDate:e.target.value}))} style={inp2}/></div>
      </div>
      <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Issue Description</div>
        <textarea value={newI.description} onChange={e=>setNewI(d=>({...d,description:e.target.value}))} rows={3} style={{...inp2,resize:"vertical"}} placeholder="Describe the issue in detail..."/></div>
      {newI.aiRootCause&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div style={{background:C.redLight,borderRadius:6,padding:"0.65rem"}}><div style={{fontSize:10,fontWeight:700,color:C.red,marginBottom:4}}>🤖 AI ROOT CAUSE</div><div style={{fontSize:12,color:C.inkSoft}}>{newI.aiRootCause}</div></div>
        <div style={{background:C.greenLight,borderRadius:6,padding:"0.65rem"}}><div style={{fontSize:10,fontWeight:700,color:C.green,marginBottom:4}}>🤖 AI SOLUTION</div><div style={{fontSize:12,color:C.inkSoft}}>{newI.aiSolution}</div></div>
      </div>}
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={aiAnalyze} v="ghost" style={{borderColor:C.purple,color:C.purple}}>🤖 AI Analyze</Btn>
        <Btn v="danger" onClick={()=>{if(!newI.description)return;setIssues(is=>[...is,{...newI,id:Date.now()}]);setShowAdd(false);}}>Report Issue</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </div>}

    <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
      {["All","Open","Escalated","Action Required","Critical","Resolved"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===f?C.gold:C.border),background:filter===f?C.gold:"#fff",color:filter===f?"#fff":C.muted}}>
        {f}
      </button>)}
    </div>
    <div>{shown.map(i=><div key={i.id} style={{position:"relative"}}>
      <IssueCard issue={i} onUpdate={onUpdate} projects={projects}/>
      <button onClick={()=>setAiIssue(i)} style={{position:"absolute",top:12,right:120,fontSize:10,padding:"2px 8px",background:C.purple,color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>🤖 Deep Analysis</button>
    </div>)}</div>
  </div>;
}

// ── FINANCE ───────────────────────────────────────────────────────────────────
function generateInvoiceHTML(f){
  const base=Number(f.amount||0);
  const gstAmt=Math.round(base*(Number(f.gst||0)/100));
  const total=base+gstAmt;
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+f.ref+'</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Trebuchet MS,sans-serif;background:#F8FAFC;color:#0F1923;font-size:13px;padding:40px}table{border-collapse:collapse;width:100%}td,th{border-bottom:0.5px solid rgba(15,25,35,0.10)}.gold{color:#C9A84C}.muted{color:#6B7C8F}.ink{color:#0F1923}</style></head><body>'
  +'<div style="display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:2px solid #C9A84C;margin-bottom:24px">'
  +'<div><div style="font-size:22px;font-weight:700">Innovations Interiors</div><div style="font-size:11px;color:#6B7C8F;letter-spacing:0.12em;text-transform:uppercase">Interior Design Consultants · Pune</div></div>'
  +'<div style="text-align:right"><div style="font-size:18px;font-weight:700;color:#C9A84C">'+f.type.toUpperCase()+'</div><div style="font-size:13px;font-weight:600"># '+f.ref+'</div><div style="font-size:11px;color:#6B7C8F">Date: '+f.date+'</div>'+(f.dueDate?'<div style="font-size:11px;color:#C0392B;font-weight:600">Due: '+f.dueDate+'</div>':'')+'</div>'
  +'</div>'
  +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;background:#EEF2F7;padding:16px;border-radius:6px;margin-bottom:24px">'
  +'<div><div style="font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Billed To</div><div style="font-size:15px;font-weight:700">'+f.client+'</div><div style="font-size:12px;color:#6B7C8F">Project: '+f.project+'</div></div>'
  +'<div><div style="font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Milestone</div><div style="font-size:14px;font-weight:600">'+(f.milestone||'—')+'</div>'+(f.notes?'<div style="font-size:11px;color:#6B7C8F">'+f.notes+'</div>':'')+'</div>'
  +'</div>'
  +'<table style="margin-bottom:20px"><thead><tr style="background:#0F1923"><th style="padding:9px 12px;text-align:left;color:#E2B96F;font-size:10px;text-transform:uppercase;letter-spacing:0.08em">Description</th><th style="padding:9px 12px;text-align:right;color:#E2B96F;font-size:10px;text-transform:uppercase">Amount (₹)</th></tr></thead>'
  +'<tbody>'
  +'<tr><td style="padding:10px 12px;color:#3D3530">'+f.type+' — '+f.milestone+'</td><td style="padding:10px 12px;text-align:right;font-weight:600">₹'+base.toLocaleString("en-IN")+'</td></tr>'
  +'<tr style="background:#F5EFE2"><td style="padding:10px 12px;color:#6B7C8F">GST @ '+f.gst+'%</td><td style="padding:10px 12px;text-align:right">₹'+gstAmt.toLocaleString("en-IN")+'</td></tr>'
  +'</tbody></table>'
  +'<div style="margin-left:auto;width:280px">'
  +'<div style="display:flex;justify-content:space-between;padding:8px 12px;background:#EEF2F7;margin-bottom:2px"><span style="font-size:12px;color:#6B7C8F">Sub-Total</span><span style="font-weight:600">₹'+base.toLocaleString("en-IN")+'</span></div>'
  +'<div style="display:flex;justify-content:space-between;padding:8px 12px;background:#EEF2F7;margin-bottom:4px"><span style="font-size:12px;color:#6B7C8F">GST '+f.gst+'%</span><span style="font-weight:600">₹'+gstAmt.toLocaleString("en-IN")+'</span></div>'
  +'<div style="display:flex;justify-content:space-between;padding:10px 14px;background:#0F1923;border-radius:4px"><span style="font-weight:700;color:#fff;font-size:13px">TOTAL AMOUNT</span><span style="font-weight:700;color:#E2B96F;font-size:16px">₹'+total.toLocaleString("en-IN")+'</span></div>'
  +'</div>'
  +'<div style="margin-top:32px;padding-top:16px;border-top:1px solid #DDE4EE;font-size:11px;color:#6B7C8F;text-align:center">Innovations Interiors · Interior Design Consultants · Pune · Thank you for your business.</div>'
  +'</body></html>';
}

function previewInvoice(f){
  // Open in-app modal — no window.open needed (handled by state)
  return f; // caller sets previewItem state
}

function printInvoice(f){
  const html=generateInvoiceHTML(f);
  const filename="II_Invoice_"+(f.ref||"draft")+"_"+(f.client||"").replace(/[^a-zA-Z0-9]/g,"_")+".html";
  downloadBlobFile(html,filename);
}

function Finance({finance,setFinance,projects}){
  const [filter,setFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [previewItem,setPreviewItem]=useState(null);
  const [newF,setNewF]=useState({type:"Invoice",project:projects[0]?.name||"",client:"",amount:"",milestone:"",gst:18,dueDate:"",notes:"",status:"Draft"});
  const inp2={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};
  const FC={"Paid":C.green,"Received":C.green,"Pending":C.amber,"Overdue":C.red,"Draft":C.muted};

  const invoices=finance.filter(f=>f.type==="Invoice");
  const totalBilled=invoices.reduce((s,f)=>s+Number(f.amount||0),0);
  const collected=finance.filter(f=>["Paid","Received"].includes(f.status)).reduce((s,f)=>s+Number(f.amount||0),0);
  const outstanding=totalBilled-collected;
  const overdue=invoices.filter(f=>f.status==="Overdue").reduce((s,f)=>s+Number(f.amount||0),0);
  const shown=filter==="All"?finance:finance.filter(f=>f.status===filter||f.type===filter);

  function sendReminder(f){
    const p=projects.find(p=>p.name===f.project);
    const base=Number(f.amount||0);
    const gstAmt=Math.round(base*(Number(f.gst||0)/100));
    const msg="*INNOVATIONS INTERIORS*\n\nDear "+f.client+",\n\nThis is a payment reminder for invoice *"+f.ref+"*.\n\n▸ Milestone: "+f.milestone+"\n▸ Base Amount: ₹"+base.toLocaleString("en-IN")+"\n▸ GST ("+f.gst+"%): ₹"+gstAmt.toLocaleString("en-IN")+"\n▸ *Total Due: ₹"+(base+gstAmt).toLocaleString("en-IN")+"*\n▸ Due Date: "+f.dueDate+"\n\nKindly process the payment at your earliest convenience.\n\nFor any queries, please contact us.\n\n— Innovations Interiors, Pune";
    if(p?.clientPhone)openWhatsApp(p.clientPhone,msg);
    else{
      const num=prompt("Enter client WhatsApp number (10 digits):");
      if(num)openWhatsApp(num,msg);
    }
  }

  function gstAmount(f){return Math.round(Number(f.amount)*Number(f.gst||0)/100);}
  function totalWithGst(f){return Number(f.amount)+gstAmount(f);}

  return <div>
    {/* Invoice Preview Modal */}
    {previewItem&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(700px,95vw)",maxHeight:"85vh",overflow:"auto",boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
        <div style={{padding:"1rem 1.25rem",borderBottom:"0.5px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.ink}}>
          <div style={{fontSize:14,fontWeight:700,color:C.goldMid}}>Invoice Preview — {previewItem.ref}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>printInvoice(previewItem)} style={{fontSize:11,padding:"5px 12px",borderRadius:4,background:C.red,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📄 Print / PDF</button>
            <button onClick={()=>{const base=Number(previewItem.amount||0);const g=Math.round(base*(previewItem.gst/100));const msg="*INNOVATIONS INTERIORS*\nInvoice #"+previewItem.ref+"\n\nDear "+previewItem.client+",\n\nMilestone: "+previewItem.milestone+"\nAmount: ₹"+base.toLocaleString("en-IN")+"\nGST "+previewItem.gst+"%: ₹"+g.toLocaleString("en-IN")+"\n*Total: ₹"+(base+g).toLocaleString("en-IN")+"*\nDue: "+previewItem.dueDate+"\n\n— Innovations Interiors";const p=projects.find(x=>x.name===previewItem.project);if(p?.clientPhone)openWhatsApp(p.clientPhone,msg);else{const n=prompt("Client WhatsApp number:");if(n)openWhatsApp(n,msg);}}} style={{fontSize:11,padding:"5px 12px",borderRadius:4,background:"#25D366",color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📲 Send WhatsApp</button>
            <button onClick={()=>setPreviewItem(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
          </div>
        </div>
        <div style={{padding:"1.5rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",paddingBottom:16,borderBottom:"2px solid "+C.gold,marginBottom:20}}>
            <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600}}>Innovations Interiors</div><div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Interior Design Consultants · Pune</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:C.gold}}>{previewItem.type.toUpperCase()}</div><div style={{fontSize:13,fontWeight:600}}>#{previewItem.ref}</div><div style={{fontSize:11,color:C.muted}}>Date: {previewItem.date}</div>{previewItem.dueDate&&<div style={{fontSize:11,color:C.red,fontWeight:600}}>Due: {previewItem.dueDate}</div>}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,background:C.surface2,padding:14,borderRadius:6,marginBottom:20}}>
            <div><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Billed To</div><div style={{fontSize:14,fontWeight:700}}>{previewItem.client}</div><div style={{fontSize:11,color:C.muted}}>Project: {previewItem.project}</div></div>
            <div><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Milestone</div><div style={{fontSize:13,fontWeight:600}}>{previewItem.milestone||"—"}</div>{previewItem.notes&&<div style={{fontSize:11,color:C.muted}}>{previewItem.notes}</div>}</div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20}}>
            <thead><tr style={{background:C.ink}}><th style={{padding:"8px 12px",textAlign:"left",color:C.goldMid,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Description</th><th style={{padding:"8px 12px",textAlign:"right",color:C.goldMid,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Amount (₹)</th></tr></thead>
            <tbody>
              <tr style={{borderBottom:"0.5px solid "+C.border}}><td style={{padding:"10px 12px",color:C.inkSoft}}>{previewItem.type} — {previewItem.milestone}</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:600}}>₹{Number(previewItem.amount||0).toLocaleString("en-IN")}</td></tr>
              <tr style={{background:C.surface2,borderBottom:"0.5px solid "+C.border}}><td style={{padding:"10px 12px",color:C.muted}}>GST @ {previewItem.gst}%</td><td style={{padding:"10px 12px",textAlign:"right"}}>₹{gstAmount(previewItem).toLocaleString("en-IN")}</td></tr>
            </tbody>
          </table>
          <div style={{marginLeft:"auto",maxWidth:280}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"7px 12px",background:C.surface2,marginBottom:2}}><span style={{fontSize:11,color:C.muted}}>Sub-Total</span><span style={{fontWeight:600}}>₹{Number(previewItem.amount||0).toLocaleString("en-IN")}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"7px 12px",background:C.surface2,marginBottom:4}}><span style={{fontSize:11,color:C.muted}}>GST {previewItem.gst}%</span><span style={{fontWeight:600}}>₹{gstAmount(previewItem).toLocaleString("en-IN")}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:C.ink,borderRadius:4}}><span style={{fontWeight:700,color:"#fff",fontSize:13}}>TOTAL</span><span style={{fontWeight:700,color:C.goldMid,fontSize:16}}>₹{totalWithGst(previewItem).toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>}

    <Head title="💰 Finance & Invoicing" sub="Invoices · Receipts · Receivables · GST · Reminders" action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ New Invoice</Btn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Total Billed","₹"+(totalBilled/100000).toFixed(1)+"L",C.gold],["Collected","₹"+(collected/100000).toFixed(1)+"L",C.green],["Outstanding","₹"+(outstanding/100000).toFixed(1)+"L",C.amber],["Overdue","₹"+(overdue/100000).toFixed(1)+"L",C.red]].map(([k,v,c])=><div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.9rem",textAlign:"center"}}>
        <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{k}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:c}}>{v}</div>
      </div>)}
    </div>

    {showAdd&&<div style={{background:C.goldLight,border:"1px solid "+C.borderStrong,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        {[["type","Type",["Invoice","Receipt","Credit Note","Proforma"]],["project","Project",projects.map(p=>p.name)],["status","Status",["Draft","Pending","Paid","Overdue"]]].map(([k,l,opts])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><select value={newF[k]} onChange={e=>setNewF(d=>({...d,[k]:e.target.value}))} style={inp2}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>)}
        {[["client","Client Name"],["amount","Amount (₹)"],["milestone","Milestone"],["gst","GST %"],["dueDate","Due Date"],["notes","Notes"]].map(([k,l])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><input type={k==="dueDate"?"date":k==="amount"||k==="gst"?"number":"text"} value={newF[k]} onChange={e=>setNewF(d=>({...d,[k]:e.target.value}))} style={inp2}/></div>)}
      </div>
      {newF.amount&&<div style={{background:"#fff",borderRadius:6,padding:"0.75rem",marginBottom:10,display:"flex",gap:20}}>
        <div><div style={{fontSize:10,color:C.muted}}>BASE AMOUNT</div><div style={{fontSize:16,fontWeight:700}}>₹{Number(newF.amount||0).toLocaleString("en-IN")}</div></div>
        <div><div style={{fontSize:10,color:C.muted}}>GST ({newF.gst}%)</div><div style={{fontSize:16,fontWeight:700}}>₹{Math.round(Number(newF.amount||0)*Number(newF.gst||0)/100).toLocaleString("en-IN")}</div></div>
        <div><div style={{fontSize:10,color:C.muted}}>TOTAL</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.gold}}>₹{(Number(newF.amount||0)+Math.round(Number(newF.amount||0)*Number(newF.gst||0)/100)).toLocaleString("en-IN")}</div></div>
      </div>}
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={()=>{if(!newF.client)return;const ref=(newF.type==="Invoice"?"INV":newF.type==="Receipt"?"RCP":newF.type==="Proforma"?"PRO":"CRN")+"-2026-"+String(Math.floor(Math.random()*900+100));setFinance(fs=>[...fs,{...newF,id:Date.now(),ref,date:new Date().toISOString().split("T")[0]}]);setShowAdd(false);}}>Save</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </div>}

    <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
      {["All","Invoice","Receipt","Draft","Pending","Paid","Overdue"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===f?C.gold:C.border),background:filter===f?C.gold:"#fff",color:filter===f?"#fff":C.muted}}>
        {f} {f!=="All"&&"("+finance.filter(x=>x.status===f||x.type===f).length+")"}
      </button>)}
    </div>

    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,overflow:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:900}}>
        <thead><tr style={{background:C.surface2}}>
          {["Ref #","Type","Project / Client","Milestone","Amount","GST","Total","Due Date","Status","Actions"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,fontWeight:700,borderBottom:"0.5px solid "+C.border,whiteSpace:"nowrap"}}>{h}</th>)}
        </tr></thead>
        <tbody>{shown.map((f,i)=><tr key={f.id} style={{borderBottom:"0.5px solid "+C.border,background:i%2===0?"#fff":C.surface}}>
          <td style={{padding:"9px 12px",fontWeight:600,color:C.gold,whiteSpace:"nowrap"}}>{f.ref||"—"}</td>
          <td style={{padding:"9px 12px"}}><Tag label={f.type} color={C.blue}/></td>
          <td style={{padding:"9px 12px"}}><div style={{fontWeight:600,color:C.ink}}>{f.project}</div><div style={{fontSize:10,color:C.muted}}>{f.client}</div></td>
          <td style={{padding:"9px 12px",color:C.muted,fontSize:11,maxWidth:120}}>{f.milestone}</td>
          <td style={{padding:"9px 12px",fontWeight:600,whiteSpace:"nowrap"}}>₹{Number(f.amount||0).toLocaleString("en-IN")}</td>
          <td style={{padding:"9px 12px",color:C.muted}}>{f.gst}%</td>
          <td style={{padding:"9px 12px",fontWeight:700,color:C.gold,whiteSpace:"nowrap"}}>₹{totalWithGst(f).toLocaleString("en-IN")}</td>
          <td style={{padding:"9px 12px",color:f.status==="Overdue"?C.red:C.muted,whiteSpace:"nowrap"}}>{f.dueDate||"—"}</td>
          <td style={{padding:"9px 12px"}}><span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:3,background:(FC[f.status]||C.muted)+"18",color:FC[f.status]||C.muted,whiteSpace:"nowrap"}}>{f.status}</span></td>
          <td style={{padding:"9px 12px",whiteSpace:"nowrap"}}>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              <button onClick={()=>setPreviewItem(f)} style={{fontSize:10,padding:"3px 7px",background:C.blue,color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>👁 View</button>
              <button onClick={()=>printInvoice(f)} style={{fontSize:10,padding:"3px 7px",background:C.red,color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>📄 PDF</button>
              {["Pending","Overdue","Draft"].includes(f.status)&&<button onClick={()=>sendReminder(f)} style={{fontSize:10,padding:"3px 7px",background:"#25D366",color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>📲</button>}
              {!["Paid","Received"].includes(f.status)&&<button onClick={()=>setFinance(fs=>fs.map(x=>x.id===f.id?{...x,status:"Paid"}:x))} style={{fontSize:10,padding:"3px 7px",background:C.green,color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>✓ Paid</button>}
            </div>
          </td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}

// ── VENDORS ───────────────────────────────────────────────────────────────────
function Vendors({vendors,setVendors}){
  const [showAdd,setShowAdd]=useState(false);
  const [newV,setNewV]=useState({name:"",trade:"Flooring",contact:"",phone:"",email:"",rating:4,delivery:"High",quality:"Good",payment:"30 days",status:"Active",projects:[],totalBilled:0,outstanding:0});
  const inp2={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};
  const TRADES=["Flooring","Lighting","Carpentry","MEP","Soft Furnishings","Painting","Glass","Civil","Hardware","Modular Kitchen","Sanitary","Loose Furniture","Landscaping"];

  return <div>
    <Head title="🔧 Vendor Management" sub={vendors.length+" vendors · "+vendors.filter(v=>v.status==="Warning").length+" need review"} action={<Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Vendor</Btn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Total Vendors",vendors.length,C.gold],["Active",vendors.filter(v=>v.status==="Active").length,C.green],["Warning",vendors.filter(v=>v.status==="Warning").length,C.red],["Outstanding","₹"+(vendors.reduce((s,v)=>s+Number(v.outstanding||0),0)/100000).toFixed(1)+"L",C.amber]].map(([k,v,c])=><div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.75rem",textAlign:"center"}}>
        <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{k}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:c}}>{v}</div>
      </div>)}
    </div>

    {showAdd&&<div style={{background:C.goldLight,border:"1px solid "+C.borderStrong,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        {[["name","Vendor Name"],["contact","Contact Person"],["phone","Phone"],["email","Email"],["payment","Payment Terms"],["totalBilled","Total Billed (₹)"],["outstanding","Outstanding (₹)"]].map(([k,l])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><input value={newV[k]} onChange={e=>setNewV(d=>({...d,[k]:e.target.value}))} style={inp2}/></div>)}
        {[["trade","Trade",TRADES],["delivery","Delivery Reliability",["High","Medium","Low"]],["quality","Quality Rating",["Excellent","Good","Average","Poor"]],["status","Status",["Active","Warning","Blacklisted"]]].map(([k,l,opts])=><div key={k}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{l}</div><select value={newV[k]} onChange={e=>setNewV(d=>({...d,[k]:e.target.value}))} style={inp2}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>)}
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={()=>{if(!newV.name)return;setVendors(vs=>[...vs,{...newV,id:Date.now()}]);setShowAdd(false);}}>Save Vendor</Btn>
        <Btn v="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </div>}

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {vendors.map(v=>{
        const qCol={"Excellent":C.green,"Good":C.gold,"Average":C.amber,"Poor":C.red}[v.quality]||C.muted;
        const sCol=v.status==="Active"?C.green:v.status==="Warning"?C.red:"#444";
        return <div key={v.id} style={{background:"#fff",border:"0.5px solid "+(v.status==="Warning"?C.red:C.border),borderRadius:8,padding:"1rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.ink}}>{v.name}</div>
              <div style={{fontSize:11,color:C.muted}}>{v.trade} · {v.contact}</div>
              <div style={{fontSize:11,color:C.muted}}>📱 {v.phone}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:3,background:sCol+"18",color:sCol}}>{v.status}</span>
              <div style={{fontSize:18,fontWeight:700,color:C.gold,fontFamily:"'Cormorant Garamond',serif",marginTop:4}}>{"★".repeat(Math.floor(v.rating||4))}</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[["Quality",v.quality,qCol],["Delivery",v.delivery,v.delivery==="High"?C.green:v.delivery==="Medium"?C.amber:C.red],["Payment",v.payment,C.muted]].map(([l,val,c])=><div key={l} style={{background:C.surface2,borderRadius:4,padding:"5px 8px",textAlign:"center"}}>
              <div style={{fontSize:9,color:C.muted,textTransform:"uppercase"}}>{l}</div>
              <div style={{fontSize:12,fontWeight:600,color:c}}>{val}</div>
            </div>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted}}>
            <span>Billed: <strong style={{color:C.ink}}>₹{Number(v.totalBilled||0).toLocaleString("en-IN")}</strong></span>
            <span>Outstanding: <strong style={{color:Number(v.outstanding||0)>0?C.red:C.green}}>₹{Number(v.outstanding||0).toLocaleString("en-IN")}</strong></span>
          </div>
          {v.projects?.length>0&&<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:4}}>
            {v.projects.map(p=><span key={p} style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:C.blueLight,color:C.blue,fontWeight:600}}>{p}</span>)}
          </div>}
          <div style={{display:"flex",gap:6,marginTop:10}}>
            <button onClick={()=>openWhatsApp(v.phone,"Hi "+v.contact+", this is Innovations Interiors. We'd like to discuss your services for our upcoming projects. — Innovations Interiors")} style={{fontSize:10,padding:"3px 8px",background:"#25D366",color:"#fff",border:"none",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>📲 WhatsApp</button>
            {v.status!=="Warning"&&<button onClick={()=>setVendors(vs=>vs.map(x=>x.id===v.id?{...x,status:"Warning"}:x))} style={{fontSize:10,padding:"3px 8px",background:C.red+"22",color:C.red,border:"0.5px solid "+C.red+"44",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>⚠ Flag</button>}
            {v.status==="Warning"&&<button onClick={()=>setVendors(vs=>vs.map(x=>x.id===v.id?{...x,status:"Active"}:x))} style={{fontSize:10,padding:"3px 8px",background:C.greenLight,color:C.green,border:"0.5px solid "+C.green+"44",borderRadius:3,cursor:"pointer",fontFamily:"inherit"}}>✓ Restore</button>}
          </div>
        </div>;
      })}
    </div>
  </div>;
}

// ── PERFORMANCE MANAGEMENT ────────────────────────────────────────────────────
const PERF_COLOR={"Outstanding":C.green,"Excellent":C.blue,"Good":C.gold,"Needs Improvement":C.amber,"Critical":C.red};
const PERF_BG={"Outstanding":C.greenLight,"Excellent":C.blueLight,"Good":C.goldLight,"Needs Improvement":C.amberLight,"Critical":C.redLight};

function PerfBar({label,value}){
  const col=value>=80?C.green:value>=70?C.gold:value>=60?C.amber:C.red;
  return <div style={{marginBottom:8}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
      <span style={{color:C.muted}}>{label}</span>
      <span style={{fontWeight:700,color:col}}>{value}%</span>
    </div>
    <div style={{height:6,background:C.surface3,borderRadius:6,overflow:"hidden"}}>
      <div style={{height:"100%",width:value+"%",background:col,borderRadius:6,transition:"width 0.5s"}}/>
    </div>
  </div>;
}

function Performance({perf,setPerf}){
  const [selected,setSelected]=useState(null);
  const [deptFilter,setDeptFilter]=useState("All");
  const [comment,setComment]=useState("");
  const [sortBy,setSortBy]=useState("overallScore");

  const depts=["All","Design","Execution","Management"];
  const shown=[...perf]
    .filter(p=>deptFilter==="All"||p.dept===deptFilter)
    .sort((a,b)=>sortBy==="overallScore"?b.overallScore-a.overallScore:a.name.localeCompare(b.name));

  const avg=Math.round(perf.reduce((s,p)=>s+p.overallScore,0)/perf.length);
  const top=[...perf].sort((a,b)=>b.overallScore-a.overallScore)[0];
  const low=[...perf].sort((a,b)=>a.overallScore-b.overallScore)[0];
  const outstanding=perf.filter(p=>p.rating==="Outstanding").length;
  const needsAttn=perf.filter(p=>["Needs Improvement","Critical"].includes(p.rating)).length;

  // Detail view
  if(selected){
    const p=perf.find(x=>x.id===selected);
    if(!p)return null;
    const rc=PERF_COLOR[p.rating]||C.gold;
    const rb=PERF_BG[p.rating]||C.goldLight;
    const tm=ALL_TEAM_MEMBERS.find(m=>m.name===p.name);
    return <div>
      <button onClick={()=>{setSelected(null);setComment("");}} style={{background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,marginBottom:"1rem",fontFamily:"inherit"}}>← Back to Team</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.5rem"}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:rc+"22",border:"2px solid "+rc+"55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:rc}}>{p.name.slice(0,2)}</div>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,color:C.ink}}>{p.name}</div>
            <div style={{fontSize:12,color:C.muted}}>{p.role} · {p.dept} Dept</div>
            <div style={{fontSize:12,color:C.muted}}>Reporting to: {p.manager}</div>
            {tm&&<div style={{fontSize:11,color:C.muted}}>📱 {tm.phone}</div>}
          </div>
        </div>
        <div style={{textAlign:"center",background:rb,borderRadius:10,padding:"1rem 1.5rem",border:"1px solid "+rc+"33"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:44,fontWeight:700,color:rc,lineHeight:1}}>{p.overallScore}</div>
          <div style={{fontSize:12,fontWeight:700,color:rc,marginTop:4}}>{p.rating}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>Overall Score</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:"1rem"}}>
        <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>Performance Breakdown</div>
          <PerfBar label="KPI Achievement" value={p.kpiScore}/>
          <PerfBar label="KRA Achievement" value={p.kraScore}/>
          <PerfBar label="Follow-up Compliance" value={p.followUpScore}/>
          <PerfBar label="SOP Compliance" value={p.sopScore}/>
          <PerfBar label="Daily Reporting Quality" value={p.reportScore}/>
          <PerfBar label="Task Completion Rate" value={p.taskScore}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:10}}>Task & Escalation Summary</div>
            {[["Pending Tasks",p.pendingTasks,C.amber],["Overdue Tasks",p.overdueTasks,p.overdueTasks>0?C.red:C.green],["Escalations This Month",p.escalations,p.escalations>0?C.red:C.green],["Performance Trend",p.trend==="up"?"↑ Improving":p.trend==="down"?"↓ Declining":"→ Stable",p.trend==="up"?C.green:p.trend==="down"?C.red:C.muted]].map(([k,v,c])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"0.5px solid "+C.border}}>
              <span style={{fontSize:12,color:C.muted}}>{k}</span><span style={{fontWeight:700,color:c}}>{v}</span>
            </div>)}
          </div>
          <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem",flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:8}}>Manager Comment</div>
            <div style={{fontSize:12,color:C.inkSoft,marginBottom:10,lineHeight:1.6,background:C.surface2,borderRadius:4,padding:"0.5rem 0.75rem"}}>{p.comment||"No comment yet."}</div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder="Add manager comment or corrective action..."
              style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:C.surface,resize:"vertical",outline:"none"}}/>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
              <Btn sm onClick={()=>{if(!comment)return;setPerf(ps=>ps.map(x=>x.id===p.id?{...x,comment}:x));setComment("");}}>Save Comment</Btn>
              <Btn sm v="ghost" onClick={()=>setPerf(ps=>ps.map(x=>x.id===p.id?{...x,overallScore:Math.min(100,x.overallScore+2),rating:x.overallScore+2>=90?"Outstanding":x.overallScore+2>=80?"Excellent":x.overallScore+2>=70?"Good":x.overallScore+2>=60?"Needs Improvement":"Critical"}:x))}>↑ +2pts</Btn>
              <Btn sm v="danger" onClick={()=>setPerf(ps=>ps.map(x=>x.id===p.id?{...x,overallScore:Math.max(0,x.overallScore-2),rating:x.overallScore-2>=90?"Outstanding":x.overallScore-2>=80?"Excellent":x.overallScore-2>=70?"Good":x.overallScore-2>=60?"Needs Improvement":"Critical"}:x))}>↓ −2pts</Btn>
              {tm&&<button onClick={()=>openWhatsApp(tm.phone,"Hi "+p.name+", this is a performance review reminder from Innovations Interiors. Your current score is "+p.overallScore+"/100 ("+p.rating+"). Please connect with your manager for feedback. — Innovations Interiors")} style={{fontSize:11,padding:"4px 10px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📲 Notify</button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // List view
  return <div>
    <Head title="📈 Employee Performance" sub={"All "+perf.length+" team members · KPIs · KRAs · SOP compliance"}/>

    {/* Summary KPIs */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Team Avg Score",avg+"%",C.gold],["Outstanding",outstanding+" members",C.green],["Need Attention",needsAttn+" members",C.red],["Top Performer",top?.name,C.blue],["Department",perf.filter(p=>p.dept==="Design").length+" Design / "+perf.filter(p=>p.dept==="Execution").length+" Exec / "+perf.filter(p=>p.dept==="Management").length+" Mgmt",C.muted]].map(([k,v,c])=>
        <div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{k}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:k==="Top Performer"||k==="Department"?14:22,fontWeight:700,color:c,lineHeight:1.2}}>{v}</div>
        </div>)}
    </div>

    {/* Filters & sort */}
    <div style={{display:"flex",gap:8,marginBottom:"1rem",alignItems:"center",flexWrap:"wrap"}}>
      {depts.map(d=><button key={d} onClick={()=>setDeptFilter(d)} style={{padding:"5px 14px",borderRadius:4,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(deptFilter===d?C.gold:C.border),background:deptFilter===d?C.gold:"#fff",color:deptFilter===d?"#fff":C.muted,fontWeight:deptFilter===d?700:400}}>
        {d} {d!=="All"&&"("+perf.filter(p=>p.dept===d).length+")"}
      </button>)}
      <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:11,color:C.muted}}>Sort:</span>
        {[["overallScore","By Score"],["name","By Name"]].map(([v,l])=>
          <button key={v} onClick={()=>setSortBy(v)} style={{padding:"4px 10px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(sortBy===v?C.blue:C.border),background:sortBy===v?C.blue:"#fff",color:sortBy===v?"#fff":C.muted}}>{l}</button>)}
      </div>
    </div>

    {/* Member Grid — all 18 */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      {shown.map(p=>{
        const rc=PERF_COLOR[p.rating]||C.gold;
        const tm=ALL_TEAM_MEMBERS.find(m=>m.name===p.name);
        return <div key={p.id} onClick={()=>setSelected(p.id)} style={{background:"#fff",border:"0.5px solid "+(p.rating==="Outstanding"?C.green:p.rating==="Critical"?C.red:C.border),borderRadius:8,padding:"1rem",cursor:"pointer",transition:"box-shadow 0.15s"}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow="0 3px 16px "+C.border}
          onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:rc+"22",border:"1.5px solid "+rc+"55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:rc,flexShrink:0}}>{p.name.slice(0,2)}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{p.name}</div>
                <div style={{fontSize:10,color:C.muted}}>{p.role}</div>
                <div style={{fontSize:9,color:C.muted,marginTop:1}}>Manager: {p.manager}</div>
              </div>
            </div>
            <div style={{textAlign:"center",flexShrink:0}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:rc,lineHeight:1}}>{p.overallScore}</div>
              <span style={{fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:3,background:rc+"18",color:rc}}>{p.rating}</span>
            </div>
          </div>
          {/* Mini bars */}
          <div style={{marginBottom:8}}>
            {[["KPI",p.kpiScore],["Follow-up",p.followUpScore],["Tasks",p.taskScore]].map(([l,v])=><div key={l} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <span style={{fontSize:9,color:C.muted,width:52,flexShrink:0}}>{l}</span>
              <div style={{flex:1,height:4,background:C.surface3,borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:v+"%",background:v>=80?C.green:v>=70?C.gold:C.red,borderRadius:4}}/>
              </div>
              <span style={{fontSize:9,fontWeight:700,color:v>=80?C.green:v>=70?C.gold:C.red,minWidth:24}}>{v}%</span>
            </div>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted}}>
            <span style={{color:p.overdueTasks>0?C.red:C.green}}>⏱ {p.overdueTasks} overdue</span>
            <span style={{color:p.trend==="up"?C.green:p.trend==="down"?C.red:C.muted}}>{p.trend==="up"?"↑ Improving":p.trend==="down"?"↓ Declining":"→ Stable"}</span>
            <span style={{color:C.blue}}>{p.dept}</span>
          </div>
        </div>;
      })}
    </div>
  </div>;
}

// ── PROPOSALS (COMPREHENSIVE BOQ ESTIMATOR) ────────────────────────────────────
function Proposals({proposals,setProposals}){
  const [view,setView]=useState("list");
  const [detailId,setDetailId]=useState(null);
  const [waPreview,setWaPreview]=useState(null); // {phone, msg}
  const sectors=Object.keys(ROOM_TEMPLATES);
  const [meta,setMeta]=useState({
    client:"",phone:"",address:"",sector:"Residential",
    projectType:Object.keys(ROOM_TEMPLATES.Residential)[0],
    date:new Date().toISOString().split("T")[0],validDays:30,
    designer:"",taxPct:18,discount:0,designFee:75000,
    notes:"Above rates are approximate. Actual estimate may vary as per material selection, measurements and design.",
    status:"Draft",followUp:"",
  });
  const [rooms,setRooms]=useState([]);

  // Build WhatsApp message for any proposal object
  function buildWAMsg(p){
    const g=p.rooms?p.rooms.reduce((s,r)=>s+r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0),0):0;
    const df=Number(p.designFee||0);const d=g+df;
    const disc=d*(1-Number(p.discount||0)/100);
    const final=disc*(1+Number(p.taxPct||18)/100);
    return "*INNOVATIONS INTERIORS*\n_Interior Design Estimate_\n\n*Client:* "+p.client
      +"\n*Project:* "+p.projectType
      +(p.address?"\n*Address:* "+p.address:"")
      +"\n*Date:* "+p.date+" | *Valid:* "+p.validDays+" days"
      +"\n\n*ROOM-WISE SUMMARY:*\n"
      +(p.rooms||[]).map(r=>{const t=r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0);return t>0?"▸ "+r.room+": *₹"+t.toLocaleString("en-IN")+"*":""}).filter(Boolean).join("\n")
      +"\n\n━━━━━━━━━━━━━━"
      +"\nWork Sub-Total: ₹"+g.toLocaleString("en-IN")
      +"\nDesign Fee: ₹"+df.toLocaleString("en-IN")
      +(p.discount>0?"\nDiscount ("+p.discount+"%): −₹"+(d-disc).toLocaleString("en-IN"):"")
      +"\nGST "+p.taxPct+"%: ₹"+Math.round(disc*(Number(p.taxPct)||18)/100).toLocaleString("en-IN")
      +"\n\n*GRAND TOTAL: ₹"+Math.round(final).toLocaleString("en-IN")+"*"
      +"\n━━━━━━━━━━━━━━"
      +"\n\n_"+(p.notes||"")+"_"
      +"\n\n— "+(p.designer||"Innovations Interiors")+"\n*Innovations Interiors, Pune*";
  }

  function openWAPreview(p){
    const msg=buildWAMsg(p);
    const phone=(p.phone||"").replace(/\D/g,"");
    setWaPreview({phone, msg, proposal:p});
  }

  function sendWA(phone, msg){
    const clean=phone.replace(/\D/g,"");
    if(clean){
      const num=clean.startsWith("91")?clean:"91"+clean;
      const url="https://wa.me/"+num+"?text="+encodeURIComponent(msg);
      try{ window.open(url,"_blank"); }
      catch(e){ navigator.clipboard.writeText(msg).then(()=>alert("Message copied! Open WhatsApp and paste.")); }
    } else {
      navigator.clipboard.writeText(msg).then(()=>alert("Message copied to clipboard!\nOpen WhatsApp and paste.")).catch(()=>alert("Copy the message above and paste in WhatsApp."));
    }
    setWaPreview(null);
  }

  function loadTemplate(){
    const tmpl=ROOM_TEMPLATES[meta.sector]?.[meta.projectType];
    if(!tmpl){alert("No template for this combination.");return;}
    setRooms(tmpl.map((r,ri)=>({...r,id:ri+1,items:r.items.map((it,ii)=>({...it,id:ii+1,include:true}))})));
  }
  function updateItem(rid,iid,f,v){setRooms(rs=>rs.map(r=>r.id!==rid?r:{...r,items:r.items.map(it=>it.id!==iid?it:{...it,[f]:f==="qty"||f==="rate"?Number(v):v})}));}
  function addItem(rid){setRooms(rs=>rs.map(r=>r.id!==rid?r:{...r,items:[...r.items,{id:Date.now(),desc:"New Item",unit:"Lump",qty:1,rate:0,include:true}]}));}
  function addRoom(){setRooms(rs=>[...rs,{id:Date.now(),room:"New Room",items:[{id:Date.now(),desc:"New Item",unit:"Lump",qty:1,rate:0,include:true}]}]);}
  function removeItem(rid,iid){setRooms(rs=>rs.map(r=>r.id!==rid?r:{...r,items:r.items.filter(it=>it.id!==iid)}));}

  const roomTotal=r=>r.items.filter(it=>it.include).reduce((s,it)=>s+(it.qty||0)*(it.rate||0),0);
  const grandTotal=()=>rooms.reduce((s,r)=>s+roomTotal(r),0);
  const withDesign=()=>grandTotal()+Number(meta.designFee||0);
  const discounted=()=>withDesign()*(1-Number(meta.discount||0)/100);
  const withTax=()=>discounted()*(1+Number(meta.taxPct||0)/100);

  function saveProposal(){
    if(!meta.client){alert("Please enter client name.");return;}
    if(rooms.length===0){alert("Please load a template or add rooms.");return;}
    const p={...meta,id:Date.now(),rooms:rooms.map(r=>({...r,items:r.items.map(it=>({...it}))})),total:withTax(),savedAt:new Date().toISOString()};
    setProposals(ps=>[...ps,p]);
    setView("list");
    setRooms([]);
    setMeta({client:"",phone:"",address:"",sector:"Residential",projectType:Object.keys(ROOM_TEMPLATES.Residential)[0],date:new Date().toISOString().split("T")[0],validDays:30,designer:"",taxPct:18,discount:0,designFee:75000,notes:"Above rates are approximate. Actual estimate may vary as per material selection, measurements and design.",status:"Draft",followUp:""});
  }

  const inp={padding:"6px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none"};
  const lbl={fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"};

  // ── LIST ──
  if(view==="list") return <div>
    {/* WhatsApp Preview Modal */}
    {waPreview&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(520px,95vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden"}}>
        <div style={{padding:"0.9rem 1.25rem",background:"#075E54",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>📲 WhatsApp Preview</div>
          <button onClick={()=>setWaPreview(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"1rem"}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Message that will be sent:</div>
          <div style={{background:"#ECE5DD",borderRadius:8,padding:"0.9rem",fontSize:12,color:"#1a1a1a",lineHeight:1.7,whiteSpace:"pre-wrap",maxHeight:280,overflowY:"auto",fontFamily:"inherit"}}>{waPreview.msg}</div>
          <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
            <div style={{fontSize:10,color:C.muted}}>To:</div>
            <input value={waPreview.phone} onChange={e=>setWaPreview(v=>({...v,phone:e.target.value}))} placeholder="Enter WhatsApp number (10 digits)"
              style={{flex:1,padding:"6px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
          </div>
        </div>
        <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid "+C.border,display:"flex",gap:8}}>
          <button onClick={()=>sendWA(waPreview.phone,waPreview.msg)} style={{flex:1,padding:"8px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>
            📲 Open WhatsApp & Send
          </button>
          <button onClick={()=>{
            navigator.clipboard.writeText(waPreview.msg)
              .then(()=>alert("✅ Message copied to clipboard!\n\nNow open WhatsApp and paste."))
              .catch(()=>alert("Copy the message manually from above."));
          }} style={{padding:"8px 14px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📋 Copy</button>
          <button onClick={()=>setWaPreview(null)} style={{padding:"8px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>}

    <Head title="💼 BOQ Quotation Estimator" sub={proposals.length+" quotations · "+proposals.filter(p=>p.status==="Won").length+" won"} action={<Btn onClick={()=>setView("build")}>+ New Quotation</Btn>}/>
    {proposals.length===0&&<div style={{textAlign:"center",padding:"3rem",color:C.muted,fontSize:13,background:"#fff",borderRadius:8,border:"0.5px solid "+C.border}}>
      No quotations yet. Click <strong>+ New Quotation</strong> to build a comprehensive room-by-room BOQ estimate.
    </div>}
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {proposals.map(p=>{
        const g=p.rooms?p.rooms.reduce((s,r)=>s+r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0),0):0;
        const final=p.total||g;
        const statusColors={"Draft":C.muted,"Sent":C.amber,"Negotiation":C.purple,"Won":C.green,"Lost":C.red};
        return <div key={p.id} style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:C.ink}}>{p.client}</div>
              <div style={{fontSize:11,color:C.muted}}>{p.sector} · {p.projectType}{p.address?" · "+p.address:""}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>Date: {p.date} · Valid: {p.validDays} days{p.designer?" · "+p.designer:""}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <Tag label={p.status} color={statusColors[p.status]||C.muted}/>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:700,color:C.gold,marginTop:6}}>₹{(final/100000).toFixed(2)}L</div>
              <div style={{fontSize:10,color:C.muted}}>incl. GST {p.taxPct}%</div>
            </div>
          </div>
          {p.rooms&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
            {p.rooms.map(r=>{const t=r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0);return t>0&&<span key={r.id} style={{fontSize:10,padding:"3px 8px",borderRadius:3,background:C.surface2,color:C.inkSoft}}>
              {r.room}: <strong>₹{(t/1000).toFixed(0)}K</strong>
            </span>;})}
          </div>}
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <Btn sm v="wa" onClick={()=>{openWAPreview(p);setProposals(ps=>ps.map(x=>x.id===p.id?{...x,status:"Sent"}:x));}}>📲 Share on WhatsApp</Btn>
            <button onClick={()=>downloadBlobFile(generatePDFHTML(p),"II_Quotation_"+(p.client||"draft").replace(/[^a-zA-Z0-9]/g,"_")+"_"+p.date+".html")} style={{fontSize:11,padding:"4px 12px",borderRadius:4,background:C.red,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📄 Download PDF</button>
            <Btn sm v="ghost" onClick={()=>{setDetailId(p.id);setView("detail");}}>👁 Full BOQ</Btn>
            <select value={p.status} onChange={e=>setProposals(ps=>ps.map(x=>x.id===p.id?{...x,status:e.target.value}:x))}
              style={{padding:"4px 8px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:11,fontFamily:"inherit",background:"#fff",marginLeft:"auto"}}>
              {["Draft","Sent","Negotiation","Won","Lost"].map(s=><option key={s}>{s}</option>)}
            </select>
            <button onClick={()=>setProposals(ps=>ps.filter(x=>x.id!==p.id))} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:11}}>🗑 Delete</button>
          </div>
        </div>;
      })}
    </div>
  </div>;

  // ── DETAIL ──
  if(view==="detail"){
    const p=proposals.find(x=>x.id===detailId);
    if(!p)return null;
    const g=p.rooms?p.rooms.reduce((s,r)=>s+r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0),0):0;
    const df=Number(p.designFee||0);const d=g+df;
    const disc=d*(1-Number(p.discount||0)/100);
    const tax=disc*(Number(p.taxPct||18)/100);
    const final=disc+tax;
    return <div>
      {waPreview&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
        <div style={{background:"#fff",borderRadius:10,width:"min(520px,95vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden"}}>
          <div style={{padding:"0.9rem 1.25rem",background:"#075E54",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>📲 WhatsApp Preview</div>
            <button onClick={()=>setWaPreview(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
          </div>
          <div style={{padding:"1rem"}}>
            <div style={{background:"#ECE5DD",borderRadius:8,padding:"0.9rem",fontSize:12,color:"#1a1a1a",lineHeight:1.7,whiteSpace:"pre-wrap",maxHeight:280,overflowY:"auto"}}>{waPreview.msg}</div>
            <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
              <div style={{fontSize:10,color:C.muted}}>To:</div>
              <input value={waPreview.phone} onChange={e=>setWaPreview(v=>({...v,phone:e.target.value}))} placeholder="WhatsApp number (10 digits)"
                style={{flex:1,padding:"6px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
            </div>
          </div>
          <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid "+C.border,display:"flex",gap:8}}>
            <button onClick={()=>sendWA(waPreview.phone,waPreview.msg)} style={{flex:1,padding:"8px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>📲 Open WhatsApp & Send</button>
            <button onClick={()=>navigator.clipboard.writeText(waPreview.msg).then(()=>alert("✅ Copied! Paste in WhatsApp.")).catch(()=>alert("Select and copy the message above."))} style={{padding:"8px 14px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📋 Copy</button>
            <button onClick={()=>setWaPreview(null)} style={{padding:"8px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      </div>}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",alignItems:"center"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{flex:1}}/>
        <Btn v="wa" onClick={()=>{openWAPreview(p);setProposals(ps=>ps.map(x=>x.id===p.id?{...x,status:"Sent"}:x));}}>📲 Share on WhatsApp</Btn>
        <button onClick={()=>downloadBlobFile(generatePDFHTML(p),"II_Quotation_"+(p.client||"draft").replace(/[^a-zA-Z0-9]/g,"_")+"_"+p.date+".html")} style={{fontSize:12,padding:"7px 16px",borderRadius:4,background:C.red,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📄 Download PDF</button>
      </div>
      <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1.5rem",paddingBottom:"1rem",borderBottom:"2px solid "+C.gold}}>
          <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:C.ink}}>Innovations Interiors</div><div style={{fontSize:11,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Interior Design Consultants · Pune</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold}}>INTERIOR DESIGN ESTIMATE</div><div style={{fontSize:11,color:C.muted}}>Date: {p.date} · Valid: {p.validDays} days</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:"1.5rem",padding:"1rem",background:C.surface2,borderRadius:6}}>
          <div><div style={lbl}>Client</div><div style={{fontSize:14,fontWeight:700}}>{p.client}</div>{p.address&&<div style={{fontSize:11,color:C.muted}}>{p.address}</div>}{p.phone&&<div style={{fontSize:11,color:C.muted}}>📱 {p.phone}</div>}</div>
          <div><div style={lbl}>Project</div><div style={{fontSize:13,fontWeight:700}}>{p.projectType}</div><div style={{fontSize:11,color:C.muted}}>{p.sector}</div>{p.designer&&<div style={{fontSize:11,color:C.muted}}>Designer: {p.designer}</div>}</div>
        </div>
        {p.rooms&&p.rooms.map(r=>{
          const rt=r.items.filter(i=>i.include).reduce((a,it)=>a+it.qty*it.rate,0);
          if(rt===0)return null;
          return <div key={r.id} style={{marginBottom:"1rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",background:C.ink,color:"#fff",padding:"7px 12px",borderRadius:"4px 4px 0 0",fontSize:12,fontWeight:700}}>
              <span>{r.room}</span><span>₹{rt.toLocaleString("en-IN")}</span>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:C.surface2}}>
                {["Description","Unit","Qty","Rate (₹)","Amount (₹)"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:h.includes("₹")||h==="Qty"?"right":"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em",color:C.muted,fontWeight:600,borderBottom:"0.5px solid "+C.border}}>{h}</th>)}
              </tr></thead>
              <tbody>{r.items.filter(i=>i.include).map((it,i)=><tr key={it.id} style={{borderBottom:"0.5px solid "+C.border,background:i%2===0?"#fff":C.surface}}>
                <td style={{padding:"7px 10px",color:C.inkSoft}}>{it.desc}</td>
                <td style={{padding:"7px 10px",color:C.muted,textAlign:"center"}}>{it.unit}</td>
                <td style={{padding:"7px 10px",textAlign:"right",fontWeight:500}}>{it.qty}</td>
                <td style={{padding:"7px 10px",textAlign:"right"}}>₹{it.rate.toLocaleString("en-IN")}</td>
                <td style={{padding:"7px 10px",fontWeight:700,textAlign:"right"}}>₹{(it.qty*it.rate).toLocaleString("en-IN")}</td>
              </tr>)}</tbody>
            </table>
          </div>;
        })}
        <div style={{marginLeft:"auto",maxWidth:340,marginTop:"1rem"}}>
          {[["Work Sub-Total",g],["Design & Coordination Fee",df],p.discount>0?["Discount ("+p.discount+"%)","−₹"+(d-disc).toLocaleString("en-IN")]:null,["GST "+p.taxPct+"%",tax]].filter(Boolean).map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 12px",background:C.surface2,marginBottom:2}}>
            <span style={{fontSize:11,color:C.inkSoft}}>{k}</span><span style={{fontSize:11,fontWeight:600}}>{typeof v==="number"?"₹"+Math.round(v).toLocaleString("en-IN"):v}</span>
          </div>)}
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:C.ink,borderRadius:4,marginTop:4}}>
            <span style={{fontWeight:700,color:"#fff",fontSize:13}}>GRAND TOTAL</span>
            <span style={{fontWeight:700,color:C.goldMid,fontSize:16}}>₹{Math.round(final).toLocaleString("en-IN")}</span>
          </div>
        </div>
        {p.notes&&<div style={{marginTop:"1.5rem",padding:"0.75rem",background:C.goldLight,borderRadius:4,fontSize:11,color:C.inkSoft}}><strong>Note:</strong> {p.notes}</div>}
      </div>
    </div>;
  }

  // ── BUILD ──
  const gt=grandTotal(),df2=Number(meta.designFee||0),wd=gt+df2,disc2=wd*(1-Number(meta.discount||0)/100),final2=disc2*(1+Number(meta.taxPct||0)/100);
  return <div>
    {/* WhatsApp Preview Modal — shown from build view too */}
    {waPreview&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(520px,95vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden"}}>
        <div style={{padding:"0.9rem 1.25rem",background:"#075E54",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>📲 WhatsApp Preview</div>
          <button onClick={()=>setWaPreview(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"1rem"}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Message preview — edit number then send:</div>
          <div style={{background:"#ECE5DD",borderRadius:8,padding:"0.9rem",fontSize:12,color:"#1a1a1a",lineHeight:1.7,whiteSpace:"pre-wrap",maxHeight:260,overflowY:"auto"}}>{waPreview.msg}</div>
          <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
            <div style={{fontSize:10,color:C.muted}}>To:</div>
            <input value={waPreview.phone} onChange={e=>setWaPreview(v=>({...v,phone:e.target.value}))} placeholder="WhatsApp number (10 digits)"
              style={{flex:1,padding:"6px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
          </div>
        </div>
        <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid "+C.border,display:"flex",gap:8}}>
          <button onClick={()=>sendWA(waPreview.phone,waPreview.msg)} style={{flex:1,padding:"8px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>📲 Open WhatsApp & Send</button>
          <button onClick={()=>navigator.clipboard.writeText(waPreview.msg).then(()=>alert("✅ Copied! Paste in WhatsApp.")).catch(()=>alert("Select and copy the message above."))} style={{padding:"8px 14px",background:C.ink,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>📋 Copy</button>
          <button onClick={()=>setWaPreview(null)} style={{padding:"8px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>}
    <button onClick={()=>setView("list")} style={{background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,marginBottom:"1rem",fontFamily:"inherit"}}>← Back to Quotations</button>
    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600,color:C.ink,marginBottom:"1rem"}}>New BOQ Quotation</div>

    {/* ── STICKY ACTION BAR — always visible ── */}
    <div style={{position:"sticky",top:56,zIndex:8,background:C.ink,borderRadius:8,padding:"0.85rem 1.25rem",marginBottom:"1rem",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",boxShadow:"0 4px 20px rgba(15,25,35,0.3)"}}>
      <div style={{flex:1,minWidth:200}}>
        {rooms.length>0
          ?<div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Work Total</div><div style={{fontSize:18,fontWeight:700,color:C.goldMid}}>₹{(gt/100000).toFixed(2)}L</div></div>
              <div style={{fontSize:18,color:"rgba(255,255,255,0.2)"}}>+</div>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Design Fee</div><div style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>₹{(df2/100000).toFixed(2)}L</div></div>
              <div style={{fontSize:18,color:"rgba(255,255,255,0.2)"}}>=</div>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Grand Total incl. {meta.taxPct}% GST</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"#fff"}}>₹{(final2/100000).toFixed(2)}L</div></div>
            </div>
          :<div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Load a template below to see live totals</div>}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
        <button onClick={()=>{
            if(!meta.client){alert("Step 1: Enter client name in the form below.");return;}
            if(rooms.length===0){alert("Step 2: Click '📋 Load Template' button below first.");return;}
            saveProposal();
          }} style={{padding:"8px 16px",borderRadius:5,background:C.green,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13}}>
          💾 Save & Add to Quotations
        </button>
        <button onClick={()=>{
            if(!meta.client){alert("Enter client name first.");return;}
            if(rooms.length===0){alert("Load a template first — click '📋 Load Template'.");return;}
            openWAPreview({...meta,id:0,rooms,total:final2});
          }} style={{padding:"8px 16px",borderRadius:5,background:"#25D366",color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13}}>
          📲 Preview on WhatsApp
        </button>
        <button onClick={()=>{
            if(!meta.client){alert("Enter client name first.");return;}
            if(rooms.length===0){alert("Load a template first — click '📋 Load Template'.");return;}
            downloadBlobFile(generatePDFHTML({...meta,id:0,rooms,total:final2}),"II_Quote_"+(meta.client||"draft").replace(/[^a-zA-Z0-9]/g,"_")+".html");
          }} style={{padding:"8px 16px",borderRadius:5,background:C.red,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13}}>
          📄 Preview PDF
        </button>
      </div>
    </div>

    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>Client & Project Details</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
        {[["Client Name","client","text"],["WhatsApp","phone","text"],["Address / Location","address","text"],["Designer Name","designer","text"]].map(([l,k,t])=><div key={k}><div style={lbl}>{l}</div><input value={meta[k]} onChange={e=>setMeta(m=>({...m,[k]:e.target.value}))} type={t} style={{...inp,width:"100%"}}/></div>)}
        <div><div style={lbl}>Sector</div>
          <select value={meta.sector} onChange={e=>{const s=e.target.value;const pt=Object.keys(ROOM_TEMPLATES[s]||{})[0]||"";setMeta(m=>({...m,sector:s,projectType:pt}));}} style={{...inp,width:"100%"}}>
            {sectors.map(s=><option key={s}>{s}</option>)}
          </select></div>
        <div><div style={lbl}>Project Type</div>
          <select value={meta.projectType} onChange={e=>setMeta(m=>({...m,projectType:e.target.value}))} style={{...inp,width:"100%"}}>
            {Object.keys(ROOM_TEMPLATES[meta.sector]||{}).map(t=><option key={t}>{t}</option>)}
          </select></div>
        {[["Estimate Date","date","date"],["Validity (days)","validDays","number"],["Design Fee (₹)","designFee","number"],["Discount (%)","discount","number"],["GST / Tax (%)","taxPct","number"],["Follow-up Date","followUp","date"]].map(([l,k,t])=><div key={k}><div style={lbl}>{l}</div><input value={meta[k]} onChange={e=>setMeta(m=>({...m,[k]:e.target.value}))} type={t} style={{...inp,width:"100%"}}/></div>)}
      </div>
      <div style={{marginTop:10}}><div style={lbl}>Notes / Terms</div><textarea value={meta.notes} onChange={e=>setMeta(m=>({...m,notes:e.target.value}))} rows={2} style={{...inp,width:"100%",resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <Btn onClick={loadTemplate}>📋 Load Template for {meta.projectType}</Btn>
        <Btn v="ghost" onClick={addRoom}>+ Add Custom Room</Btn>
      </div>
    </div>

    {/* Live Total Summary — display only, buttons are in sticky bar above */}
    {rooms.length>0&&<div style={{background:"rgba(201,168,76,0.08)",border:"0.5px solid "+C.borderStrong,borderRadius:8,padding:"0.75rem 1.25rem",marginBottom:"1rem",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>Work Total</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.gold}}>₹{(gt/100000).toFixed(2)}L</div></div>
      <div style={{color:C.muted,fontSize:18}}>+</div>
      <div style={{textAlign:"center"}}><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>Design Fee</div><div style={{fontSize:18,fontWeight:700,color:C.inkSoft}}>₹{(df2/100000).toFixed(2)}L</div></div>
      {meta.discount>0&&<><div style={{color:C.muted,fontSize:18}}>−</div><div style={{textAlign:"center"}}><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>Discount {meta.discount}%</div><div style={{fontSize:16,fontWeight:700,color:C.red}}>₹{((wd-disc2)/100000).toFixed(2)}L</div></div></>}
      <div style={{color:C.muted,fontSize:18}}>=</div>
      <div style={{textAlign:"center"}}><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>Grand Total incl. {meta.taxPct}% GST</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:C.ink}}>₹{(final2/100000).toFixed(2)}L</div></div>
    </div>}

    {/* Rooms */}
    {rooms.map(r=><div key={r.id} style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem",marginBottom:"1rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <input value={r.room} onChange={e=>setRooms(rs=>rs.map(x=>x.id===r.id?{...x,room:e.target.value}:x))}
          style={{fontSize:14,fontWeight:700,color:C.ink,border:"none",outline:"none",background:"transparent",flex:1,fontFamily:"inherit"}}/>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:13,fontWeight:700,color:C.gold}}>₹{roomTotal(r).toLocaleString("en-IN")}</span>
          <button onClick={()=>addItem(r.id)} style={{fontSize:11,padding:"3px 9px",borderRadius:3,background:C.green,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit"}}>+ Item</button>
          <button onClick={()=>setRooms(rs=>rs.filter(x=>x.id!==r.id))} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:14}}>✕</button>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:C.surface2}}>
          {["✓","Description","Unit","Qty","Rate (₹)","Amount",""].map((h,i)=><th key={i} style={{padding:"6px 8px",textAlign:"left",fontSize:10,color:C.muted,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:"0.5px solid "+C.border}}>{h}</th>)}
        </tr></thead>
        <tbody>{r.items.map((it,i)=><tr key={it.id} style={{borderBottom:"0.5px solid "+C.border,background:i%2===0?"#fff":C.surface,opacity:it.include?1:0.4}}>
          <td style={{padding:"5px 8px"}}><input type="checkbox" checked={it.include} onChange={e=>updateItem(r.id,it.id,"include",e.target.checked)} style={{accentColor:C.gold}}/></td>
          <td style={{padding:"5px 8px"}}><input value={it.desc} onChange={e=>updateItem(r.id,it.id,"desc",e.target.value)} style={{...inp,width:"100%",padding:"4px 7px"}}/></td>
          <td style={{padding:"5px 8px",width:80}}><select value={it.unit} onChange={e=>updateItem(r.id,it.id,"unit",e.target.value)} style={{...inp,padding:"4px 6px",width:"100%"}}>{["Sqft","Sqmt","Rmt","Nos","Lump","Set"].map(u=><option key={u}>{u}</option>)}</select></td>
          <td style={{padding:"5px 8px",width:70}}><input type="number" value={it.qty} onChange={e=>updateItem(r.id,it.id,"qty",e.target.value)} style={{...inp,width:"100%",padding:"4px 7px",textAlign:"right"}}/></td>
          <td style={{padding:"5px 8px",width:110}}><input type="number" value={it.rate} onChange={e=>updateItem(r.id,it.id,"rate",e.target.value)} style={{...inp,width:"100%",padding:"4px 7px",textAlign:"right"}}/></td>
          <td style={{padding:"5px 8px",fontWeight:700,color:C.ink,textAlign:"right",minWidth:90}}>₹{((it.qty||0)*(it.rate||0)).toLocaleString("en-IN")}</td>
          <td style={{padding:"5px 8px"}}><button onClick={()=>removeItem(r.id,it.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:13}}>✕</button></td>
        </tr>)}</tbody>
      </table>
    </div>)}

    {rooms.length>0&&<div style={{display:"flex",gap:8,marginBottom:"2rem"}}>
      <Btn onClick={addRoom}>+ Add Room</Btn>
      <Btn v="success" onClick={saveProposal}>💾 Save & Add to Quotations</Btn>
      <Btn v="ghost" onClick={()=>setView("list")}>Cancel</Btn>
    </div>}
  </div>;
}

// ── TASK TIMELINE (GANTT) ─────────────────────────────────────────────────────
// ── TASK TIMELINE (GANTT + NOTIFY + REMINDER) ────────────────────────────────
function TaskTimeline({tasks,setTasks,projects}){
  const [filter,setFilter]=useState("All");
  const [notifyTask,setNotifyTask]=useState(null);
  const [reminderTask,setReminderTask]=useState(null);
  const [reminderDate,setReminderDate]=useState("");
  const [reminderNote,setReminderNote]=useState("");
  const today=new Date();

  const withDates=tasks.filter(t=>t.due).sort((a,b)=>new Date(a.due)-new Date(b.due));
  const shown=filter==="All"?withDates:withDates.filter(t=>t.status===filter||t.project===filter);
  const start=new Date(today);start.setDate(start.getDate()-7);
  const end2=new Date(today);end2.setDate(end2.getDate()+30);
  const totalDays=Math.round((end2-start)/86400000);

  function posLeft(dateStr){
    const d=new Date(dateStr);if(!d||isNaN(d))return 0;
    const diff=Math.round((d-start)/86400000);
    return Math.max(0,Math.min(97,(diff/totalDays)*100));
  }
  function dayLabel(offset){
    const d=new Date(start);d.setDate(d.getDate()+offset);
    return (d.getDate()===1||offset===0)?(d.getDate()+"/"+(d.getMonth()+1)):String(d.getDate());
  }
  const todayLeft=posLeft(today.toISOString().split("T")[0]);
  const TC={Overdue:C.red,Today:C.amber,Pending:C.blue,Done:C.green};

  function sendNotify(task){
    const member=ALL_TEAM_MEMBERS.find(m=>m.name===task.assignee);
    const msg="*INNOVATIONS INTERIORS — TASK REMINDER*\n\nHi "+task.assignee+",\n\n*Task:* "+task.title+"\n*Project:* "+task.project+"\n*Due:* "+task.due+"\n*Priority:* "+task.priority+"\n*Status:* "+task.status+"\n\nPlease action this immediately.\n\n— Innovations Interiors";
    openWhatsApp(member?.phone||"",msg);
    setTasks(ts=>ts.map(t=>t.id===task.id?{...t,notified:true}:t));
    setNotifyTask(null);
  }

  function saveReminder(task){
    if(!reminderDate){alert("Please select a reminder date.");return;}
    setTasks(ts=>ts.map(t=>t.id===task.id?{...t,reminder:{date:reminderDate,note:reminderNote,set:true}}:t));
    const member=ALL_TEAM_MEMBERS.find(m=>m.name===task.assignee);
    const msg="*INNOVATIONS INTERIORS — REMINDER SET*\n\nHi "+task.assignee+",\n\nReminder for: *"+task.title+"*\nDate: "+reminderDate+(reminderNote?"\nNote: "+reminderNote:"")+"\n\n— Innovations Interiors";
    if(member?.phone)openWhatsApp(member.phone,msg);
    setReminderTask(null);setReminderDate("");setReminderNote("");
    alert("Reminder saved"+(member?.phone?" and WhatsApp sent to "+task.assignee:".")+".");
  }

  const MS={fontSize:12,padding:"8px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontFamily:"inherit",background:"#fff",outline:"none",width:"100%"};

  return <div>
    {/* Notify Modal */}
    {notifyTask&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.52)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(480px,95vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden"}}>
        <div style={{padding:"0.9rem 1.25rem",background:"#075E54",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>📲 Notify — {notifyTask.assignee}</div>
          <button onClick={()=>setNotifyTask(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"1rem"}}>
          <div style={{background:C.surface2,borderRadius:6,padding:"0.75rem",marginBottom:10,fontSize:12,color:C.inkSoft}}>
            <div style={{fontWeight:700,color:C.ink}}>{notifyTask.title}</div>
            <div style={{color:C.muted,marginTop:2}}>Project: {notifyTask.project} · Due: {notifyTask.due} · <span style={{color:notifyTask.priority==="High"?C.red:C.amber,fontWeight:600}}>{notifyTask.priority} Priority</span></div>
          </div>
          <div style={{background:"#ECE5DD",borderRadius:8,padding:"0.9rem",fontSize:12,color:"#1a1a1a",lineHeight:1.7,whiteSpace:"pre-wrap",maxHeight:180,overflowY:"auto"}}>
            {"*INNOVATIONS INTERIORS — TASK REMINDER*\n\nHi "+notifyTask.assignee+",\n\nTask: "+notifyTask.title+"\nProject: "+notifyTask.project+"\nDue: "+notifyTask.due+" · Priority: "+notifyTask.priority+"\n\nPlease action this immediately.\n\n— Innovations Interiors"}
          </div>
          <div style={{fontSize:11,color:C.muted,marginTop:8}}>Sending to: <strong>{ALL_TEAM_MEMBERS.find(m=>m.name===notifyTask.assignee)?.phone||"(no phone — will copy to clipboard)"}</strong></div>
        </div>
        <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid "+C.border,display:"flex",gap:8}}>
          <button onClick={()=>sendNotify(notifyTask)} style={{flex:1,padding:"9px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>📲 Send WhatsApp Notification</button>
          <button onClick={()=>setNotifyTask(null)} style={{padding:"9px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>}

    {/* Reminder Modal */}
    {reminderTask&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.52)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(420px,95vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden"}}>
        <div style={{padding:"0.9rem 1.25rem",background:C.amber,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>⏰ Set Reminder — {reminderTask.assignee}</div>
          <button onClick={()=>setReminderTask(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"1rem",display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:C.surface2,borderRadius:6,padding:"0.65rem 0.9rem",fontSize:12,fontWeight:600,color:C.ink}}>{reminderTask.title}</div>
          <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Reminder Date & Time</div>
            <input type="datetime-local" value={reminderDate} onChange={e=>setReminderDate(e.target.value)} style={MS}/></div>
          <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Note (optional)</div>
            <input value={reminderNote} onChange={e=>setReminderNote(e.target.value)} placeholder="e.g. Confirm drawings are ready first" style={MS}/></div>
        </div>
        <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid "+C.border,display:"flex",gap:8}}>
          <button onClick={()=>saveReminder(reminderTask)} style={{flex:1,padding:"9px",background:C.amber,color:"#fff",border:"none",borderRadius:4,fontSize:13,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>⏰ Save Reminder + WhatsApp</button>
          <button onClick={()=>setReminderTask(null)} style={{padding:"9px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>}

    <Head title="📅 Task Timeline" sub={shown.length+" tasks · "+tasks.filter(t=>t.status==="Overdue").length+" overdue · "+tasks.filter(t=>t.reminder&&t.reminder.set).length+" reminders set"}/>

    <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
      {["All","Overdue","Today","Pending","Done"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===f?C.gold:C.border),background:filter===f?C.gold:"#fff",color:filter===f?"#fff":C.muted,fontWeight:filter===f?700:400}}>
        {f} {f!=="All"&&"("+tasks.filter(t=>t.status===f).length+")"}
      </button>)}
      {[...new Set(tasks.map(t=>t.project))].slice(0,5).map(p=><button key={p} onClick={()=>setFilter(p)} style={{padding:"4px 10px",borderRadius:3,fontSize:10,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===p?C.blue:C.border),background:filter===p?C.blue:"#fff",color:filter===p?"#fff":C.muted}}>{p}</button>)}
    </div>

    {/* Gantt Chart */}
    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,overflow:"hidden",marginBottom:"1rem"}}>
      <div style={{display:"flex",background:C.ink,height:26}}>
        <div style={{width:300,flexShrink:0,borderRight:"0.5px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",paddingLeft:12}}>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Task · Assignee</span>
        </div>
        <div style={{flex:1,position:"relative"}}>
          {Array.from({length:Math.floor(totalDays/4)+1},(_,i)=>i*4).map(offset=><div key={offset} style={{position:"absolute",left:(offset/totalDays*100)+"%",top:0,bottom:0,borderLeft:"0.5px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",paddingLeft:3}}>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>{dayLabel(offset)}</span>
          </div>)}
          <div style={{position:"absolute",left:todayLeft+"%",top:0,bottom:0,width:2,background:C.red,zIndex:3}}>
            <span style={{position:"absolute",top:0,left:3,fontSize:8,color:C.red,background:"#fff",padding:"0 2px",borderRadius:2,fontWeight:700}}>TODAY</span>
          </div>
        </div>
      </div>
      {shown.length===0?<div style={{padding:"2rem",textAlign:"center",color:C.muted,fontSize:12}}>No tasks with due dates for this filter.</div>
      :shown.map((t,i)=>{
        const col=TC[t.status]||C.blue;
        const left=posLeft(t.due);
        return <div key={t.id} style={{display:"flex",alignItems:"center",borderBottom:"0.5px solid "+C.border,background:i%2===0?"#fff":C.surface,minHeight:42,position:"relative"}}>
          <div style={{width:300,flexShrink:0,padding:"4px 8px",display:"flex",gap:6,alignItems:"center",borderRight:"0.5px solid "+C.border}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:col,flexShrink:0}}/>
            <div style={{flex:1,overflow:"hidden",minWidth:0}}>
              <div style={{fontSize:11,fontWeight:600,color:C.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.title}</div>
              <div style={{fontSize:9,color:C.muted}}>{t.project} · {t.assignee}</div>
            </div>
            <div style={{display:"flex",gap:3,flexShrink:0}}>
              <button onClick={()=>setNotifyTask(t)} title="Send WhatsApp notification"
                style={{width:24,height:24,borderRadius:3,background:"#25D366",color:"#fff",border:"none",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>📲</button>
              <button onClick={()=>{setReminderTask(t);setReminderDate(t.reminder&&t.reminder.date?t.reminder.date:"");setReminderNote(t.reminder&&t.reminder.note?t.reminder.note:"");}} title="Set reminder"
                style={{width:24,height:24,borderRadius:3,background:t.reminder&&t.reminder.set?C.amber:C.surface3,color:t.reminder&&t.reminder.set?"#fff":C.muted,border:"none",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>⏰</button>
            </div>
          </div>
          <div style={{flex:1,position:"relative",height:42}}>
            <div style={{position:"absolute",left:todayLeft+"%",top:0,bottom:0,width:1,background:C.red+"66",zIndex:2,pointerEvents:"none"}}/>
            <div style={{position:"absolute",left:left+"%",top:"50%",transform:"translateY(-50%)",height:22,minWidth:55,maxWidth:"38%",background:col+(t.status==="Done"?"88":"cc"),borderRadius:4,display:"flex",alignItems:"center",paddingLeft:6,boxShadow:t.status==="Overdue"?"0 0 0 1.5px "+C.red:"none"}}>
              <span style={{fontSize:9,color:"#fff",fontWeight:700,whiteSpace:"nowrap"}}>{t.due.slice(5)}{t.status==="Done"?" ✓":""}{t.reminder&&t.reminder.set?" ⏰":""}</span>
            </div>
          </div>
        </div>;
      })}
    </div>

    {/* Bulk WhatsApp send bar */}
    <div style={{background:"#E8F5E9",border:"0.5px solid #2E7D3244",borderRadius:7,padding:"0.75rem 1rem",marginBottom:"1rem",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1A5C2E",flexShrink:0}}>📲 Bulk Send:</div>
      <button onClick={()=>{
        const overdue=tasks.filter(t=>t.status==="Overdue");
        if(!overdue.length){alert("No overdue tasks.");return;}
        if(!window.confirm("Notify "+overdue.length+" overdue task assignees on WhatsApp?"))return;
        const g={};overdue.forEach(t=>{if(!g[t.assignee])g[t.assignee]=[];g[t.assignee].push(t);});
        Object.entries(g).forEach(([name,ts],i)=>{
          const m=ALL_TEAM_MEMBERS.find(m=>m.name===name);
          const msg="*INNOVATIONS INTERIORS — OVERDUE TASKS*\n\nHi "+name+",\n\n⚠️ "+ts.length+" overdue task(s):\n"+ts.map(t=>"• "+t.title+" | "+t.project+" | Due: "+t.due).join("\n")+"\n\nPlease complete immediately.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(m?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:"#C62828",color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        🔴 All Overdue ({tasks.filter(t=>t.status==="Overdue").length})
      </button>
      <button onClick={()=>{
        const shown2=shown.filter(t=>t.status!=="Done");
        if(!shown2.length){alert("No tasks in current filter.");return;}
        if(!window.confirm("Notify "+shown2.length+" assignees for filtered tasks?"))return;
        const g={};shown2.forEach(t=>{if(!g[t.assignee])g[t.assignee]=[];g[t.assignee].push(t);});
        Object.entries(g).forEach(([name,ts],i)=>{
          const m=ALL_TEAM_MEMBERS.find(m=>m.name===name);
          const msg="*INNOVATIONS INTERIORS — TASK REMINDER*\n\nHi "+name+",\n\nPending tasks:\n"+ts.map(t=>"• "+t.title+" | "+t.project+" | Due: "+t.due).join("\n")+"\n\nKindly action.\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(m?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:C.blue,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        📲 Notify Filtered ({shown.filter(t=>t.status!=="Done").length})
      </button>
      <button onClick={()=>{
        const withReminder=tasks.filter(t=>t.reminder&&t.reminder.set&&t.status!=="Done");
        if(!withReminder.length){alert("No reminder-set tasks.");return;}
        if(!window.confirm("Send reminder notifications to "+withReminder.length+" assignees?"))return;
        withReminder.forEach((t,i)=>{
          const m=ALL_TEAM_MEMBERS.find(m=>m.name===t.assignee);
          const msg="*INNOVATIONS INTERIORS — ⏰ REMINDER*\n\nHi "+t.assignee+",\n\nReminder for: *"+t.title+"*\nProject: "+t.project+" | Due: "+t.due+(t.reminder.note?"\nNote: "+t.reminder.note:"")+"\n\n— Innovations Interiors";
          setTimeout(()=>openWhatsApp(m?.phone||"",msg),i*1500);
        });
      }} style={{padding:"5px 12px",background:C.amber,color:"#fff",border:"none",borderRadius:4,fontSize:11,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>
        ⏰ Fire All Reminders ({tasks.filter(t=>t.reminder&&t.reminder.set&&t.status!=="Done").length})
      </button>
    </div>

    {/* Full task list with Notify + Reminder buttons */}
    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,overflow:"hidden"}}>
      <div style={{padding:"0.75rem 1rem",background:C.surface2,borderBottom:"0.5px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,fontWeight:700,color:C.ink}}>All Active Tasks — Notify & Set Reminders</div>
        <div style={{fontSize:10,color:C.muted}}>📲 = WhatsApp notify · ⏰ = Set reminder</div>
      </div>
      {tasks.filter(t=>t.status!=="Done").map((t,i)=>{
        const col=TC[t.status]||C.blue;
        return <div key={t.id} style={{display:"flex",gap:10,alignItems:"center",padding:"0.6rem 1rem",borderBottom:"0.5px solid "+C.border,background:i%2===0?"#fff":C.surface}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:col,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:600,color:C.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.title}</div>
            <div style={{fontSize:10,color:C.muted}}>{t.project} · <strong style={{color:C.blue}}>{t.assignee}</strong> · Due {t.due}{t.reminder&&t.reminder.set?" · ⏰ "+t.reminder.date.slice(0,10):""}</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
            <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:3,background:col+"18",color:col,whiteSpace:"nowrap"}}>{t.status}</span>
            <button onClick={()=>setNotifyTask(t)}
              style={{padding:"5px 10px",background:"#25D366",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap"}}>📲 Notify</button>
            <button onClick={()=>{setReminderTask(t);setReminderDate(t.reminder&&t.reminder.date?t.reminder.date:"");setReminderNote(t.reminder&&t.reminder.note?t.reminder.note:"");}}
              style={{padding:"5px 10px",background:t.reminder&&t.reminder.set?C.amber:C.surface3,color:t.reminder&&t.reminder.set?"#fff":C.muted,border:"none",borderRadius:4,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap"}}>⏰ {t.reminder&&t.reminder.set?"Edit Reminder":"Set Reminder"}</button>
          </div>
        </div>;
      })}
    </div>
    <div style={{fontSize:10,color:C.muted,marginTop:8,textAlign:"center"}}>Timeline: −7 to +30 days from today · Red line = today · 📲 sends WhatsApp · ⏰ sets reminder with WhatsApp confirmation</div>
  </div>;
}


// ── WEEKLY / MONTHLY SITE REPORTS ─────────────────────────────────────────────
function WeeklyMonthlyReports({siteReports,tasks,projects}){
  const [period,setPeriod]=useState("weekly");
  const [selectedProject,setSelectedProject]=useState("All");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiReport,setAiReport]=useState("");
  const [ownerPhone,setOwnerPhone]=useState("9820000001");
  const [ownerEmail,setOwnerEmail]=useState("principal@innovationsinteriors.com");
  const [showSettings,setShowSettings]=useState(false);

  const now=new Date();
  const weekAgo=new Date(now);weekAgo.setDate(weekAgo.getDate()-7);
  const monthAgo=new Date(now);monthAgo.setDate(monthAgo.getDate()-30);
  const cutoff=period==="weekly"?weekAgo:monthAgo;
  const periodLabel=period==="weekly"?"Weekly (Last 7 Days)":"Monthly (Last 30 Days)";

  const filtered=siteReports.filter(r=>{
    const d=new Date(r.date);
    return d>=cutoff&&(selectedProject==="All"||r.project===selectedProject);
  });
  const totalReports=filtered.length;
  const openIssues=filtered.reduce((s,r)=>s+r.observations.filter(o=>o.severity!=="Resolved").length,0);
  const resolvedIssues=filtered.reduce((s,r)=>s+r.observations.filter(o=>o.severity==="Resolved").length,0);
  const projectsCovered=[...new Set(filtered.map(r=>r.project))];
  const tasksDue=tasks.filter(t=>{if(!t.due)return false;const d=new Date(t.due);return d>=cutoff&&(selectedProject==="All"||t.project===selectedProject);});
  const tasksDone=tasksDue.filter(t=>t.status==="Done").length;
  const tasksOverdue=tasksDue.filter(t=>t.status==="Overdue").length;

  async function generateAIReport(){
    setAiLoading(true);setAiReport("");
    const context="Generate a professional "+period+" interior design project management report for Innovations Interiors, Pune.\n\nReport Period: "+periodLabel+"\nGenerated: "+now.toDateString()+"\nProjects covered: "+(projectsCovered.join(", ")||"None")+"\nSite reports submitted: "+totalReports+"\nOpen punch list items: "+openIssues+"\nResolved issues: "+resolvedIssues+"\nTasks completed this period: "+tasksDone+" of "+tasksDue.length+"\nOverdue tasks: "+tasksOverdue+"\n\nSite Report Details:\n"+filtered.map(r=>"Project: "+r.project+" | "+r.date+" | Supervisor: "+r.supervisor+"\nWork Done: "+r.workDone+(r.nextDay?"\nNext Day Plan: "+r.nextDay:"")+"\nObservations: "+(r.observations.length>0?r.observations.map(o=>"["+o.category+"] "+o.severity+": "+o.note).join("; "):"None")).join("\n\n")+"\n\nGenerate a comprehensive structured report with:\n1) EXECUTIVE SUMMARY (3-4 sentences)\n2) PROJECT-WISE PROGRESS (bullet points per project)\n3) SITE ISSUES & RESOLUTIONS\n4) TASK PERFORMANCE ANALYSIS\n5) KEY RISKS & CONCERNS\n6) RECOMMENDATIONS FOR NEXT PERIOD\n\nUse professional language. Format clearly with section headings.";
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:context}]})});
      const d=await res.json();
      setAiReport(d.content?.[0]?.text||"Could not generate report.");
    }catch{setAiReport("Connection error. Please try again.");}
    setAiLoading(false);
  }

  function buildReportHTML(){
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Innovations Interiors — '+periodLabel+' Report</title>'
    +'<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Trebuchet MS,sans-serif;background:#F8FAFC;color:#0F1923;font-size:13px;line-height:1.7;padding:40px}'
    +'h1{font-size:22px;font-weight:700;color:#0F1923}h2{font-size:14px;font-weight:700;color:#C9A84C;margin:20px 0 8px;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #C9A84C44;padding-bottom:4px}'
    +'.header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:2px solid #C9A84C;margin-bottom:24px}'
    +'.stat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px}'
    +'.stat{background:#EEF2F7;padding:12px;border-radius:6px;text-align:center}'
    +'.stat-val{font-size:24px;font-weight:700;color:#C9A84C;font-family:Georgia,serif}'
    +'.stat-lbl{font-size:10px;color:#6B7C8F;text-transform:uppercase;letter-spacing:0.08em}'
    +'pre{white-space:pre-wrap;font-family:Trebuchet MS,sans-serif;font-size:13px;line-height:1.8;color:#1E2D3D}'
    +'</style></head><body>'
    +'<div class="header"><div><h1>Innovations Interiors</h1><div style="font-size:11px;color:#6B7C8F;letter-spacing:0.12em;text-transform:uppercase">Interior Design Project Management</div></div>'
    +'<div style="text-align:right"><div style="font-size:16px;font-weight:700;color:#C9A84C">'+periodLabel.toUpperCase()+' REPORT</div><div style="font-size:11px;color:#6B7C8F">Generated: '+now.toDateString()+'</div>'+(selectedProject!=="All"?'<div style="font-size:11px;color:#6B7C8F">Project: '+selectedProject+'</div>':'')+'</div></div>'
    +'<div class="stat-grid">'
    +'<div class="stat"><div class="stat-val">'+totalReports+'</div><div class="stat-lbl">Site Reports</div></div>'
    +'<div class="stat"><div class="stat-val">'+projectsCovered.length+'</div><div class="stat-lbl">Projects Covered</div></div>'
    +'<div class="stat"><div class="stat-val">'+openIssues+'</div><div class="stat-lbl">Open Issues</div></div>'
    +'<div class="stat"><div class="stat-val">'+resolvedIssues+'</div><div class="stat-lbl">Resolved</div></div>'
    +'<div class="stat"><div class="stat-val">'+tasksOverdue+'</div><div class="stat-lbl">Overdue Tasks</div></div>'
    +'</div>'
    +'<h2>AI-Generated Analysis</h2>'
    +'<pre>'+aiReport+'</pre>'
    +'<div style="margin-top:32px;padding-top:16px;border-top:1px solid #DDE4EE;font-size:11px;color:#6B7C8F;text-align:center">Innovations Interiors · Interior Design Consultants · Pune · Confidential Report</div>'
    +'</body></html>';
  }

  // 1. Send raw summary to owner (no AI needed)
  function sendRawSummaryWA(){
    if(filtered.length===0){alert("No site reports in this period.");return;}
    const phone=ownerPhone.replace(/\D/g,"");
    if(!phone){alert("Enter owner WhatsApp number in \u2699\uFE0F Settings.");return;}
    const msg="*INNOVATIONS INTERIORS*\n*"+periodLabel.toUpperCase()+" SITE SUMMARY*\n_"+now.toDateString()+"_\n\n"
      +"\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n"
      +"*PROJECTS ("+projectsCovered.length+"):*\n"
      +projectsCovered.map(p=>{
        const reps=filtered.filter(r=>r.project===p);
        const issues2=reps.reduce((s,r)=>s+r.observations.filter(o=>o.severity!=="Resolved").length,0);
        return "\u25b8 *"+p+"* \u2014 "+reps.length+" report(s)"+(issues2>0?" \u26a0\uFE0F "+issues2+" issue(s)":"");
      }).join("\n")
      +"\n\n*ISSUES:* Open: "+openIssues+" | Resolved: "+resolvedIssues
      +"\n*TASKS:* Done: "+tasksDone+"/"+tasksDue.length+" | Overdue: "+tasksOverdue
      +"\n\n_\u2014 Innovations Interiors ERP/CRM_";
    openWhatsApp(phone,msg);
  }

  // 2. Send AI report to owner via WhatsApp
  function shareWhatsApp(){
    if(!aiReport){alert("Generate the AI report first.");return;}
    const phone=ownerPhone.replace(/\D/g,"");
    if(!phone){alert("Enter owner WhatsApp number in Settings.");return;}
    const msg="*INNOVATIONS INTERIORS*\n*"+periodLabel.toUpperCase()+" AI REPORT*\n_"+now.toDateString()+"_\n\n"
      +"\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n"
      +"*SUMMARY* | Reports: "+totalReports+" | Projects: "+projectsCovered.length+" | Issues: "+openIssues+" | Overdue: "+tasksOverdue
      +"\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n"
      +aiReport.slice(0,1200)+(aiReport.length>1200?"\n\n_[Truncated \u2014 download full report]_":"")
      +"\n\n_\u2014 Innovations Interiors, Pune_";
    openWhatsApp(phone,msg);
  }

  // 3. Send per-project report to client
  function sendProjectReportWA(projectName){
    const reps=filtered.filter(r=>r.project===projectName);
    if(reps.length===0){alert("No reports for "+projectName+" in this period.");return;}
    const proj=projects.find(p=>p.name===projectName);
    const clientPhone=proj?.clientPhone||"";
    const msg="*INNOVATIONS INTERIORS*\n*"+periodLabel.toUpperCase()+" SITE REPORT*\n_Project: "+projectName+"_\n_"+cutoff.toDateString()+" \u2014 "+now.toDateString()+"_\n\n"
      +reps.map(r=>"\ud83d\udccd *"+r.date+"* | "+r.supervisor
        +"\n*Work Done:* "+r.workDone
        +(r.nextDay?"\n*Tomorrow:* "+r.nextDay:"")
        +(r.observations.length>0?"\n*Observations:*\n"+r.observations.map(o=>"  \u2022 ["+o.category+"] "+o.severity+": "+o.note).join("\n"):"")
      ).join("\n\n\u2508\u2508\u2508\u2508\u2508\u2508\u2508\u2508\n\n")
      +"\n\n_Thank you for your trust \u2014 Team Innovations Interiors_";
    if(clientPhone){openWhatsApp(clientPhone,msg);}
    else{const num=prompt("Enter client WhatsApp for "+projectName+":");if(num)openWhatsApp(num,msg);}
  }

  // 4. Send ALL project reports to clients (one per project)
  function sendAllProjectsWA(){
    const list=[...new Set(filtered.map(r=>r.project))];
    if(list.length===0){alert("No site reports in this period.");return;}
    if(!window.confirm("Open "+list.length+" WhatsApp window(s) \u2014 one per project?\n\n"+list.join(", ")))return;
    list.forEach((pname,i)=>setTimeout(()=>sendProjectReportWA(pname),i*1600));
  }

  // 5. Download single project report as TXT
  function downloadProjectReport(projectName){
    const reps=filtered.filter(r=>r.project===projectName);
    if(reps.length===0){alert("No reports for "+projectName);return;}
    const content="INNOVATIONS INTERIORS\n"+periodLabel.toUpperCase()+" SITE REPORT\nProject: "+projectName+"\nGenerated: "+now.toDateString()+"\n\n"
      +"─".repeat(50)+"\n\n"
      +reps.map(r=>r.date+" | "+r.supervisor+" | "+r.weather
        +"\n\nWORK DONE:\n"+r.workDone
        +(r.nextDay?"\n\nNEXT DAY PLAN:\n"+r.nextDay:"")
        +(r.observations.length>0?"\n\nOBSERVATIONS:\n"+r.observations.map(o=>"["+o.category+"] "+o.severity+": "+o.note).join("\n"):"")
      ).join("\n\n"+"─".repeat(50)+"\n\n")
      +"\n\n"+"─".repeat(50)+"\nInnovations Interiors · Interior Design Consultants · Pune";
    downloadBlobFile(content,"II_"+period+"_"+projectName.replace(/[^a-zA-Z0-9]/g,"_")+"_"+now.toISOString().split("T")[0]+".txt","text/plain;charset=utf-8");
  }

  function shareEmail(){
    if(!aiReport){alert("Generate the report first.");return;}
    const subject=encodeURIComponent("Innovations Interiors — "+periodLabel+" Report — "+now.toDateString());
    const body=encodeURIComponent("Dear Principal,\n\nPlease find the "+periodLabel+" report below.\n\nSITE REPORTS: "+totalReports+"\nPROJECTS: "+projectsCovered.join(", ")+"\nOPEN ISSUES: "+openIssues+"\nOVERDUE TASKS: "+tasksOverdue+"\n\n"+"─".repeat(40)+"\n\n"+aiReport+"\n\n"+"─".repeat(40)+"\nInnovations Interiors · Pune");
    try{ window.location.href="mailto:"+ownerEmail+"?subject="+subject+"&body="+body; }
    catch(e){ alert("Open your email client and send to: "+ownerEmail); }
  }

  function printPDF(){
    if(!aiReport){alert("Generate the report first.");return;}
    downloadBlobFile(buildReportHTML(),"II_"+period+"_report_"+now.toISOString().split("T")[0]+".html");
  }

  function downloadReport(){
    if(!aiReport){alert("Generate the report first.");return;}
    downloadBlobFile(buildReportHTML(),"II_"+period+"_report_"+now.toISOString().split("T")[0]+".html");
  }

  function downloadText(){
    if(!aiReport){alert("Generate the report first.");return;}
    const content="INNOVATIONS INTERIORS\n"+periodLabel.toUpperCase()+" REPORT\nGenerated: "+now.toDateString()+"\n\nSUMMARY\n"+"─".repeat(40)+"\nReports: "+totalReports+" | Projects: "+projectsCovered.length+" | Issues: "+openIssues+" | Overdue: "+tasksOverdue+"\n\n"+"─".repeat(40)+"\n\n"+aiReport+"\n\n"+"─".repeat(40)+"\nInnovations Interiors · Pune";
    downloadBlobFile(content,"II_"+period+"_report_"+now.toISOString().split("T")[0]+".txt","text/plain;charset=utf-8");
  }

  const BS=(bg,extra={})=>({fontSize:11,padding:"6px 12px",borderRadius:4,background:bg,color:"#fff",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap",...extra});

  return <div>
    <Head title={"\ud83d\udcca "+(period==="weekly"?"Weekly":"Monthly")+" Site Reports"} sub="AI reports \u00b7 Per-project WhatsApp \u00b7 Download \u00b7 Email"/>

    {/* Controls */}
    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1rem",marginBottom:"1rem"}}>
      <div style={{display:"flex",gap:8,marginBottom:"0.75rem",flexWrap:"wrap",alignItems:"center"}}>
        {[["weekly","\ud83d\udcc5 Weekly (7 days)"],["monthly","\ud83d\udcc6 Monthly (30 days)"]].map(([v,l])=>
          <button key={v} onClick={()=>{setPeriod(v);setAiReport("");}} style={{padding:"6px 16px",borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(period===v?C.gold:C.border),background:period===v?C.gold:"#fff",color:period===v?"#fff":C.muted,fontWeight:period===v?700:400}}>{l}</button>)}
        <select value={selectedProject} onChange={e=>{setSelectedProject(e.target.value);setAiReport("");}} style={{padding:"6px 12px",border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff"}}>
          <option value="All">All Projects</option>
          {[...new Set(siteReports.map(r=>r.project))].map(p=><option key={p}>{p}</option>)}
        </select>
        <button onClick={()=>setShowSettings(!showSettings)} style={{padding:"6px 12px",borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+C.border,background:showSettings?C.surface2:"#fff",color:C.muted}}>\u2699\uFE0F Owner Settings</button>
        <div style={{marginLeft:"auto"}}>
          <button onClick={generateAIReport} disabled={aiLoading} style={{...BS(C.purple,{fontSize:12,padding:"7px 16px"}),opacity:aiLoading?0.7:1}}>
            \ud83e\udd16 {aiLoading?"Generating...":"Generate AI Report"}
          </button>
        </div>
      </div>

      {showSettings&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0.75rem",background:C.surface2,borderRadius:6,marginBottom:"0.75rem"}}>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Owner WhatsApp Number</div>
          <input value={ownerPhone} onChange={e=>setOwnerPhone(e.target.value)} placeholder="9820000001"
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",outline:"none"}}/></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Owner Email</div>
          <input value={ownerEmail} onChange={e=>setOwnerEmail(e.target.value)} type="email"
            style={{width:"100%",padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",outline:"none"}}/></div>
      </div>}

      {/* WhatsApp Quick Send — always visible */}
      <div style={{background:"#E8F5E9",border:"0.5px solid #2E7D3244",borderRadius:6,padding:"0.85rem",marginBottom:"0.65rem"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1A5C2E",marginBottom:8}}>\ud83d\udcf2 WhatsApp \u2014 Send Site Reports Directly</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6}}>
          <button onClick={sendRawSummaryWA}  style={BS("#25D366",{fontSize:12,padding:"7px 14px"})}>\ud83d\udcf2 Send Summary to Owner</button>
          <button onClick={sendAllProjectsWA} style={BS("#128C7E",{fontSize:12,padding:"7px 14px"})}>\ud83d\udcf2 Send All Project Reports to Clients</button>
          {aiReport&&<button onClick={shareWhatsApp} style={BS("#075E54",{fontSize:12,padding:"7px 14px"})}>\ud83d\udcf2 Send AI Report to Owner</button>}
        </div>
        <div style={{fontSize:10,color:"#2E7D32"}}>\u2191 "Summary to Owner" works instantly without AI. "All Project Reports" opens WhatsApp per client.</div>
      </div>

      {aiReport&&<div style={{display:"flex",gap:8,flexWrap:"wrap",paddingTop:"0.65rem",borderTop:"0.5px solid "+C.border}}>
        <div style={{fontSize:11,color:C.muted,alignSelf:"center",fontWeight:600}}>AI Report:</div>
        <button onClick={shareEmail}     style={BS(C.blue)}>\u2709\uFE0F Email to Owner</button>
        <button onClick={printPDF}       style={BS(C.red)}>\ud83d\udcc4 Print / PDF</button>
        <button onClick={downloadReport} style={BS(C.ink)}>\u2b07\uFE0F Download HTML</button>
        <button onClick={downloadText}   style={BS("#555")}>\u2b07\uFE0F Download TXT</button>
      </div>}
    </div>

    {/* Stats */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:"1rem"}}>
      {[["Site Reports",totalReports,C.gold],["Projects Covered",projectsCovered.length,C.blue],["Open Issues",openIssues,C.red],["Issues Resolved",resolvedIssues,C.green],["Tasks Overdue",tasksOverdue,C.amber]].map(([k,v,c])=>
        <div key={k} style={{background:C.surface2,borderRadius:8,padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{k}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:c}}>{v}</div>
        </div>)}
    </div>

    {aiLoading&&<div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"3rem",textAlign:"center",color:C.muted}}>
      <div style={{fontSize:28,marginBottom:12}}>\ud83e\udd16</div>
      <div style={{fontSize:13,fontWeight:500}}>Analysing site data and generating {period} report...</div>
      <div style={{fontSize:11,color:C.muted,marginTop:6}}>Takes 10-20 seconds</div>
    </div>}

    {aiReport&&<div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,overflow:"hidden",marginBottom:"1rem"}}>
      <div style={{padding:"1rem 1.25rem",background:C.ink,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:C.goldMid}}>Innovations Interiors \u2014 {periodLabel} Report</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>Generated {now.toDateString()}{selectedProject!=="All"?" \u00b7 "+selectedProject:""}</div>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          <button onClick={shareWhatsApp}  style={{...BS("#25D366"),padding:"5px 9px"}}>\ud83d\udcf2 WA</button>
          <button onClick={shareEmail}     style={{...BS(C.blue),padding:"5px 9px"}}>\u2709\uFE0F Email</button>
          <button onClick={printPDF}       style={{...BS(C.red),padding:"5px 9px"}}>\ud83d\udcc4 PDF</button>
          <button onClick={downloadReport} style={{...BS(C.ink,{border:"0.5px solid rgba(255,255,255,0.2)"}),padding:"5px 9px"}}>\u2b07\uFE0F HTML</button>
          <button onClick={downloadText}   style={{...BS("#444"),padding:"5px 9px"}}>\u2b07\uFE0F TXT</button>
        </div>
      </div>
      <div style={{padding:"1.5rem",fontSize:13,color:C.inkSoft,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{aiReport}</div>
    </div>}

    {/* Per-project reports with individual WhatsApp + Download */}
    {!aiLoading&&<div>
      <div style={{fontSize:14,fontWeight:700,color:C.ink,marginBottom:"0.75rem"}}>
        \ud83d\udcc1 Site Reports This Period ({filtered.length})
        {filtered.length>0&&<span style={{fontSize:11,color:C.muted,fontWeight:400,marginLeft:8}}>\u2014 send or download per project</span>}
      </div>
      {filtered.length===0
        ?<div style={{padding:"2rem",textAlign:"center",color:C.muted,background:"#fff",borderRadius:8,border:"0.5px solid "+C.border}}>
            No site reports in this period. Submit daily site reports from the Site Reports section.
          </div>
        :projectsCovered.map(pname=>{
          const reps=filtered.filter(r=>r.project===pname);
          const ic=reps.reduce((s,r)=>s+r.observations.filter(o=>o.severity!=="Resolved").length,0);
          return <div key={pname} style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,marginBottom:10,overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.75rem 1rem",background:C.surface2,borderBottom:"0.5px solid "+C.border}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{fontWeight:700,fontSize:13,color:C.ink}}>{pname}</div>
                <Tag label={reps.length+" report"+(reps.length>1?"s":"")} color={C.blue}/>
                {ic>0&&<Tag label={ic+" issue"+(ic>1?"s":"")} color={C.red}/>}
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>sendProjectReportWA(pname)} style={BS("#25D366",{padding:"4px 10px"})}>\ud83d\udcf2 WhatsApp to Client</button>
                <button onClick={()=>downloadProjectReport(pname)} style={BS(C.ink,{padding:"4px 10px"})}>\u2b07\uFE0F Download</button>
              </div>
            </div>
            {reps.map(r=><div key={r.id} style={{padding:"0.75rem 1rem",borderBottom:"0.5px solid "+C.border+"55"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,fontWeight:600,color:C.ink}}>{r.date}</span>
                <span style={{fontSize:11,color:C.muted}}>{r.supervisor} \u00b7 {r.weather}</span>
              </div>
              <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.5,marginBottom:r.observations.length>0?6:0}}>{r.workDone}</div>
              {r.nextDay&&<div style={{fontSize:11,color:C.muted,marginBottom:r.observations.length>0?6:0}}>\u2192 Next: {r.nextDay}</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {r.observations.map((o,i)=><span key={i} style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:o.severity==="Action Required"?C.redLight:o.severity==="Resolved"?C.greenLight:C.amberLight,color:o.severity==="Action Required"?C.red:o.severity==="Resolved"?C.green:C.amber}}>[{o.category}] {o.severity}: {o.note}</span>)}
              </div>
            </div>)}
          </div>;
        })}
    </div>}
  </div>;
}


// ── DASHBOARD (UPGRADED — DARK NAVY + GOLD THEME + MONTHLY REVENUE) ──────────
function Dashboard({projects,tasks,siteReports,proposals,followups,setView,setFollowups,leads,issues,finance}){
  const priority=projects.filter(p=>p.status==="ON PRIORITY");
  const handover=projects.filter(p=>p.status==="HANDOVER");
  const overdue=tasks.filter(t=>t.status==="Overdue");
  const today2=tasks.filter(t=>t.status==="Today");
  const pendingFU=followups.filter(f=>f.status==="Pending");
  const openIssues=(issues||[]).filter(i=>i.status!=="Resolved");
  const criticalIssues=(issues||[]).filter(i=>["Action Required","Critical"].includes(i.severity)&&i.status!=="Resolved");

  // Monthly revenue from finance
  const now=new Date();
  const currentMonth=now.getMonth();
  const currentYear=now.getFullYear();
  const monthlyInvoiced=(finance||[]).filter(f=>{
    const d=new Date(f.date||"");
    return d.getMonth()===currentMonth&&d.getFullYear()===currentYear&&f.type==="Invoice";
  }).reduce((s,f)=>s+Number(f.amount||0),0);
  const monthlyCollected=(finance||[]).filter(f=>{
    const d=new Date(f.date||"");
    return d.getMonth()===currentMonth&&d.getFullYear()===currentYear&&["Paid","Received"].includes(f.status);
  }).reduce((s,f)=>s+Number(f.amount||0),0);

  // Projects delivered this month
  const deliveredThisMonth=projects.filter(p=>p.status==="HANDOVER").length;

  // Won leads this month
  const wonLeads=(leads||[]).filter(l=>l.stage==="Won").length;

  const monthName=["January","February","March","April","May","June","July","August","September","October","November","December"][currentMonth];

  function sendFollowUp(fu){openWhatsApp(fu.phone,fu.message);setFollowups(fs=>fs.map(f=>f.id===fu.id?{...f,status:"Sent"}:f));}

  const statStyle=(c)=>({background:"linear-gradient(135deg, "+c+"18, "+c+"08)",border:"0.5px solid "+c+"33",borderRadius:10,padding:"1rem 1.1rem"});

  return <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
    {/* Alert Banner */}
    {(overdue.length>0||criticalIssues.length>0)&&<div style={{background:"linear-gradient(135deg, #C62828, #7B0000)",borderRadius:8,padding:"0.8rem 1.25rem",display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:20}}>🚨</span>
      <div style={{flex:1}}>
        {overdue.length>0&&<span style={{color:"#fff",fontSize:13,fontWeight:600}}>{overdue.length} overdue tasks </span>}
        {criticalIssues.length>0&&<span style={{color:"rgba(255,255,255,0.85)",fontSize:13}}>· {criticalIssues.length} critical site issues requiring immediate action</span>}
      </div>
      <div style={{display:"flex",gap:8}}>
        {overdue.length>0&&<Btn sm v="ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,0.3)"}} onClick={()=>setView("tasks")}>Tasks →</Btn>}
        {criticalIssues.length>0&&<Btn sm v="ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,0.3)"}} onClick={()=>setView("issues")}>Issues →</Btn>}
      </div>
    </div>}

    {/* Monthly Performance Banner */}
    <div style={{background:"linear-gradient(135deg, "+C.ink+", #1E2D3D)",borderRadius:10,padding:"1.25rem 1.5rem"}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>📅 {monthName} {currentYear} — Monthly Performance</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16}}>
        {[
          {label:"Invoiced This Month",val:"₹"+(monthlyInvoiced/100000).toFixed(1)+"L",color:C.goldMid,icon:"💰"},
          {label:"Collected This Month",val:"₹"+(monthlyCollected/100000).toFixed(1)+"L",color:"#4CAF50",icon:"✅"},
          {label:"Projects Handed Over",val:deliveredThisMonth,color:"#81C784",icon:"🏁"},
          {label:"Leads Won",val:wonLeads,color:C.goldMid,icon:"🎯"},
          {label:"Open Site Issues",val:openIssues.length,color:openIssues.length>0?"#EF5350":"#81C784",icon:"⚠️"},
        ].map(k=><div key={k.label} style={{textAlign:"center"}}>
          <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:k.color,lineHeight:1}}>{k.val}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:4,lineHeight:1.3}}>{k.label}</div>
        </div>)}
      </div>
    </div>

    {/* KPI Row */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      {[
        {label:"Total Projects",val:projects.length,sub:"all teams",icon:"🏗️",c:C.blue},
        {label:"On Priority",val:priority.length,sub:"active execution",icon:"🔴",c:C.red},
        {label:"Passive",val:projects.filter(p=>p.status==="PASSIVE").length,sub:"design phase",icon:"🟣",c:C.purple},
        {label:"Pipeline Leads",val:(leads||[]).filter(l=>!["Won","Lost"].includes(l.stage)).length,sub:"active enquiries",icon:"🎯",c:C.teal},
        {label:"Overdue Tasks",val:overdue.length,sub:"need action",icon:"⏰",c:overdue.length>0?C.red:C.green},
        {label:"Follow-ups Pending",val:pendingFU.length,sub:"WhatsApp reminders",icon:"📲",c:C.amber},
      ].map(k=><div key={k.label} style={{...statStyle(k.c)}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{k.label}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:k.c,lineHeight:1}}>{k.val}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:3}}>{k.sub}</div>
          </div>
          <span style={{fontSize:18}}>{k.icon}</span>
        </div>
      </div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14}}>
      {/* Priority projects with progress */}
      <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:10,padding:"1.25rem"}}>
        <Head title="🔴 Priority Projects" sub={priority.length+" active"} action={<Btn sm v="ghost" onClick={()=>setView("projects")}>All →</Btn>}/>
        {priority.slice(0,6).map(p=><div key={p.id} style={{paddingBottom:12,borderBottom:"0.5px solid "+C.border,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{p.name}</div>
              <div style={{fontSize:11,color:C.muted}}>SR: <span style={{color:C.blue,fontWeight:600}}>{p.sr}</span> · Exec: <span style={{color:C.green,fontWeight:600}}>{p.exec}</span></div>
              {p.notes&&<div style={{fontSize:10,color:C.amber}}>📌 {p.notes}</div>}
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber}}>{p.progress}%</div>
          </div>
          <div style={{height:6,background:C.surface3,borderRadius:6,overflow:"hidden"}}>
            <div style={{height:"100%",width:p.progress+"%",background:p.progress>=80?C.green:p.progress>=50?C.gold:C.amber,borderRadius:6}}/>
          </div>
          <div style={{fontSize:10,color:C.muted,marginTop:3}}>{p.phase}</div>
        </div>)}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {/* Today tasks */}
        <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:10,padding:"1.25rem",flex:1}}>
          <Head title="📋 Today" sub={overdue.length+" overdue · "+today2.length+" due"} action={<Btn sm v="ghost" onClick={()=>setView("tasks")}>All</Btn>}/>
          {[...overdue,...today2].slice(0,5).map(t=><div key={t.id} style={{display:"flex",gap:8,paddingBottom:8,borderBottom:"0.5px solid "+C.border,marginBottom:8,alignItems:"flex-start"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:t.status==="Overdue"?C.red:C.amber,flexShrink:0,marginTop:3}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:600,color:C.ink,lineHeight:1.3}}>{t.title}</div>
              <div style={{fontSize:10,color:C.muted}}>{t.assignee} · {t.project}</div>
            </div>
          </div>)}
        </div>

        {/* Open Issues */}
        {openIssues.length>0&&<div style={{background:"#fff",border:"1px solid "+C.red+"33",borderRadius:10,padding:"1.25rem"}}>
          <Head title="⚠️ Open Issues" sub={criticalIssues.length+" critical"} action={<Btn sm v="ghost" style={{color:C.red,borderColor:C.red+"44"}} onClick={()=>setView("issues")}>All →</Btn>}/>
          {openIssues.slice(0,3).map(i=><div key={i.id} style={{paddingBottom:8,borderBottom:"0.5px solid "+C.border,marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:600,color:i.severity==="Action Required"?C.red:C.amber}}>[{i.severity}] {i.project}</div>
            <div style={{fontSize:11,color:C.inkSoft,lineHeight:1.4}}>{i.description.slice(0,70)}…</div>
          </div>)}
        </div>}
      </div>
    </div>

    {/* Client Follow-ups */}
    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:10,padding:"1.25rem"}}>
      <Head title="📲 Pending Follow-ups" sub={pendingFU.length+" reminders to send"} action={<Btn sm onClick={()=>setView("followups")}>Manage All</Btn>}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {followups.filter(f=>f.status==="Pending").slice(0,4).map(fu=><div key={fu.id} style={{background:C.amberLight,border:"0.5px solid "+C.amber+"33",borderRadius:6,padding:"0.75rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <div style={{fontSize:12,fontWeight:700,color:C.ink}}>{fu.client}</div>
            <Tag label={fu.type} color={C.amber}/>
          </div>
          <div style={{fontSize:11,color:C.inkSoft,marginBottom:8,lineHeight:1.4}}>{fu.message.slice(0,60)}…</div>
          <Btn sm v="wa" onClick={()=>sendFollowUp(fu)}>📲 Send Now</Btn>
        </div>)}
        {pendingFU.length===0&&<div style={{color:C.muted,fontSize:12,padding:"1rem"}}>No pending follow-ups. ✅</div>}
      </div>
    </div>

    {/* Team Load */}
    <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:10,padding:"1.25rem"}}>
      <Head title="👥 Team Workload" action={<Btn sm v="ghost" onClick={()=>setView("team")}>Full View →</Btn>}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:10}}>
        {DESIGN_TEAM.filter(m=>m.role==="Senior Designer").map(m=>{
          const pc=m.projects.filter(pn=>projects.find(p=>p.name===pn)?.status==="ON PRIORITY").length;
          const avgP=m.projects.length>0?Math.round(m.projects.map(pn=>projects.find(p=>p.name===pn)?.progress||0).reduce((s,v)=>s+v,0)/m.projects.length):0;
          return <div key={m.name} style={{textAlign:"center"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:m.color+"22",border:"1.5px solid "+m.color+"55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:m.color,margin:"0 auto 4px"}}>{m.initials}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.ink}}>{m.name}</div>
            <div style={{fontSize:18,fontWeight:700,color:m.color}}>{m.projects.length}</div>
            {pc>0&&<div style={{fontSize:9,color:C.red,fontWeight:700}}>🔴{pc}</div>}
            <div style={{fontSize:9,color:C.muted}}>{avgP}% avg</div>
          </div>;
        })}
      </div>
    </div>

    {/* Handover */}
    {handover.length>0&&<div style={{background:C.greenLight,border:"0.5px solid "+C.green+"44",borderRadius:10,padding:"1.25rem"}}>
      <Head title="🏁 Ready for Handover"/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {handover.map(p=><div key={p.id} style={{flex:1,minWidth:200,background:"#fff",borderRadius:6,padding:"0.75rem"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.green}}>{p.name}</div>
          <div style={{fontSize:11,color:C.muted}}>SR: {p.sr} · Exec: {p.exec}</div>
          <div style={{height:6,background:C.surface3,borderRadius:6,overflow:"hidden",marginTop:6}}>
            <div style={{height:"100%",width:p.progress+"%",background:C.green,borderRadius:6}}/>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:C.green,marginTop:3}}>{p.progress}% complete</div>
        </div>)}
      </div>
    </div>}
  </div>;
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
// ── WHATSAPP BROADCAST HUB ────────────────────────────────────────────────────
const WA_SCRIPTS={
  staff:{
    "Task Deadline Reminder":{
      label:"⏰ Task Deadline Reminder",
      recipients:"all_staff",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — TASK REMINDER*\n\nHi "+m.name+",\n\nThis is a reminder that the following task is due:\n\n📋 *Task:* "+( extra.task||"[Task Name]")+"\n📁 *Project:* "+(extra.project||"[Project]")+"\n📅 *Due Date:* "+(extra.due||"[Date]")+"\n\n⚠️ Please ensure this is completed on time. Delays impact the overall project timeline.\n\nFor any queries, please reach out to your project lead.\n\n— Innovations Interiors"
    },
    "Project Delay Alert":{
      label:"🔴 Project Delay Alert",
      recipients:"all_staff",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — PROJECT DELAY ALERT*\n\nHi "+m.name+",\n\n📣 Action required regarding project: *"+(extra.project||"[Project]")+"*\n\nCurrent progress is at "+(extra.progress||"[X]")+"% against expected "+(extra.expected||"[Y]")+"%.\n\n*Reason for delay:* "+(extra.reason||"[State reason]")+"\n\n📌 Please review your assignments immediately and escalate any blockers to the project lead.\n\nTime-sensitive — please respond today.\n\n— Innovations Interiors"
    },
    "Team Meeting Invite":{
      label:"📅 Team Meeting Invite",
      recipients:"all_staff",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — TEAM MEETING*\n\nHi "+m.name+",\n\nYou are cordially invited to our team meeting:\n\n📅 *Date:* "+(extra.date||"[Date]")+"\n⏰ *Time:* "+(extra.time||"[Time]")+"\n📍 *Venue:* "+(extra.venue||"Innovations Interiors Office, Pune")+"\n📋 *Agenda:* "+(extra.agenda||"Monthly review, project updates, team discussion")+"\n\nKindly confirm your attendance by replying to this message.\n\n*Attendance is mandatory.*\n\n— Innovations Interiors"
    },
    "Monthly Performance Review":{
      label:"📈 Monthly Performance Review",
      recipients:"all_staff",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — MONTHLY REVIEW*\n\nHi "+m.name+",\n\nYour monthly performance review for *"+(extra.month||"[Month]")+"* is scheduled.\n\n📅 *Date:* "+(extra.date||"[Date]")+"\n⏰ *Time:* "+(extra.time||"[Time]")+"\n\nPlease come prepared with:\n• Status of all assigned projects\n• Pending tasks and blockers\n• Key achievements this month\n\nThis is a 1:1 session with your reporting manager.\n\n— Innovations Interiors"
    },
    "Holiday / Leave Notice":{
      label:"🎉 Holiday / Leave Notice",
      recipients:"all_staff",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — NOTICE*\n\nHi "+m.name+",\n\nPlease note: *"+(extra.occasion||"Office closure / Public Holiday")+"*\n\n📅 *Date:* "+(extra.date||"[Date]")+"\n\nThe office will be "+(extra.note||"closed on this day. All urgent matters to be addressed before the holiday.")+"\n\nEnjoy and have a great day!\n\n— Innovations Interiors"
    },
    "Site Visit Reminder":{
      label:"📍 Site Visit Reminder",
      recipients:"exec",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — SITE VISIT*\n\nHi "+m.name+",\n\nSite visit reminder for project *"+(extra.project||"[Project]")+"*:\n\n📅 *Date:* "+(extra.date||"[Date]")+"\n⏰ *Time:* "+(extra.time||"[Time]")+"\n📍 *Location:* "+(extra.location||"[Site Address]")+"\n\n*Please ensure the following before the visit:*\n• Daily site report submitted for yesterday\n• All materials checklist ready\n• Any pending issues documented\n\n— Innovations Interiors"
    },
    "Drawing Submission Deadline":{
      label:"📐 Drawing Submission Deadline",
      recipients:"design",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — DRAWING DEADLINE*\n\nHi "+m.name+",\n\nPlease note the upcoming drawing submission:\n\n📁 *Project:* "+(extra.project||"[Project]")+"\n📐 *Drawing Set:* "+(extra.drawings||"[Drawing Set]")+"\n📅 *Deadline:* "+(extra.due||"[Date]")+"\n\nEnsure all drawings are reviewed internally before submission to the client.\n\nAny delays must be escalated to the principal immediately.\n\n— Innovations Interiors"
    },
    "Congratulations / Achievement":{
      label:"🏆 Congratulations / Achievement",
      recipients:"individual",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — CONGRATULATIONS! 🎉*\n\nDear "+m.name+",\n\nOn behalf of the entire Innovations Interiors team, we'd like to congratulate you on:\n\n🏆 *"+(extra.achievement||"Your outstanding contribution")+"\n\n"+(extra.project?"Related to: "+extra.project+"\n\n":"")+"Your dedication and hard work are truly valued and inspire the entire team.\n\nKeep up the excellent work!\n\n— Innovations Interiors Leadership"
    },
  },
  clients:{
    "Project Progress Update":{
      label:"📊 Project Progress Update",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"Client")+",\n\nHere is your project progress update:\n\n📁 *Project:* "+(extra.project||"[Project]")+"\n📅 *As of:* "+new Date().toDateString()+"\n⚙️ *Progress:* "+(extra.progress||"[X]")+"%\n🏗️ *Current Phase:* "+(extra.phase||"[Phase]")+"\n\n*Work completed this week:*\n"+(extra.workDone||"[Summary of work done]")+"\n\n*Next steps:*\n"+(extra.nextSteps||"[Upcoming milestones]")+"\n\nFor any queries, please feel free to contact us.\n\nWarm regards,\n"+(extra.designer||"Design Team")+"\nInnovations Interiors, Pune"
    },
    "Meeting / Site Visit Request":{
      label:"📅 Meeting / Site Visit Request",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"Client")+",\n\nWe would like to schedule a "+(extra.type||"site visit / design meeting")+" for your project *"+(extra.project||"[Project]")+"*.\n\n📅 *Proposed Date:* "+(extra.date||"[Date]")+"\n⏰ *Time:* "+(extra.time||"[Time]")+"\n📍 *Venue:* "+(extra.venue||"Site / Our Office")+"\n\nKindly confirm your availability or suggest an alternate date.\n\nLooking forward to your response.\n\nWarm regards,\n"+(extra.designer||"Design Team")+"\nInnovations Interiors, Pune"
    },
    "Payment Reminder":{
      label:"💰 Payment Reminder",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"Client")+",\n\nThis is a gentle reminder regarding the payment due for your project:\n\n📁 *Project:* "+(extra.project||"[Project]")+"\n📄 *Invoice:* "+(extra.invoice||"[Invoice No]")+"\n💰 *Amount Due:* ₹"+(extra.amount||"[Amount]")+"\n📅 *Due Date:* "+(extra.dueDate||"[Date]")+"\n🏗️ *Milestone:* "+(extra.milestone||"[Milestone]")+"\n\nKindly process the payment at your earliest convenience to avoid any delays in project execution.\n\nFor payment details or queries, please contact us.\n\nWarm regards,\nInnovations Interiors, Pune"
    },
    "Design Approval Request":{
      label:"✅ Design Approval Request",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"Client")+",\n\nYour "+(extra.drawingType||"design drawings / 3D renders")+" for *"+(extra.project||"[Project]")+"* are ready for your review and approval.\n\n📋 *Drawings Shared:* "+(extra.drawings||"[Drawing Set]")+"\n📅 *Shared On:* "+(extra.date||new Date().toDateString())+"\n\nKindly review and share your feedback or approval at the earliest so we can proceed to the next stage without delays.\n\nThank you for your time.\n\nWarm regards,\n"+(extra.designer||"Design Team")+"\nInnovations Interiors, Pune"
    },
    "Handover / Completion Notice":{
      label:"🏁 Handover / Completion Notice",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"Client")+",\n\n🎉 We are delighted to inform you that your project *"+(extra.project||"[Project]")+"* is now complete and ready for handover!\n\n📅 *Handover Date:* "+(extra.date||"[Date]")+"\n⏰ *Time:* "+(extra.time||"[Time]")+"\n📍 *Venue:* "+(extra.location||"Site")+"\n\nPlease bring a representative for the walkthrough. All documentation including drawings, warranties, and manuals will be shared.\n\nThank you for trusting Innovations Interiors with your dream space.\n\nWarm regards,\nInnovations Interiors, Pune"
    },
  },
  vendors:{
    "Purchase Order / Requirement":{
      label:"📦 Purchase Order / Requirement",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — VENDOR COMMUNICATION*\n\nDear "+(extra.vendorName||"Vendor")+",\n\nWe have the following requirement for our project:\n\n📁 *Project:* "+(extra.project||"[Project]")+"\n📦 *Material / Service:* "+(extra.material||"[Material/Service]")+"\n📐 *Quantity:* "+(extra.qty||"[Qty & Unit]")+"\n📅 *Required By:* "+(extra.date||"[Date]")+"\n📍 *Delivery Address:* "+(extra.address||"[Site Address]")+"\n\nKindly confirm availability, pricing, and delivery timeline at the earliest.\n\nRegards,\nProcurement Team\nInnovations Interiors, Pune"
    },
    "Payment Confirmation":{
      label:"✅ Payment Confirmation",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — PAYMENT CONFIRMATION*\n\nDear "+(extra.vendorName||"Vendor")+",\n\nWe are pleased to inform you that payment has been processed:\n\n💰 *Amount:* ₹"+(extra.amount||"[Amount]")+"\n📄 *Against:* "+(extra.invoice||"[Invoice / Bill No]")+"\n📅 *Date:* "+(extra.date||new Date().toDateString())+"\n\nPlease confirm receipt.\n\nRegards,\nAccounts Team\nInnovations Interiors, Pune"
    },
    "Outstanding Payment Reminder":{
      label:"⚠️ Outstanding Payment Reminder",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — PAYMENT REMINDER*\n\nDear "+(extra.vendorName||"Vendor")+",\n\nWe would like to draw your attention to an outstanding balance on our account:\n\n💰 *Outstanding:* ₹"+(extra.amount||"[Amount]")+"\n📄 *Reference:* "+(extra.ref||"[Bill / Reference No]")+"\n📅 *Due Since:* "+(extra.since||"[Date]")+"\n\nPlease share the payment timeline at the earliest to ensure smooth business continuity.\n\nRegards,\nInnovations Interiors, Pune"
    },
    "Vendor Performance Feedback":{
      label:"📊 Vendor Performance Feedback",
      build:(m,extra)=>"*INNOVATIONS INTERIORS — FEEDBACK*\n\nDear "+(extra.vendorName||"Vendor")+",\n\nThank you for your services on project *"+(extra.project||"[Project]")+"*.\n\nFeedback:\n• Quality: "+(extra.quality||"[Good / Average / Poor]")+"\n• Delivery: "+(extra.delivery||"[On Time / Delayed]")+"\n• Communication: "+(extra.comm||"[Good / Needs Improvement]")+"\n\n"+(extra.note||"")+"\n\nWe look forward to continued collaboration.\n\nRegards,\nInnovations Interiors, Pune"
    },
  },
  enquiries:{
    "Initial Response to Enquiry":{
      label:"👋 Initial Response to Enquiry",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"[Client Name]")+",\n\nThank you for your enquiry regarding interior design services!\n\nWe are Innovations Interiors, a premium interior design consultancy based in Pune, specialising in:\n• 🏠 Residential (Flats, Bungalows, Villas)\n• 🏢 Commercial (Offices, Co-working, Showrooms)\n• 🏨 Hospitality (Hotels, Restaurants, Cafés)\n\nWe would love to understand your requirements better.\n\nCould you please share:\n1. Project type and location\n2. Approximate carpet area\n3. Expected timeline\n4. Budget range\n\nWe will revert with a detailed proposal and timeline at the earliest.\n\nWarm regards,\nImran Sir — Business Development\nInnovations Interiors, Pune\n📞 +91 70068 75749"
    },
    "Follow-up After Site Visit":{
      label:"🏠 Follow-up After Site Visit",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"[Client]")+",\n\nThank you for having us at your site for the visit!\n\nWe thoroughly enjoyed understanding your vision for "+(extra.project||"your space")+".\n\nAs discussed:\n• Proposed Style: "+(extra.style||"[Style discussed]")+"\n• Scope: "+(extra.scope||"[Scope of work]")+"\n• Tentative Budget: "+(extra.budget||"[Budget discussed]")+"\n\nWe are working on your design concept and preliminary estimate. You can expect to receive it by "+(extra.date||"[Date]")+".\n\nMeanwhile, feel free to reach out with any thoughts or additions.\n\nWarm regards,\nInnovations Interiors, Pune"
    },
    "Proposal / Estimate Sent":{
      label:"📄 Proposal / Estimate Sent",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.client||"[Client]")+",\n\nThank you for considering Innovations Interiors for your project!\n\nWe are pleased to share the interior design estimate for *"+(extra.project||"your project")+"*:\n\n💰 *Estimated Investment:* ₹"+(extra.amount||"[Amount]")+"\n📐 *Scope:* "+(extra.scope||"[Scope]")+"\n⏱️ *Estimated Timeline:* "+(extra.timeline||"[X] weeks")+"\n\nThis estimate covers design, 3D visualisation, drawing sets, site supervision, and project coordination.\n\nKindly review and let us know your feedback at your earliest convenience.\n\nWe are happy to schedule a detailed presentation meeting as well.\n\nWarm regards,\nInnovations Interiors, Pune"
    },
    "Referral Thank You":{
      label:"🤝 Referral Thank You",
      build:(m,extra)=>"*INNOVATIONS INTERIORS*\n\nDear "+(extra.referrer||"[Name]")+",\n\nThank you so much for referring *"+(extra.client||"[New Client]")+"* to us!\n\nYour trust and recommendation mean a great deal to us and our team. Referrals from valued clients like you are the greatest compliment we can receive.\n\nRest assured, we will take excellent care of "+(extra.client||"them")+" and deliver the same quality you have experienced.\n\nWith gratitude,\nInnovations Interiors, Pune"
    },
  },
};

function BroadcastWA({projects,tasks,leads,finance,vendors}){
  const [category,setCategory]=useState("staff");
  const [scriptKey,setScriptKey]=useState("");
  const [recipientType,setRecipientType]=useState("all_staff"); // all_staff, design, exec, management, individual, custom
  const [selectedMembers,setSelectedMembers]=useState([]);
  const [extra,setExtra]=useState({});
  const [preview,setPreview]=useState("");
  const [sendLog,setSendLog]=useState([]);
  const [bulkMode,setBulkMode]=useState("individual"); // individual | group
  const [customPhone,setCustomPhone]=useState("");
  const [step,setStep]=useState(1); // 1=choose script, 2=fill details, 3=preview+send

  const cats={staff:"👥 Staff",clients:"🤝 Clients",vendors:"🔧 Vendors",enquiries:"🎯 Enquiries"};
  const scripts=WA_SCRIPTS[category]||{};
  const currentScript=scripts[scriptKey];

  const staffGroups={
    all_staff:ALL_TEAM_MEMBERS,
    design:ALL_TEAM_MEMBERS.filter(m=>m.dept==="Design"),
    exec:ALL_TEAM_MEMBERS.filter(m=>m.dept==="Execution"),
    management:ALL_TEAM_MEMBERS.filter(m=>m.dept==="Management"),
    individual:[],
    custom:[],
  };

  // Quick-fill from live data
  const overdueTasksList=tasks.filter(t=>t.status==="Overdue");
  const delayedProjects=projects.filter(p=>p.status==="ON PRIORITY"&&p.progress<50);
  const overdueInvoices=(finance||[]).filter(f=>f.status==="Overdue");
  const warnVendors=(vendors||[]).filter(v=>v.status==="Warning");

  function buildPreview(){
    if(!currentScript)return;
    const dummyMember=selectedMembers.length>0?selectedMembers[0]:{name:"[Name]",phone:"",role:""};
    const msg=currentScript.build(dummyMember,extra);
    setPreview(msg);
    setStep(3);
  }

  function sendToMember(member){
    const msg=currentScript.build(member,extra);
    const phone=member.phone||"";
    openWhatsApp(phone,msg);
    setSendLog(l=>[...l,{name:member.name,phone,time:new Date().toLocaleTimeString(),status:"Sent"}]);
  }

  function sendBulk(){
    const targets=recipientType==="individual"||recipientType==="custom"
      ?selectedMembers
      :staffGroups[recipientType]||[];
    if(targets.length===0){alert("No recipients selected.");return;}
    if(!window.confirm("Send to "+targets.length+" recipients — "+targets.map(m=>m.name).join(", ")+"?"))return;
    setSendLog([]);
    targets.forEach((m,i)=>setTimeout(()=>sendToMember(m),i*1500));
  }

  function sendSingle(phone){
    if(!currentScript){alert("Select a script first.");return;}
    const msg=currentScript.build({name:extra.client||"Client",phone},extra);
    openWhatsApp(phone,msg);
    setSendLog(l=>[...l,{name:extra.client||phone,phone,time:new Date().toLocaleTimeString(),status:"Sent"}]);
  }

  function quickFillOverdueTasks(){
    if(overdueTasksList.length===0){alert("No overdue tasks.");return;}
    const t=overdueTasksList[0];
    setExtra(e=>({...e,task:t.title,project:t.project,due:t.due}));
    const member=ALL_TEAM_MEMBERS.find(m=>m.name===t.assignee);
    if(member)setSelectedMembers([member]);
    setScriptKey("Task Deadline Reminder");
  }

  function quickFillDelay(){
    if(delayedProjects.length===0){alert("No delayed priority projects.");return;}
    const p=delayedProjects[0];
    setExtra(e=>({...e,project:p.name,progress:p.progress+"%",expected:"70%",reason:"Pending client approvals / material delays"}));
    setScriptKey("Project Delay Alert");
  }

  const inpS={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};
  const BSB=(bg,extra={})=>({padding:"7px 14px",background:bg,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer",...extra});

  return <div>
    <Head title="📲 WhatsApp Broadcast Hub" sub="Bulk send · Pre-written scripts · Staff · Clients · Vendors · Enquiries"/>

    {/* Quick Action Bar */}
    <div style={{background:C.greenLight,border:"0.5px solid #2E7D3244",borderRadius:8,padding:"0.85rem 1rem",marginBottom:"1rem"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1A5C2E",marginBottom:8}}>⚡ Quick Send from Live Data</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {overdueTasksList.length>0&&<button onClick={quickFillOverdueTasks} style={BSB("#25D366")}>📲 Task Reminder → {overdueTasksList[0].assignee} ({overdueTasksList.length} overdue)</button>}
        {delayedProjects.length>0&&<button onClick={quickFillDelay} style={BSB("#128C7E")}>🔴 Project Delay Alert → {delayedProjects[0].name}</button>}
        {overdueInvoices.length>0&&<button onClick={()=>{setCategory("clients");setScriptKey("Payment Reminder");setExtra(e=>({...e,project:overdueInvoices[0].project,invoice:overdueInvoices[0].ref,amount:Number(overdueInvoices[0].amount).toLocaleString("en-IN"),dueDate:overdueInvoices[0].dueDate}));setStep(2);}} style={BSB(C.red)}>💰 Payment Reminder → {overdueInvoices[0].client}</button>}
        {warnVendors.length>0&&<button onClick={()=>{setCategory("vendors");setScriptKey("Vendor Performance Feedback");setExtra(e=>({...e,vendorName:warnVendors[0].name}));setStep(2);}} style={BSB(C.amber)}>⚠️ Vendor Alert → {warnVendors[0].name}</button>}
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:16}}>
      {/* Left — Script Library */}
      <div>
        <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,overflow:"hidden"}}>
          <div style={{padding:"0.75rem 1rem",background:C.ink,fontSize:12,fontWeight:700,color:C.goldMid}}>📋 Script Library</div>
          {/* Category tabs */}
          <div style={{padding:"0.5rem",background:C.surface2,display:"flex",gap:4,flexWrap:"wrap"}}>
            {Object.entries(cats).map(([k,l])=><button key={k} onClick={()=>{setCategory(k);setScriptKey("");setStep(1);}} style={{padding:"4px 8px",borderRadius:3,fontSize:10,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(category===k?C.gold:C.border),background:category===k?C.gold:"#fff",color:category===k?"#fff":C.muted,fontWeight:category===k?700:400}}>{l}</button>)}
          </div>
          {/* Scripts list */}
          <div style={{padding:"0.5rem"}}>
            {Object.keys(scripts).map(key=><button key={key} onClick={()=>{setScriptKey(key);setStep(2);setExtra({});setPreview("");setSendLog([]);}} style={{width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:4,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(scriptKey===key?C.gold:C.border),background:scriptKey===key?C.goldLight:"#fff",color:scriptKey===key?C.goldDark:C.inkSoft,marginBottom:4,fontWeight:scriptKey===key?600:400}}>{scripts[key].label}</button>)}
          </div>
        </div>
      </div>

      {/* Right — Compose + Send */}
      <div>
        {step===1&&<div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"3rem",textAlign:"center",color:C.muted}}>
          <div style={{fontSize:24,marginBottom:8}}>📲</div>
          <div style={{fontSize:13,fontWeight:600,color:C.ink}}>Select a script from the library</div>
          <div style={{fontSize:12,marginTop:6}}>Choose a category and script on the left, then fill in the details</div>
        </div>}

        {step>=2&&currentScript&&<div>
          {/* Fill Details */}
          <div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>{currentScript.label}</div>

            {/* Recipients (staff only) */}
            {category==="staff"&&<div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Recipients</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                {[["all_staff","All Staff"],["design","Design Team"],["exec","Execution Team"],["management","Management"],["individual","Select Individual"]].map(([v,l])=><button key={v} onClick={()=>{setRecipientType(v);setSelectedMembers([]);}} style={{padding:"4px 10px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(recipientType===v?C.gold:C.border),background:recipientType===v?C.gold:"#fff",color:recipientType===v?"#fff":C.muted}}>{l} {v!=="individual"&&staffGroups[v]?"("+staffGroups[v].length+")":""}</button>)}
              </div>
              {recipientType==="individual"&&<div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {ALL_TEAM_MEMBERS.map(m=><button key={m.name} onClick={()=>setSelectedMembers(s=>s.find(x=>x.name===m.name)?s.filter(x=>x.name!==m.name):[...s,m])} style={{padding:"4px 9px",borderRadius:3,fontSize:10,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(selectedMembers.find(x=>x.name===m.name)?C.gold:C.border),background:selectedMembers.find(x=>x.name===m.name)?C.goldLight:"#fff",color:selectedMembers.find(x=>x.name===m.name)?C.goldDark:C.muted,fontWeight:selectedMembers.find(x=>x.name===m.name)?700:400}}>
                  {m.name}
                </button>)}
              </div>}
            </div>}

            {/* Client phone (for non-staff) */}
            {category!=="staff"&&<div style={{marginBottom:10}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>WhatsApp Number</div>
              <input value={customPhone} onChange={e=>setCustomPhone(e.target.value)} placeholder="91XXXXXXXXXX (with country code)" style={inpS}/>
            </div>}

            {/* Dynamic fields */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {category!=="staff"&&<div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{category==="vendors"?"Vendor Name":"Client Name"}</div><input value={extra[category==="vendors"?"vendorName":"client"]||""} onChange={e=>setExtra(x=>({...x,[category==="vendors"?"vendorName":"client"]:e.target.value}))} style={inpS}/></div>}
              {["project","invoice","amount","dueDate","date","time","venue","milestone","designer","drawings","scope","budget","task","due","progress","reason","agenda","material","qty","address","achievement","month","referrer","style","nextSteps","workDone","quality","delivery","comm","note","phase","timeline","type","location","occasion"].map(field=>{
                const labels={project:"Project Name",invoice:"Invoice No",amount:"Amount (₹)",dueDate:"Due Date",date:"Date",time:"Time",venue:"Venue",milestone:"Milestone",designer:"Designer Name",drawings:"Drawing Set",scope:"Scope of Work",budget:"Budget",task:"Task Name",due:"Task Due Date",progress:"Current Progress %",reason:"Reason for Delay",agenda:"Meeting Agenda",material:"Material / Service",qty:"Quantity",address:"Delivery Address",achievement:"Achievement / Award",month:"Month",referrer:"Referrer Name",style:"Design Style",nextSteps:"Next Steps",workDone:"Work Completed",quality:"Quality Rating",delivery:"Delivery Rating",comm:"Communication Rating",note:"Additional Note",phase:"Current Phase",timeline:"Timeline",type:"Meeting Type",location:"Location",occasion:"Occasion / Holiday Name"};
                if(!preview.includes("["+labels[field]+"]")&&!preview.includes(field))return null;
                return <div key={field}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{labels[field]||field}</div><input value={extra[field]||""} onChange={e=>setExtra(x=>({...x,[field]:e.target.value}))} placeholder={labels[field]} style={inpS}/></div>;
              })}
            </div>

            {/* Dynamic fields — generic row */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
              {category==="staff"&&["project","task","due","date","time","venue","agenda","drawings","achievement","reason","progress","month","occasion"].map(field=>{
                const labels={project:"Project Name",task:"Task Name",due:"Task Due Date",date:"Date",time:"Time",venue:"Venue",agenda:"Agenda",drawings:"Drawing Set",achievement:"Achievement",reason:"Reason",progress:"Progress %",month:"Month",occasion:"Occasion"};
                return <div key={field}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{labels[field]||field}</div><input value={extra[field]||""} onChange={e=>setExtra(x=>({...x,[field]:e.target.value}))} placeholder={labels[field]} style={inpS}/></div>;
              })}
            </div>

            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={buildPreview} style={BSB(C.blue)}>👁 Preview Message</button>
              <button onClick={()=>{setStep(1);setScriptKey("");setPreview("");}} style={{...BSB("#fff"),color:C.muted,border:"0.5px solid "+C.border}}>← Back</button>
            </div>
          </div>

          {/* Preview + Send */}
          {step===3&&preview&&<div style={{background:"#fff",border:"0.5px solid "+C.border,borderRadius:8,padding:"1.25rem"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:10}}>📲 Message Preview</div>
            <div style={{background:"#ECE5DD",borderRadius:8,padding:"1rem",fontSize:12,color:"#1a1a1a",lineHeight:1.7,whiteSpace:"pre-wrap",maxHeight:280,overflowY:"auto",marginBottom:"1rem"}}>{preview}</div>

            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:"1rem"}}>
              {category==="staff"&&<>
                <button onClick={sendBulk} style={BSB("#25D366",{fontSize:13,padding:"8px 18px"})}>
                  📲 Send to {recipientType==="individual"?selectedMembers.length+" Selected":recipientType==="all_staff"?"All "+ALL_TEAM_MEMBERS.length+" Staff":staffGroups[recipientType]?.length+" "+recipientType}
                </button>
                {recipientType==="individual"&&selectedMembers.map(m=><button key={m.name} onClick={()=>sendToMember(m)} style={BSB("#128C7E")}>📲 {m.name}</button>)}
              </>}
              {category!=="staff"&&<button onClick={()=>sendSingle(customPhone)} style={BSB("#25D366",{fontSize:13,padding:"8px 18px"})}>📲 Send on WhatsApp</button>}
              <button onClick={()=>{try{navigator.clipboard.writeText(preview);alert("✅ Copied to clipboard!");}catch(e){alert("Select and copy the message above.");}}} style={{...BSB(C.ink),fontSize:12}}>📋 Copy Message</button>
            </div>

            {sendLog.length>0&&<div>
              <div style={{fontSize:11,fontWeight:700,color:C.ink,marginBottom:6}}>📊 Send Log ({sendLog.length})</div>
              {sendLog.map((l,i)=><div key={i} style={{display:"flex",gap:10,fontSize:11,padding:"4px 8px",background:C.greenLight,borderRadius:3,marginBottom:3}}>
                <span style={{color:C.green,fontWeight:700}}>✓</span>
                <span style={{fontWeight:600}}>{l.name}</span>
                <span style={{color:C.muted}}>{l.phone}</span>
                <span style={{color:C.muted,marginLeft:"auto"}}>{l.time}</span>
              </div>)}
            </div>}
          </div>}
        </div>}
      </div>
    </div>
  </div>;
}

// ── GENERAL QUERY / ASK ANYTHING ─────────────────────────────────────────────
const QUERY_CATS=["Project Update","Task Query","Site Issue","Design Clarification","Material / Vendor","Finance / Payment","Client Communication","Team / HR","Process / SOP","Other"];
const QUERY_PRIORITIES=["Urgent","High","Normal","Low"];

function GeneralQueries(){
  const [queries,setQueries]=useState([
    {id:1,from:"PRAFUL",to:"Principal",category:"Site Issue",subject:"Tile delay for GOSAVI kitchen",message:"Tiles ordered for GOSAVI kitchen are not yet delivered. Vendor says 3 more days. Should we proceed with other work or wait?",priority:"Urgent",date:"2026-05-18",status:"Open",reply:""},
    {id:2,from:"SOJWAL",to:"Principal",category:"Design Clarification",subject:"MULUND 34 — TV wall material",message:"Client has asked for a change in the TV wall material from veneer to lacquered glass. Please confirm if we can accommodate and the revised cost impact.",priority:"High",date:"2026-05-17",status:"Resolved",reply:"Confirmed — lacquered glass approved. Cost addition ₹18,000 to be added to revision BOQ."},
  ]);
  const [showAdd,setShowAdd]=useState(false);
  const [selected,setSelected]=useState(null);
  const [reply,setReply]=useState("");
  const [newQ,setNewQ]=useState({from:ALL_TEAM_MEMBERS[0].name,to:"Principal",category:"Project Update",subject:"",message:"",priority:"Normal",date:new Date().toISOString().split("T")[0]});
  const [filter,setFilter]=useState("All");

  const inp={padding:"7px 10px",border:"0.5px solid "+C.borderStrong,borderRadius:4,fontSize:12,fontFamily:"inherit",background:"#fff",color:C.ink,outline:"none",width:"100%"};
  const SC2={Open:{bg:"#FFF3E0",color:C.amber},Resolved:{bg:C.greenLight,color:C.green},Pending:{bg:C.blueLight,color:C.blue}};

  function saveQuery(){
    if(!newQ.subject||!newQ.message)return;
    setQueries(qs=>[...qs,{...newQ,id:Date.now(),status:"Open",reply:""}]);
    setNewQ({from:ALL_TEAM_MEMBERS[0].name,to:"Principal",category:"Project Update",subject:"",message:"",priority:"Normal",date:new Date().toISOString().split("T")[0]});
    setShowAdd(false);
  }

  function saveReply(id){
    if(!reply.trim())return;
    setQueries(qs=>qs.map(q=>q.id===id?{...q,reply,status:"Resolved"}:q));
    // Also notify via WhatsApp
    const q=queries.find(x=>x.id===id);
    const member=ALL_TEAM_MEMBERS.find(m=>m.name===q?.from);
    if(q&&member){
      const msg="*INNOVATIONS INTERIORS — QUERY RESOLVED*\n\nHi "+q.from+",\n\nYour query has been addressed:\n\n*Subject:* "+q.subject+"\n*Your Query:* "+q.message.slice(0,100)+"\n\n*Reply from "+q.to+":*\n"+reply+"\n\n— Innovations Interiors";
      openWhatsApp(member.phone,msg);
    }
    setReply("");setSelected(null);
  }

  const filtered=filter==="All"?queries:queries.filter(q=>q.status===filter||q.priority===filter||q.category===filter);

  return <div>
    {/* Detail view */}
    {selected&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{background:"#fff",borderRadius:10,width:"min(580px,95vw)",maxHeight:"85vh",overflow:"auto",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
        <div style={{padding:"0.9rem 1.25rem",background:C.ink,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:C.goldMid}}>📩 {selected.subject}</div>
          <button onClick={()=>{setSelected(null);setReply("");}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"1.25rem"}}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12,fontSize:11,color:C.muted}}>
            <span>From: <strong style={{color:C.ink}}>{selected.from}</strong></span>
            <span>To: <strong style={{color:C.ink}}>{selected.to}</strong></span>
            <span>Date: {selected.date}</span>
            <span style={{color:QUERY_PRIORITIES.indexOf(selected.priority)<2?C.red:C.muted,fontWeight:700}}>{selected.priority}</span>
          </div>
          <div style={{background:C.surface2,borderRadius:6,padding:"0.75rem",marginBottom:12,fontSize:13,color:C.inkSoft,lineHeight:1.7}}>{selected.message}</div>
          {selected.reply&&<div style={{background:C.greenLight,border:"0.5px solid "+C.green+"33",borderRadius:6,padding:"0.75rem",marginBottom:12}}>
            <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Reply from {selected.to}</div>
            <div style={{fontSize:13,color:C.inkSoft,lineHeight:1.7}}>{selected.reply}</div>
          </div>}
          {selected.status!=="Resolved"&&<div>
            <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Reply</div>
            <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={4} placeholder="Type your reply here..."
              style={{...inp,resize:"vertical",marginBottom:8}}/>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>saveReply(selected.id)} style={{padding:"7px 16px",background:C.green,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>✅ Reply & Mark Resolved</button>
              <button onClick={()=>{setSelected(null);setReply("");}} style={{padding:"7px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
            </div>
          </div>}
        </div>
      </div>
    </div>}

    <Head title="📩 General Queries" sub={queries.filter(q=>q.status==="Open").length+" open · "+queries.filter(q=>q.status==="Resolved").length+" resolved"} action={<button onClick={()=>setShowAdd(!showAdd)} style={{padding:"7px 14px",background:C.gold,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>+ New Query</button>}/>

    {/* Add Query Form */}
    {showAdd&&<div style={{background:C.goldLight,border:"1px solid "+C.borderStrong,borderRadius:8,padding:"1.25rem",marginBottom:"1rem"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:12}}>📩 Submit Query / Request</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>From</div>
          <select value={newQ.from} onChange={e=>setNewQ(d=>({...d,from:e.target.value}))} style={inp}>
            {ALL_TEAM_MEMBERS.map(m=><option key={m.name}>{m.name}</option>)}
          </select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>To</div>
          <select value={newQ.to} onChange={e=>setNewQ(d=>({...d,to:e.target.value}))} style={inp}>
            {["Principal","IMRAN SIR",...ALL_TEAM_MEMBERS.map(m=>m.name)].filter((v,i,a)=>a.indexOf(v)===i).map(n=><option key={n}>{n}</option>)}
          </select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Category</div>
          <select value={newQ.category} onChange={e=>setNewQ(d=>({...d,category:e.target.value}))} style={inp}>
            {QUERY_CATS.map(c=><option key={c}>{c}</option>)}
          </select></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Priority</div>
          <select value={newQ.priority} onChange={e=>setNewQ(d=>({...d,priority:e.target.value}))} style={inp}>
            {QUERY_PRIORITIES.map(p=><option key={p}>{p}</option>)}
          </select></div>
        <div style={{gridColumn:"span 2"}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Subject</div>
          <input value={newQ.subject} onChange={e=>setNewQ(d=>({...d,subject:e.target.value}))} placeholder="Brief subject line" style={inp}/></div>
        <div><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Date</div>
          <input type="date" value={newQ.date} onChange={e=>setNewQ(d=>({...d,date:e.target.value}))} style={inp}/></div>
      </div>
      <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Message / Query</div>
        <textarea value={newQ.message} onChange={e=>setNewQ(d=>({...d,message:e.target.value}))} rows={4} placeholder="Describe your query, issue, or request in detail..." style={{...inp,resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={saveQuery} style={{padding:"7px 16px",background:C.gold,color:"#fff",border:"none",borderRadius:4,fontSize:12,fontFamily:"inherit",fontWeight:600,cursor:"pointer"}}>💾 Submit Query</button>
        <button onClick={()=>setShowAdd(false)} style={{padding:"7px 14px",background:"#fff",color:C.muted,border:"0.5px solid "+C.border,borderRadius:4,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>Cancel</button>
      </div>
    </div>}

    {/* Filters */}
    <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
      {["All","Open","Resolved","Urgent","High"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:3,fontSize:11,fontFamily:"inherit",cursor:"pointer",border:"0.5px solid "+(filter===f?C.gold:C.border),background:filter===f?C.gold:"#fff",color:filter===f?"#fff":C.muted,fontWeight:filter===f?700:400}}>
        {f} {f==="Open"||f==="Resolved"?"("+queries.filter(q=>q.status===f).length+")":""}
      </button>)}
    </div>

    {/* Query cards */}
    {filtered.length===0&&<div style={{padding:"2rem",textAlign:"center",color:C.muted,background:"#fff",borderRadius:8,border:"0.5px solid "+C.border}}>No queries. Click <strong>+ New Query</strong> to ask anything.</div>}
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {filtered.map(q=>{
        const sc=SC2[q.status]||SC2.Open;
        const isUrgent=q.priority==="Urgent";
        return <div key={q.id} style={{background:"#fff",border:"0.5px solid "+(isUrgent?C.red:C.border),borderRadius:8,padding:"1rem",cursor:"pointer"}} onClick={()=>{setSelected(q);setReply(q.reply||"");}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{q.subject}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>
                From: <strong>{q.from}</strong> → {q.to} · {q.date} · <Tag label={q.category} color={C.blue}/>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0,marginLeft:10,alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:3,background:isUrgent?C.redLight:q.priority==="High"?C.amberLight:C.surface2,color:isUrgent?C.red:q.priority==="High"?C.amber:C.muted}}>{q.priority}</span>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:3,background:sc.bg,color:sc.color}}>{q.status}</span>
            </div>
          </div>
          <div style={{fontSize:12,color:C.inkSoft,lineHeight:1.5}}>{q.message.slice(0,120)}{q.message.length>120?"...":""}</div>
          {q.reply&&<div style={{marginTop:8,fontSize:11,color:C.green,fontWeight:500}}>✅ Reply: {q.reply.slice(0,80)}{q.reply.length>80?"...":""}</div>}
        </div>;
      })}
    </div>
  </div>;
}

const NAV=[
  {id:"dashboard",   icon:"⬛", label:"Dashboard"},
  {id:"leads",       icon:"🎯", label:"Leads & CRM"},
  {id:"projects",    icon:"📁", label:"Projects"},
  {id:"tasks",       icon:"✅", label:"Tasks"},
  {id:"timeline",    icon:"📅", label:"Timeline"},
  {id:"site",        icon:"📍", label:"Site Reports"},
  {id:"reports",     icon:"📊", label:"Weekly/Monthly"},
  {id:"issues",      icon:"⚠️", label:"Site Issues"},
  {id:"proposals",   icon:"💼", label:"Quotations"},
  {id:"recce",       icon:"🏠", label:"Recce & Moodboards"},
  {id:"procurement", icon:"📦", label:"Procurement"},
  {id:"contracts",   icon:"📋", label:"Contracts"},
  {id:"activities",  icon:"📌", label:"Activities"},
  {id:"manpower",    icon:"👷", label:"Manpower"},
  {id:"followups",   icon:"📲", label:"Follow-ups"},
  {id:"finance",     icon:"💰", label:"Finance"},
  {id:"vendors",     icon:"🔧", label:"Vendors"},
  {id:"people",      icon:"👥", label:"Team & People"},
  {id:"broadcast",   icon:"📣", label:"WA Broadcast"},
  {id:"knowledge",   icon:"📚", label:"Knowledge Centre"},
  {id:"queries",     icon:"📩", label:"General Queries"},
];

export default function App(){
  const [view,setView]=useState("dashboard");
  const [projects,setProjects]=useState(REAL_PROJECTS);
  const [tasks,setTasks]=useState(INIT_TASKS);
  const [siteReports,setSiteReports]=useState(INIT_REPORTS);
  const [moms,setMoms]=useState(INIT_MOMS);
  const [proposals,setProposals]=useState([]);
  const [followups,setFollowups]=useState(INIT_FOLLOWUPS);
  const [leads,setLeads]=useState(INIT_LEADS);
  const [issues,setIssues]=useState(INIT_ISSUES);
  const [finance,setFinance]=useState(INIT_FINANCE);
  const [vendors,setVendors]=useState(INIT_VENDORS);
  const [perf,setPerf]=useState(INIT_PERFORMANCE);
  const [aiOpen,setAiOpen]=useState(false);

  const priority=projects.filter(p=>p.status==="ON PRIORITY").length;
  const overdueTasks=tasks.filter(t=>t.status==="Overdue").length;
  const pendingFU=followups.filter(f=>f.status==="Pending").length;
  const openIssues=issues.filter(i=>i.status!=="Resolved").length;

  return <div style={{display:"flex",minHeight:"100vh",background:C.surface,fontFamily:"'DM Sans','Trebuchet MS',sans-serif"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.surface}}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.3);border-radius:4px}`}</style>

    {/* Sidebar */}
    <div style={{width:220,background:C.sidebar,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:10,overflowY:"auto"}}>
      {/* Brand */}
      <div style={{padding:"1.25rem 1rem 0.75rem",borderBottom:"0.5px solid rgba(255,255,255,0.07)"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:600,color:C.goldMid,letterSpacing:"0.02em"}}>Innovations</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.18em",textTransform:"uppercase"}}>Interiors · ERP/CRM</div>
        <div style={{marginTop:8,display:"flex",gap:5,flexWrap:"wrap"}}>
          {priority>0&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:"rgba(192,57,43,0.25)",color:"#EF9A9A",fontWeight:700}}>🔴 {priority}</span>}
          {overdueTasks>0&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:"rgba(201,106,0,0.25)",color:"#FFCC80",fontWeight:700}}>⏰ {overdueTasks}</span>}
          {openIssues>0&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:"rgba(107,33,168,0.25)",color:"#CE93D8",fontWeight:700}}>⚠ {openIssues}</span>}
          {pendingFU>0&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:"rgba(37,211,102,0.15)",color:"#69F0AE",fontWeight:700}}>📲 {pendingFU}</span>}
        </div>
      </div>
      <div style={{margin:"0.5rem 1rem",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.06em"}}>19 MAY 2026 · PUNE</div>

      {/* Nav */}
      <nav style={{flex:1,padding:"0.25rem 0"}}>
        {NAV.map(n=><button key={n.id} onClick={()=>setView(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"0.6rem 1rem",border:"none",background:view===n.id?C.sidebarActive:"transparent",color:view===n.id?C.goldMid:"rgba(255,255,255,0.45)",fontSize:12,fontFamily:"inherit",cursor:"pointer",borderLeft:view===n.id?"3px solid "+C.goldMid:"3px solid transparent",textAlign:"left",fontWeight:view===n.id?700:400,transition:"all 0.15s"}}>
          <span style={{fontSize:14}}>{n.icon}</span>{n.label}
          {n.id==="issues"&&openIssues>0&&<span style={{marginLeft:"auto",fontSize:9,background:C.red,color:"#fff",padding:"1px 5px",borderRadius:8,fontWeight:700}}>{openIssues}</span>}
          {n.id==="tasks"&&overdueTasks>0&&<span style={{marginLeft:"auto",fontSize:9,background:C.amber,color:"#fff",padding:"1px 5px",borderRadius:8,fontWeight:700}}>{overdueTasks}</span>}
          {n.id==="followups"&&pendingFU>0&&<span style={{marginLeft:"auto",fontSize:9,background:"#25D366",color:"#fff",padding:"1px 5px",borderRadius:8,fontWeight:700}}>{pendingFU}</span>}
        </button>)}
      </nav>

      {/* Status mini */}
      <div style={{margin:"0 0.75rem",padding:"0.65rem 0.75rem",background:"rgba(255,255,255,0.04)",borderRadius:6,marginBottom:"0.65rem"}}>
        <div style={{fontSize:8,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7}}>Project Status</div>
        {[["ON PRIORITY","#EF9A9A"],["ACTIVE","#90CAF9"],["PASSIVE","#CE93D8"],["HANDOVER","#A5D6A7"],["SITE MEASUREMENT","#FFCC80"]].map(([s,c])=><div key={s} style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>{s}</span>
          <span style={{fontSize:11,fontWeight:700,color:c}}>{projects.filter(p=>p.status===s).length}</span>
        </div>)}
        <div style={{borderTop:"0.5px solid rgba(255,255,255,0.08)",marginTop:5,paddingTop:5,display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>TOTAL</span>
          <span style={{fontSize:12,fontWeight:700,color:C.goldMid}}>{projects.length}</span>
        </div>
      </div>

      {/* AI Button */}
      <button onClick={()=>setAiOpen(o=>!o)} style={{margin:"0 0.75rem 0.65rem",padding:"0.6rem 1rem",background:aiOpen?"linear-gradient(135deg,"+C.gold+","+C.goldDark+")":"rgba(201,168,76,0.15)",color:aiOpen?"#fff":C.goldMid,border:"0.5px solid "+C.goldMid+"44",borderRadius:6,fontSize:12,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontWeight:600}}>
        🤖 AI Assistant {aiOpen?"▼":"▲"}
      </button>

      {/* User */}
      <div style={{padding:"0.75rem 1rem",borderTop:"0.5px solid rgba(255,255,255,0.07)",display:"flex",gap:10,alignItems:"center"}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:C.goldMid+"22",border:"1.5px solid "+C.goldMid+"55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.goldMid,flexShrink:0}}>II</div>
        <div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",fontWeight:600}}>Innovations Interiors</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.25)"}}>Principal · Pune</div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div style={{marginLeft:220,flex:1,display:"flex",flexDirection:"column"}}>
      {/* Topbar */}
      <div style={{background:"#fff",borderBottom:"1px solid "+C.border,padding:"0.75rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:5,boxShadow:"0 1px 8px rgba(15,25,35,0.06)"}}>
        <div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:C.ink,fontWeight:600}}>{NAV.find(n=>n.id===view)?.label}</h1>
          <div style={{fontSize:10,color:C.muted,letterSpacing:"0.04em"}}>Innovations Interiors · {projects.length} Projects · {ALL_TEAM_MEMBERS.length} Team Members · ERP/CRM v2.0</div>
        </div>
        <div style={{display:"flex",gap:14,alignItems:"center",fontSize:11}}>
          <span style={{color:priority>0?C.red:C.muted,fontWeight:600}}>🔴 {priority} priority</span>
          <span style={{color:overdueTasks>0?C.amber:C.muted,fontWeight:600}}>⏰ {overdueTasks} overdue</span>
          <span style={{color:openIssues>0?C.purple:C.muted,fontWeight:600}}>⚠️ {openIssues} issues</span>
          <span style={{color:"#25D366",fontWeight:600}}>📲 {pendingFU} follow-ups</span>
        </div>
      </div>

      {/* Page Content */}
      <div style={{padding:"1.5rem 2rem",flex:1,overflowY:"auto",maxWidth:1440}}>
        {view==="dashboard"  &&<Dashboard projects={projects} tasks={tasks} siteReports={siteReports} proposals={proposals} followups={followups} setView={setView} setFollowups={setFollowups} leads={leads} issues={issues} finance={finance}/>}
        {view==="leads"      &&<Leads leads={leads} setLeads={setLeads}/>}
        {view==="projects"   &&<Projects projects={projects} tasks={tasks} siteReports={siteReports} moms={moms} setProjects={setProjects} setMoms={setMoms}/>}
        {view==="tasks"      &&<Tasks tasks={tasks} setTasks={setTasks} projects={projects}/>}
        {view==="timeline"   &&<TaskTimeline tasks={tasks} setTasks={setTasks} projects={projects}/>}
        {view==="site"       &&<SiteReports reports={siteReports} setReports={setSiteReports} projects={projects}/>}
        {view==="reports"    &&<WeeklyMonthlyReports siteReports={siteReports} tasks={tasks} projects={projects}/>}
        {view==="issues"     &&<Issues issues={issues} setIssues={setIssues} projects={projects}/>}
        {view==="proposals"  &&<Proposals proposals={proposals} setProposals={setProposals}/>}
        {view==="followups"  &&<FollowUps followups={followups} setFollowups={setFollowups} projects={projects}/>}
        {view==="finance"    &&<Finance finance={finance} setFinance={setFinance} projects={projects}/>}
        {view==="vendors"    &&<Vendors vendors={vendors} setVendors={setVendors}/>}
        {view==="team"       &&<Team projects={projects}/>}
        {view==="performance"&&<Performance perf={perf} setPerf={setPerf}/>}
        {view==="broadcast"  &&<BroadcastWA projects={projects} tasks={tasks} leads={leads} finance={finance} vendors={vendors}/>}
        {view==="queries"    &&<GeneralQueries/>}
      </div>
    </div>

    {/* AI Panel */}
    {aiOpen&&<div style={{position:"fixed",bottom:0,right:0,width:420,height:"65vh",background:"#fff",border:"0.5px solid "+C.border,borderRadius:"10px 0 0 0",boxShadow:"-4px -4px 32px rgba(15,25,35,0.12)",display:"flex",flexDirection:"column",zIndex:20}}>
      <div style={{padding:"0.75rem 1rem",borderBottom:"0.5px solid "+C.border,background:C.sidebar,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.goldMid}}>🤖 ERP/CRM AI Assistant</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>All 36 projects · 14 modules · Live context</div>
        </div>
        <button onClick={()=>setAiOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
      </div>
      <div style={{flex:1,overflow:"hidden"}}>
        <AIPanel projects={projects} tasks={tasks} siteReports={siteReports} proposals={proposals} leads={leads} issues={issues} finance={finance} vendors={vendors} perf={perf}/>
      </div>
    </div>}
  </div>;
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

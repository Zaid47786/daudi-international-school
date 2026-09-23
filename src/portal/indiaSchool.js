export const INDIAN_CLASS_NAMES = [
  "Nursery", "LKG", "UKG", "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII",
];

export const SECTIONS = ["A", "B", "C", "D", "E"];
export const HOUSES = ["Ashoka", "Raman", "Tagore", "Teresa"];
export const SCHOOL_BOARDS = ["CBSE", "BSEB", "ICSE", "State Board", "Other"];
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const ACADEMIC_TERMS = ["Term I", "Half-Yearly", "Term II", "Annual"];

export function currentAcademicSession(date = new Date()) {
  const year = date.getFullYear();
  const start = date.getMonth() >= 3 ? year : year - 1;
  return `${start}–${String(start + 1).slice(-2)}`;
}

export function currentAcademicTerm(date = new Date()) {
  const month = date.getMonth();
  return month >= 3 && month <= 8 ? "Term I" : "Term II";
}

const option = (value, label = value) => ({ value, label });
const options = (values) => values.map((value) => option(value));

export const RESOURCE_SCHEMAS = {
  sessions: {
    title: "Academic sessions",
    singular: "academic session",
    description: "Manage April–March school years, board affiliation and the active term.",
    icon: "calendar",
    primary: (row) => row.name,
    secondary: (row) => `${row.board || "School board"} · ${row.current ? "Current session" : "Archived"}`,
    defaults: () => ({ name: currentAcademicSession(), board: "CBSE", current_term: currentAcademicTerm(), current: true }),
    fields: [
      { name: "name", label: "Session", required: true, placeholder: "2026–27" },
      { name: "start_date", label: "Starts on", type: "date", required: true },
      { name: "end_date", label: "Ends on", type: "date", required: true },
      { name: "board", label: "School board", type: "select", options: options(SCHOOL_BOARDS), required: true },
      { name: "affiliation_number", label: "Affiliation number", placeholder: "Board affiliation number" },
      { name: "udise_code", label: "UDISE+ code", placeholder: "11-digit school code" },
      { name: "current_term", label: "Current term", type: "select", options: options(ACADEMIC_TERMS), required: true },
      { name: "current", label: "Use as current session", type: "checkbox", wide: true },
    ],
  },
  students: {
    title: "Student directory",
    singular: "student",
    description: "Maintain admission, class, guardian and health information for every learner.",
    primary: (row) => row.full_name,
    secondary: (row) => `${row.class_name || "Class not assigned"} · Adm. no. ${row.admission_number || "—"}`,
    defaults: () => ({ status: "active", academic_session: currentAcademicSession() }),
    fields: [
      { name: "full_name", label: "Student name", required: true, wide: true, placeholder: "As per school records" },
      { name: "admission_number", label: "Admission number", required: true, placeholder: "DIS/2026/001" },
      { name: "class_id", label: "Class & section", type: "relation", relation: "classes", required: true },
      { name: "roll_number", label: "Roll number", type: "number", min: 1 },
      { name: "academic_session", label: "Academic session", type: "relation", relation: "sessions" },
      { name: "date_of_birth", label: "Date of birth", type: "date" },
      { name: "gender", label: "Gender", type: "select", options: options(["Male", "Female", "Other"]) },
      { name: "blood_group", label: "Blood group", type: "select", options: options(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]) },
      { name: "house", label: "House", type: "select", options: options(HOUSES) },
      { name: "date_of_admission", label: "Date of admission", type: "date" },
      { name: "parent_ids", label: "Parents / guardians", type: "multiRelation", relation: "parents", wide: true },
      { name: "guardian_phone", label: "Emergency mobile", type: "tel", placeholder: "10-digit mobile number" },
      { name: "address", label: "Residential address", type: "textarea", wide: true },
      { name: "photo_url", label: "Student photograph", type: "image", wide: true },
      { name: "status", label: "Student status", type: "select", options: options(["active", "alumni", "withdrawn"]) },
    ],
  },
  teachers: {
    title: "Faculty directory",
    singular: "teacher",
    description: "Manage faculty profiles, qualifications and class or subject assignments.",
    primary: (row) => row.full_name,
    secondary: (row) => `${row.designation || "Teacher"} · Employee ID ${row.employee_id || "—"}`,
    defaults: () => ({ designation: "TGT", employment_status: "active" }),
    fields: [
      { name: "full_name", label: "Teacher name", required: true, wide: true },
      { name: "employee_id", label: "Employee ID", required: true, placeholder: "DIS/T/001" },
      { name: "designation", label: "Designation", type: "select", options: options(["PRT", "TGT", "PGT", "PET", "Librarian", "Counsellor", "Coordinator", "Vice Principal", "Principal"]) },
      { name: "qualification", label: "Qualification", placeholder: "M.Sc., B.Ed." },
      { name: "phone", label: "Mobile number", type: "tel" },
      { name: "email", label: "Email address", type: "email" },
      { name: "joining_date", label: "Date of joining", type: "date" },
      { name: "class_ids", label: "Assigned classes", type: "multiRelation", relation: "classes", wide: true },
      { name: "subject_ids", label: "Assigned subjects", type: "multiRelation", relation: "subjects", wide: true },
      { name: "employment_status", label: "Employment status", type: "select", options: options(["active", "on leave", "former"]) },
      { name: "photo_url", label: "Faculty photograph", type: "image", wide: true },
    ],
  },
  parents: {
    title: "Parent & guardian directory",
    singular: "parent / guardian",
    description: "Keep verified family contacts and connect each guardian to their children.",
    primary: (row) => row.full_name,
    secondary: (row) => `${row.relationship || "Guardian"} · ${row.phone || "No mobile number"}`,
    defaults: () => ({ relationship: "Father" }),
    fields: [
      { name: "full_name", label: "Parent / guardian name", required: true, wide: true },
      { name: "relationship", label: "Relationship", type: "select", options: options(["Father", "Mother", "Guardian"]) },
      { name: "phone", label: "Primary mobile", type: "tel", required: true },
      { name: "alternate_phone", label: "Alternate mobile", type: "tel" },
      { name: "email", label: "Email address", type: "email" },
      { name: "occupation", label: "Occupation" },
      { name: "child_ids", label: "Children", type: "multiRelation", relation: "students", wide: true },
      { name: "address", label: "Residential address", type: "textarea", wide: true },
    ],
  },
  classes: {
    title: "Classes & sections",
    singular: "class",
    description: "Set up class sections, rooms, capacity and class teachers for an academic session.",
    primary: (row) => `${row.name || "Class"}${row.section ? ` ${row.section}` : ""}`,
    secondary: (row) => `${row.class_teacher_name || "Class teacher not assigned"} · Room ${row.room || "—"}`,
    defaults: () => ({ name: "Class I", section: "A", academic_session: currentAcademicSession(), capacity: 40 }),
    fields: [
      { name: "name", label: "Class", type: "select", options: options(INDIAN_CLASS_NAMES), required: true },
      { name: "section", label: "Section", type: "select", options: options(SECTIONS), required: true },
      { name: "academic_session", label: "Academic session", type: "relation", relation: "sessions", required: true },
      { name: "class_teacher_id", label: "Class teacher", type: "relation", relation: "teachers" },
      { name: "room", label: "Room number", placeholder: "B-101" },
      { name: "capacity", label: "Section capacity", type: "number", min: 1, max: 100 },
    ],
  },
  subjects: {
    title: "Subjects",
    singular: "subject",
    description: "Create the school subject catalogue and assign classes and teachers.",
    primary: (row) => row.name,
    secondary: (row) => `${row.code || "No code"} · ${(row.class_names || []).join(", ") || "No class assigned"}`,
    defaults: () => ({ type: "scholastic" }),
    fields: [
      { name: "name", label: "Subject name", required: true, placeholder: "Mathematics" },
      { name: "code", label: "Subject code", required: true, placeholder: "MATH" },
      { name: "type", label: "Subject type", type: "select", options: options(["scholastic", "co-scholastic", "skill", "language"]) },
      { name: "class_ids", label: "Classes", type: "multiRelation", relation: "classes", wide: true },
      { name: "teacher_ids", label: "Subject teachers", type: "multiRelation", relation: "teachers", wide: true },
    ],
  },
  timetable: {
    title: "School timetable",
    singular: "period",
    description: "Publish a six-day class timetable with rooms and assigned faculty.",
    primary: (row) => `${row.day || "Day"} · Period ${row.period || "—"}`,
    secondary: (row) => `${row.class_name || "Class"} · ${row.subject_name || "Subject"} · ${row.teacher_name || "Teacher"}`,
    defaults: () => ({ day: "Monday", period: 1 }),
    fields: [
      { name: "day", label: "Day", type: "select", options: options(DAYS), required: true },
      { name: "period", label: "Period", type: "number", min: 1, max: 12, required: true },
      { name: "start_time", label: "Start time", type: "time" },
      { name: "end_time", label: "End time", type: "time" },
      { name: "class_id", label: "Class & section", type: "relation", relation: "classes", required: true },
      { name: "subject_id", label: "Subject", type: "relation", relation: "subjects", required: true },
      { name: "teacher_id", label: "Teacher", type: "relation", relation: "teachers", required: true },
      { name: "room", label: "Room / lab" },
    ],
  },
  homework: {
    title: "Homework & assignments",
    singular: "homework",
    description: "Assign classwork, homework, projects and revision with clear due dates.",
    primary: (row) => row.title,
    secondary: (row) => `${row.class_name || "Class"} · ${row.subject_name || row.subject || "Subject"} · Due ${row.due_date || "not set"}`,
    defaults: () => ({ assigned_date: new Date().toISOString().slice(0, 10), status: "assigned" }),
    fields: [
      { name: "title", label: "Assignment title", required: true, wide: true },
      { name: "class_id", label: "Class & section", type: "relation", relation: "classes", required: true },
      { name: "subject_id", label: "Subject", type: "relation", relation: "subjects", required: true },
      { name: "teacher_id", label: "Assigned by", type: "relation", relation: "teachers" },
      { name: "assigned_date", label: "Assigned on", type: "date", required: true },
      { name: "due_date", label: "Due date", type: "date", required: true },
      { name: "description", label: "Instructions", type: "textarea", required: true, wide: true },
      { name: "attachment_url", label: "Reference link", type: "url", wide: true, placeholder: "Optional worksheet or resource URL" },
      { name: "status", label: "Status", type: "select", options: options(["draft", "assigned", "completed"]) },
    ],
  },
  attendance: {
    title: "Attendance register",
    singular: "attendance entry",
    description: "Mark daily attendance. A second entry for the same student and date updates the existing record.",
    primary: (row) => row.student_name || "Student",
    secondary: (row) => `${row.date || "No date"} · ${row.status || "Not marked"}`,
    defaults: () => ({ date: new Date().toISOString().slice(0, 10), status: "present" }),
    fields: [
      { name: "student_id", label: "Student", type: "relation", relation: "students", required: true },
      { name: "class_id", label: "Class & section", type: "relation", relation: "classes" },
      { name: "date", label: "Attendance date", type: "date", required: true },
      { name: "status", label: "Status", type: "select", options: options(["present", "absent", "late", "leave"]), required: true },
      { name: "note", label: "Note", type: "textarea", wide: true, placeholder: "Reason for leave or late arrival" },
    ],
  },
  exams: {
    title: "Examinations",
    singular: "examination",
    description: "Schedule periodic tests, half-yearly examinations, practicals and annual examinations.",
    primary: (row) => row.name,
    secondary: (row) => `${row.class_name || "Class"} · ${row.subject_name || row.subject || "All subjects"} · ${row.date || "Date not set"}`,
    defaults: () => ({ exam_type: "Periodic Test", term: currentAcademicTerm(), max_marks: 100, status: "scheduled" }),
    fields: [
      { name: "name", label: "Examination name", required: true, wide: true, placeholder: "Periodic Test 1 – Mathematics" },
      { name: "exam_type", label: "Examination type", type: "select", options: options(["Periodic Test", "Unit Test", "Half-Yearly", "Practical", "Pre-Board", "Annual"]) },
      { name: "term", label: "Term", type: "select", options: options(ACADEMIC_TERMS) },
      { name: "class_id", label: "Class & section", type: "relation", relation: "classes", required: true },
      { name: "subject_id", label: "Subject", type: "relation", relation: "subjects" },
      { name: "subject", label: "Subject label", placeholder: "Use when no subject record exists" },
      { name: "date", label: "Examination date", type: "date", required: true },
      { name: "time", label: "Start time", type: "time" },
      { name: "duration", label: "Duration (minutes)", type: "number", min: 15 },
      { name: "max_marks", label: "Maximum marks", type: "number", min: 1, required: true },
      { name: "room", label: "Room / hall" },
      { name: "status", label: "Status", type: "select", options: options(["draft", "scheduled", "completed", "cancelled"]) },
    ],
  },
  results: {
    title: "Results & report cards",
    singular: "result",
    description: "Record marks with automatic CBSE-style A1–E grades and control publication to families.",
    primary: (row) => row.student_name || "Student result",
    secondary: (row) => `${row.exam_name || "Examination"} · ${row.subject_name || row.subject || "Subject"} · ${row.obtained_marks ?? "—"}/${row.max_marks ?? "—"}`,
    defaults: () => ({ max_marks: 100, published: false }),
    fields: [
      { name: "student_id", label: "Student", type: "relation", relation: "students", required: true },
      { name: "exam_id", label: "Examination", type: "relation", relation: "exams", required: true },
      { name: "subject_id", label: "Subject", type: "relation", relation: "subjects" },
      { name: "subject", label: "Subject label", placeholder: "Use when no subject record exists" },
      { name: "max_marks", label: "Maximum marks", type: "number", min: 1, required: true },
      { name: "obtained_marks", label: "Marks obtained", type: "number", min: 0, required: true },
      { name: "remarks", label: "Teacher remarks", type: "textarea", wide: true },
      { name: "published", label: "Publish to student and parent", type: "checkbox", wide: true },
    ],
  },
  fees: {
    title: "Fees & receipts",
    singular: "fee record",
    description: "Track fee heads, due dates, concessions, payment modes, transaction references and receipts in ₹.",
    primary: (row) => row.student_name || "Student fee",
    secondary: (row) => `${row.title || "School fee"} · ₹${Number(row.amount || 0).toLocaleString("en-IN")} · ${row.status || "pending"}`,
    defaults: () => ({ title: "Tuition Fee", academic_session: currentAcademicSession(), status: "pending" }),
    fields: [
      { name: "student_id", label: "Student", type: "relation", relation: "students", required: true },
      { name: "title", label: "Fee head", type: "select", options: options(["Admission Fee", "Tuition Fee", "Annual Charges", "Examination Fee", "Transport Fee", "Laboratory Fee", "Library Fee", "Activity Fee", "Other Fee"]), required: true },
      { name: "academic_session", label: "Academic session", type: "relation", relation: "sessions" },
      { name: "billing_period", label: "Billing period", placeholder: "April 2026 or Quarter 1" },
      { name: "amount", label: "Amount (₹)", type: "number", min: 1, required: true },
      { name: "concession", label: "Concession (₹)", type: "number", min: 0 },
      { name: "due_date", label: "Due date", type: "date", required: true },
      { name: "status", label: "Payment status", type: "select", options: options(["pending", "paid", "partially paid", "overdue", "waived"]) },
      { name: "payment_date", label: "Payment date", type: "date" },
      { name: "payment_mode", label: "Payment mode", type: "select", options: options(["Cash", "UPI", "NEFT / RTGS", "Cheque", "Card", "Online portal"]) },
      { name: "transaction_id", label: "UTR / transaction ID" },
      { name: "receipt_number", label: "Receipt number" },
      { name: "note", label: "Office note", type: "textarea", wide: true },
    ],
  },
  notices: {
    title: "Notices & circulars",
    singular: "notice",
    description: "Publish targeted school notices, circulars, reminders and PTM announcements.",
    primary: (row) => row.title,
    secondary: (row) => `${row.audience || "school"} · ${row.status || "draft"} · ${row.date || "No date"}`,
    defaults: () => ({ date: new Date().toISOString().slice(0, 10), audience: "school", status: "draft" }),
    fields: [
      { name: "title", label: "Notice title", required: true, wide: true },
      { name: "description", label: "Notice / circular", type: "textarea", required: true, wide: true },
      { name: "date", label: "Notice date", type: "date" },
      { name: "audience", label: "Audience", type: "select", options: options(["school", "students", "parents", "teachers", "class"]), required: true },
      { name: "class_id", label: "Target class", type: "relation", relation: "classes" },
      { name: "status", label: "Publication status", type: "select", options: options(["draft", "published"]), required: true },
      { name: "important", label: "Mark important", type: "checkbox" },
      { name: "pinned", label: "Pin to top", type: "checkbox" },
    ],
  },
  calendar: {
    title: "Academic calendar",
    singular: "calendar event",
    description: "Plan holidays, PTMs, assessments, activities and important academic dates.",
    primary: (row) => row.title,
    secondary: (row) => `${row.type || "event"} · ${row.date || "No date"}`,
    defaults: () => ({ type: "school event" }),
    fields: [
      { name: "title", label: "Event title", required: true, wide: true },
      { name: "type", label: "Event type", type: "select", options: options(["holiday", "exam", "ptm", "school event", "competition", "academic", "admission", "vacation"]), required: true },
      { name: "date", label: "Starts on", type: "date", required: true },
      { name: "end_date", label: "Ends on", type: "date" },
      { name: "description", label: "Details", type: "textarea", wide: true },
    ],
  },
  leave: {
    title: "Leave applications",
    singular: "leave application",
    description: "Receive, review and track student leave applications with an accountable status history.",
    primary: (row) => row.student_name || "Student leave",
    secondary: (row) => `${row.from_date || "Date"} to ${row.to_date || row.from_date || "Date"} · ${row.status || "pending"}`,
    defaults: () => ({ status: "pending" }),
    fields: [
      { name: "student_id", label: "Student", type: "relation", relation: "students", required: true },
      { name: "from_date", label: "Leave starts", type: "date", required: true },
      { name: "to_date", label: "Leave ends", type: "date", required: true },
      { name: "reason", label: "Reason for leave", type: "textarea", required: true, wide: true },
      { name: "status", label: "Application status", type: "select", options: options(["pending", "approved", "rejected"]), required: true },
      { name: "review_note", label: "Review note", type: "textarea", wide: true },
    ],
  },
  users: {
    title: "Portal accounts",
    singular: "portal account",
    description: "Create secure accounts and connect each login to the correct student, teacher or parent profile.",
    primary: (row) => row.full_name || row.email,
    secondary: (row) => `${row.role || "user"} · ${row.email || "No email"} · ${row.active === false ? "disabled" : "active"}`,
    defaults: () => ({ role: "student", active: true }),
    fields: [
      { name: "full_name", label: "Account holder name", required: true, wide: true },
      { name: "email", label: "Login email", type: "email", required: true },
      { name: "role", label: "Portal role", type: "select", options: options(["student", "parent", "teacher"]), required: true },
      { name: "password", label: "Temporary password", type: "password", placeholder: "At least 8 characters" },
      { name: "profile_id", label: "Linked profile", type: "profileRelation", wide: true },
      { name: "active", label: "Account active", type: "checkbox", wide: true },
    ],
  },
};

export function relationRows(relation, payload, form = {}) {
  if (relation === "profiles") return [];
  if (relation === "profile") {
    const role = form.role;
    const key = role === "student" ? "students" : role === "teacher" ? "teachers" : role === "parent" ? "parents" : "";
    return key ? payload.data?.[key] || [] : [];
  }
  const rows = payload.data?.[relation] || [];
  if (relation === "sessions" && !rows.length) {
    const name = currentAcademicSession();
    return [{ id: name, name, current: true }];
  }
  return rows;
}

export function relationLabel(relation, row) {
  if (relation === "classes") return `${row.name || "Class"}${row.section ? ` ${row.section}` : ""}`;
  if (relation === "students") return `${row.full_name || row.name || "Student"} · ${row.admission_number || "No admission number"}`;
  if (relation === "teachers") return `${row.full_name || row.name || "Teacher"} · ${row.employee_id || "No employee ID"}`;
  if (relation === "parents") return `${row.full_name || row.name || "Parent"} · ${row.phone || "No mobile"}`;
  if (relation === "subjects") return `${row.name || "Subject"}${row.code ? ` (${row.code})` : ""}`;
  if (relation === "exams") return `${row.name || row.exam_name || "Examination"}${row.class_name ? ` · ${row.class_name}` : ""}`;
  if (relation === "sessions") return `${row.name || "Session"}${row.current ? " · Current" : ""}`;
  if (relation === "users") return `${row.full_name || row.email || "Account"} · ${row.role || "role"}`;
  return row.full_name || row.name || row.title || row.email || row.id;
}

export function gradeForIndia(value) {
  const score = Number(value || 0);
  if (score >= 91) return "A1";
  if (score >= 81) return "A2";
  if (score >= 71) return "B1";
  if (score >= 61) return "B2";
  if (score >= 51) return "C1";
  if (score >= 41) return "C2";
  if (score >= 33) return "D";
  return "E";
}

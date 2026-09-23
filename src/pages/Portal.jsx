import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Download,
  FileSpreadsheet,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  QrCode,
  Receipt,
  RefreshCw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Table2,
  Trash2,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { schoolApi } from "@/api/schoolApi";
import { currentAcademicSession, gradeForIndia, relationLabel, relationRows, RESOURCE_SCHEMAS } from "@/portal/indiaSchool";

const logo = "/dis-logo.png";

const ROLE_META = {
  student: { label: "Student", icon: GraduationCap, accent: "#3556a8", bg: "#edf2ff" },
  teacher: { label: "Faculty", icon: BookOpen, accent: "#0f766e", bg: "#e8f8f5" },
  parent: { label: "Parent / Guardian", icon: Users, accent: "#9a5b13", bg: "#fff4de" },
  admin: { label: "Admin", icon: ShieldCheck, accent: "#1a3580", bg: "#e9efff" },
};

const NAV = {
  student: ["dashboard", "routine", "homework", "attendance", "exams", "results", "notices", "calendar", "leave", "fees", "digital-id"],
  teacher: ["dashboard", "routine", "students", "homework", "attendance", "exams", "gradebook", "leave", "notices", "calendar"],
  parent: ["dashboard", "child", "routine", "homework", "attendance", "exams", "results", "fees", "leave", "notices", "calendar", "digital-id"],
  admin: ["dashboard", "sessions", "users", "students", "teachers", "parents", "classes", "subjects", "timetable", "homework", "attendance", "exams", "results", "fees", "leave", "notices", "calendar", "audit"],
};

const LABELS = {
  dashboard: "Overview", routine: "Timetable", homework: "Homework", attendance: "Attendance", exams: "Examinations", results: "Results", notices: "Notices", calendar: "Academic calendar", leave: "Leave applications", fees: "Fees & receipts", "digital-id": "Digital ID", child: "Child profile", sessions: "Academic sessions", users: "Portal accounts", students: "Students", teachers: "Teachers", parents: "Parents", classes: "Classes & sections", subjects: "Subjects", timetable: "Timetable", gradebook: "Gradebook", audit: "Audit log",
};

const ICONS = {
  dashboard: LayoutDashboard, routine: CalendarDays, homework: BookOpen, attendance: ClipboardCheck, exams: Trophy, results: BarChart3, notices: Bell, calendar: CalendarDays, leave: CalendarDays, fees: CreditCard, "digital-id": QrCode, child: UserRound, sessions: CalendarDays, users: ShieldCheck, students: Users, teachers: BookOpen, parents: Users, classes: Table2, subjects: BookOpen, timetable: CalendarDays, gradebook: BarChart3, audit: ShieldCheck,
};

function dateLabel(value, withTime = false) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", withTime ? { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" } : { day: "numeric", month: "short", year: "numeric" });
}

function money(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function titleCase(value) {
  return String(value || "").replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalisePayload(form) {
  const arrayKeys = new Set(["child_ids", "subject_ids", "class_ids", "section_ids", "teacher_ids", "parent_ids"]);
  const booleanKeys = new Set(["active", "published", "important", "pinned", "current"]);
  const output = {};
  Object.entries(form).forEach(([key, value]) => {
    if (arrayKeys.has(key)) output[key] = String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
    else if (booleanKeys.has(key)) output[key] = value === true || value === "true" || value === "1" || value === "on";
    else if (["amount", "concession", "max_marks", "obtained_marks", "percentage", "period", "roll_number", "capacity", "duration"].includes(key) && value !== "") output[key] = Number(value);
    else output[key] = value;
  });
  return output;
}

function PortalLogin({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = role === "admin" ? await schoolApi.auth.login(password) : await schoolApi.auth.portalLogin(email, password);
      onLogin(user);
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-10 font-inter">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_.95fr] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(15,31,82,.12)] border border-slate-100">
        <div className="hidden lg:flex bg-cobalt-deep p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute -left-24 bottom-10 w-80 h-80 rounded-full border border-amber/20" />
          <div>
            <img src={logo} alt="Daudi International School" className="h-14 w-auto mb-10" />
            <p className="text-amber text-xs font-bold tracking-[.24em] uppercase mb-4">Indian school ERP</p>
            <h1 className="text-4xl font-semibold tracking-tight leading-tight">One trusted workspace for the entire school.</h1>
            <p className="text-white/65 mt-5 max-w-sm leading-7">Admissions, attendance, examinations, report cards, fees and circulars — securely connected for students, teachers, parents and the school office.</p>
          </div>
          <div className="text-white/45 text-sm">Daudi International School · Muzaffarpur</div>
        </div>
        <div className="p-7 sm:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-9"><img src={logo} alt="DIS" className="h-11 w-auto" /><span className="font-semibold text-cobalt-deep">School Portal</span></div>
          <div className="mb-8"><p className="text-xs font-bold tracking-[.2em] text-cobalt uppercase">Secure sign in</p><h2 className="text-3xl font-semibold text-slate-900 mt-3">Welcome back</h2><p className="text-slate-500 text-sm mt-2">Choose your workspace to continue.</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-7">
            {Object.entries(ROLE_META).map(([key, meta]) => {
              const Icon = meta.icon;
              return <button key={key} type="button" onClick={() => setRole(key)} className={`rounded-2xl px-3 py-3 text-xs font-semibold transition ${role === key ? "ring-2 ring-offset-2" : "bg-slate-50 text-slate-500"}`} style={role === key ? { background: meta.bg, color: meta.accent, boxShadow: `0 0 0 2px ${meta.accent}` } : {}}><Icon size={18} className="mx-auto mb-1.5" />{meta.label}</button>;
            })}
          </div>
          <form onSubmit={submit} className="space-y-4">
            {role !== "admin" && <label className="block"><span className="portal-label">Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="portal-input" placeholder="name@daudischool.in" /></label>}
            <label className="block"><span className="portal-label">{role === "admin" ? "Admin password" : "Password"}</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="portal-input" placeholder="Enter your password" /></label>
            {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
            <button disabled={loading} className="w-full rounded-xl bg-cobalt-deep text-white py-3.5 font-semibold text-sm hover:bg-cobalt transition disabled:opacity-60">{loading ? "Signing in…" : `Continue as ${ROLE_META[role].label}`}<ArrowRight size={16} className="inline ml-2" /></button>
          </form>
          <Link to="/" className="block text-center text-sm text-slate-400 hover:text-cobalt mt-7">← Return to school website</Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail, icon: Icon, tone = "blue" }) {
  const tones = { blue: "bg-[#edf2ff] text-cobalt", teal: "bg-[#e8f8f5] text-teal-700", amber: "bg-[#fff4de] text-amber-700", violet: "bg-[#f2edff] text-violet-700" };
  return <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-[0_8px_24px_rgba(15,31,82,.04)]"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}><Icon size={19} /></div><p className="text-xs text-slate-500 mt-4">{label}</p><div className="text-2xl font-semibold text-slate-900 mt-1">{value}</div>{detail && <p className="text-xs text-slate-400 mt-1">{detail}</p>}</div>;
}

function EmptyState({ icon: Icon = Sparkles, title = "Nothing here yet", text = "Your school team will add this information when it is ready." }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-6 text-center"><Icon size={28} className="mx-auto text-slate-300" /><h3 className="text-base font-semibold text-slate-700 mt-4">{title}</h3><p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">{text}</p></div>;
}

function SectionTitle({ eyebrow, title, text, action = null }) {
  return <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"><div><p className="portal-eyebrow">{eyebrow}</p><h2 className="text-2xl font-semibold text-slate-900 mt-2">{title}</h2>{text && <p className="text-sm text-slate-500 mt-2">{text}</p>}</div>{action}</div>;
}

function DashboardView({ role, payload, go }) {
  const { dashboard = {}, profile, children = [], data = {} } = payload;
  const person = profile || children[0] || {};
  const attendance = dashboard.attendance || 0;
  const exams = dashboard.upcomingExams || dashboard.exams || [];
  const notices = dashboard.notices || data.notices || [];
  const session = dashboard.currentSession?.name || currentAcademicSession();
  const term = dashboard.currentSession?.current_term || "Current term";
  const board = dashboard.currentSession?.board || "CBSE";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const unlinkedProfiles = role === "admin" ? [...(data.students || []), ...(data.teachers || []), ...(data.parents || [])].filter((record) => !record.user_id).length : 0;
  const pendingFees = role === "admin" ? (data.fees || []).filter((record) => record.status !== "paid").length : 0;
  const quickActions = [
    { label: "Add student", detail: "Admission & class profile", section: "students", icon: GraduationCap },
    { label: "Add teacher", detail: "Faculty & assignments", section: "teachers", icon: BookOpen },
    { label: "Record fees", detail: "Receipt or pending dues", section: "fees", icon: Receipt },
    { label: "Publish notice", detail: "Circular, PTM or reminder", section: "notices", icon: Bell },
  ];

  return <div className="space-y-6 portal-page-enter">
    <section className="portal-dashboard-hero">
      <div className="portal-hero-grid" />
      <div className="relative z-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 mb-5"><span className="portal-session-badge">Academic session {session}</span><span className="portal-session-badge portal-session-badge-muted">{board} · {term}</span></div>
        <p className="text-amber text-xs font-bold tracking-[.22em] uppercase">{role === "admin" ? "School operations" : "Your school day"}</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-3">{greeting}, {payload.user?.name?.split(" ")[0] || "there"}.</h1>
        <p className="text-white/65 mt-3 max-w-2xl leading-6">{role === "admin" ? "Admissions, academics, attendance, examinations and fees—organised for an Indian school office." : role === "parent" ? "Track your child’s attendance, examinations, results, fees and school notices from one trusted place." : role === "teacher" ? "Your classes, attendance register, timetable and gradebook are ready for today." : "Your timetable, attendance, examinations, results and notices are together here."}</p>
        <p className="text-white/40 text-xs mt-5">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · Muzaffarpur, Bihar</p>
      </div>
    </section>

    {role === "admin" && <section><div className="flex items-center justify-between mb-3"><div><p className="portal-eyebrow">Daily workbench</p><h2 className="text-lg font-semibold text-slate-900 mt-1">Quick actions</h2></div></div><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">{quickActions.map(({ label, detail, section, icon: Icon }) => <button key={section} type="button" onClick={() => go(section)} className="portal-quick-action"><span className="portal-quick-icon"><Icon size={18} /></span><span className="text-left"><strong>{label}</strong><small>{detail}</small></span><ArrowRight size={16} className="ml-auto text-slate-300" /></button>)}</div></section>}

    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      <StatCard label={role === "admin" ? "Enrolled students" : "Attendance"} value={role === "admin" ? dashboard.counts?.students || 0 : `${attendance}%`} detail={role === "admin" ? `${dashboard.counts?.classes || 0} active sections` : "Overall attendance"} icon={role === "admin" ? Users : Activity} tone="teal" />
      <StatCard label={role === "admin" ? "Faculty" : "Upcoming exams"} value={role === "admin" ? dashboard.counts?.teachers || 0 : exams.length} detail={role === "admin" ? `${dashboard.counts?.parents || 0} guardians listed` : "On your schedule"} icon={role === "admin" ? BookOpen : Trophy} tone="amber" />
      <StatCard label={role === "admin" ? "Attendance" : role === "parent" ? "Children" : "Class & section"} value={role === "admin" ? `${attendance}%` : role === "parent" ? children.length : person.class_name || person.class_id || "—"} detail={role === "admin" ? "School-wide average" : person.roll_number ? `Roll no. ${person.roll_number}` : "Academic profile"} icon={role === "admin" ? ClipboardCheck : UserRound} tone="blue" />
      <StatCard label={role === "admin" ? "Fees collected" : "Fee balance"} value={role === "admin" ? money(dashboard.fees?.collected) : money(dashboard.feeStatus?.pending)} detail={role === "admin" ? `${money(dashboard.fees?.pending)} outstanding` : "Outstanding amount"} icon={CreditCard} tone="violet" />
    </div>

    {role === "admin" && <div className="grid md:grid-cols-2 gap-4"><button type="button" onClick={() => go("users")} className="portal-attention-card"><div className="portal-attention-icon bg-amber-50 text-amber-700"><ShieldCheck size={20} /></div><div className="text-left"><p className="font-semibold text-slate-800">{unlinkedProfiles} profiles need portal access</p><p className="text-xs text-slate-400 mt-1">Connect students, parents and teachers to secure accounts.</p></div><ArrowRight size={17} className="ml-auto text-slate-300" /></button><button type="button" onClick={() => go("fees")} className="portal-attention-card"><div className="portal-attention-icon bg-red-50 text-red-600"><Receipt size={20} /></div><div className="text-left"><p className="font-semibold text-slate-800">{pendingFees} fee records need attention</p><p className="text-xs text-slate-400 mt-1">Review pending, overdue and partially paid entries.</p></div><ArrowRight size={17} className="ml-auto text-slate-300" /></button></div>}

    <div className="grid xl:grid-cols-[1.15fr_.85fr] gap-5">
      <div className="portal-content-card"><div className="flex items-center justify-between mb-5"><div><p className="portal-eyebrow">Assessment calendar</p><h3 className="text-lg font-semibold text-slate-900 mt-1">Upcoming examinations</h3></div><button onClick={() => go("exams")} className="text-xs font-semibold text-cobalt">View all <ArrowRight size={14} className="inline ml-1" /></button></div>{exams.length ? <div className="space-y-3">{exams.slice(0, 4).map((exam) => <div key={exam.id} className="portal-exam-row"><div className="portal-date-tile"><span>{exam.date ? new Date(exam.date).getDate() : "—"}</span><small>{exam.date ? new Date(exam.date).toLocaleDateString("en-IN", { month: "short" }) : "DATE"}</small></div><div className="min-w-0"><p className="font-semibold text-sm text-slate-800 truncate">{exam.name || exam.exam_name || "Examination"}</p><p className="text-xs text-slate-500 mt-1">{exam.class_name || "School"} · {exam.subject_name || exam.subject || "All subjects"}</p></div><span className="ml-auto text-xs text-slate-400 hidden sm:block">{exam.time || "Time TBA"}</span></div>)}</div> : <EmptyState icon={Trophy} title="No upcoming examinations" />}</div>
      <div className="portal-content-card"><div className="flex items-center justify-between mb-5"><div><p className="portal-eyebrow">School bulletin</p><h3 className="text-lg font-semibold text-slate-900 mt-1">Recent notices</h3></div><button onClick={() => go("notices")} className="text-xs font-semibold text-cobalt">See all <ArrowRight size={14} className="inline ml-1" /></button></div>{notices.length ? <div className="space-y-4">{notices.slice(0, 4).map((notice) => <div key={notice.id} className="flex gap-3"><div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${notice.pinned || notice.important ? "bg-amber" : "bg-cobalt"}`} /><div><p className="font-semibold text-sm text-slate-800">{notice.title}</p><p className="text-xs text-slate-400 mt-1">{dateLabel(notice.date || notice.created_date)} · {titleCase(notice.audience || "School")}</p></div></div>)}</div> : <EmptyState icon={Bell} title="No new notices" />}</div>
    </div>
  </div>;
}

function RoutineView({ payload }) {
  const [day, setDay] = useState("Monday");
  const rows = payload.dashboard?.timetable || payload.data?.timetable || [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayRows = rows.filter((row) => String(row.day || "").toLowerCase() === day.toLowerCase()).sort((a, b) => Number(a.period || 0) - Number(b.period || 0));
  return <div><SectionTitle eyebrow="Learning rhythm" title="Class timetable" text="A clear view of the day and the full week — without extra noise." /><div className="flex gap-2 overflow-x-auto pb-2 mb-5">{days.map((item) => <button key={item} onClick={() => setDay(item)} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${day === item ? "bg-cobalt-deep text-white" : "bg-white border border-slate-200 text-slate-500"}`}>{item}</button>)}</div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100 flex justify-between"><h3 className="font-semibold text-slate-800">{day} routine</h3><span className="text-xs text-slate-400">{dayRows.length} periods</span></div>{dayRows.length ? <div className="divide-y divide-slate-100">{dayRows.map((row, index) => <div key={row.id || index} className="grid grid-cols-[48px_1fr_auto] sm:grid-cols-[60px_1fr_1fr_120px] items-center gap-4 px-5 py-4"><div className="w-9 h-9 rounded-xl bg-[#edf2ff] text-cobalt flex items-center justify-center text-sm font-bold">{row.period || index + 1}</div><div><p className="font-semibold text-sm text-slate-800">{row.subject_name || row.subject || "Subject"}</p><p className="text-xs text-slate-400 mt-1 sm:hidden">{row.start_time || ""} {row.end_time ? `– ${row.end_time}` : ""}</p></div><p className="hidden sm:block text-sm text-slate-500">{row.start_time || "—"} {row.end_time ? `– ${row.end_time}` : ""}</p><p className="text-xs text-slate-500 text-right">{row.room || row.classroom || "—"}<br /><span className="text-slate-400">{row.teacher_name || row.teacher || ""}</span></p></div>)}</div> : <EmptyState icon={CalendarDays} title="Routine not published" text="Your timetable will appear here once the school office publishes it." />}</div><div className="mt-5 rounded-2xl bg-cobalt-deep text-white p-5"><p className="text-amber text-xs font-bold tracking-[.18em] uppercase">Weekly view</p><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">{days.map((item) => <div key={item} className="rounded-xl bg-white/10 p-3"><p className="text-xs font-semibold">{item.slice(0, 3)}</p><p className="text-lg font-semibold mt-2">{rows.filter((row) => String(row.day || "").toLowerCase() === item.toLowerCase()).length}</p><p className="text-[10px] text-white/50">periods</p></div>)}</div></div></div>;
}

function AttendanceView({ role, payload, refresh }) {
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [statuses, setStatuses] = useState({});
  const rows = payload.data?.attendance || [];
  const students = payload.data?.students || payload.children || [];
  const workingRows = rows.filter((row) => row.status !== "leave");
  const summary = { total: workingRows.length, present: workingRows.filter((row) => row.status === "present" || row.status === "late").length, absent: workingRows.filter((row) => row.status === "absent").length };
  const saveAttendance = async () => {
    setSaving(true);
    try {
      await Promise.all(students.filter((student) => statuses[student.id]).map((student) => schoolApi.auth.portalManage("attendance", { method: "POST", body: { student_id: student.id, class_id: student.class_id, date, status: statuses[student.id] } })));
      await refresh();
    } finally { setSaving(false); }
  };
  return <div><SectionTitle eyebrow="Presence matters" title="Attendance" text={role === "teacher" ? "Take attendance for your assigned students. Changes flow immediately to student and parent views." : "A simple, school-wide picture of attendance over time."} />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"><StatCard label="Overall" value={`${averagePercent(rows)}%`} detail="Attendance rate" icon={Activity} tone="teal" /><StatCard label="Present" value={summary.present} detail="Marked present or late" icon={CheckCircle2} tone="blue" /><StatCard label="Absent" value={summary.absent} detail="Days absent" icon={AlertCircle} tone="amber" /><StatCard label="Working days" value={summary.total} detail="Recorded entries" icon={CalendarDays} tone="violet" /></div>
    {role === "teacher" && <div className="rounded-2xl bg-white border border-slate-100 p-5 mb-5"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5"><div><h3 className="font-semibold text-slate-800">Mark attendance</h3><p className="text-xs text-slate-400 mt-1">Only students in your assigned classes are shown.</p></div><div className="flex gap-2"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="portal-input !w-auto !py-2" /><button onClick={saveAttendance} disabled={saving || !Object.keys(statuses).length} className="portal-button">{saving ? "Saving…" : <><Save size={15} /> Save</>}</button></div></div>{students.length ? <div className="divide-y divide-slate-100">{students.map((student) => <div key={student.id} className="flex items-center justify-between gap-3 py-3"><div><p className="text-sm font-semibold text-slate-800">{student.full_name || student.name}</p><p className="text-xs text-slate-400">Roll {student.roll_number || "—"} · {student.section || student.section_id || "Section"}</p></div><select value={statuses[student.id] || ""} onChange={(e) => setStatuses((old) => ({ ...old, [student.id]: e.target.value }))} className="portal-input !w-32 !py-2"><option value="">Select</option><option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option></select></div>)}</div> : <EmptyState icon={Users} title="No assigned students" />}</div>}
    <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-800">Attendance calendar</h3></div>{rows.length ? <div className="divide-y divide-slate-100">{rows.slice(0, 60).map((row, index) => <div key={row.id || index} className="flex items-center justify-between px-5 py-3"><div><p className="text-sm text-slate-700">{dateLabel(row.date)}</p><p className="text-xs text-slate-400">{row.student_name || row.student_id || "Student"}</p></div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.status === "absent" ? "bg-red-50 text-red-700" : row.status === "late" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{titleCase(row.status)}</span></div>)}</div> : <EmptyState icon={ClipboardCheck} title="No attendance recorded" text="Attendance records will appear here as teachers mark the register." />}</div>
  </div>;
}

function averagePercent(rows) { const workingRows = rows.filter((row) => row.status !== "leave"); if (!workingRows.length) return 0; return Math.round((workingRows.filter((row) => row.status === "present" || row.status === "late").length / workingRows.length) * 100); }

function ExamsView({ payload }) {
  const exams = payload.data?.exams || payload.dashboard?.upcomingExams || [];
  return <div><SectionTitle eyebrow="Prepare with confidence" title="Examination schedule & date sheet" text="Dates, subjects and practical details in one clear view." />{exams.length ? <div className="grid md:grid-cols-2 gap-4">{exams.map((exam) => <div key={exam.id} className="rounded-2xl bg-white border border-slate-100 p-5 flex gap-4"><div className="w-14 h-14 rounded-2xl bg-[#fff4de] text-amber-700 flex flex-col items-center justify-center flex-shrink-0"><span className="text-xl font-bold">{exam.date ? new Date(exam.date).getDate() : "—"}</span><span className="text-[10px] uppercase font-bold">{exam.date ? new Date(exam.date).toLocaleDateString("en-IN", { month: "short" }) : "Date"}</span></div><div className="min-w-0"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-slate-800">{exam.name || exam.exam_name || "Examination"}</h3><span className="text-[10px] bg-slate-100 text-slate-500 rounded-full px-2 py-1 whitespace-nowrap">{titleCase(exam.status || "scheduled")}</span></div><p className="text-sm text-cobalt mt-2">{exam.subject || "All subjects"}</p><p className="text-xs text-slate-400 mt-2">{dateLabel(exam.date)} · {exam.time || "Time to be announced"} · {exam.duration ? `${exam.duration} minutes` : "Duration to be announced"}</p></div></div>)}</div> : <EmptyState icon={Trophy} title="No exams published" />}</div>;
}

function ResultsView({ payload }) {
  const results = (payload.data?.results || []).filter((row) => row.published !== false);
  const totalMax = results.reduce((sum, row) => sum + Number(row.max_marks || 0), 0);
  const totalObtained = results.reduce((sum, row) => sum + Number(row.obtained_marks || row.marks || 0), 0);
  const percentage = totalMax ? Math.round((totalObtained / totalMax) * 100) : 0;
  return <div><SectionTitle eyebrow="Progress you can see" title="Results & report card" text="Published results and performance history, kept simple and useful." />{results.length ? <><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"><StatCard label="Overall percentage" value={`${percentage}%`} detail="Across published marks" icon={BarChart3} tone="blue" /><StatCard label="Obtained" value={totalObtained} detail={`of ${totalMax} marks`} icon={Trophy} tone="amber" /><StatCard label="Grade" value={gradeForIndia(percentage)} detail="Overall result" icon={Sparkles} tone="violet" /><StatCard label="Subjects" value={new Set(results.map((row) => row.subject)).size} detail="With published marks" icon={BookOpen} tone="teal" /></div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Examination</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Marks</th><th className="px-5 py-3">Percentage</th><th className="px-5 py-3">Grade</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{results.map((row) => <tr key={row.id}><td className="px-5 py-4 font-semibold text-slate-700">{row.exam_name || row.exam_id || "Examination"}</td><td className="px-5 py-4 text-slate-500">{row.subject || "—"}</td><td className="px-5 py-4 text-slate-500">{row.obtained_marks ?? row.marks ?? "—"} / {row.max_marks ?? "—"}</td><td className="px-5 py-4 text-slate-500">{row.percentage ?? "—"}%</td><td className="px-5 py-4"><span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold">{row.grade || gradeForIndia(row.percentage)}</span></td></tr>)}</tbody></table></div></div></> : <EmptyState icon={BarChart3} title="Results are not published yet" text="Your school will make results visible here once they are reviewed and published." />}</div>;
}

function TeacherGradebookView({ payload, refresh }) {
  const students = payload.data?.students || [];
  const exams = payload.data?.exams || [];
  const existing = payload.data?.results || [];
  const [form, setForm] = useState({ student_id: "", exam_id: "", subject: "", max_marks: "100", obtained_marks: "", published: false });
  const [saving, setSaving] = useState(false);
  const selectedExam = exams.find((exam) => exam.id === form.exam_id);
  const percentage = form.max_marks && form.obtained_marks ? Math.round((Number(form.obtained_marks) / Number(form.max_marks)) * 100) : 0;
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await schoolApi.auth.portalManage("results", { method: "POST", body: { ...normalisePayload(form), class_id: students.find((student) => student.id === form.student_id)?.class_id, percentage, grade: gradeForIndia(percentage) } });
      setForm({ student_id: "", exam_id: "", subject: "", max_marks: "100", obtained_marks: "", published: false });
      await refresh();
    } finally { setSaving(false); }
  };
  return <div><SectionTitle eyebrow="Assess with clarity" title="Gradebook" text="Enter marks once; percentages and grades are calculated automatically." /><div className="rounded-2xl bg-white border border-slate-100 p-5 mb-5"><form onSubmit={save} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"><label><span className="portal-label">Student</span><select required value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} className="portal-input"><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.full_name || student.name}</option>)}</select></label><label><span className="portal-label">Examination</span><select required value={form.exam_id} onChange={(e) => { const exam = exams.find((item) => item.id === e.target.value); setForm({ ...form, exam_id: e.target.value, subject: exam?.subject || "" }); }} className="portal-input"><option value="">Select examination</option>{exams.map((exam) => <option key={exam.id} value={exam.id}>{exam.name || exam.exam_name} · {exam.subject || "Subject"}</option>)}</select></label><label><span className="portal-label">Maximum marks</span><input required type="number" min="1" value={form.max_marks} onChange={(e) => setForm({ ...form, max_marks: e.target.value })} className="portal-input" /></label><label><span className="portal-label">Obtained marks</span><input required type="number" min="0" value={form.obtained_marks} onChange={(e) => setForm({ ...form, obtained_marks: e.target.value })} className="portal-input" /></label><label><span className="portal-label">Subject</span><input value={form.subject || selectedExam?.subject || ""} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="portal-input" /></label><div className="flex items-end gap-3"><div className="rounded-xl bg-[#edf2ff] px-4 py-2.5 text-sm text-cobalt font-semibold">{percentage}% · {gradeForIndia(percentage)}</div><button disabled={saving} className="portal-button">{saving ? "Saving…" : <><Save size={15} /> Save marks</>}</button></div></form></div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between"><h3 className="font-semibold text-slate-800">Recent gradebook entries</h3><span className="text-xs text-slate-400">{existing.length} entries</span></div>{existing.length ? <div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Marks</th><th className="px-5 py-3">Grade</th><th className="px-5 py-3">Visibility</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{existing.map((row) => <tr key={row.id}><td className="px-5 py-4 font-semibold text-slate-700">{row.student_name || row.student_id}</td><td className="px-5 py-4 text-slate-500">{row.subject || "—"}</td><td className="px-5 py-4 text-slate-500">{row.obtained_marks ?? "—"} / {row.max_marks ?? "—"}</td><td className="px-5 py-4 text-slate-500">{row.grade || gradeForIndia(row.percentage)}</td><td className="px-5 py-4"><span className={`text-xs font-semibold ${row.published === false ? "text-amber-700" : "text-emerald-700"}`}>{row.published === false ? "Draft" : "Published"}</span></td></tr>)}</tbody></table></div> : <EmptyState icon={BarChart3} title="No marks entered yet" text="Choose a student and examination above to start the gradebook." />}</div></div>;
}

function NoticesView({ payload }) {
  const notices = payload.data?.notices || payload.dashboard?.notices || [];
  return <div><SectionTitle eyebrow="The school bulletin" title="Notices" text="Announcements targeted to your school, class and section." />{notices.length ? <div className="space-y-3">{notices.map((notice) => <article key={notice.id} className="rounded-2xl bg-white border border-slate-100 p-5 flex gap-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notice.pinned || notice.important ? "bg-[#fff4de] text-amber-700" : "bg-[#edf2ff] text-cobalt"}`}><Bell size={18} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-800">{notice.title}</h3>{(notice.pinned || notice.important) && <span className="text-[10px] rounded-full bg-amber-50 text-amber-700 px-2 py-1 font-semibold">Important</span>}</div><p className="text-sm text-slate-500 leading-6 mt-2">{notice.description || "No additional details."}</p><p className="text-xs text-slate-400 mt-3">{dateLabel(notice.date || notice.created_date)} · {titleCase(notice.audience || "School")}</p></div></article>)}</div> : <EmptyState icon={Bell} title="No notices yet" />}</div>;
}

function CalendarView({ payload }) {
  const items = payload.data?.calendar || payload.dashboard?.calendar || [];
  return <div><SectionTitle eyebrow="Plan ahead" title="School calendar" text="Holidays, exams, PTMs, events and important academic dates." />{items.length ? <div className="grid md:grid-cols-2 gap-4">{items.map((item) => <div key={item.id} className="rounded-2xl bg-white border border-slate-100 p-5 flex gap-4"><div className="w-12 h-12 rounded-xl bg-[#edf2ff] text-cobalt flex flex-col items-center justify-center"><span className="text-lg font-bold">{item.date ? new Date(item.date).getDate() : "—"}</span><span className="text-[9px] uppercase font-bold">{item.date ? new Date(item.date).toLocaleDateString("en-IN", { month: "short" }) : "Date"}</span></div><div><span className="text-[10px] uppercase tracking-wider text-cobalt font-bold">{titleCase(item.type || "School event")}</span><h3 className="font-semibold text-slate-800 mt-1">{item.title}</h3><p className="text-sm text-slate-500 mt-1">{item.description || ""}</p></div></div>)}</div> : <EmptyState icon={CalendarDays} title="Calendar is being prepared" />}</div>;
}

function FeesView({ payload }) {
  const fees = payload.data?.fees || [];
  const paid = fees.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const pending = fees.filter((row) => row.status !== "paid").reduce((sum, row) => sum + Number(row.amount || row.pending_amount || 0), 0);
  return <div><SectionTitle eyebrow="Clear and transparent" title="Fees & receipts" text="A simple view of fee structure, due dates and payment history." /> <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-5"><StatCard label="Total paid" value={money(paid)} detail="Payment history" icon={CheckCircle2} tone="teal" /><StatCard label="Pending" value={money(pending)} detail="Due to the school" icon={CreditCard} tone="amber" /><StatCard label="Records" value={fees.length} detail="Fee entries" icon={Receipt} tone="blue" /></div>{fees.length ? <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Fee item</th><th className="px-5 py-3">Due date</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Receipt</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{fees.map((fee) => <tr key={fee.id}><td className="px-5 py-4 font-semibold text-slate-700">{fee.title || "School fee"}</td><td className="px-5 py-4 text-slate-500">{dateLabel(fee.due_date)}</td><td className="px-5 py-4 text-slate-500">{money(fee.amount)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${fee.status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{titleCase(fee.status || "pending")}</span></td><td className="px-5 py-4 text-xs text-slate-400">{fee.receipt_number || "—"}</td></tr>)}</tbody></table></div></div> : <EmptyState icon={CreditCard} title="No fee records yet" text="Your fee details will appear here once the school office adds them." />}</div>;
}

function DigitalIdView({ payload }) {
  const student = payload.profile || payload.children?.[0] || {};
  const qrData = encodeURIComponent(`DIS|${student.admission_number || student.id || "student"}|${student.full_name || "Student"}`);
  return <div><SectionTitle eyebrow="Always with you" title="Digital student ID" text="A mobile-friendly identity card for school life." />{student.id ? <div className="max-w-xl rounded-[26px] bg-cobalt-deep text-white p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(14,31,82,.2)]"><div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" /><div className="flex items-center justify-between relative"><div className="flex items-center gap-3"><img src={logo} alt="DIS" className="h-9 w-auto" /><div><p className="text-xs font-bold tracking-[.18em] text-amber uppercase">Daudi International School</p><p className="text-[10px] text-white/50 mt-1">Student identity card</p></div></div><QrCode size={26} className="text-white/70" /></div><div className="relative flex items-end gap-5 mt-10"><div className="w-24 h-28 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden">{student.photo_url ? <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" /> : <UserRound size={34} className="text-white/50" />}</div><div><p className="text-2xl font-semibold">{student.full_name || student.name}</p><p className="text-white/60 text-sm mt-1">{student.class_name || student.class_id || "Class"} · {student.section || student.section_id || "Section"}</p><p className="text-white/60 text-sm mt-1">Roll no. {student.roll_number || "—"}</p></div></div><div className="relative grid grid-cols-2 gap-4 border-t border-white/10 mt-8 pt-5 text-xs"><div><p className="text-white/40 uppercase tracking-wider">Admission no.</p><p className="font-semibold mt-1">{student.admission_number || "—"}</p></div><div><p className="text-white/40 uppercase tracking-wider">Valid for</p><p className="font-semibold mt-1">{payload.dashboard?.currentSession?.name || currentAcademicSession()}</p></div></div><div className="relative mt-6 bg-white rounded-xl p-3 flex justify-between items-center"><span className="text-xs text-cobalt font-semibold">Scan to verify student identity</span><img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${qrData}`} alt="Student QR code" className="w-12 h-12" /></div></div> : <EmptyState icon={QrCode} title="Student ID is not ready" />}</div>;
}

function StudentProfileView({ payload }) {
  const student = payload.profile || payload.children?.[0];
  return <div><SectionTitle eyebrow="Your child" title="Child profile" text="The essentials, kept simple." />{student ? <div className="rounded-2xl bg-white border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 items-start"><div className="w-24 h-24 rounded-2xl bg-[#edf2ff] flex items-center justify-center overflow-hidden">{student.photo_url ? <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" /> : <UserRound size={36} className="text-cobalt" />}</div><div className="grid sm:grid-cols-2 gap-x-12 gap-y-4"><div><p className="portal-label">Name</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.full_name || student.name}</p></div><div><p className="portal-label">Class & section</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.class_name || student.class_id || "—"} · {student.section || student.section_id || "—"}</p></div><div><p className="portal-label">Roll number</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.roll_number || "—"}</p></div><div><p className="portal-label">Admission number</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.admission_number || "—"}</p></div></div></div> : <EmptyState icon={UserRound} title="Profile not linked" text="Please ask the school office to link your student profile." />}</div>;
}

function StudentsView({ payload, role }) {
  const rows = payload.data?.students || [];
  return <div><SectionTitle eyebrow={role === "admin" ? "People and profiles" : "Your assigned learners"} title="Students" text={role === "admin" ? "Searchable student records shared across the school portal." : "Only students in your authorised classes are shown."} />{rows.length ? <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="p-4 border-b border-slate-100"><div className="relative max-w-sm"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input className="portal-input !pl-9" placeholder="Search students" onChange={(event) => { const term = event.target.value.toLowerCase(); event.currentTarget.closest(".rounded-2xl")?.querySelectorAll("tbody tr").forEach((row) => { if (row instanceof HTMLTableRowElement) row.style.display = row.innerText.toLowerCase().includes(term) ? "" : "none"; }); }} /></div></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Class</th><th className="px-5 py-3">Roll no.</th><th className="px-5 py-3">Attendance</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{rows.map((student) => <tr key={student.id}><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#edf2ff] text-cobalt flex items-center justify-center"><UserRound size={14} /></div><span className="font-semibold text-slate-700">{student.full_name || student.name}</span></div></td><td className="px-5 py-4 text-slate-500">{student.class_name || student.class_id || "—"} · {student.section || student.section_id || "—"}</td><td className="px-5 py-4 text-slate-500">{student.roll_number || "—"}</td><td className="px-5 py-4"><span className="text-teal-700 font-semibold">{student.attendance_percentage ? `${student.attendance_percentage}%` : "—"}</span></td></tr>)}</tbody></table></div></div> : <EmptyState icon={Users} title="No students found" />}</div>;
}

function HomeworkView({ role, payload, refresh }) {
  const homework = payload.data?.homework || [];
  const classes = payload.data?.classes || [];
  const subjects = payload.data?.subjects || [];
  const [form, setForm] = useState({ title: "", class_id: classes[0]?.id || "", subject_id: "", assigned_date: new Date().toISOString().slice(0, 10), due_date: "", description: "", attachment_url: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try {
      await schoolApi.auth.portalManage("homework", { method: "POST", body: { ...form, status: "assigned" } });
      setForm({ title: "", class_id: classes[0]?.id || "", subject_id: "", assigned_date: new Date().toISOString().slice(0, 10), due_date: "", description: "", attachment_url: "" });
      await refresh(); setMessage("Homework assigned successfully.");
    } catch (saveError) { setError(saveError.message || "Could not assign homework."); }
    finally { setSaving(false); }
  };
  return <div className="portal-page-enter"><SectionTitle eyebrow="Learning beyond the classroom" title="Homework & assignments" text={role === "teacher" ? "Assign work to your authorised classes. Students and parents see it immediately." : "Classwork, homework, projects and revision organised by due date."} />
    {error && <div className="portal-alert portal-alert-error"><AlertCircle size={17} />{error}</div>}{message && <div className="portal-alert portal-alert-success"><CheckCircle2 size={17} />{message}</div>}
    {role === "teacher" && <form onSubmit={save} className="portal-form-panel grid sm:grid-cols-2 xl:grid-cols-3 gap-4"><label className="sm:col-span-2 xl:col-span-3"><span className="portal-label">Assignment title *</span><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="portal-input" placeholder="Mathematics practice – Fractions" /></label><label><span className="portal-label">Class & section *</span><select required value={form.class_id} onChange={(event) => setForm({ ...form, class_id: event.target.value })} className="portal-input"><option value="">Select class</option>{classes.map((row) => <option key={row.id} value={row.id}>{relationLabel("classes", row)}</option>)}</select></label><label><span className="portal-label">Subject *</span><select required value={form.subject_id} onChange={(event) => setForm({ ...form, subject_id: event.target.value })} className="portal-input"><option value="">Select subject</option>{subjects.map((row) => <option key={row.id} value={row.id}>{relationLabel("subjects", row)}</option>)}</select></label><label><span className="portal-label">Assigned on *</span><input required type="date" value={form.assigned_date} onChange={(event) => setForm({ ...form, assigned_date: event.target.value })} className="portal-input" /></label><label><span className="portal-label">Due date *</span><input required type="date" value={form.due_date} onChange={(event) => setForm({ ...form, due_date: event.target.value })} className="portal-input" /></label><label className="sm:col-span-2 xl:col-span-3"><span className="portal-label">Instructions *</span><textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="portal-input min-h-24" placeholder="Complete questions 1–10 in the notebook." /></label><label className="sm:col-span-2"><span className="portal-label">Optional resource link</span><input type="url" value={form.attachment_url} onChange={(event) => setForm({ ...form, attachment_url: event.target.value })} className="portal-input" placeholder="https://..." /></label><div className="flex items-end justify-end"><button disabled={saving} className="portal-button">{saving ? <><RefreshCw size={15} className="animate-spin" /> Assigning…</> : <><BookOpen size={15} /> Assign homework</>}</button></div></form>}
    {homework.length ? <div className="grid md:grid-cols-2 gap-4">{[...homework].sort((a, b) => String(a.due_date).localeCompare(String(b.due_date))).map((item) => <article key={item.id} className="portal-homework-card"><div className="flex items-start justify-between gap-3"><div className="portal-record-icon"><BookOpen size={17} /></div><span className={`portal-status-pill ${new Date(item.due_date) < new Date() ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>Due {dateLabel(item.due_date)}</span></div><p className="portal-eyebrow mt-5">{item.subject_name || item.subject || "Subject"} · {item.class_name || "Class"}</p><h3 className="font-semibold text-slate-900 mt-2">{item.title}</h3><p className="text-sm text-slate-500 leading-6 mt-2">{item.description}</p><div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4 text-xs text-slate-400"><span>Assigned {dateLabel(item.assigned_date)}</span>{item.attachment_url && <a href={item.attachment_url} target="_blank" rel="noreferrer" className="font-semibold text-cobalt">Open resource ↗</a>}</div></article>)}</div> : <EmptyState icon={BookOpen} title="No homework assigned" text="New assignments will appear here as teachers publish them." />}
  </div>;
}

function LeaveView({ role, payload, refresh }) {
  const rows = payload.data?.leave || [];
  const students = payload.data?.students || payload.children || [];
  const canApply = role === "student" || role === "parent";
  const canReview = role === "teacher";
  const [form, setForm] = useState({ student_id: students[0]?.id || "", from_date: "", to_date: "", reason: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try { await schoolApi.auth.portalManage("leave", { method: "POST", body: form }); setForm({ student_id: students[0]?.id || "", from_date: "", to_date: "", reason: "" }); await refresh(); setMessage("Leave application submitted to the school."); }
    catch (submitError) { setError(submitError.message || "Could not submit the leave application."); }
    finally { setSaving(false); }
  };
  const review = async (row, status) => {
    setError(""); setMessage("");
    try { await schoolApi.auth.portalManage("leave", { method: "PUT", id: row.id, body: { ...row, status } }); await refresh(); setMessage(`Leave application ${status}.`); }
    catch (reviewError) { setError(reviewError.message || "Could not update the leave application."); }
  };
  return <div className="portal-page-enter"><SectionTitle eyebrow="Student wellbeing" title="Leave applications" text={canApply ? "Submit a leave request and track the school’s decision." : "Review leave requests from students in your assigned classes."} />
    {error && <div className="portal-alert portal-alert-error"><AlertCircle size={17} />{error}</div>}{message && <div className="portal-alert portal-alert-success"><CheckCircle2 size={17} />{message}</div>}
    {canApply && <form onSubmit={submit} className="portal-form-panel grid sm:grid-cols-2 gap-4"><label className="sm:col-span-2"><span className="portal-label">Student *</span><select required value={form.student_id} onChange={(event) => setForm({ ...form, student_id: event.target.value })} className="portal-input">{students.map((row) => <option key={row.id} value={row.id}>{relationLabel("students", row)}</option>)}</select></label><label><span className="portal-label">Leave starts *</span><input required type="date" value={form.from_date} onChange={(event) => setForm({ ...form, from_date: event.target.value })} className="portal-input" /></label><label><span className="portal-label">Leave ends *</span><input required type="date" value={form.to_date} onChange={(event) => setForm({ ...form, to_date: event.target.value })} className="portal-input" /></label><label className="sm:col-span-2"><span className="portal-label">Reason *</span><textarea required value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} className="portal-input min-h-24" placeholder="Please explain the reason for leave." /></label><div className="sm:col-span-2 flex justify-end"><button disabled={saving || !students.length} className="portal-button">{saving ? "Submitting…" : "Submit leave application"}</button></div></form>}
    {rows.length ? <div className="space-y-3">{[...rows].sort((a, b) => String(b.created_date).localeCompare(String(a.created_date))).map((row) => <article key={row.id} className="portal-leave-row"><div className="portal-record-icon"><CalendarDays size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-sm text-slate-800">{row.student_name || "Student leave"}</h3><span className={`portal-status-pill ${row.status === "approved" ? "bg-emerald-50 text-emerald-700" : row.status === "rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>{titleCase(row.status || "pending")}</span></div><p className="text-xs text-slate-400 mt-1">{dateLabel(row.from_date)} – {dateLabel(row.to_date)} {row.class_name ? `· ${row.class_name}` : ""}</p><p className="text-sm text-slate-500 mt-2">{row.reason}</p></div>{canReview && row.status === "pending" && <div className="flex gap-2"><button onClick={() => review(row, "rejected")} className="portal-secondary-button !text-red-600">Reject</button><button onClick={() => review(row, "approved")} className="portal-button">Approve</button></div>}</article>)}</div> : <EmptyState icon={CalendarDays} title="No leave applications" text={canApply ? "Submitted leave applications will appear here." : "There are no applications waiting for review."} />}
  </div>;
}

function fieldValueForEdit(field, value) {
  if (field.type === "checkbox") return Boolean(value);
  if (field.type === "multiRelation") return Array.isArray(value) ? value : [];
  return value ?? "";
}

function exportRecords(resource, rows, schema) {
  const fields = schema.fields.filter((field) => field.type !== "password");
  const escape = (value) => `"${String(Array.isArray(value) ? value.join(" | ") : value ?? "").replaceAll('"', '""')}"`;
  const csv = [fields.map((field) => escape(field.label)).join(","), ...rows.map((row) => fields.map((field) => escape(row[field.name])).join(","))].join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }));
  link.download = `dis-${resource}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function AdminManageView({ resource, payload, refresh }) {
  const rows = payload.data?.[resource] || [];
  const schema = RESOURCE_SCHEMAS[resource] || { title: LABELS[resource] || titleCase(resource), singular: "record", description: "Manage shared school portal records.", fields: [], defaults: () => ({}), readOnly: resource === "audit" };
  const fields = schema.fields || [];
  const [form, setForm] = useState(() => schema.defaults?.() || {});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const visible = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));

  const resetForm = () => {
    setForm(schema.defaults?.() || {});
    setEditing(null);
    setShowForm(false);
  };

  const openNew = () => {
    setError("");
    setNotice("");
    setForm(schema.defaults?.() || {});
    setEditing(null);
    setShowForm(true);
  };

  const setField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field.name]: value };
      if (field.name === "student_id") {
        const student = (payload.data?.students || []).find((row) => row.id === value);
        if (student?.class_id) next.class_id = student.class_id;
      }
      if (field.name === "exam_id") {
        const exam = (payload.data?.exams || []).find((row) => row.id === value);
        if (exam) {
          next.max_marks = exam.max_marks || next.max_marks || 100;
          next.subject_id = exam.subject_id || next.subject_id || "";
          next.subject = exam.subject || next.subject || "";
        }
      }
      return next;
    });
  };

  const uploadImage = async (field, file) => {
    if (!file) return;
    setUploading(field.name);
    setError("");
    try {
      const uploaded = await schoolApi.media.uploadImage(file);
      setField(field, uploaded.file_url);
      setNotice("Photo uploaded. Save the record to keep this change.");
    } catch (uploadError) {
      setError(uploadError.message || "Could not upload this photo.");
    } finally {
      setUploading("");
    }
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const wasEditing = Boolean(editing);
      await schoolApi.auth.portalManage(resource, { method: wasEditing ? "PUT" : "POST", id: editing, body: normalisePayload(form) });
      resetForm();
      await refresh();
      setNotice(wasEditing ? `${titleCase(schema.singular)} updated successfully.` : `${titleCase(schema.singular)} added successfully.`);
    } catch (saveError) {
      setError(saveError.message || "Could not save this record. Check the highlighted information and try again.");
    } finally {
      setSaving(false);
    }
  };

  const edit = (row) => {
    const next = {};
    fields.forEach((field) => { next[field.name] = fieldValueForEdit(field, row[field.name]); });
    setError("");
    setNotice("");
    setForm(next);
    setEditing(row.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm(`Delete this ${schema.singular}? This action is recorded in the audit log.`)) return;
    setError("");
    setNotice("");
    try {
      await schoolApi.auth.portalManage(resource, { method: "DELETE", id });
      await refresh();
      setNotice(`${titleCase(schema.singular)} deleted successfully.`);
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this record. Please try again.");
    }
  };

  const renderField = (field) => {
    const value = form[field.name] ?? (field.type === "checkbox" ? false : field.type === "multiRelation" ? [] : "");
    const relation = field.type === "profileRelation" ? "profile" : field.relation;
    const related = field.type === "relation" || field.type === "multiRelation" || field.type === "profileRelation" ? relationRows(relation, payload, form) : [];
    const className = `block ${field.wide ? "sm:col-span-2 xl:col-span-3" : ""}`;

    if (field.type === "checkbox") return <label key={field.name} className={`${className} portal-check-card`}><input type="checkbox" checked={Boolean(value)} onChange={(event) => setField(field, event.target.checked)} /><span><strong>{field.label}</strong><small>{field.help || "This change is visible wherever this record is used."}</small></span></label>;
    if (field.type === "textarea") return <label key={field.name} className={className}><span className="portal-label">{field.label}{field.required && " *"}</span><textarea required={field.required} value={value} onChange={(event) => setField(field, event.target.value)} className="portal-input min-h-24 resize-y" placeholder={field.placeholder || ""} /></label>;
    if (field.type === "image") return <label key={field.name} className={className}><span className="portal-label">{field.label}</span><div className="portal-image-field">{value ? <img src={value} alt="Uploaded profile" /> : <div className="portal-image-placeholder"><UserRound size={22} /></div>}<div className="min-w-0"><input type="file" accept="image/*" onChange={(event) => uploadImage(field, event.target.files?.[0])} className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#edf2ff] file:px-3 file:py-2 file:font-semibold file:text-cobalt" /><p className="mt-2 text-[11px] text-slate-400">JPG, PNG or WebP · maximum 8 MB</p></div>{uploading === field.name && <RefreshCw size={17} className="animate-spin text-cobalt" />}</div></label>;
    if (field.type === "select") return <label key={field.name} className={className}><span className="portal-label">{field.label}{field.required && " *"}</span><select required={field.required} value={value} onChange={(event) => setField(field, event.target.value)} className="portal-input"><option value="">Select {field.label.toLowerCase()}</option>{(field.options || []).map((item) => <option key={item.value} value={item.value}>{titleCase(item.label)}</option>)}</select></label>;
    if (field.type === "relation" || field.type === "profileRelation") return <label key={field.name} className={className}><span className="portal-label">{field.label}{field.required && " *"}</span><select required={field.required} value={value} onChange={(event) => setField(field, event.target.value)} className="portal-input" disabled={field.type === "profileRelation" && !form.role}><option value="">{field.type === "profileRelation" && !form.role ? "Choose a role first" : `Select ${field.label.toLowerCase()}`}</option>{related.map((row) => <option key={row.id} value={row.id}>{relationLabel(relation === "profile" ? `${form.role}s` : relation, row)}</option>)}</select></label>;
    if (field.type === "multiRelation") {
      const selected = Array.isArray(value) ? value : String(value || "").split(",").filter(Boolean);
      return <label key={field.name} className={className}><span className="portal-label">{field.label}{field.required && " *"}</span><select multiple value={selected} onChange={(event) => setField(field, Array.from(event.target.selectedOptions, (item) => item.value))} className="portal-input min-h-32 py-2">{related.map((row) => <option key={row.id} value={row.id}>{relationLabel(relation, row)}</option>)}</select><span className="portal-help">Use Ctrl / Cmd to choose more than one option.</span></label>;
    }
    return <label key={field.name} className={className}><span className="portal-label">{field.label}{field.required && " *"}</span><div className="relative">{field.name === "amount" || field.name === "concession" ? <span className="absolute left-3 top-3 text-sm text-slate-400">₹</span> : null}<input required={field.required} type={field.type || "text"} min={field.min} max={field.max} value={value} onChange={(event) => setField(field, event.target.value)} className={`portal-input ${(field.name === "amount" || field.name === "concession") ? "!pl-7" : ""}`} placeholder={field.placeholder || ""} autoComplete={field.type === "password" ? "new-password" : undefined} /></div>{field.help && <span className="portal-help">{field.help}</span>}</label>;
  };

  return <div className="portal-page-enter">
    <SectionTitle eyebrow="Indian school ERP" title={schema.title} text={schema.description} action={<div className="flex flex-wrap gap-2"><button type="button" onClick={() => exportRecords(resource, visible, schema)} disabled={!visible.length} className="portal-secondary-button"><Download size={15} /> Export CSV</button>{!schema.readOnly && <button type="button" onClick={showForm ? resetForm : openNew} className="portal-button">{showForm ? <><X size={15} /> Close</> : <><Plus size={15} /> Add {schema.singular}</>}</button>}</div>} />
    {error && <div role="alert" className="portal-alert portal-alert-error"><AlertCircle size={17} />{error}</div>}
    {notice && <div role="status" className="portal-alert portal-alert-success"><CheckCircle2 size={17} />{notice}</div>}

    {showForm && <div className="portal-form-panel">
      <div className="portal-form-header"><div><p className="portal-eyebrow">{editing ? "Update school record" : "New school record"}</p><h3>{editing ? `Edit ${schema.singular}` : `Add ${schema.singular}`}</h3></div>{editing && <span className="portal-status-pill bg-amber-50 text-amber-700">Editing</span>}</div>
      <form onSubmit={save} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{fields.map(renderField)}<div className="sm:col-span-2 xl:col-span-3 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2"><button type="button" onClick={resetForm} className="portal-secondary-button">Cancel</button><button type="submit" disabled={saving || Boolean(uploading)} className="portal-button sm:min-w-36">{saving ? <><RefreshCw size={15} className="animate-spin" /> Saving…</> : editing ? <><Save size={15} /> Update record</> : <><Plus size={15} /> Save record</>}</button></div></form>
    </div>}

    <div className="portal-record-panel">
      <div className="portal-record-toolbar"><div><p className="font-semibold text-slate-800">{schema.title}</p><p className="text-xs text-slate-400 mt-1">{visible.length} of {rows.length} records</p></div><div className="relative w-full sm:w-80"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="portal-input !pl-9" placeholder={`Search ${schema.title.toLowerCase()}`} /></div></div>
      {visible.length ? <div className="portal-record-grid">{visible.map((row) => <article key={row.id} className="portal-record-card"><div className="portal-record-icon"><FileSpreadsheet size={17} /></div><div className="min-w-0 flex-1"><p className="font-semibold text-sm text-slate-800 truncate">{schema.primary?.(row) || row.full_name || row.name || row.title || row.id}</p><p className="text-xs text-slate-400 mt-1 truncate">{schema.secondary?.(row) || "Shared school record"}</p>{(row.status || row.current || row.published) && <div className="mt-3"><span className={`portal-status-pill ${row.status === "paid" || row.status === "published" || row.current ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{row.current ? "Current" : row.published ? "Published" : titleCase(row.status)}</span></div>}</div>{!schema.readOnly && <div className="flex items-center gap-1"><button type="button" onClick={() => edit(row)} className="portal-icon-button" aria-label={`Edit ${schema.singular}`}><Pencil size={15} /></button><button type="button" onClick={() => remove(row.id)} className="portal-icon-button hover:!bg-red-50 hover:!text-red-600" aria-label={`Delete ${schema.singular}`}><Trash2 size={15} /></button></div>}</article>)}</div> : <EmptyState icon={Table2} title={search ? "No matching records" : `No ${schema.title.toLowerCase()} yet`} text={search ? "Try a different name, number or status." : `Use “Add ${schema.singular}” to create the first record.`} />}
    </div>
  </div>;
}

function AdminPortalView({ section, payload, refresh, go }) {
  if (section === "dashboard") return <DashboardView role="admin" payload={payload} go={go} />;
  const resource = section === "audit" ? "audit" : section;
  return <AdminManageView resource={resource} payload={payload} refresh={refresh} />;
}

function portalNavigationGroups(role) {
  if (role === "admin") return [
    { label: "Workspace", items: ["dashboard", "sessions"] },
    { label: "People", items: ["users", "students", "teachers", "parents"] },
    { label: "Academics", items: ["classes", "subjects", "timetable", "homework", "attendance", "exams", "results"] },
    { label: "Operations", items: ["fees", "leave", "notices", "calendar"] },
    { label: "Governance", items: ["audit"] },
  ];
  if (role === "teacher") return [
    { label: "Today", items: ["dashboard", "routine", "students", "attendance"] },
    { label: "Learning", items: ["homework", "exams", "gradebook"] },
    { label: "School", items: ["leave", "notices", "calendar"] },
  ];
  return [
    { label: "My school", items: NAV[role] || NAV.student },
  ];
}

function PortalShell({ user, payload, selectedChildId, setSelectedChildId, section, setSection, onLogout, children }) {
  const [open, setOpen] = useState(false);
  const role = user.role || "student";
  const meta = ROLE_META[role] || ROLE_META.student;
  const MetaIcon = meta.icon;
  const currentSession = payload.dashboard?.currentSession?.name || currentAcademicSession();
  const groups = portalNavigationGroups(role);
  return <div className="portal-shell min-h-screen font-inter text-slate-900">
    {open && <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden" />}
    <aside className={`portal-sidebar fixed z-50 inset-y-0 left-0 w-[286px] text-white transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="portal-sidebar-brand"><img src={logo} alt="DIS" className="h-10 w-auto" /><div><p className="font-semibold text-sm">DIS School ERP</p><p className="text-[10px] text-white/45 mt-1">Muzaffarpur · Bihar</p></div><button type="button" onClick={() => setOpen(false)} className="ml-auto lg:hidden text-white/60"><X size={19} /></button></div>
      <div className="px-4 pt-4"><div className="portal-user-card"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: meta.bg, color: meta.accent }}><MetaIcon size={19} /></div><div className="min-w-0"><p className="text-sm font-semibold truncate">{user.name || user.full_name}</p><p className="text-[11px] text-white/45 capitalize">{meta.label} · Session {currentSession}</p></div></div></div>
      <nav className="portal-sidebar-nav">{groups.map((group) => <div key={group.label} className="mb-4"><p className="portal-nav-group">{group.label}</p><div className="space-y-1">{group.items.map((item) => { const Icon = ICONS[item] || Settings2; return <button type="button" key={item} onClick={() => { setSection(item); setOpen(false); }} className={`portal-nav-button ${section === item ? "portal-nav-active" : ""}`}><Icon size={17} /><span>{LABELS[item]}</span>{section === item && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cobalt-deep" />}</button>; })}</div></div>)}</nav>
      <div className="portal-sidebar-footer"><Link to="/" className="portal-sidebar-link"><Home size={17} /> School website</Link><button type="button" onClick={onLogout} className="portal-sidebar-link text-red-200"><LogOut size={17} /> Sign out</button></div>
    </aside>
    <div className="lg:pl-[286px] min-w-0">
      <header className="portal-topbar"><div className="flex items-center gap-3 min-w-0"><button type="button" onClick={() => setOpen(true)} className="lg:hidden portal-icon-button"><Menu size={20} /></button><div className="min-w-0"><p className="text-[10px] uppercase tracking-[.18em] font-bold text-cobalt truncate">{meta.label} portal · {currentSession}</p><h1 className="font-semibold text-slate-900 text-lg leading-tight truncate">{LABELS[section] || "Overview"}</h1></div></div><div className="flex items-center gap-2 sm:gap-3 min-w-0">{role === "parent" && (payload.children || []).length > 1 && <label className="max-w-[150px] sm:max-w-none"><span className="sr-only">Choose child</span><select value={selectedChildId || payload.children[0]?.id || ""} onChange={(event) => setSelectedChildId(event.target.value)} className="portal-input !py-2 !text-xs truncate"><option value="" disabled>Choose child</option>{payload.children.map((child) => <option key={child.id} value={child.id}>{child.full_name || child.name} · {child.class_name || child.class_id}</option>)}</select></label>}<div className="hidden md:block text-right"><p className="text-xs font-semibold text-slate-700">{user.name || user.full_name}</p><p className="text-[10px] text-slate-400">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p></div><div className="w-9 h-9 rounded-xl bg-[#edf2ff] text-cobalt flex items-center justify-center flex-shrink-0"><UserRound size={17} /></div></div></header>
      <main className="portal-main max-w-[1540px]">{children}</main>
    </div>
  </div>;
}

export default function Portal() {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionFromPath = location.pathname.split("/")[2] || "dashboard";
  const [user, setUser] = useState(null);
  const [payload, setPayload] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    if (!payload) setLoading(true);
    try { const current = await schoolApi.auth.portalMe(); setUser(current); const next = await schoolApi.auth.portalBootstrap(); setPayload(next); setError(""); }
    catch (loadError) { setUser(null); setError(loadError.message || "Please sign in to continue."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const setSection = (section) => navigate(`/portal/${section}`);
  const logout = () => { schoolApi.auth.logout("/portal"); };
  if (loading) return <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-cobalt/20 border-t-cobalt animate-spin" /></div>;
  if (!user || !payload) return <PortalLogin onLogin={(nextUser) => { setUser(nextUser); load(); }} />;
  const role = user.role || "student";
  const selectedChild = role === "parent" ? payload.children?.find((child) => child.id === (selectedChildId || payload.children?.[0]?.id)) : null;
  const effectivePayload = selectedChild ? { ...payload, profile: selectedChild, data: { ...payload.data, students: [selectedChild], attendance: payload.data.attendance.filter((row) => row.student_id === selectedChild.id), results: payload.data.results.filter((row) => row.student_id === selectedChild.id), fees: payload.data.fees.filter((row) => row.student_id === selectedChild.id), exams: payload.data.exams.filter((row) => !row.class_id || row.class_id === selectedChild.class_id), timetable: payload.data.timetable.filter((row) => !row.class_id || row.class_id === selectedChild.class_id) } } : payload;
  const content = role === "admin" ? <AdminPortalView section={sectionFromPath} payload={payload} refresh={load} go={setSection} /> : sectionFromPath === "dashboard" ? <DashboardView role={role} payload={effectivePayload} go={setSection} /> : sectionFromPath === "routine" ? <RoutineView payload={effectivePayload} /> : sectionFromPath === "homework" ? <HomeworkView role={role} payload={effectivePayload} refresh={load} /> : sectionFromPath === "attendance" ? <AttendanceView role={role} payload={effectivePayload} refresh={load} /> : sectionFromPath === "exams" ? <ExamsView payload={effectivePayload} /> : sectionFromPath === "results" ? <ResultsView payload={effectivePayload} /> : sectionFromPath === "gradebook" ? <TeacherGradebookView payload={effectivePayload} refresh={load} /> : sectionFromPath === "leave" ? <LeaveView role={role} payload={effectivePayload} refresh={load} /> : sectionFromPath === "notices" ? <NoticesView payload={effectivePayload} /> : sectionFromPath === "calendar" ? <CalendarView payload={effectivePayload} /> : sectionFromPath === "fees" ? <FeesView payload={effectivePayload} /> : sectionFromPath === "digital-id" ? <DigitalIdView payload={effectivePayload} /> : sectionFromPath === "child" ? <StudentProfileView payload={effectivePayload} /> : sectionFromPath === "students" ? <StudentsView role={role} payload={effectivePayload} /> : <DashboardView role={role} payload={effectivePayload} go={setSection} />;
  return <PortalShell user={user} payload={payload} selectedChildId={selectedChildId} setSelectedChildId={setSelectedChildId} section={sectionFromPath} setSection={setSection} onLogout={logout}>{error && <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}<button onClick={load} className="ml-auto"><RefreshCw size={15} /></button></div>}{content}</PortalShell>;
}

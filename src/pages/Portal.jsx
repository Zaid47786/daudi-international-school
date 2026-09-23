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

const logo = "/dis-logo.png";

const ROLE_META = {
  student: { label: "Student", icon: GraduationCap, accent: "#3556a8", bg: "#edf2ff" },
  teacher: { label: "Teacher", icon: BookOpen, accent: "#0f766e", bg: "#e8f8f5" },
  parent: { label: "Parent", icon: Users, accent: "#9a5b13", bg: "#fff4de" },
  admin: { label: "Admin", icon: ShieldCheck, accent: "#1a3580", bg: "#e9efff" },
};

const NAV = {
  student: ["dashboard", "routine", "attendance", "exams", "results", "notices", "calendar", "fees", "digital-id"],
  teacher: ["dashboard", "routine", "students", "attendance", "exams", "gradebook", "notices", "calendar"],
  parent: ["dashboard", "child", "routine", "attendance", "exams", "results", "fees", "notices", "calendar", "digital-id"],
  admin: ["dashboard", "users", "students", "teachers", "parents", "classes", "subjects", "timetable", "attendance", "exams", "results", "fees", "notices", "calendar", "audit"],
};

const LABELS = {
  dashboard: "Overview", routine: "Routine", attendance: "Attendance", exams: "Exams", results: "Results", notices: "Notices", calendar: "Calendar", fees: "Fees", "digital-id": "Digital ID", child: "Child profile", users: "Portal accounts", students: "Students", teachers: "Teachers", parents: "Parents", classes: "Classes & sections", subjects: "Subjects", timetable: "Timetable", gradebook: "Gradebook", audit: "Audit log",
};

const ICONS = {
  dashboard: LayoutDashboard, routine: CalendarDays, attendance: ClipboardCheck, exams: Trophy, results: BarChart3, notices: Bell, calendar: CalendarDays, fees: CreditCard, "digital-id": QrCode, child: UserRound, users: ShieldCheck, students: Users, teachers: BookOpen, parents: Users, classes: Table2, subjects: BookOpen, timetable: CalendarDays, gradebook: BarChart3, audit: ShieldCheck,
};

const MANAGEMENT_FIELDS = {
  students: ["full_name", "class_id", "section_id", "roll_number", "admission_number", "user_id", "photo_url"],
  teachers: ["full_name", "employee_id", "subject_ids", "class_ids", "section_ids", "user_id", "photo_url"],
  parents: ["full_name", "phone", "child_ids", "user_id"],
  classes: ["name", "section", "class_teacher_id", "room"],
  subjects: ["name", "code", "class_ids", "teacher_ids"],
  timetable: ["day", "period", "start_time", "end_time", "class_id", "subject_id", "teacher_id", "room"],
  attendance: ["student_id", "class_id", "date", "status", "note"],
  exams: ["name", "subject", "date", "time", "duration", "class_id", "max_marks", "status"],
  results: ["student_id", "exam_id", "subject", "max_marks", "obtained_marks", "grade", "percentage", "published"],
  fees: ["student_id", "title", "amount", "due_date", "status", "receipt_number"],
  notices: ["title", "description", "date", "audience", "class_id", "section_id", "important", "pinned", "status"],
  calendar: ["title", "type", "date", "end_date", "description"],
  users: ["full_name", "email", "role", "password", "profile_id", "active"],
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
  const booleanKeys = new Set(["active", "published", "important", "pinned"]);
  const output = {};
  Object.entries(form).forEach(([key, value]) => {
    if (arrayKeys.has(key)) output[key] = String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
    else if (booleanKeys.has(key)) output[key] = value === true || value === "true" || value === "1" || value === "on";
    else if (["amount", "max_marks", "obtained_marks", "percentage", "period", "roll_number"].includes(key) && value !== "") output[key] = Number(value);
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
            <p className="text-amber text-xs font-bold tracking-[.24em] uppercase mb-4">Connected school life</p>
            <h1 className="text-4xl font-semibold tracking-tight leading-tight">One calm place for every school day.</h1>
            <p className="text-white/65 mt-5 max-w-sm leading-7">Attendance, exams, notices, routines and fees — shared securely between students, teachers, parents and the school team.</p>
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
            {role !== "admin" && <label className="block"><span className="portal-label">Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="portal-input" placeholder="you@school.com" /></label>}
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
  return <div className="space-y-7">
    <div className="rounded-3xl bg-cobalt-deep text-white px-6 py-7 sm:px-9 sm:py-8 relative overflow-hidden"><div className="absolute -right-20 -top-28 w-80 h-80 rounded-full border border-white/10" /><div className="absolute right-24 -bottom-40 w-80 h-80 rounded-full border border-amber/15" /><div className="relative"><p className="text-amber text-xs font-bold tracking-[.22em] uppercase">{role === "admin" ? "School operations" : "Your school day"}</p><h1 className="text-3xl sm:text-4xl font-semibold mt-3">Good morning, {payload.user?.name?.split(" ")[0] || "there"}.</h1><p className="text-white/65 mt-3 max-w-xl">{role === "admin" ? "A focused view of the school’s people, learning and daily operations." : role === "parent" ? "Everything important about your child’s school life, in one calm view." : "Stay close to the moments that make progress visible."}</p></div></div>
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard label="Attendance" value={`${attendance}%`} detail={role === "admin" ? "School average" : "Overall attendance"} icon={Activity} tone="teal" />
      <StatCard label="Upcoming exams" value={exams.length} detail="On your schedule" icon={Trophy} tone="amber" />
      <StatCard label={role === "admin" ? "Students" : role === "parent" ? "Children" : "Class"} value={role === "admin" ? dashboard.counts?.students || 0 : role === "parent" ? children.length : person.section || person.class_name || person.class_id || "—"} detail={role === "admin" ? `${dashboard.counts?.teachers || 0} teachers active` : person.roll_number ? `Roll no. ${person.roll_number}` : "Academic profile"} icon={role === "admin" ? Users : UserRound} tone="blue" />
      <StatCard label={role === "admin" ? "Fees collected" : "Fee balance"} value={role === "admin" ? money(dashboard.fees?.collected) : money(dashboard.feeStatus?.pending)} detail={role === "admin" ? `${money(dashboard.fees?.pending)} pending` : "Pending amount"} icon={CreditCard} tone="violet" />
    </div>
    <div className="grid xl:grid-cols-[1.15fr_.85fr] gap-5">
      <div className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6"><div className="flex items-center justify-between mb-5"><div><p className="portal-eyebrow">Next on the calendar</p><h3 className="text-lg font-semibold text-slate-900 mt-1">Upcoming exams</h3></div><button onClick={() => go("exams")} className="text-xs font-semibold text-cobalt">View all <ArrowRight size={14} className="inline ml-1" /></button></div>{exams.length ? <div className="space-y-3">{exams.slice(0, 4).map((exam) => <div key={exam.id} className="flex items-center gap-4 rounded-xl bg-slate-50 p-3.5"><div className="w-11 h-11 rounded-xl bg-white text-cobalt flex flex-col items-center justify-center text-[10px] font-bold"><span className="text-base leading-none">{exam.date ? new Date(exam.date).getDate() : "—"}</span><span>{exam.date ? new Date(exam.date).toLocaleDateString("en-IN", { month: "short" }) : "DATE"}</span></div><div className="min-w-0"><p className="font-semibold text-sm text-slate-800 truncate">{exam.name || exam.exam_name || "Examination"}</p><p className="text-xs text-slate-500 mt-1">{exam.subject || "All subjects"} · {exam.time || "Schedule to follow"}</p></div><span className="ml-auto text-xs text-slate-400">{exam.duration ? `${exam.duration} min` : ""}</span></div>)}</div> : <EmptyState icon={Trophy} title="No upcoming exams" />}</div>
      <div className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6"><div className="flex items-center justify-between mb-5"><div><p className="portal-eyebrow">Stay informed</p><h3 className="text-lg font-semibold text-slate-900 mt-1">Recent notices</h3></div><button onClick={() => go("notices")} className="text-xs font-semibold text-cobalt">See all <ArrowRight size={14} className="inline ml-1" /></button></div>{notices.length ? <div className="space-y-4">{notices.slice(0, 4).map((notice) => <div key={notice.id} className="flex gap-3"><div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${notice.pinned || notice.important ? "bg-amber" : "bg-cobalt"}`} /><div><p className="font-semibold text-sm text-slate-800">{notice.title}</p><p className="text-xs text-slate-400 mt-1">{dateLabel(notice.date || notice.created_date)}</p></div></div>)}</div> : <EmptyState icon={Bell} title="No new notices" />}</div>
    </div>
  </div>;
}

function RoutineView({ payload }) {
  const [day, setDay] = useState("Monday");
  const rows = payload.dashboard?.timetable || payload.data?.timetable || [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayRows = rows.filter((row) => String(row.day || "").toLowerCase() === day.toLowerCase()).sort((a, b) => Number(a.period || 0) - Number(b.period || 0));
  return <div><SectionTitle eyebrow="Learning rhythm" title="Routine" text="A clear view of the day and the full week — without extra noise." /><div className="flex gap-2 overflow-x-auto pb-2 mb-5">{days.map((item) => <button key={item} onClick={() => setDay(item)} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${day === item ? "bg-cobalt-deep text-white" : "bg-white border border-slate-200 text-slate-500"}`}>{item}</button>)}</div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100 flex justify-between"><h3 className="font-semibold text-slate-800">{day} routine</h3><span className="text-xs text-slate-400">{dayRows.length} periods</span></div>{dayRows.length ? <div className="divide-y divide-slate-100">{dayRows.map((row, index) => <div key={row.id || index} className="grid grid-cols-[48px_1fr_auto] sm:grid-cols-[60px_1fr_1fr_120px] items-center gap-4 px-5 py-4"><div className="w-9 h-9 rounded-xl bg-[#edf2ff] text-cobalt flex items-center justify-center text-sm font-bold">{row.period || index + 1}</div><div><p className="font-semibold text-sm text-slate-800">{row.subject_name || row.subject || "Subject"}</p><p className="text-xs text-slate-400 mt-1 sm:hidden">{row.start_time || ""} {row.end_time ? `– ${row.end_time}` : ""}</p></div><p className="hidden sm:block text-sm text-slate-500">{row.start_time || "—"} {row.end_time ? `– ${row.end_time}` : ""}</p><p className="text-xs text-slate-500 text-right">{row.room || row.classroom || "—"}<br /><span className="text-slate-400">{row.teacher_name || row.teacher || ""}</span></p></div>)}</div> : <EmptyState icon={CalendarDays} title="Routine not published" text="Your timetable will appear here once the school office publishes it." />}</div><div className="mt-5 rounded-2xl bg-cobalt-deep text-white p-5"><p className="text-amber text-xs font-bold tracking-[.18em] uppercase">Weekly view</p><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">{days.map((item) => <div key={item} className="rounded-xl bg-white/10 p-3"><p className="text-xs font-semibold">{item.slice(0, 3)}</p><p className="text-lg font-semibold mt-2">{rows.filter((row) => String(row.day || "").toLowerCase() === item.toLowerCase()).length}</p><p className="text-[10px] text-white/50">periods</p></div>)}</div></div></div>;
}

function AttendanceView({ role, payload, refresh }) {
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [statuses, setStatuses] = useState({});
  const rows = payload.data?.attendance || [];
  const students = payload.data?.students || payload.children || [];
  const summary = { total: rows.length, present: rows.filter((row) => row.status === "present" || row.status === "late").length, absent: rows.filter((row) => row.status === "absent").length };
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

function averagePercent(rows) { if (!rows.length) return 0; return Math.round((rows.filter((row) => row.status === "present" || row.status === "late").length / rows.length) * 100); }

function ExamsView({ payload }) {
  const exams = payload.data?.exams || payload.dashboard?.upcomingExams || [];
  return <div><SectionTitle eyebrow="Prepare with confidence" title="Examination schedule" text="Dates, subjects and practical details in one clear view." />{exams.length ? <div className="grid md:grid-cols-2 gap-4">{exams.map((exam) => <div key={exam.id} className="rounded-2xl bg-white border border-slate-100 p-5 flex gap-4"><div className="w-14 h-14 rounded-2xl bg-[#fff4de] text-amber-700 flex flex-col items-center justify-center flex-shrink-0"><span className="text-xl font-bold">{exam.date ? new Date(exam.date).getDate() : "—"}</span><span className="text-[10px] uppercase font-bold">{exam.date ? new Date(exam.date).toLocaleDateString("en-IN", { month: "short" }) : "Date"}</span></div><div className="min-w-0"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-slate-800">{exam.name || exam.exam_name || "Examination"}</h3><span className="text-[10px] bg-slate-100 text-slate-500 rounded-full px-2 py-1 whitespace-nowrap">{titleCase(exam.status || "scheduled")}</span></div><p className="text-sm text-cobalt mt-2">{exam.subject || "All subjects"}</p><p className="text-xs text-slate-400 mt-2">{dateLabel(exam.date)} · {exam.time || "Time to be announced"} · {exam.duration ? `${exam.duration} minutes` : "Duration to be announced"}</p></div></div>)}</div> : <EmptyState icon={Trophy} title="No exams published" />}</div>;
}

function ResultsView({ payload }) {
  const results = (payload.data?.results || []).filter((row) => row.published !== false);
  const totalMax = results.reduce((sum, row) => sum + Number(row.max_marks || 0), 0);
  const totalObtained = results.reduce((sum, row) => sum + Number(row.obtained_marks || row.marks || 0), 0);
  const percentage = totalMax ? Math.round((totalObtained / totalMax) * 100) : 0;
  return <div><SectionTitle eyebrow="Progress you can see" title="Results" text="Published results and performance history, kept simple and useful." />{results.length ? <><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"><StatCard label="Overall percentage" value={`${percentage}%`} detail="Across published marks" icon={BarChart3} tone="blue" /><StatCard label="Obtained" value={totalObtained} detail={`of ${totalMax} marks`} icon={Trophy} tone="amber" /><StatCard label="Grade" value={gradeFor(percentage)} detail="Overall result" icon={Sparkles} tone="violet" /><StatCard label="Subjects" value={new Set(results.map((row) => row.subject)).size} detail="With published marks" icon={BookOpen} tone="teal" /></div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Examination</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Marks</th><th className="px-5 py-3">Percentage</th><th className="px-5 py-3">Grade</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{results.map((row) => <tr key={row.id}><td className="px-5 py-4 font-semibold text-slate-700">{row.exam_name || row.exam_id || "Examination"}</td><td className="px-5 py-4 text-slate-500">{row.subject || "—"}</td><td className="px-5 py-4 text-slate-500">{row.obtained_marks ?? row.marks ?? "—"} / {row.max_marks ?? "—"}</td><td className="px-5 py-4 text-slate-500">{row.percentage ?? "—"}%</td><td className="px-5 py-4"><span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold">{row.grade || gradeFor(row.percentage)}</span></td></tr>)}</tbody></table></div></div></> : <EmptyState icon={BarChart3} title="Results are not published yet" text="Your school will make results visible here once they are reviewed and published." />}</div>;
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
      await schoolApi.auth.portalManage("results", { method: "POST", body: { ...normalisePayload(form), class_id: students.find((student) => student.id === form.student_id)?.class_id, percentage, grade: gradeFor(percentage) } });
      setForm({ student_id: "", exam_id: "", subject: "", max_marks: "100", obtained_marks: "", published: false });
      await refresh();
    } finally { setSaving(false); }
  };
  return <div><SectionTitle eyebrow="Assess with clarity" title="Gradebook" text="Enter marks once; percentages and grades are calculated automatically." /><div className="rounded-2xl bg-white border border-slate-100 p-5 mb-5"><form onSubmit={save} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"><label><span className="portal-label">Student</span><select required value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} className="portal-input"><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.full_name || student.name}</option>)}</select></label><label><span className="portal-label">Examination</span><select required value={form.exam_id} onChange={(e) => { const exam = exams.find((item) => item.id === e.target.value); setForm({ ...form, exam_id: e.target.value, subject: exam?.subject || "" }); }} className="portal-input"><option value="">Select examination</option>{exams.map((exam) => <option key={exam.id} value={exam.id}>{exam.name || exam.exam_name} · {exam.subject || "Subject"}</option>)}</select></label><label><span className="portal-label">Maximum marks</span><input required type="number" min="1" value={form.max_marks} onChange={(e) => setForm({ ...form, max_marks: e.target.value })} className="portal-input" /></label><label><span className="portal-label">Obtained marks</span><input required type="number" min="0" value={form.obtained_marks} onChange={(e) => setForm({ ...form, obtained_marks: e.target.value })} className="portal-input" /></label><label><span className="portal-label">Subject</span><input value={form.subject || selectedExam?.subject || ""} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="portal-input" /></label><div className="flex items-end gap-3"><div className="rounded-xl bg-[#edf2ff] px-4 py-2.5 text-sm text-cobalt font-semibold">{percentage}% · {gradeFor(percentage)}</div><button disabled={saving} className="portal-button">{saving ? "Saving…" : <><Save size={15} /> Save marks</>}</button></div></form></div><div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between"><h3 className="font-semibold text-slate-800">Recent gradebook entries</h3><span className="text-xs text-slate-400">{existing.length} entries</span></div>{existing.length ? <div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Marks</th><th className="px-5 py-3">Grade</th><th className="px-5 py-3">Visibility</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{existing.map((row) => <tr key={row.id}><td className="px-5 py-4 font-semibold text-slate-700">{row.student_name || row.student_id}</td><td className="px-5 py-4 text-slate-500">{row.subject || "—"}</td><td className="px-5 py-4 text-slate-500">{row.obtained_marks ?? "—"} / {row.max_marks ?? "—"}</td><td className="px-5 py-4 text-slate-500">{row.grade || gradeFor(row.percentage)}</td><td className="px-5 py-4"><span className={`text-xs font-semibold ${row.published === false ? "text-amber-700" : "text-emerald-700"}`}>{row.published === false ? "Draft" : "Published"}</span></td></tr>)}</tbody></table></div> : <EmptyState icon={BarChart3} title="No marks entered yet" text="Choose a student and examination above to start the gradebook." />}</div></div>;
}

function gradeFor(value) { const score = Number(value || 0); return score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F"; }

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
  return <div><SectionTitle eyebrow="Clear and transparent" title="Fees" text="A simple view of fee structure, due dates and payment history." /> <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-5"><StatCard label="Total paid" value={money(paid)} detail="Payment history" icon={CheckCircle2} tone="teal" /><StatCard label="Pending" value={money(pending)} detail="Due to the school" icon={CreditCard} tone="amber" /><StatCard label="Records" value={fees.length} detail="Fee entries" icon={Receipt} tone="blue" /></div>{fees.length ? <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Fee item</th><th className="px-5 py-3">Due date</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Receipt</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{fees.map((fee) => <tr key={fee.id}><td className="px-5 py-4 font-semibold text-slate-700">{fee.title || "School fee"}</td><td className="px-5 py-4 text-slate-500">{dateLabel(fee.due_date)}</td><td className="px-5 py-4 text-slate-500">{money(fee.amount)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${fee.status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{titleCase(fee.status || "pending")}</span></td><td className="px-5 py-4 text-xs text-slate-400">{fee.receipt_number || "—"}</td></tr>)}</tbody></table></div></div> : <EmptyState icon={CreditCard} title="No fee records yet" text="Your fee details will appear here once the school office adds them." />}</div>;
}

function DigitalIdView({ payload }) {
  const student = payload.profile || payload.children?.[0] || {};
  const qrData = encodeURIComponent(`DIS|${student.admission_number || student.id || "student"}|${student.full_name || "Student"}`);
  return <div><SectionTitle eyebrow="Always with you" title="Digital student ID" text="A mobile-friendly identity card for school life." />{student.id ? <div className="max-w-xl rounded-[26px] bg-cobalt-deep text-white p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(14,31,82,.2)]"><div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" /><div className="flex items-center justify-between relative"><div className="flex items-center gap-3"><img src={logo} alt="DIS" className="h-9 w-auto" /><div><p className="text-xs font-bold tracking-[.18em] text-amber uppercase">Daudi International School</p><p className="text-[10px] text-white/50 mt-1">Student identity card</p></div></div><QrCode size={26} className="text-white/70" /></div><div className="relative flex items-end gap-5 mt-10"><div className="w-24 h-28 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden">{student.photo_url ? <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" /> : <UserRound size={34} className="text-white/50" />}</div><div><p className="text-2xl font-semibold">{student.full_name || student.name}</p><p className="text-white/60 text-sm mt-1">{student.class_name || student.class_id || "Class"} · {student.section || student.section_id || "Section"}</p><p className="text-white/60 text-sm mt-1">Roll no. {student.roll_number || "—"}</p></div></div><div className="relative grid grid-cols-2 gap-4 border-t border-white/10 mt-8 pt-5 text-xs"><div><p className="text-white/40 uppercase tracking-wider">Admission no.</p><p className="font-semibold mt-1">{student.admission_number || "—"}</p></div><div><p className="text-white/40 uppercase tracking-wider">Valid for</p><p className="font-semibold mt-1">Academic year 2026–27</p></div></div><div className="relative mt-6 bg-white rounded-xl p-3 flex justify-between items-center"><span className="text-xs text-cobalt font-semibold">Scan to verify student identity</span><img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${qrData}`} alt="Student QR code" className="w-12 h-12" /></div></div> : <EmptyState icon={QrCode} title="Student ID is not ready" />}</div>;
}

function StudentProfileView({ payload }) {
  const student = payload.profile || payload.children?.[0];
  return <div><SectionTitle eyebrow="Your child" title="Child profile" text="The essentials, kept simple." />{student ? <div className="rounded-2xl bg-white border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 items-start"><div className="w-24 h-24 rounded-2xl bg-[#edf2ff] flex items-center justify-center overflow-hidden">{student.photo_url ? <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" /> : <UserRound size={36} className="text-cobalt" />}</div><div className="grid sm:grid-cols-2 gap-x-12 gap-y-4"><div><p className="portal-label">Name</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.full_name || student.name}</p></div><div><p className="portal-label">Class & section</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.class_name || student.class_id || "—"} · {student.section || student.section_id || "—"}</p></div><div><p className="portal-label">Roll number</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.roll_number || "—"}</p></div><div><p className="portal-label">Admission number</p><p className="text-sm font-semibold text-slate-800 mt-1">{student.admission_number || "—"}</p></div></div></div> : <EmptyState icon={UserRound} title="Profile not linked" text="Please ask the school office to link your student profile." />}</div>;
}

function StudentsView({ payload, role }) {
  const rows = payload.data?.students || [];
  return <div><SectionTitle eyebrow={role === "admin" ? "People and profiles" : "Your assigned learners"} title="Students" text={role === "admin" ? "Searchable student records shared across the school portal." : "Only students in your authorised classes are shown."} />{rows.length ? <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"><div className="p-4 border-b border-slate-100"><div className="relative max-w-sm"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input className="portal-input !pl-9" placeholder="Search students" onChange={(event) => { const term = event.target.value.toLowerCase(); event.currentTarget.closest(".rounded-2xl")?.querySelectorAll("tbody tr").forEach((row) => { if (row instanceof HTMLTableRowElement) row.style.display = row.innerText.toLowerCase().includes(term) ? "" : "none"; }); }} /></div></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Class</th><th className="px-5 py-3">Roll no.</th><th className="px-5 py-3">Attendance</th></tr></thead><tbody className="divide-y divide-slate-100 text-sm">{rows.map((student) => <tr key={student.id}><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#edf2ff] text-cobalt flex items-center justify-center"><UserRound size={14} /></div><span className="font-semibold text-slate-700">{student.full_name || student.name}</span></div></td><td className="px-5 py-4 text-slate-500">{student.class_name || student.class_id || "—"} · {student.section || student.section_id || "—"}</td><td className="px-5 py-4 text-slate-500">{student.roll_number || "—"}</td><td className="px-5 py-4"><span className="text-teal-700 font-semibold">{student.attendance_percentage ? `${student.attendance_percentage}%` : "—"}</span></td></tr>)}</tbody></table></div></div> : <EmptyState icon={Users} title="No students found" />}</div>;
}

function AdminManageView({ resource, payload, refresh }) {
  const rows = payload.data?.[resource] || [];
  const fields = MANAGEMENT_FIELDS[resource] || [];
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const visible = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const wasEditing = Boolean(editing);
      await schoolApi.auth.portalManage(resource, {
        method: wasEditing ? "PUT" : "POST",
        id: editing,
        body: normalisePayload(form),
      });
      setForm({});
      setEditing(null);
      await refresh();
      setNotice(wasEditing ? "Record updated successfully." : "Record added successfully.");
    } catch (saveError) {
      setError(saveError.message || "Could not save this record. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const edit = (row) => {
    const next = {};
    fields.forEach((field) => {
      const value = row[field];
      next[field] = Array.isArray(value) ? value.join(", ") : value ?? "";
    });
    setError("");
    setNotice("");
    setForm(next);
    setEditing(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this record? This action is audited.")) return;
    setError("");
    setNotice("");
    try {
      await schoolApi.auth.portalManage(resource, { method: "DELETE", id });
      await refresh();
      setNotice("Record deleted successfully.");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this record. Please try again.");
    }
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Administration"
        title={LABELS[resource] || titleCase(resource)}
        text="Manage shared records used by the student, teacher and parent experiences."
        action={editing && <button onClick={() => { setEditing(null); setForm({}); }} className="text-sm text-slate-500 flex items-center gap-1"><X size={15} /> Cancel edit</button>}
      />
      {error && <div role="alert" className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
      {notice && <div role="status" className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-center gap-2"><CheckCircle2 size={16} />{notice}</div>}
      <div className="rounded-2xl bg-white border border-slate-100 p-5 mb-5">
        <form onSubmit={save} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="portal-label">{titleCase(field)}</span>
              {["description", "note"].includes(field) ? (
                <textarea value={form[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="portal-input min-h-20" />
              ) : field === "status" || field === "role" || field === "audience" || field === "type" ? (
                <select value={form[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="portal-input">
                  <option value="">Select {titleCase(field)}</option>
                  {(field === "role" ? ["admin", "teacher", "student", "parent"] : field === "status" ? ["draft", "published", "scheduled", "paid", "pending", "present", "absent", "late"] : field === "audience" ? ["school", "students", "parents", "teachers", "class", "section"] : ["holiday", "exam", "ptm", "event", "academic"]).map((option) => <option key={option} value={option}>{titleCase(option)}</option>)}
                </select>
              ) : (
                <input
                  type={field.includes("date") || field === "date" ? "date" : field.includes("time") ? "time" : ["amount", "max_marks", "obtained_marks", "percentage", "period", "roll_number"].includes(field) ? "number" : field === "password" ? "password" : "text"}
                  value={form[field] || ""}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="portal-input"
                  placeholder={field.includes("_ids") ? "Comma-separated IDs" : ""}
                />
              )}
            </label>
          ))}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
            <button type="submit" disabled={saving} className="portal-button">{saving ? "Saving…" : editing ? <><Save size={15} /> Update record</> : <><Plus size={15} /> Add record</>}</button>
          </div>
        </form>
      </div>
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100"><div className="relative max-w-sm"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="portal-input !pl-9" placeholder="Search records" /></div></div>
        {visible.length ? <div className="divide-y divide-slate-100">{visible.map((row) => <div key={row.id} className="px-5 py-4 flex items-center justify-between gap-4"><div className="min-w-0"><p className="font-semibold text-sm text-slate-800 truncate">{row.full_name || row.name || row.title || row.subject || row.email || row.id}</p><p className="text-xs text-slate-400 mt-1 truncate">{row.email || row.class_id || row.status || row.date || row.description || "Shared portal record"}</p></div><div className="flex items-center gap-1 flex-shrink-0"><button onClick={() => edit(row)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Edit record"><Pencil size={15} /></button><button onClick={() => remove(row.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500" aria-label="Delete record"><Trash2 size={15} /></button></div></div>)}</div> : <EmptyState icon={Table2} title="No records yet" text="Use the form above to create the first shared record." />}
      </div>
    </div>
  );
}

function AdminPortalView({ section, payload, refresh, go }) {
  if (section === "dashboard") return <DashboardView role="admin" payload={payload} go={go} />;
  const resource = section === "audit" ? "audit" : section;
  return <AdminManageView resource={resource} payload={payload} refresh={refresh} />;
}

function PortalShell({ user, payload, selectedChildId, setSelectedChildId, section, setSection, onLogout, children }) {
  const [open, setOpen] = useState(false);
  const role = user.role || "student";
  const meta = ROLE_META[role] || ROLE_META.student;
  const MetaIcon = meta.icon;
  return <div className="min-h-screen bg-[#f7f9fc] font-inter text-slate-900"><aside className={`fixed z-50 inset-y-0 left-0 w-72 bg-cobalt-deep text-white transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}><div className="p-6 border-b border-white/10 flex items-center gap-3"><img src={logo} alt="DIS" className="h-9 w-auto" /><div><p className="font-semibold text-sm">School Portal</p><p className="text-[10px] text-white/45 mt-1">{meta.label} workspace</p></div><button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-white/60"><X size={19} /></button></div><div className="px-4 py-5"><div className="rounded-2xl bg-white/10 p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: meta.bg, color: meta.accent }}><MetaIcon size={19} /></div><div className="min-w-0"><p className="text-sm font-semibold truncate">{user.name || user.full_name}</p><p className="text-[11px] text-white/45 capitalize">{meta.label} account</p></div></div></div><nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">{NAV[role].map((item) => { const Icon = ICONS[item] || Settings2; return <button key={item} onClick={() => { setSection(item); setOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${section === item ? "bg-amber text-cobalt-deep" : "text-white/65 hover:bg-white/10 hover:text-white"}`}><Icon size={17} />{LABELS[item]}</button>; })}</nav><div className="absolute bottom-0 inset-x-0 p-4 border-t border-white/10"><Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white"><Home size={17} /> Website</Link><button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-300 hover:text-red-200"><LogOut size={17} /> Sign out</button></div></aside><div className="lg:pl-72"><header className="sticky top-0 z-30 min-h-16 bg-white/90 backdrop-blur border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 py-3"><div className="flex items-center gap-3"><button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100"><Menu size={20} /></button><div><p className="text-[10px] uppercase tracking-[.18em] font-bold text-cobalt">{meta.label} portal</p><h1 className="font-semibold text-slate-900 text-lg leading-tight">{LABELS[section] || "Overview"}</h1></div></div><div className="flex items-center gap-3">{role === "parent" && (payload.children || []).length > 1 && <label className="hidden sm:block"><span className="sr-only">Choose child</span><select value={selectedChildId || payload.children[0]?.id || ""} onChange={(event) => setSelectedChildId(event.target.value)} className="portal-input !w-auto !py-2 !text-xs"><option value="" disabled>Choose child</option>{payload.children.map((child) => <option key={child.id} value={child.id}>{child.full_name || child.name} · {child.class_name || child.class_id}</option>)}</select></label>}<div className="hidden sm:block text-right"><p className="text-xs font-semibold text-slate-700">{user.name || user.full_name}</p><p className="text-[10px] text-slate-400">Daudi International School</p></div><div className="w-9 h-9 rounded-full bg-[#edf2ff] text-cobalt flex items-center justify-center"><UserRound size={17} /></div></div></header><main className="p-4 sm:p-8 max-w-[1500px]">{children}</main></div></div>;
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
  const content = role === "admin" ? <AdminPortalView section={sectionFromPath} payload={payload} refresh={load} go={setSection} /> : sectionFromPath === "dashboard" ? <DashboardView role={role} payload={effectivePayload} go={setSection} /> : sectionFromPath === "routine" ? <RoutineView payload={effectivePayload} /> : sectionFromPath === "attendance" ? <AttendanceView role={role} payload={effectivePayload} refresh={load} /> : sectionFromPath === "exams" ? <ExamsView payload={effectivePayload} /> : sectionFromPath === "results" ? <ResultsView payload={effectivePayload} /> : sectionFromPath === "gradebook" ? <TeacherGradebookView payload={effectivePayload} refresh={load} /> : sectionFromPath === "notices" ? <NoticesView payload={effectivePayload} /> : sectionFromPath === "calendar" ? <CalendarView payload={effectivePayload} /> : sectionFromPath === "fees" ? <FeesView payload={effectivePayload} /> : sectionFromPath === "digital-id" ? <DigitalIdView payload={effectivePayload} /> : sectionFromPath === "child" ? <StudentProfileView payload={effectivePayload} /> : sectionFromPath === "students" ? <StudentsView role={role} payload={effectivePayload} /> : <DashboardView role={role} payload={effectivePayload} go={setSection} />;
  return <PortalShell user={user} payload={payload} selectedChildId={selectedChildId} setSelectedChildId={setSelectedChildId} section={sectionFromPath} setSection={setSection} onLogout={logout}>{error && <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}<button onClick={load} className="ml-auto"><RefreshCw size={15} /></button></div>}{content}</PortalShell>;
}

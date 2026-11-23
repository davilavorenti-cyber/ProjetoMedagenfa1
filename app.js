/* MedAgenda — frontend demonstrativo (HTML, CSS e JavaScript puro).
   Os dados ficam no navegador (localStorage); não há backend nem banco de dados conectado. */
const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 12v2a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="11" r="2"/><path d="M14 19a6 6 0 0 0 12 0v-3"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M20 8v6M17 11h6"/>',
  calendarCheck: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m2 5-4 4-2-2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
  calendarPlus: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m9 4v6m-3-3h6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10h.01M18 14h.01"/>',
  arrowRight: '<path d="M5 12h14m-7-7 7 7-7 7"/>'
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
const todayIso = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const makeDate = (day, month = 5, year = 2025) => `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
const baseDoctors = [
  {id:1,name:'Dr. Carlos Mendes',specialty:'Cardiologia',crm:'12345-SP',phone:'(11) 98765-4321',email:'carlos@clinica.com',status:'Ativo'},
  {id:2,name:'Dra. Ana Souza',specialty:'Ginecologia',crm:'23456-SP',phone:'(11) 98765-1234',email:'ana@clinica.com',status:'Ativo'},
  {id:3,name:'Dr. Roberto Lima',specialty:'Ortopedia',crm:'34567-SP',phone:'(11) 96543-2109',email:'roberto@clinica.com',status:'Ativo'},
  {id:4,name:'Dra. Juliana Costa',specialty:'Pediatria',crm:'45678-SP',phone:'(11) 91234-5678',email:'juliana@clinica.com',status:'Ativo'},
  {id:5,name:'Dr. Felipe Almeida',specialty:'Dermatologia',crm:'56789-SP',phone:'(11) 99876-5432',email:'felipe@clinica.com',status:'Ativo'},
  {id:6,name:'Dra. Marina Rocha',specialty:'Neurologia',crm:'67890-SP',phone:'(11) 97654-3210',email:'marina@clinica.com',status:'Ativo'},
  {id:7,name:'Dr. Paulo Nogueira',specialty:'Oftalmologia',crm:'78901-SP',phone:'(11) 93456-7890',email:'paulo@clinica.com',status:'Ativo'},
  {id:8,name:'Dra. Beatriz Santos',specialty:'Clínica Geral',crm:'89012-SP',phone:'(11) 94567-8901',email:'beatriz@clinica.com',status:'Ativo'}
];
const patientNames = [
  ['Maria Silva','123.456.789-00','12/03/1990','(11) 98765-4321','Bradesco Saúde'],
  ['João Pereira','987.654.321-00','25/07/1985','(11) 91234-2100','Unimed'],
  ['Ana Souza','456.789.123-00','08/11/1992','(11) 99876-1234','Amil'],
  ['Carlos Lima','321.654.987-00','14/06/1988','(11) 98765-1234','SulAmérica'],
  ['Fernanda Alves','654.321.789-00','30/01/1995','(11) 97654-3210','Bradesco Saúde'],
  ['Pedro Costa','159.753.486-00','21/02/1980','(11) 96543-2109','Unimed'],
  ['Mariana Oliveira','258.369.147-00','09/09/1993','(11) 95432-1098','Amil'],
  ['Lucas Ferreira','369.147.258-00','17/05/1987','(11) 94321-0987','SulAmérica'],
  ['Camila Rodrigues','741.852.963-00','06/12/1991','(11) 93210-9876','Hapvida'],
  ['Rafael Martins','852.963.741-00','19/04/1984','(11) 92109-8765','Unimed'],
  ['Isabela Gomes','963.741.852-00','22/08/1996','(11) 91098-7654','Amil'],
  ['Gabriel Ribeiro','147.258.369-00','03/10/1989','(11) 98987-6543','Bradesco Saúde'],
  ['Letícia Carvalho','357.159.246-00','11/01/1994','(11) 97876-5432','SulAmérica'],
  ['Thiago Lopes','486.357.159-00','28/04/1986','(11) 96765-4321','Hapvida'],
  ['Beatriz Mendes','591.486.273-00','16/07/1998','(11) 95654-3210','Unimed'],
  ['Eduardo Barros','612.597.384-00','07/02/1982','(11) 94543-2109','Amil'],
  ['Larissa Freitas','723.618.495-00','26/09/1990','(11) 93432-1098','Bradesco Saúde'],
  ['Vinícius Cardoso','834.729.516-00','05/05/1985','(11) 92321-0987','SulAmérica'],
  ['Patrícia Araújo','945.831.627-00','13/12/1992','(11) 91210-9876','Hapvida'],
  ['Felipe Moreira','156.942.738-00','29/03/1979','(11) 90109-8765','Unimed'],
  ['Amanda Teixeira','267.153.849-00','04/08/1997','(11) 99098-7654','Amil'],
  ['Bruno Dias','378.264.951-00','15/11/1988','(11) 98987-1234','Bradesco Saúde'],
  ['Clara Monteiro','489.375.162-00','23/06/1994','(11) 97876-1234','SulAmérica'],
  ['Daniel Vieira','591.486.273-11','02/02/1983','(11) 96765-1234','Hapvida']
];
const basePlans = [
  {id:1,operator:'Bradesco Saúde',name:'Bradesco Efetivo',category:'Ambulatorial + Hospitalar',price:'R$ 450,00',coverage:'Nacional',status:'Ativo'},
  {id:2,operator:'Unimed',name:'Unimed Básico',category:'Ambulatorial + Hospitalar',price:'R$ 380,00',coverage:'Nacional',status:'Ativo'},
  {id:3,operator:'Amil',name:'Amil 200',category:'Ambulatorial',price:'R$ 320,00',coverage:'Regional',status:'Ativo'},
  {id:4,operator:'SulAmérica',name:'SulAmérica Clássico',category:'Ambulatorial + Hospitalar',price:'R$ 410,00',coverage:'Nacional',status:'Ativo'},
  {id:5,operator:'Hapvida',name:'Hapvida Mais',category:'Ambulatorial + Hospitalar',price:'R$ 360,00',coverage:'Regional',status:'Ativo'}
];
function seedPatients(){return patientNames.map((p,i)=>({id:i+1,name:p[0],cpf:fakeCpf(i),birthdate:p[2].split('/').reverse().join('-'),phone:p[3],plan:p[4],email:`${p[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s/g,'.')}@email.com`,password:'123456',status:'Ativo'}));}
function seedAppointments(){
 const seed = [
  [1,1,1,1,'08:00','Confirmada'],[2,2,2,2,'09:30','Agendada'],[3,3,3,3,'11:00','Confirmada'],[4,4,4,4,'14:00','Agendada'],[5,5,5,1,'16:30','Cancelada'],
  [6,6,6,2,'08:30','Confirmada'],[7,7,7,3,'10:00','Agendada'],[8,8,8,4,'11:30','Confirmada'],[9,9,1,5,'13:00','Agendada'],[10,10,2,1,'15:00','Confirmada'],[11,11,3,2,'09:00','Agendada'],[12,12,4,3,'10:30','Confirmada']
 ];
 const extra=[[13,1,2,1,'09:00','Realizada',-7],[14,2,1,2,'10:00','Realizada',-5],[15,3,2,3,'14:00','Realizada',-3],[16,1,1,1,'15:00','Realizada',-10],[17,4,1,4,'08:00','Confirmada',0]];
 return [...seed.map((x,i)=>({id:x[0],patientId:x[1],doctorId:x[2],planId:x[3],date:addDays(todayIso(),1+(i%5)),time:x[4],status:x[5],notes:''})),...extra.map(x=>({id:x[0],patientId:x[1],doctorId:x[2],planId:x[3],date:addDays(todayIso(),x[6]),time:x[4],status:x[5],notes:''}))];
}
const STORAGE_KEY = 'medagenda_frontend_v2';
function loadState(){
 try { const saved = localStorage.getItem(STORAGE_KEY); if(saved){const parsed=JSON.parse(saved); if(parsed.doctors&&parsed.patients&&parsed.plans&&parsed.appointments) return migrate(parsed);} } catch(e) { console.warn('Não foi possível carregar os dados salvos.',e); }
 return {doctors:baseDoctors.map(d=>({...d,password:'123456'})),patients:seedPatients(),plans:structuredClone(basePlans),appointments:seedAppointments(),messages:[],documents:[],ratings:[],feedbacks:[],metrics:{doctors:8,patients:24,appointments:12,plans:5},nextId:{doctors:9,patients:25,plans:6,appointments:18}};
}
let state = loadState();
let currentPage = 'inicio';
let currentPages = {medicos:1,consultas:1,pacientes:1,planos:1};
let filters = {medicos:'',consultas:'',pacientes:'',planos:'',doctor:'',patient:'',status:'',date:''};
let appointmentDraft = null;
function persist(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) { console.warn('Armazenamento local indisponível.'); } }
function esc(value){return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function fmtDate(iso){ if(!iso) return '—'; const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }
function getDoctor(id){return state.doctors.find(x=>Number(x.id)===Number(id));}
function getPatient(id){return state.patients.find(x=>Number(x.id)===Number(id));}
function getPlan(id){return state.plans.find(x=>Number(x.id)===Number(id));}
function getDoctorName(id){return getDoctor(id)?.name || 'Médico removido';}
function getPatientName(id){return getPatient(id)?.name || 'Paciente removido';}
function getPlanName(id){return getPlan(id)?.name || 'Sem plano';}
function statusClass(status){ const s=(status||'').toLowerCase(); if(['ativo','confirmada'].includes(s)) return s==='ativo'?'active':'confirmed'; if(s==='agendada') return 'scheduled'; if(s==='realizada') return 'confirmed'; if(s==='cancelada'||s==='inativo') return s==='inativo'?'inactive':'cancelled'; return 'pending'; }
function badge(status){return `<span class="status ${statusClass(status)}">${esc(status)}</span>`;}
function fullDateAndTime(a){return `${fmtDate(a.date)} ${a.time}`;}
function injectIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{const name=el.dataset.icon.replace(/-(\w)/g,(m,c)=>c.toUpperCase()); el.innerHTML=icon(name);});}
function toast(message, type='success'){ const region=document.getElementById('toastRegion'); const el=document.createElement('div'); el.className=`toast ${type==='error'?'error':''}`; el.innerHTML=`${icon(type==='error'?'info':'check')}<span>${esc(message)}</span>`; region.appendChild(el); setTimeout(()=>el.remove(),3400); }
function navigate(page){currentPage=page; document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===page)); document.body.classList.remove('sidebar-open'); renderPage(); }
function heading(title,subtitle,buttonLabel='',buttonAction=''){return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${buttonLabel?`<button class="primary-button" data-action="${buttonAction}">${icon('plus')}${buttonLabel}</button>`:''}</div>`;}
function searchField(placeholder,value,key){return `<label class="search-field">${icon('search')}<input type="search" data-search="${key}" placeholder="${placeholder}" value="${esc(value)}" aria-label="${placeholder}"></label>`;}
function personCell(name,sub=''){const parts=(name||'').replace(/^(Dr\. |Dra\. )/,'').split(/\s+/);const initials=(parts[0]?.[0]||'M')+(parts[1]?.[0]||'');return `<div class="person-cell"><span class="person-avatar">${esc(initials.toUpperCase())}</span><span><span class="person-name">${esc(name)}</span>${sub?`<small style="display:block;color:#8aa0b6;font-size:12px;margin-top:2px">${esc(sub)}</small>`:''}</span></div>`;}
function actionButtons(type,id,withView=false){return `<div class="table-actions">${withView?`<button class="action-button" data-action="view-${type}" data-id="${id}" title="Ver detalhes" aria-label="Ver detalhes">${icon('eye')}</button>`:''}<button class="action-button" data-action="edit-${type}" data-id="${id}" title="Editar" aria-label="Editar">${icon('edit')}</button><button class="action-button danger" data-action="delete-${type}" data-id="${id}" title="Excluir" aria-label="Excluir">${icon('trash')}</button></div>`;}
function pagination(total,pageKey){const size=5;const page=currentPages[pageKey]||1;const pages=Math.max(1,Math.ceil(total/size));const start=total?((page-1)*size+1):0;const end=Math.min(page*size,total);let nums='';for(let i=1;i<=pages;i++){if(pages<=5||i===1||i===pages||Math.abs(i-page)<=1) nums+=`<button class="page-button ${i===page?'active':''}" data-page-for="${pageKey}" data-page="${i}">${i}</button>`;}
 return `<div class="table-footer"><span>Mostrando ${start} a ${end} de ${total} registros</span><div class="pagination"><button class="page-button" data-page-for="${pageKey}" data-page="${Math.max(1,page-1)}" aria-label="Página anterior" ${page===1?'disabled':''}>${icon('chevronLeft')}</button>${nums}<button class="page-button" data-page-for="${pageKey}" data-page="${Math.min(pages,page+1)}" aria-label="Próxima página" ${page===pages?'disabled':''}>${icon('chevronRight')}</button></div></div>`;}
function rowsPage(items,key){const size=5;const page=currentPages[key]||1;return items.slice((page-1)*size,page*size);}
function noResults(colspan){return `<tr><td colspan="${colspan}"><div class="empty-state"><strong>Nenhum registro encontrado</strong>Tente mudar os filtros ou a busca.</div></td></tr>`;}
function renderDashboard(){
 const upcomingAll=state.appointments.filter(a=>a.status!=='Cancelada'&&!isPast(a.date,a.time)).sort(cmpApp); const upcoming=upcomingAll.slice(0,5);
 const quick = [
  ['stethoscope','Médicos','Cadastrar e consultar profissionais.','medicos'],
  ['calendar','Consultas','Agendar e acompanhar horários.','consultas'],
  ['people','Pacientes','Gerenciar os cadastros.','pacientes'],
  ['shield','Planos de Saúde','Visualizar operadoras e planos.','planos']
 ];
 return `${heading('Bem-vindo, Administrador!','Gerencie seus médicos, pacientes e consultas em um só lugar.')}
 <section class="stat-grid">
  <article class="stat-card"><div class="stat-icon blue">${icon('user')}</div><div class="stat-text"><span>Médicos Cadastrados</span><strong>${state.doctors.length}</strong></div></article>
  <article class="stat-card"><div class="stat-icon green">${icon('people')}</div><div class="stat-text"><span>Pacientes Cadastrados</span><strong>${state.patients.length}</strong></div></article>
  <article class="stat-card"><div class="stat-icon purple">${icon('calendar')}</div><div class="stat-text"><span>Consultas Agendadas</span><strong>${upcomingAll.length}</strong></div></article>
  <article class="stat-card"><div class="stat-icon orange">${icon('shield')}</div><div class="stat-text"><span>Planos de Saúde</span><strong>${state.plans.length}</strong></div></article>
 </section>
 <section class="dashboard-grid">
  <div class="panel"><div class="panel-header"><h2>Acesso Rápido</h2></div><div class="quick-grid">${quick.map(q=>`<button class="quick-card" data-go="${q[3]}"><span class="quick-icon">${icon(q[0])}</span><strong>${q[1]}</strong><p>${q[2]}</p><span class="quick-action">Acessar ${icon('arrowRight')}</span></button>`).join('')}</div></div>
  <div class="panel"><div class="panel-header"><h2>Próximas Consultas</h2></div><div class="upcoming-list">${upcoming.map(a=>`<div class="upcoming-item"><span class="upcoming-time">${esc(a.time)}</span><div class="upcoming-details"><strong>${esc(getPatientName(a.patientId))}</strong><span>${fmtDate(a.date)} • ${esc(getDoctor(a.doctorId)?.specialty||'Consulta')}</span></div></div>`).join('')}</div><button class="text-link" data-go="consultas">Ver todas as consultas ${icon('arrowRight')}</button></div>
 </section>`;
}
function renderDoctors(){
 let list=state.doctors.filter(d=>[d.name,d.specialty,d.crm,d.phone,d.email].join(' ').toLowerCase().includes(filters.medicos.toLowerCase()));
 const view=rowsPage(list,'medicos');
 return `${heading('Médicos','Cadastre e gerencie os profissionais da sua clínica.','Cadastrar Médico','new-doctor')}
 <div class="toolbar">${searchField('Buscar por nome, CRM ou especialidade...',filters.medicos,'medicos')}</div>
 <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Especialidade</th><th>CRM</th><th>Telefone</th><th>E-mail</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(d=>`<tr><td>${personCell(d.name)}</td><td>${esc(d.specialty)}</td><td>${esc(d.crm)}</td><td>${esc(d.phone)}</td><td>${esc(d.email)}</td><td>${badge(d.status)}</td><td>${actionButtons('doctor',d.id)}</td></tr>`).join(''):noResults(7)}</tbody></table></div>${pagination(list.length,'medicos')}</section>`;
}
function renderAppointments(){
 const doctorOptions=[...new Set(state.doctors.map(d=>d.name))];
 let list=state.appointments.filter(a=>{
  const hay=[getPatientName(a.patientId),getDoctorName(a.doctorId),getDoctor(a.doctorId)?.specialty,getPlanName(a.planId),a.status,a.date,a.time].join(' ').toLowerCase();
  return hay.includes(filters.consultas.toLowerCase()) && (!filters.doctor||String(a.doctorId)===filters.doctor) && (!filters.patient||String(a.patientId)===filters.patient) && (!filters.status||a.status===filters.status) && (!filters.date||a.date===filters.date);
 });
 list.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
 const view=rowsPage(list,'consultas');
 return `${heading('Consultas','Agende, visualize e gerencie as consultas.','Nova Consulta','new-appointment')}
 <div class="toolbar">${searchField('Buscar por paciente, médico ou especialidade...',filters.consultas,'consultas')}
 <select class="filter-select" data-filter="doctor" aria-label="Filtrar médico"><option value="">Todos os Médicos</option>${state.doctors.map(d=>`<option value="${d.id}" ${filters.doctor===String(d.id)?'selected':''}>${esc(d.name)}</option>`).join('')}</select>
 <select class="filter-select" data-filter="patient" aria-label="Filtrar paciente"><option value="">Todos os Pacientes</option>${state.patients.map(p=>`<option value="${p.id}" ${filters.patient===String(p.id)?'selected':''}>${esc(p.name)}</option>`).join('')}</select>
 <select class="filter-select" data-filter="status" aria-label="Filtrar status"><option value="">Todos os Status</option>${['Confirmada','Agendada','Cancelada'].map(s=>`<option ${filters.status===s?'selected':''}>${s}</option>`).join('')}</select>
 <input class="date-filter" type="date" data-filter="date" value="${esc(filters.date)}" aria-label="Filtrar por data"></div>
 <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Paciente</th><th>Médico</th><th>Especialidade</th><th>Plano de Saúde</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(a=>`<tr><td><strong>${fmtDate(a.date)}</strong><div style="color:#829ab3;margin-top:3px;font-size:12px">${esc(a.time)}</div></td><td>${personCell(getPatientName(a.patientId))}</td><td>${esc(getDoctorName(a.doctorId))}</td><td>${esc(getDoctor(a.doctorId)?.specialty||'—')}</td><td>${esc(getPlanName(a.planId))}</td><td>${badge(a.status)}</td><td>${actionButtons('appointment',a.id,true)}</td></tr>`).join(''):noResults(7)}</tbody></table></div>${pagination(list.length,'consultas')}</section>`;
}
function renderPatients(){
 let list=state.patients.filter(p=>[p.name,p.cpf,p.email,p.phone,p.plan].join(' ').toLowerCase().includes(filters.pacientes.toLowerCase()));
 const view=rowsPage(list,'pacientes');
 return `${heading('Pacientes','Cadastre e gerencie os pacientes da clínica.','Cadastrar Paciente','new-patient')}
 <div class="toolbar">${searchField('Buscar por nome, CPF ou e-mail...',filters.pacientes,'pacientes')}</div>
 <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>CPF</th><th>Data de Nascimento</th><th>Telefone</th><th>Plano de Saúde</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(p=>`<tr><td>${personCell(p.name)}</td><td>${esc(p.cpf)}</td><td>${fmtDate(p.birthdate)}</td><td>${esc(p.phone)}</td><td>${esc(p.plan||'—')}</td><td>${badge(p.status)}</td><td>${actionButtons('patient',p.id)}</td></tr>`).join(''):noResults(7)}</tbody></table></div>${pagination(list.length,'pacientes')}</section>`;
}
function renderPlans(){
 let list=state.plans.filter(p=>[p.operator,p.name,p.category,p.price,p.coverage].join(' ').toLowerCase().includes(filters.planos.toLowerCase()));
 const view=rowsPage(list,'planos');
 return `${heading('Planos de Saúde','Cadastre e visualize os planos disponíveis.','Cadastrar Plano','new-plan')}
 <div class="toolbar">${searchField('Buscar por operadora ou nome do plano...',filters.planos,'planos')}</div>
 <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Operadora</th><th>Nome do Plano</th><th>Categoria</th><th>Valor (R$)</th><th>Cobertura</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(p=>`<tr><td><strong>${esc(p.operator)}</strong></td><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${esc(p.price)}</td><td>${esc(p.coverage)}</td><td>${badge(p.status)}</td><td>${actionButtons('plan',p.id)}</td></tr>`).join(''):noResults(7)}</tbody></table></div>${pagination(list.length,'planos')}</section>`;
}
function renderPage(){
 const main=document.getElementById('mainContent');
 if(!session) return; const allowed=allowedPages(); if(!allowed.includes(currentPage)) currentPage='inicio'; const renderers={inicio:isPatient()?renderPatientHome:isDoctor()?renderDoctorHome:renderDashboard,minhas:renderMine,perfil:isDoctor()?renderDoctorProfile:renderProfile,agenda:renderAgenda,mensagens:renderMessages,documentos:renderDocs,avaliacoes:renderRatings,feedback:renderFeedback,feedbacks:renderFeedbacksAdmin,medicos:renderDoctors,consultas:renderAppointments,pacientes:renderPatients,planos:renderPlans};
 main.innerHTML=(renderers[currentPage]||renderDashboard)(); injectIcons(main);
}

const SPECIALTIES=['Cardiologia','Clínica Geral','Dermatologia','Endocrinologia','Gastroenterologia','Ginecologia','Neurologia','Oftalmologia','Ortopedia','Otorrinolaringologia','Pediatria','Psiquiatria','Urologia'];
const ENTITY_CONFIG = {
 doctor: {collection:'doctors',label:'Médico',metric:'doctors',fields:[
  {label:'Nome completo',name:'name',placeholder:'Ex.: Dr. Carlos Mendes',required:true,full:true},
  {label:'Especialidade',name:'specialty',type:'select',options:SPECIALTIES,required:true},
  {label:'CRM',name:'crm',placeholder:'Ex.: 12345-SP',required:true},
  {label:'Telefone',name:'phone',placeholder:'(00) 00000-0000',mask:'phone',required:true},
  {label:'E-mail',name:'email',type:'email',placeholder:'medico@clinica.com',required:true,full:true},{label:'Senha de acesso (obrigatória no cadastro)',name:'password',type:'password',placeholder:'Mínimo 6 caracteres',noOpt:true,full:true},
  {label:'Status',name:'status',type:'select',options:['Ativo','Inativo'],required:true}
 ]},
 patient: {collection:'patients',label:'Paciente',metric:'patients',fields:[
  {label:'Nome completo',name:'name',placeholder:'Nome do paciente',required:true,full:true},
  {label:'CPF',name:'cpf',placeholder:'000.000.000-00',mask:'cpf',required:true},
  {label:'Data de nascimento',name:'birthdate',type:'date',required:true},
  {label:'Telefone',name:'phone',placeholder:'(00) 00000-0000',mask:'phone',required:true},
  {label:'E-mail',name:'email',type:'email',placeholder:'paciente@email.com',required:true},{label:'Senha de acesso (obrigatória no cadastro)',name:'password',type:'password',placeholder:'Mínimo 6 caracteres',noOpt:true},
  {label:'Plano de Saúde',name:'plan',type:'select-dynamic',required:false},
  {label:'Status',name:'status',type:'select',options:['Ativo','Inativo'],required:true}
 ]},
 plan: {collection:'plans',label:'Plano de Saúde',metric:'plans',fields:[
  {label:'Operadora',name:'operator',placeholder:'Ex.: Unimed',required:true},
  {label:'Nome do plano',name:'name',placeholder:'Ex.: Unimed Básico',required:true},
  {label:'Categoria',name:'category',type:'select',options:['Ambulatorial','Hospitalar','Ambulatorial + Hospitalar','Odontológico'],required:true,full:true},
  {label:'Valor mensal (R$)',name:'price',placeholder:'R$ 380,00',required:true},
  {label:'Cobertura',name:'coverage',type:'select',options:['Nacional','Regional','Estadual','Municipal'],required:true},
  {label:'Status',name:'status',type:'select',options:['Ativo','Inativo'],required:true}
 ]}
};
function formField(field,value){
 const required=field.required?'required':'';
 let control='';
 if(field.type==='select') control=`<select name="${field.name}" ${required}>${field.options.map(o=>`<option value="${esc(o)}" ${value===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`;
 else if(field.type==='select-dynamic') {const plans=[...new Set(state.plans.map(p=>p.operator))]; const options=['Não possui plano',...plans]; control=`<select name="${field.name}">${options.map(o=>`<option value="${esc(o==='Não possui plano'?'':o)}" ${value===o || (!value&&o==='Não possui plano')?'selected':''}>${esc(o)}</option>`).join('')}</select>`;}
 else control=`<input name="${field.name}" type="${field.type||'text'}" value="${esc(value)}" placeholder="${esc(field.placeholder||'')}" ${required}${field.mask?` data-mask="${field.mask}" inputmode="numeric"`:''}>`;
 return `<div class="form-field ${field.full?'full':''}"><label for="field-${field.name}">${field.label}${field.required||field.noOpt?'':' <span class="optional">(opcional)</span>'}</label>${control}</div>`.replace(`name="${field.name}"`,`id="field-${field.name}" name="${field.name}"`);
}
function openEntityForm(type,id=null){
 const config=ENTITY_CONFIG[type]; if(!config) return; const fieldsCfg=session&&session.role!=='admin'?config.fields.filter(f=>f.name!=='status'):config.fields;
 const record=id?state[config.collection].find(x=>Number(x.id)===Number(id)):null;
 if(id&&!record){toast('Registro não encontrado.','error');return;}
 const title=`${record?'Editar':'Cadastrar'} ${config.label}`;
 const fields=fieldsCfg.map(f=>formField(f,f.name==='password'?'':record?.[f.name]??(f.name==='status'?'Ativo':''))).join('');
 openModal(title,record?'Atualize os dados do cadastro.':'Preencha os campos para adicionar um novo registro.',`<form id="entityForm" data-entity="${type}" data-id="${record?.id||''}"><div class="form-grid">${fields}</div></form>`,record?'Salvar alterações':'Cadastrar','submit',false);
 const form=document.getElementById('entityForm');
 form?.addEventListener('submit',e=>{
  e.preventDefault(); const data=Object.fromEntries(new FormData(form).entries());
  for(const f of fieldsCfg){ if(f.required&&!String(data[f.name]||'').trim()){toast(`Preencha o campo ${f.label}.`,'error');return;} }
  const verr=prepEntity(type,data,record);if(verr){toast(verr,'error');return;}
  if(type==='doctor'&&state.doctors.some(d=>d.crm.toLowerCase()===String(data.crm).toLowerCase()&&Number(d.id)!==Number(record?.id))){toast('Já existe um médico cadastrado com esse CRM.','error');return;}
  if(type==='patient'&&state.patients.some(p=>p.cpf===data.cpf&&Number(p.id)!==Number(record?.id))){toast('Já existe um paciente cadastrado com esse CPF.','error');return;}
  if(record){const oldOp=record.operator;Object.assign(record,data);if(type==='plan'&&oldOp!==record.operator&&!state.plans.some(x=>x!==record&&x.operator===oldOp))state.patients.forEach(p=>{if(p.plan===oldOp)p.plan=record.operator;});} else {const newId=state.nextId[config.collection]||Math.max(0,...state[config.collection].map(x=>x.id))+1;state.nextId[config.collection]=newId+1;state[config.collection].push({id:newId,...data});state.metrics[config.metric]=(state.metrics[config.metric]||0)+1;}
  persist();closeModal();renderPage();toast(record?'Cadastro atualizado com sucesso.':`${config.label} cadastrado com sucesso.`);
 });
}
function openModal(title,subtitle,body,primaryLabel='Salvar',primaryAction='submit',wide=false){
 const root=document.getElementById('modalRoot');
 root.innerHTML=`<div class="modal-backdrop" data-backdrop><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header class="modal-header"><div><h2>${esc(title)}</h2><p>${esc(subtitle||'')}</p></div><button class="close-button" type="button" data-close-modal aria-label="Fechar">${icon('close')}</button></header><div class="modal-body">${body}</div><footer class="modal-footer"><button class="secondary-button" type="button" data-close-modal>Cancelar</button>${primaryAction==='none'?'':`<button class="primary-button" type="${primaryAction==='submit'?'submit':'button'}" ${primaryAction==='click'?`data-modal-primary="${primaryAction}"`:''}>${esc(primaryLabel)}</button>`}</footer></section></div>`;
 const form=root.querySelector('form'); const primary=root.querySelector('.modal-footer .primary-button');
 if(primary&&primaryAction==='submit'&&form) primary.addEventListener('click',()=>form.requestSubmit());
 if(primary&&primaryAction==='click') primary.addEventListener('click',()=>{if(typeof window.modalPrimaryAction==='function')window.modalPrimaryAction();});
 injectIcons(root);
 root.querySelector('[data-close-modal]')?.focus();
}
function closeModal(){document.getElementById('modalRoot').innerHTML='';appointmentDraft=null;window.modalPrimaryAction=null;}
const TIMES=['08:00','09:00','09:30','10:00','11:00','11:30','13:00','14:00','15:00','16:30'];
const WEEKDAYS=['D','S','T','Q','Q','S','S'];
function localDateParts(iso){const [y,m,d]=iso.split('-').map(Number);return {year:y,month:m-1,day:d};}
function dateIso(year,monthIndex,day){return `${year}-${String(monthIndex+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;}
function monthName(year,month){return new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric'}).format(new Date(year,month,1));}
function getBookedTime(date,doctorId,currentId){return state.appointments.some(a=>a.date===date&&Number(a.doctorId)===Number(doctorId)&&a.status!=='Cancelada'&&Number(a.id)!==Number(currentId));}
function calendarMarkup(){
 const parts=localDateParts(appointmentDraft.date);const monthDate=new Date(appointmentDraft.monthYear,appointmentDraft.monthIndex,1);const y=monthDate.getFullYear(),m=monthDate.getMonth();
 const firstDay=new Date(y,m,1).getDay();const days=new Date(y,m+1,0).getDate();let cells='';
 for(let i=0;i<firstDay;i++)cells+='<span></span>';
 const today=todayIso();
 for(let d=1;d<=days;d++){const value=dateIso(y,m,d);const past=value<today;const cls=['calendar-day',value===appointmentDraft.date?'selected':'',value===today?'today':''].filter(Boolean).join(' ');cells+=`<button type="button" class="${cls}" data-calendar-date="${value}" ${past?'disabled':''} aria-label="${d} de ${m+1} de ${y}">${d}</button>`;}
 return `<div class="calendar-box"><div class="calendar-heading"><strong>${esc(monthName(y,m))}</strong><div class="calendar-nav"><button type="button" data-month-delta="-1" aria-label="Mês anterior">${icon('chevronLeft')}</button><button type="button" data-month-delta="1" aria-label="Próximo mês">${icon('chevronRight')}</button></div></div><div class="calendar-grid">${WEEKDAYS.map(w=>`<span class="calendar-day-label">${w}</span>`).join('')}${cells}</div></div>`;
}
function appointmentFormMarkup(){
 const patient=state.patients.find(p=>Number(p.id)===Number(appointmentDraft.patientId));
 const doctors=isDoctor()?state.doctors.filter(d=>Number(d.id)===Number(session.doctorId)):state.doctors.filter(d=>d.status==='Ativo'||Number(d.id)===Number(appointmentDraft.doctorId));
 const plans=state.plans.filter(p=>p.status==='Ativo'||Number(p.id)===Number(appointmentDraft.planId));
 const selectedDoctor=doctors.find(d=>Number(d.id)===Number(appointmentDraft.doctorId));
 const slots=TIMES.map(t=>{const booked=getBookedTime(appointmentDraft.date,appointmentDraft.doctorId,appointmentDraft.id);const disabled=!slotFree(appointmentDraft.date,appointmentDraft.doctorId,t,appointmentDraft.id);return `<button type="button" class="slot-button ${appointmentDraft.time===t?'selected':''}" data-slot="${t}" ${disabled?'disabled':''}>${t}</button>`;}).join('');
 return `<div class="appointment-layout"><div class="appointment-fields">
  <div class="form-field"><label for="appointmentPatient">Paciente</label><select id="appointmentPatient" ${state.patients.length?'':'disabled'}>${scopedPatients().map(p=>`<option value="${p.id}" ${Number(p.id)===Number(appointmentDraft.patientId)?'selected':''}>${esc(p.name)} (${esc(p.cpf)})</option>`).join('')}</select></div>
  <div class="form-field"><label for="appointmentDoctor">Médico</label><select id="appointmentDoctor" ${doctors.length?'':'disabled'}>${doctors.map(d=>`<option value="${d.id}" ${Number(d.id)===Number(appointmentDraft.doctorId)?'selected':''}>${esc(d.name)} (${esc(d.specialty)})</option>`).join('')}</select></div>
  <div class="form-field"><label for="appointmentPlan">Plano de Saúde</label><select id="appointmentPlan"><option value="">Particular / sem plano</option>${plans.map(p=>`<option value="${p.id}" ${Number(p.id)===Number(appointmentDraft.planId)?'selected':''}>${esc(p.operator)} — ${esc(p.name)}</option>`).join('')}</select></div>
  <div class="form-field"><label for="appointmentNotes">Observações <span class="optional">(opcional)</span></label><textarea id="appointmentNotes" placeholder="Descreva alguma observação, se necessário...">${esc(appointmentDraft.notes||'')}</textarea></div>
  ${appointmentDraft.id?`<div class="form-field"><label for="appointmentStatus">Status</label><select id="appointmentStatus">${['Agendada','Confirmada','Realizada','Cancelada'].map(s=>`<option ${appointmentDraft.status===s?'selected':''}>${s}</option>`).join('')}</select></div>`:''}
 </div><div><div class="form-field" style="margin-bottom:8px"><label>Selecionar Data</label></div>${calendarMarkup()}</div><div class="slot-column"><div class="slot-list"><p class="slot-title">Horários Disponíveis</p>${slots}</div><p style="font-size:12px;line-height:1.5;color:#8aa0b6;margin-top:11px">${selectedDoctor?`Horários de ${esc(selectedDoctor.name)}.`:'Selecione um médico.'}</p></div></div>`;
}
function openAppointmentModal(id=null){
 const existing=id?state.appointments.find(a=>Number(a.id)===Number(id)):null;
 if(id&&!existing){toast('Consulta não encontrada.','error');return;}
 if(!state.patients.length||!state.doctors.some(d=>d.status==='Ativo')){toast('Cadastre pelo menos um paciente e um médico ativo antes de agendar.','error');return;}
 const today=todayIso();let date=existing?.date||(TIMES.some(t=>!isPast(today,t))?today:addDays(today,1));const parts=localDateParts(date);let time=existing?.time||TIMES.find(t=>slotFree(date,state.doctors.find(d=>d.status==='Ativo').id,t,null))||TIMES[0];
 appointmentDraft={id:existing?.id||null,patientId:existing?.patientId||(isPatient()?session.patientId:state.patients[0].id),doctorId:existing?.doctorId||state.doctors.find(d=>d.status==='Ativo').id,planId:existing?existing.planId:planFromPatient(isPatient()?session.patientId:state.patients[0].id),date,time,notes:existing?.notes||'',status:existing?.status||'Agendada',monthYear:parts.year,monthIndex:parts.month};
 renderAppointmentModal();
}
function renderAppointmentModal(){
 openModal(appointmentDraft.id?'Editar Consulta':'Agendar Consulta',appointmentDraft.id?'Altere os dados e salve a consulta.':'Escolha o paciente, médico, data e horário.',appointmentFormMarkup(),appointmentDraft.id?'Salvar alterações':'Agendar','submit',true);
 const form=document.getElementById('appointmentProxyForm');
 const root=document.getElementById('modalRoot');
 const sync=()=>{
  appointmentDraft.patientId=Number(root.querySelector('#appointmentPatient')?.value||appointmentDraft.patientId);
  appointmentDraft.doctorId=Number(root.querySelector('#appointmentDoctor')?.value||appointmentDraft.doctorId);
  appointmentDraft.planId=root.querySelector('#appointmentPlan')?.value||'';
  appointmentDraft.notes=root.querySelector('#appointmentNotes')?.value||'';
  appointmentDraft.status=root.querySelector('#appointmentStatus')?.value||appointmentDraft.status;
 };
 root.querySelector('#appointmentPatient')?.addEventListener('change',()=>{sync();if(!appointmentDraft.id)appointmentDraft.planId=planFromPatient(appointmentDraft.patientId);renderAppointmentModal();});
 root.querySelector('#appointmentPlan')?.addEventListener('change',sync);
 root.querySelector('#appointmentNotes')?.addEventListener('input',()=>{appointmentDraft.notes=root.querySelector('#appointmentNotes').value;});
 root.querySelector('#appointmentStatus')?.addEventListener('change',sync);
 root.querySelector('#appointmentDoctor')?.addEventListener('change',()=>{sync();const occupied=state.appointments.some(a=>a.date===appointmentDraft.date&&Number(a.doctorId)===Number(appointmentDraft.doctorId)&&a.time===appointmentDraft.time&&a.status!=='Cancelada'&&Number(a.id)!==Number(appointmentDraft.id));if(occupied){appointmentDraft.time=TIMES.find(t=>slotFree(appointmentDraft.date,appointmentDraft.doctorId,t,appointmentDraft.id))||'';}renderAppointmentModal();});
 root.querySelectorAll('[data-calendar-date]').forEach(btn=>btn.addEventListener('click',()=>{sync();appointmentDraft.date=btn.dataset.calendarDate;const p=localDateParts(appointmentDraft.date);appointmentDraft.monthYear=p.year;appointmentDraft.monthIndex=p.month;const timeStillFree=!state.appointments.some(a=>a.date===appointmentDraft.date&&Number(a.doctorId)===Number(appointmentDraft.doctorId)&&a.time===appointmentDraft.time&&a.status!=='Cancelada'&&Number(a.id)!==Number(appointmentDraft.id));if(!timeStillFree){const available=TIMES.find(t=>slotFree(appointmentDraft.date,appointmentDraft.doctorId,t,appointmentDraft.id));if(available)appointmentDraft.time=available;}renderAppointmentModal();}));
 root.querySelectorAll('[data-month-delta]').forEach(btn=>btn.addEventListener('click',()=>{sync();const d=new Date(appointmentDraft.monthYear,appointmentDraft.monthIndex+Number(btn.dataset.monthDelta),1);appointmentDraft.monthYear=d.getFullYear();appointmentDraft.monthIndex=d.getMonth();renderAppointmentModal();}));
 root.querySelectorAll('[data-slot]').forEach(btn=>btn.addEventListener('click',()=>{sync();appointmentDraft.time=btn.dataset.slot;renderAppointmentModal();}));
 const primary=root.querySelector('.modal-footer .primary-button');primary?.addEventListener('click',saveAppointment);
 root.querySelector('#appointmentPatient')?.focus({preventScroll:true});
}
function saveAppointment(){
 const isEditing=Boolean(appointmentDraft?.id);
 const root=document.getElementById('modalRoot');
 appointmentDraft.patientId=Number(root.querySelector('#appointmentPatient')?.value||appointmentDraft.patientId);
 appointmentDraft.doctorId=Number(root.querySelector('#appointmentDoctor')?.value||appointmentDraft.doctorId);
 appointmentDraft.planId=root.querySelector('#appointmentPlan')?.value||'';
 appointmentDraft.notes=root.querySelector('#appointmentNotes')?.value||'';
 appointmentDraft.status=root.querySelector('#appointmentStatus')?.value||appointmentDraft.status;
 if(!appointmentDraft.date||!appointmentDraft.time||!appointmentDraft.patientId||!appointmentDraft.doctorId){toast('Preencha todos os campos obrigatórios.','error');return;}
 if(getBookedTime(appointmentDraft.date,appointmentDraft.doctorId,appointmentDraft.id)&&state.appointments.some(a=>a.date===appointmentDraft.date&&Number(a.doctorId)===Number(appointmentDraft.doctorId)&&a.time===appointmentDraft.time&&a.status!=='Cancelada'&&Number(a.id)!==Number(appointmentDraft.id))){toast('Esse médico já possui uma consulta nesse horário. Escolha outro horário.','error');return;}
 const orig=appointmentDraft.id?state.appointments.find(a=>Number(a.id)===Number(appointmentDraft.id)):null;
 if((!orig||orig.date!==appointmentDraft.date||orig.time!==appointmentDraft.time)&&appointmentDraft.status!=='Cancelada'&&isPast(appointmentDraft.date,appointmentDraft.time)){toast('Escolha uma data e um horário futuros.','error');return;}
 const data={patientId:appointmentDraft.patientId,doctorId:appointmentDraft.doctorId,planId:appointmentDraft.planId?Number(appointmentDraft.planId):'',date:appointmentDraft.date,time:appointmentDraft.time,notes:appointmentDraft.notes,status:appointmentDraft.status||'Agendada'};
 if(appointmentDraft.id){Object.assign(state.appointments.find(a=>Number(a.id)===Number(appointmentDraft.id)),data);}
 else {const newId=state.nextId.appointments||Math.max(0,...state.appointments.map(a=>a.id))+1;state.nextId.appointments=newId+1;state.appointments.push({id:newId,...data});state.metrics.appointments=(state.metrics.appointments||0)+1;}
 persist();closeModal();renderPage();toast(isEditing?'Consulta atualizada.':'Consulta agendada com sucesso.');
}
function openDetails(id){
 const a=state.appointments.find(x=>Number(x.id)===Number(id));if(!a)return;
 openModal('Detalhes da Consulta','Resumo do agendamento.',`<div class="form-grid"><div class="form-field"><label>Paciente</label><div class="form-note">${esc(getPatientName(a.patientId))}</div></div><div class="form-field"><label>Médico</label><div class="form-note">${esc(getDoctorName(a.doctorId))}</div></div><div class="form-field"><label>Especialidade</label><div class="form-note">${esc(getDoctor(a.doctorId)?.specialty||'—')}</div></div><div class="form-field"><label>Plano de Saúde</label><div class="form-note">${esc(getPlanName(a.planId))}</div></div><div class="form-field"><label>Data</label><div class="form-note">${fmtDate(a.date)}</div></div><div class="form-field"><label>Horário</label><div class="form-note">${esc(a.time)}</div></div><div class="form-field"><label>Status</label><div>${badge(a.status)}</div></div><div class="form-field full"><label>Observações</label><div class="form-note">${esc(a.notes||'Nenhuma observação informada.')}</div></div></div>`,'','none',false);
}
function deleteRecord(type,id){
 const config=ENTITY_CONFIG[type]; if(!config)return;
 const record=state[config.collection].find(x=>Number(x.id)===Number(id));if(!record)return;
 const linked=type==='doctor'?state.appointments.some(a=>Number(a.doctorId)===Number(id)):type==='patient'?state.appointments.some(a=>Number(a.patientId)===Number(id)):type==='plan'?(state.appointments.some(a=>Number(a.planId)===Number(id))||(state.patients.some(p=>p.plan===record.operator)&&!state.plans.some(x=>x.id!==record.id&&x.operator===record.operator))):false;
 if(linked){toast(`Não é possível excluir: há consultas ou pacientes vinculados a este ${config.label.toLowerCase()}.`,'error');return;}
 openModal(`Excluir ${config.label}`,`Tem certeza de que deseja excluir este cadastro?`,`<p class="confirm-copy">O registro <strong>${esc(record.name||record.operator||record.title||config.label)}</strong> será removido da lista. Essa ação não pode ser desfeita.</p>`,'Excluir','click',false);
 window.modalPrimaryAction=()=>{state[config.collection]=state[config.collection].filter(x=>Number(x.id)!==Number(id));state.metrics[config.metric]=Math.max(0,(state.metrics[config.metric]||0)-1);persist();closeModal();renderPage();toast(`${config.label} excluído.`);};
 const p=document.querySelector('[data-modal-primary]');if(p){p.classList.add('danger');p.style.background='#e85d68';}
}
function deleteAppointment(id){
 const a=state.appointments.find(x=>Number(x.id)===Number(id));if(!a)return;
 openModal('Excluir Consulta','Confirme a exclusão deste agendamento.',`<p class="confirm-copy">Deseja excluir a consulta de <strong>${esc(getPatientName(a.patientId))}</strong>, em <strong>${fmtDate(a.date)} às ${esc(a.time)}</strong>?</p>`,'Excluir','click',false);
 window.modalPrimaryAction=()=>{state.appointments=state.appointments.filter(x=>Number(x.id)!==Number(id));state.metrics.appointments=Math.max(0,(state.metrics.appointments||0)-1);persist();closeModal();renderPage();toast('Consulta excluída.');};
 const p=document.querySelector('[data-modal-primary]');if(p){p.style.background='#e85d68';}
}
function openLogoutDialog(){
 openModal('Sair do sistema','Você precisará entrar novamente.','<p class="confirm-copy">Deseja realmente sair?</p>','Sair','click',false);
 window.modalPrimaryAction=()=>{closeModal();logout();};
}
function handleAction(action,id){
 if(handleExtra(action,id))return;
 if(!roleAllows(action,id))return;
 if(action==='new-doctor') return openEntityForm('doctor');
 if(action==='new-patient') return openEntityForm('patient');
 if(action==='new-plan') return openEntityForm('plan');
 if(action==='new-appointment') return openAppointmentModal();
 const [verb,rawType]=action.split('-');const typeMap={doctor:'doctor',patient:'patient',plan:'plan',appointment:'appointment'};const type=typeMap[rawType];
 if(verb==='edit'&&type==='appointment')return openAppointmentModal(id);
 if(verb==='edit'&&type)return openEntityForm(type,id);
 if(verb==='delete'&&type==='appointment')return deleteAppointment(id);
 if(verb==='delete'&&type)return deleteRecord(type,id);
 if(verb==='view'&&type==='appointment')return openDetails(id);
 if(verb==='cancel'&&type==='appointment')return cancelAppointment(id);
}
function bindEvents(){
 document.querySelectorAll('.nav-link').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
 document.getElementById('mobileMenu').addEventListener('click',()=>document.body.classList.add('sidebar-open'));
 document.getElementById('sidebarBackdrop').addEventListener('click',()=>document.body.classList.remove('sidebar-open'));
 document.getElementById('logoutButton').addEventListener('click',openLogoutDialog);
 document.getElementById('profileLogout').addEventListener('click',()=>{document.getElementById('profileMenu').classList.add('hidden');openLogoutDialog();});
 document.getElementById('profileButton').addEventListener('click',()=>{const menu=document.getElementById('profileMenu');menu.classList.toggle('hidden');document.getElementById('profileButton').setAttribute('aria-expanded',String(!menu.classList.contains('hidden')));});
 document.addEventListener('click',e=>{
  const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go);return;}
  const action=e.target.closest('[data-action]');if(action){handleAction(action.dataset.action,action.dataset.id);return;}
  const pageBtn=e.target.closest('[data-page-for]');if(pageBtn&&!pageBtn.disabled){currentPages[pageBtn.dataset.pageFor]=Number(pageBtn.dataset.page);renderPage();return;}
  if(e.target.closest('[data-close-modal]')){closeModal();return;}
  if(e.target.matches('[data-backdrop]')){closeModal();return;}
  if(!e.target.closest('.profile-wrap')){document.getElementById('profileMenu').classList.add('hidden');document.getElementById('profileButton').setAttribute('aria-expanded','false');}
 });
 document.getElementById('mainContent').addEventListener('input',e=>{
  const key=e.target.dataset.search;if(key){filters[key]=e.target.value;currentPages[key]=1;const caret=e.target.selectionStart;renderPage();const replacement=document.querySelector(`[data-search="${key}"]`);if(replacement){replacement.focus();try{replacement.setSelectionRange(caret,caret);}catch(_){}}}
  const filter=e.target.dataset.filter;if(filter==='date'){filters[filter]=e.target.value;currentPages.consultas=1;renderPage();}
 });
 document.getElementById('mainContent').addEventListener('change',e=>{
  const filter=e.target.dataset.filter;if(filter&&filter!=='date'){filters[filter]=e.target.value;currentPages.consultas=1;renderPage();}
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.getElementById('modalRoot').innerHTML)closeModal();else document.body.classList.remove('sidebar-open');}});
}


/* ===== Sessão, login e área do paciente ===== */
const SESSION_KEY='medagenda_session_v2';
const ADMIN={name:'Administrador',email:'admin@medagenda.com',password:'admin123'};
let session=null;
function isPatient(){return session?.role==='patient';}
function scopedPatients(){return state.patients.filter(p=>isPatient()?Number(p.id)===Number(session.patientId):isDoctor()?Number(p.id)===Number(appointmentDraft?.patientId):true);}
function addDays(iso,n){const p=localDateParts(iso);const d=new Date(p.year,p.month,p.day+n);return dateIso(d.getFullYear(),d.getMonth(),d.getDate());}
function isPast(date,time='23:59'){return new Date(`${date}T${time}:00`)<new Date();}
function cmpApp(a,b){return a.date.localeCompare(b.date)||a.time.localeCompare(b.time);}
function slotFree(date,doctorId,t,currentId){return !isPast(date,t)&&!state.appointments.some(a=>a.date===date&&Number(a.doctorId)===Number(doctorId)&&a.time===t&&a.status!=='Cancelada'&&Number(a.id)!==Number(currentId));}
function planFromPatient(pid){const p=getPatient(pid);const pl=state.plans.find(x=>x.status==='Ativo'&&x.operator===p?.plan);return pl?pl.id:'';}
function cpfValid(c){const n=c.replace(/\D/g,'');if(n.length!==11||/^(\d)\1+$/.test(n))return false;const dv=l=>{let s=0;for(let i=0;i<l;i++)s+=n[i]*(l+1-i);const r=s*10%11;return r===10?0:r;};return dv(9)===+n[9]&&dv(10)===+n[10];}
function fakeCpf(i){const b=String(112233440+i*7919).split('').map(Number);const dv=a=>{let s=0;a.forEach((x,j)=>s+=x*(a.length+1-j));const r=s*10%11;return r===10?0:r;};const d1=dv(b),d2=dv([...b,d1]);return maskValue('cpf',[...b,d1,d2].join(''));}
function maskValue(kind,v){const n=String(v).replace(/\D/g,'');
 if(kind==='cpf')return n.slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
 if(kind==='phone'){const s=n.slice(0,11);return s.length>10?s.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3'):s.length>6?s.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3'):s.length>2?s.replace(/(\d{2})(\d+)/,'($1) $2'):s;}
 return v;}
/* valida e normaliza cadastros; devolve texto de erro ou '' */
function prepEntity(type,d,rec){
 for(const k in d) if(typeof d[k]==='string') d[k]=d[k].trim();
 const others=list=>list.filter(x=>!rec||Number(x.id)!==Number(rec.id));
 if(type!=='plan'&&d.name&&d.name.split(/\s+/).length<2) return 'Informe nome e sobrenome.';
 if('phone' in d&&!/^\(\d{2}\) (9\d{4}|\d{4})-\d{4}$/.test(d.phone)) return 'Telefone inválido. Use o formato (44) 99999-9999.';
 if(type==='doctor'){d.crm=d.crm.toUpperCase();if(!/^\d{4,6}-[A-Z]{2}$/.test(d.crm))return 'CRM inválido. Use o formato 12345-PR.';
  if(others(state.doctors).some(x=>x.crm.toUpperCase()===d.crm))return 'Já existe um médico com este CRM.';
  if(emailTaken(d.email,type,rec))return 'Este e-mail já está em uso.';
  if(!d.password){if(!rec)return 'Defina uma senha de acesso.';delete d.password;}else if(d.password.length<6)return 'A senha precisa ter pelo menos 6 caracteres.';}
 if(type==='patient'){
  if(!cpfValid(d.cpf)) return 'CPF inválido. Confira os números digitados.';
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d.birthdate||'')||d.birthdate>todayIso()||d.birthdate<'1900-01-01') return 'Data de nascimento inválida.';
  if(others(state.patients).some(p=>p.cpf===d.cpf)) return 'Já existe um paciente com este CPF.';
  if(emailTaken(d.email,type,rec)) return 'Este e-mail já está em uso.';
  if(!d.password){ if(!rec) return 'Defina uma senha de acesso.'; delete d.password; }
  else if(d.password.length<6) return 'A senha precisa ter pelo menos 6 caracteres.';
 }
 if(type==='plan'){
  const n=Number(String(d.price).replace(/[R$\s.]/g,'').replace(',','.'));
  if(!(n>0)) return 'Informe um valor mensal válido, como 380,00.';
  d.price=n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/\u00a0/g,' ');
  if(others(state.plans).some(p=>p.operator.toLowerCase()===d.operator.toLowerCase()&&p.name.toLowerCase()===d.name.toLowerCase())) return 'Este plano já está cadastrado.';
 }
 return '';
}
function applySession(){
 const admin=session.role==='admin',doc=session.role==='doctor',me=admin?null:doc?getDoctor(session.doctorId):getPatient(session.patientId);
 document.body.classList.remove('logged-out','role-admin','role-patient','role-doctor');document.body.classList.add('role-'+session.role);
 document.getElementById('authRoot').innerHTML='';
 const nm=admin?ADMIN.name:doc?me.name.split(' ').slice(0,2).join(' '):me.name.split(' ')[0];
 document.getElementById('profileName').textContent=nm;document.getElementById('profileMenuName').textContent=admin?ADMIN.name:me.name;
 document.getElementById('profileMenuEmail').textContent=admin?ADMIN.email:me.email;
 injectIcons();navigate('inicio');
}
function start(s){session=s;try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(s));}catch(_){}applySession();}
function logout(){session=null;try{sessionStorage.removeItem(SESSION_KEY);}catch(_){}document.getElementById('mainContent').innerHTML='';showAuth();}
function doLogin(email,pw){email=email.trim().toLowerCase();
 if(email===ADMIN.email&&pw===ADMIN.password)return start({role:'admin'});
 const dr=state.doctors.find(x=>x.email.toLowerCase()===email&&x.password&&x.password===pw);
 if(dr){if(dr.status!=='Ativo')return toast('Cadastro inativo. Procure a administração.','error');return start({role:'doctor',doctorId:dr.id});}
 const p=state.patients.find(x=>x.email.toLowerCase()===email&&x.password&&x.password===pw);
 if(!p)return toast('E-mail ou senha incorretos.','error');
 if(p.status!=='Ativo')return toast('Cadastro inativo. Procure a clínica.','error');
 start({role:'patient',patientId:p.id});}
function doRegister(d){
 if(d.password!==d.password2)return toast('As senhas não conferem.','error');
 delete d.password2;const err=prepEntity('patient',d,null);if(err)return toast(err,'error');
 const id=state.nextId.patients;state.nextId.patients=id+1;
 state.patients.push({id,name:d.name,cpf:d.cpf,birthdate:d.birthdate,phone:d.phone,email:d.email,password:d.password,plan:'',status:'Ativo'});
 persist();toast('Conta criada! Você já pode agendar consultas.');start({role:'patient',patientId:id});}
function showAuth(mode='login'){
 document.body.classList.remove('role-admin','role-patient','role-doctor');document.body.classList.add('logged-out');
 const reg=mode==='register',doc=mode==='doctor';
 const f=(label,name,type='text',extra='')=>`<div class="form-field"><label for="a-${name}">${label}</label><input id="a-${name}" name="${name}" type="${type}" required ${extra}></div>`;
 const docFields=f('Nome completo','name')+f('CRM','crm','text','placeholder="12345-PR" maxlength="9"')+`<div class="form-field"><label for="a-specialty">Especialidade</label><select id="a-specialty" name="specialty" required>${SPECIALTIES.map(s=>`<option>${s}</option>`).join('')}</select></div>`+f('Telefone','phone','tel','data-mask="phone" inputmode="numeric" placeholder="(44) 99999-9999"')+f('E-mail','email','email')+f('Senha (mín. 6 caracteres)','password','password','minlength="6"')+f('Confirmar senha','password2','password');
 document.getElementById('authRoot').innerHTML=`<div class="auth-screen"><div class="auth-card"><h1>MedAgenda</h1><p>${doc?'Cadastre-se como médico para atender seus pacientes online.':reg?'Crie sua conta de paciente para marcar consultas online.':'Entre para ver e gerenciar suas consultas.'}</p>
 <div class="auth-tabs"><button type="button" class="${reg||doc?'':'active'}" data-auth="login">Entrar</button><button type="button" class="${reg?'active':''}" data-auth="register">Sou paciente</button><button type="button" class="${doc?'active':''}" data-auth="doctor">Sou médico</button></div>
 <form id="authForm" class="auth-form">${doc?docFields:reg?f('Nome completo','name','text','autocomplete="name"')+f('CPF','cpf','text','data-mask="cpf" inputmode="numeric" placeholder="000.000.000-00"')+f('Data de nascimento','birthdate','date')+f('Telefone','phone','tel','data-mask="phone" inputmode="numeric" placeholder="(44) 99999-9999"')+f('E-mail','email','email')+f('Senha (mín. 6 caracteres)','password','password','minlength="6"')+f('Confirmar senha','password2','password'):f('E-mail','email','email','autocomplete="username"')+f('Senha','password','password','autocomplete="current-password"')}
 <button class="primary-button" type="submit">${reg||doc?'Criar conta':'Entrar'}</button></form>
 ${reg||doc?'':`<p class="auth-hint"><strong>Teste:</strong> administrador admin@medagenda.com / admin123 • médico ${baseDoctors[0].email} / 123456 • paciente maria.silva@email.com / 123456</p>`}</div></div>`;
 document.querySelectorAll('[data-auth]').forEach(b=>b.onclick=()=>showAuth(b.dataset.auth));
 document.getElementById('authForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));doc?doRegisterDoctor(d):reg?doRegister(d):doLogin(d.email,d.password);};
}
function cancelAppointment(id){const a=state.appointments.find(x=>Number(x.id)===Number(id));
 if(!a||!ownsAppointment(a))return;
 openModal('Cancelar consulta','Confirme o cancelamento.',`<p class="confirm-copy">Cancelar a consulta com <strong>${esc(getDoctorName(a.doctorId))}</strong> em <strong>${fmtDate(a.date)} às ${esc(a.time)}</strong>?</p>`,'Confirmar cancelamento','click',false);
 window.modalPrimaryAction=()=>{a.status='Cancelada';persist();closeModal();renderPage();toast('Consulta cancelada.');};}
function myAppointments(){return state.appointments.filter(a=>Number(a.patientId)===Number(session.patientId));}
function renderPatientHome(){
 const me=getPatient(session.patientId);const up=myAppointments().filter(a=>a.status!=='Cancelada'&&!isPast(a.date,a.time)).sort(cmpApp);
 return `${heading(`Olá, ${esc(me.name.split(' ')[0])}!`,'Acompanhe e marque suas consultas com facilidade.','Agendar Consulta','new-appointment')}
 <section class="stat-grid"><article class="stat-card"><div class="stat-icon blue">${icon('calendar')}</div><div class="stat-text"><span>Próximas consultas</span><strong>${up.length}</strong></div></article><article class="stat-card"><div class="stat-icon orange">${icon('shield')}</div><div class="stat-text"><span>Meu plano</span><strong class="stat-small">${esc(me.plan||'Particular')}</strong></div></article></section>
 <section class="panel"><div class="panel-header"><h2>Próximas Consultas</h2></div><div class="upcoming-list">${up.slice(0,5).map(a=>`<div class="upcoming-item"><strong class="upcoming-time">${esc(a.time)}</strong><div><strong>${esc(getDoctorName(a.doctorId))}</strong><span>${fmtDate(a.date)} • ${esc(getDoctor(a.doctorId)?.specialty||'Consulta')}</span></div></div>`).join('')||'<div class="empty-state"><strong>Você não tem consultas marcadas</strong>Use o botão Agendar Consulta para escolher médico, dia e horário.</div>'}</div></section>`;}
function renderMine(){const list=myAppointments().sort(cmpApp);const view=rowsPage(list,'consultas');
 return `${heading('Minhas Consultas','Veja, agende e cancele suas consultas.','Agendar Consulta','new-appointment')}<section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Médico</th><th>Especialidade</th><th>Plano</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(a=>`<tr><td><strong>${fmtDate(a.date)}</strong><br>${esc(a.time)}</td><td>${esc(getDoctorName(a.doctorId))}</td><td>${esc(getDoctor(a.doctorId)?.specialty||'—')}</td><td>${esc(a.planId?getPlanName(a.planId):'Particular')}</td><td>${badge(a.status)}</td><td><div class="table-actions"><button class="action-button" data-action="view-appointment" data-id="${a.id}" title="Ver detalhes" aria-label="Ver detalhes">${icon('eye')}</button>${a.status!=='Cancelada'&&!isPast(a.date,a.time)?`<button class="action-button danger" data-action="cancel-appointment" data-id="${a.id}" title="Cancelar consulta" aria-label="Cancelar consulta">${icon('close')}</button>`:''}</div></td></tr>`).join(''):noResults(6)}</tbody></table></div>${pagination(list.length,'consultas')}</section>`;}
function renderProfile(){const p=getPatient(session.patientId);const row=(l,v)=>`<div class="profile-row"><span>${l}</span><strong>${esc(v||'—')}</strong></div>`;
 return `<div class="page-heading"><div><h1>Meus Dados</h1><p>Mantenha seu cadastro atualizado.</p></div><button class="primary-button" data-action="edit-patient" data-id="${p.id}">Editar meus dados</button></div><section class="panel profile-card">${row('Nome',p.name)}${row('CPF',p.cpf)}${row('Nascimento',fmtDate(p.birthdate))}${row('Telefone',p.phone)}${row('E-mail',p.email)}${row('Plano de saúde',p.plan||'Particular')}</section>`;}

/* ===== Médicos, conversas, documentos, avaliações e feedback ===== */
Object.assign(ICONS,{chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'});
const STAR_LABEL=['','Muito ruim','Ruim','Regular','Bom','Excelente'];
let chatWith=null,ratingDraft=null;
function isDoctor(){return session?.role==='doctor';}
function migrate(s){s.messages||=[];s.documents||=[];s.ratings||=[];s.feedbacks||=[];s.nextId||={};s.doctors.forEach(d=>{d.password||='123456';});return s;}
function allowedPages(){return isPatient()?['inicio','minhas','mensagens','documentos','avaliacoes','feedback','perfil']:isDoctor()?['inicio','agenda','mensagens','documentos','perfil']:['inicio','medicos','consultas','pacientes','planos','feedbacks'];}
function ownsAppointment(a){return isPatient()?Number(a.patientId)===Number(session.patientId):isDoctor()?Number(a.doctorId)===Number(session.doctorId):true;}
function roleAllows(action,id){if(!session||session.role==='admin')return true;
 if(action==='new-appointment')return isPatient();
 if(['view-appointment','cancel-appointment'].includes(action)||(action==='edit-appointment'&&isDoctor())){const a=state.appointments.find(x=>Number(x.id)===Number(id));return !!a&&ownsAppointment(a);}
 if(action==='edit-patient')return isPatient()&&Number(id)===Number(session.patientId);
 if(action==='edit-doctor')return isDoctor()&&Number(id)===Number(session.doctorId);
 return false;}
function emailTaken(email,type,rec){const e=String(email).toLowerCase();if(e===ADMIN.email)return true;
 return state.doctors.some(x=>!(type==='doctor'&&rec&&Number(x.id)===Number(rec.id))&&x.email.toLowerCase()===e)||state.patients.some(x=>!(type==='patient'&&rec&&Number(x.id)===Number(rec.id))&&x.email.toLowerCase()===e);}
function doRegisterDoctor(d){
 if(d.password!==d.password2)return toast('As senhas não conferem.','error');
 delete d.password2;const err=prepEntity('doctor',d,null);if(err)return toast(err,'error');
 const id=state.nextId.doctors;state.nextId.doctors=id+1;
 state.doctors.push({id,name:d.name,specialty:d.specialty,crm:d.crm,phone:d.phone,email:d.email,password:d.password,status:'Ativo'});
 persist();toast('Cadastro de médico criado!');start({role:'doctor',doctorId:id});}
function stars(n){n=Math.round(n);return '★'.repeat(n)+'☆'.repeat(5-n);}
function docRating(did){const r=state.ratings.filter(x=>Number(x.doctorId)===Number(did));return {n:r.length,avg:r.length?r.reduce((s,x)=>s+x.stars,0)/r.length:0};}
const fmtTime=iso=>new Date(iso).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
const emptyBox=(t,s='')=>`<div class="empty-state"><strong>${t}</strong>${s}</div>`;

/* ações extras (retorna true quando tratou) */
function handleExtra(action,id){
 const ap=state.appointments.find(a=>Number(a.id)===Number(id));
 if(action==='go-agenda'){navigate('agenda');return true;}
 if(action==='confirm-appointment'||action==='done-appointment'){
  if(!isDoctor()||!ap||!ownsAppointment(ap))return true;
  if(action==='done-appointment'&&ap.date>todayIso()){toast('Só é possível concluir consultas de hoje ou de dias anteriores.','error');return true;}
  ap.status=action==='confirm-appointment'?'Confirmada':'Realizada';persist();renderPage();toast(action==='confirm-appointment'?'Consulta confirmada.':'Consulta marcada como realizada.');return true;}
 if(action==='rate-appointment'){if(isPatient())openRating(id);return true;}
 if(action==='new-doc'){if(isDoctor())openDocForm();return true;}
 if(action==='view-doc'){openDocView(id);return true;}
 return false;}

/* ----- Médico: início, agenda e perfil ----- */
function myDocApps(){return state.appointments.filter(a=>Number(a.doctorId)===Number(session.doctorId));}
function renderDoctorHome(){
 const d=getDoctor(session.doctorId),mine=myDocApps().filter(a=>a.status!=='Cancelada'),up=mine.filter(a=>!isPast(a.date,a.time)).sort(cmpApp),rt=docRating(d.id);
 const card=(c,ic,l,v)=>`<article class="stat-card"><div class="stat-icon ${c}">${icon(ic)}</div><div class="stat-text"><span>${l}</span><strong class="${String(v).length>6?'stat-small':''}">${v}</strong></div></article>`;
 return `${heading(`Olá, ${esc(d.name)}!`,'Veja sua agenda, converse com pacientes e emita documentos.','Ver minha agenda','go-agenda')}
 <section class="stat-grid">${card('blue','calendar','Consultas hoje',mine.filter(a=>a.date===todayIso()).length)}${card('green','clock','Próximas consultas',up.length)}${card('orange','star','Nota média',rt.n?rt.avg.toFixed(1).replace('.',',')+' ★':'Sem notas')}</section>
 <section class="panel"><div class="panel-header"><h2>Próximas Consultas</h2></div><div class="upcoming-list">${up.slice(0,5).map(a=>`<div class="upcoming-item"><strong class="upcoming-time">${esc(a.time)}</strong><div><strong>${esc(getPatientName(a.patientId))}</strong><span>${fmtDate(a.date)} • ${esc(a.status)}</span></div></div>`).join('')||emptyBox('Nenhuma consulta marcada')}</div></section>`;}
function renderAgenda(){const list=myDocApps().sort(cmpApp);const view=rowsPage(list,'consultas');const btn=(act,id,ic,t,cls='')=>`<button class="action-button ${cls}" data-action="${act}" data-id="${id}" title="${t}" aria-label="${t}">${icon(ic)}</button>`;
 return `${heading('Minha Agenda','Confirme, conclua, remarque ou cancele seus atendimentos.')}<section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Paciente</th><th>Plano</th><th>Status</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(a=>{const open=a.status==='Agendada'||a.status==='Confirmada';return `<tr><td><strong>${fmtDate(a.date)}</strong><br>${esc(a.time)}</td><td>${personCell(getPatientName(a.patientId),getPatient(a.patientId)?.phone||'')}</td><td>${esc(a.planId?getPlanName(a.planId):'Particular')}</td><td>${badge(a.status)}</td><td><div class="table-actions">${btn('view-appointment',a.id,'eye','Ver detalhes')}${a.status==='Agendada'?btn('confirm-appointment',a.id,'check','Confirmar consulta'):''}${open&&a.date<=todayIso()?btn('done-appointment',a.id,'calendarCheck','Marcar como realizada'):''}${open?btn('edit-appointment',a.id,'edit','Remarcar'):''}${open?btn('cancel-appointment',a.id,'close','Cancelar consulta','danger'):''}</div></td></tr>`;}).join(''):noResults(5)}</tbody></table></div>${pagination(list.length,'consultas')}</section>`;}
function renderDoctorProfile(){const d=getDoctor(session.doctorId),rt=docRating(d.id),row=(l,v)=>`<div class="profile-row"><span>${l}</span><strong>${esc(v||'—')}</strong></div>`;
 const rs=state.ratings.filter(r=>Number(r.doctorId)===Number(d.id)).sort((a,b)=>b.id-a.id);
 return `<div class="page-heading"><div><h1>Meus Dados</h1><p>Informações do seu cadastro profissional.</p></div><button class="primary-button" data-action="edit-doctor" data-id="${d.id}">Editar meus dados</button></div>
 <section class="panel profile-card">${row('Nome',d.name)}${row('Especialidade',d.specialty)}${row('CRM',d.crm)}${row('Telefone',d.phone)}${row('E-mail',d.email)}${row('Avaliação média',rt.n?`${rt.avg.toFixed(1).replace('.',',')} de 5 (${rt.n} ${rt.n>1?'avaliações':'avaliação'})`:'Ainda sem avaliações')}</section>
 <section class="panel"><div class="panel-header"><h2>O que os pacientes dizem</h2></div>${rs.map(r=>`<div class="rating-item"><div><span class="stars" aria-label="${r.stars} de 5">${stars(r.stars)}</span> <em>${STAR_LABEL[r.stars]}</em><p>${esc(r.comment||'Sem comentário.')}</p></div><small>${esc((getPatientName(r.patientId)).split(' ')[0])} • ${fmtDate(r.date)}</small></div>`).join('')||emptyBox('Sem avaliações ainda')}</section>`;}

/* ----- Conversas ----- */
function contactsFor(){
 if(isDoctor()){const ids=new Set([...myDocApps().map(a=>a.patientId),...state.messages.filter(m=>Number(m.doctorId)===Number(session.doctorId)).map(m=>m.patientId)]);return [...ids].map(getPatient).filter(Boolean).map(p=>({id:p.id,name:p.name,sub:'Paciente'}));}
 const ids=new Set([...myAppointments().map(a=>a.doctorId),...state.messages.filter(m=>Number(m.patientId)===Number(session.patientId)).map(m=>m.doctorId)]);return [...ids].map(getDoctor).filter(Boolean).map(d=>({id:d.id,name:d.name,sub:d.specialty}));}
function renderMessages(){
 const list=contactsFor();if(!list.some(c=>Number(c.id)===Number(chatWith)))chatWith=list[0]?.id??null;
 const me=isDoctor()?'doctor':'patient',pid=isDoctor()?chatWith:session.patientId,did=isDoctor()?session.doctorId:chatWith;
 const msgs=state.messages.filter(m=>Number(m.patientId)===Number(pid)&&Number(m.doctorId)===Number(did)).sort((a,b)=>a.at.localeCompare(b.at));
 queueMicrotask(()=>{const t=document.getElementById('chatThread');if(t)t.scrollTop=t.scrollHeight;});
 return `${heading('Mensagens',isDoctor()?'Converse com seus pacientes.':'Converse com os médicos que já atenderam você.')}<section class="panel chat-layout"><aside class="chat-list" aria-label="Contatos">${list.map(c=>`<button type="button" class="chat-contact ${Number(c.id)===Number(chatWith)?'active':''}" data-chat="${c.id}">${personCell(c.name,c.sub)}</button>`).join('')||emptyBox('Sem contatos','Você poderá conversar após ter uma consulta marcada.')}</aside>
 <div class="chat-panel">${chatWith!==null?`<div class="chat-thread" id="chatThread">${msgs.map(m=>`<div class="chat-msg ${m.from===me?'mine':''}"><p>${esc(m.text)}</p><small>${fmtTime(m.at)}</small></div>`).join('')||emptyBox('Nenhuma mensagem ainda','Escreva a primeira mensagem abaixo.')}</div><form id="chatForm" class="chat-form"><input name="text" placeholder="Escreva uma mensagem..." autocomplete="off" maxlength="500" required aria-label="Mensagem"><button class="primary-button" type="submit">Enviar</button></form>`:emptyBox('Selecione um contato')}</div></section>`;}
function sendMessage(text,pid,did,from){state.messages.push({id:(state.messages.at(-1)?.id||0)+1,patientId:Number(pid),doctorId:Number(did),from,text,at:new Date().toISOString()});persist();}

/* ----- Receitas e atestados ----- */
function renderDocs(){
 const mine=state.documents.filter(d=>isDoctor()?Number(d.doctorId)===Number(session.doctorId):Number(d.patientId)===Number(session.patientId)).sort((a,b)=>b.id-a.id);const view=rowsPage(mine,'documentos');
 return `${heading(isDoctor()?'Receitas e Atestados':'Meus Documentos',isDoctor()?'Emita receitas e atestados para seus pacientes.':'Receitas e atestados enviados pelos seus médicos.',isDoctor()?'Emitir Documento':'','new-doc')}<section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Data</th><th>Tipo</th><th>${isDoctor()?'Paciente':'Médico'}</th><th>Ações</th></tr></thead><tbody>${view.length?view.map(d=>`<tr><td>${fmtDate(d.date)}</td><td><strong>${esc(d.type)}</strong></td><td>${esc(isDoctor()?getPatientName(d.patientId):getDoctorName(d.doctorId))}</td><td><div class="table-actions"><button class="action-button" data-action="view-doc" data-id="${d.id}" title="Ver e imprimir" aria-label="Ver e imprimir">${icon('eye')}</button></div></td></tr>`).join(''):noResults(4)}</tbody></table></div>${pagination(mine.length,'documentos')}</section>`;}
function openDocForm(){const pts=contactsFor();if(!pts.length)return toast('Você ainda não tem pacientes.','error');
 openModal('Emitir documento','Receita ou atestado para um paciente.',`<form id="docForm" class="form-stack"><div class="form-field"><label for="dType">Tipo</label><select id="dType" name="type"><option>Receita</option><option>Atestado</option></select></div><div class="form-field"><label for="dPatient">Paciente</label><select id="dPatient" name="patientId">${pts.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><div class="form-field hidden" id="daysField"><label for="dDays">Dias de afastamento</label><input id="dDays" name="days" type="number" min="1" max="30" value="1"></div><div class="form-field"><label for="dContent" id="dLabel">Medicamentos e orientações</label><textarea id="dContent" name="content" rows="5" maxlength="800" required></textarea></div></form>`,'Emitir documento','submit',false);
 const f=document.getElementById('docForm');
 f.elements.type.onchange=()=>{const at=f.elements.type.value==='Atestado';document.getElementById('daysField').classList.toggle('hidden',!at);document.getElementById('dLabel').textContent=at?'Observações (opcional)':'Medicamentos e orientações';f.elements.content.required=!at;};
 f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));const at=d.type==='Atestado';
  state.documents.push({id:(state.documents.at(-1)?.id||0)+1,type:d.type,patientId:Number(d.patientId),doctorId:session.doctorId,date:todayIso(),days:at?Number(d.days)||1:0,content:d.content.trim()});
  sendMessage(`Emiti ${at?'um atestado':'uma receita'} para você. Veja em Meus Documentos.`,d.patientId,session.doctorId,'doctor');
  closeModal();renderPage();toast(`${d.type} emitido(a) com sucesso.`);};}
function openDocView(id){const d=state.documents.find(x=>Number(x.id)===Number(id));if(!d)return;
 if(isPatient()?Number(d.patientId)!==Number(session.patientId):isDoctor()?Number(d.doctorId)!==Number(session.doctorId):false)return;
 const p=getPatient(d.patientId),dr=getDoctor(d.doctorId),at=d.type==='Atestado';
 openModal(at?'Atestado médico':'Receita médica',`Emitido em ${fmtDate(d.date)}`,`<article class="doc-sheet"><h3>${at?'Atestado Médico':'Receituário'}</h3><p class="doc-meta">MedAgenda • ${fmtDate(d.date)}</p><p><strong>Paciente:</strong> ${esc(p?.name||'—')} (CPF ${esc(p?.cpf||'—')})</p><div class="doc-body">${at?`Atesto, para os devidos fins, que o(a) paciente acima esteve sob meus cuidados e necessita de <strong>${d.days} dia(s)</strong> de afastamento de suas atividades, a contar de ${fmtDate(d.date)}.${d.content?`<br><br>Observações: ${esc(d.content)}`:''}`:esc(d.content).replace(/\n/g,'<br>')}</div><div class="doc-sign"><strong>${esc(dr?.name||'')}</strong><br>${esc(dr?.specialty||'')} • CRM ${esc(dr?.crm||'')}</div></article>`,'Imprimir','click',false);
 window.modalPrimaryAction=()=>window.print();}

/* ----- Avaliações ----- */
function eligibleToRate(){return myAppointments().filter(a=>a.status!=='Cancelada'&&(a.status==='Realizada'||isPast(a.date,a.time))&&!state.ratings.some(r=>Number(r.appointmentId)===Number(a.id)));}
function renderRatings(){const pend=eligibleToRate().sort(cmpApp).reverse(),mine=state.ratings.filter(r=>Number(r.patientId)===Number(session.patientId)).sort((a,b)=>b.id-a.id);
 return `${heading('Avaliações','Conte como foi sua consulta: 1 estrela é ruim e 5 estrelas é excelente.')}<section class="panel"><div class="panel-header"><h2>Consultas para avaliar</h2></div>${pend.map(a=>`<div class="rating-item"><div><strong>${esc(getDoctorName(a.doctorId))}</strong><p>${fmtDate(a.date)} • ${esc(getDoctor(a.doctorId)?.specialty||'')}</p></div><button class="primary-button" data-action="rate-appointment" data-id="${a.id}">Avaliar</button></div>`).join('')||emptyBox('Nada para avaliar agora','Depois que uma consulta for realizada, ela aparece aqui.')}</section>
 <section class="panel"><div class="panel-header"><h2>Minhas avaliações</h2></div>${mine.map(r=>`<div class="rating-item"><div><strong>${esc(getDoctorName(r.doctorId))}</strong> <span class="stars" aria-label="${r.stars} de 5">${stars(r.stars)}</span> <em>${STAR_LABEL[r.stars]}</em><p>${esc(r.comment||'Sem comentário.')}</p></div><small>${fmtDate(r.date)}</small></div>`).join('')||emptyBox('Você ainda não avaliou ninguém')}</section>`;}
function openRating(id){const a=state.appointments.find(x=>Number(x.id)===Number(id));if(!a||!ownsAppointment(a)||state.ratings.some(r=>Number(r.appointmentId)===Number(id)))return;
 const draft=ratingDraft={appointmentId:a.id,stars:0};
 openModal('Avaliar consulta',`${getDoctorName(a.doctorId)} • ${fmtDate(a.date)}`,`<div class="star-input" role="group" aria-label="Nota de 1 a 5">${[1,2,3,4,5].map(n=>`<button type="button" class="star" data-star="${n}" aria-label="${n} de 5 estrelas">★</button>`).join('')}</div><p class="star-label" id="starLabel">1 = muito ruim • 5 = excelente</p><div class="form-field"><label for="ratingComment">Comentário <span class="optional">(opcional)</span></label><textarea id="ratingComment" maxlength="300" rows="3"></textarea></div>`,'Enviar avaliação','click',false);
 window.modalPrimaryAction=()=>{if(!draft.stars)return toast('Escolha de 1 a 5 estrelas.','error');
  state.ratings.push({id:(state.ratings.at(-1)?.id||0)+1,appointmentId:a.id,patientId:a.patientId,doctorId:a.doctorId,stars:draft.stars,comment:document.getElementById('ratingComment').value.trim(),date:todayIso()});
  persist();closeModal();renderPage();toast('Obrigado pela sua avaliação!');};}

/* ----- Feedback ----- */
function renderFeedback(){const docs=[...new Set(myAppointments().map(a=>a.doctorId))].map(getDoctor).filter(Boolean),mine=state.feedbacks.filter(f=>Number(f.patientId)===Number(session.patientId)).sort((a,b)=>b.id-a.id);
 return `${heading('Feedback','Envie críticas, sugestões ou elogios sobre o site ou sobre um médico.')}<section class="panel panel-pad"><form id="feedbackForm" class="form-stack"><div class="form-field"><label for="fbTarget">Sobre</label><select id="fbTarget" name="target"><option value="site">O site MedAgenda</option>${docs.map(d=>`<option value="${d.id}">${esc(d.name)}</option>`).join('')}</select></div><div class="form-field"><label for="fbKind">Tipo</label><select id="fbKind" name="kind"><option>Crítica</option><option>Sugestão</option><option>Elogio</option></select></div><div class="form-field"><label for="fbText">Mensagem</label><textarea id="fbText" name="text" rows="4" minlength="10" maxlength="600" required placeholder="Explique o que aconteceu ou o que pode melhorar."></textarea></div><button class="primary-button" type="submit">Enviar feedback</button></form></section>
 <section class="panel"><div class="panel-header"><h2>Meus feedbacks</h2></div>${mine.map(f=>`<div class="rating-item"><div><strong>${esc(f.kind)} • ${f.target==='site'?'Site MedAgenda':esc(getDoctorName(f.target))}</strong><p>${esc(f.text)}</p></div><small>${fmtDate(f.date)}</small></div>`).join('')||emptyBox('Você ainda não enviou feedback')}</section>`;}
function renderFeedbacksAdmin(){const fb=[...state.feedbacks].sort((a,b)=>b.id-a.id);
 return `${heading('Feedbacks e Avaliações','O que os pacientes enviaram sobre o site e sobre os médicos.')}<section class="panel table-panel"><div class="panel-header"><h2>Feedbacks recebidos</h2></div><div class="table-wrap"><table><thead><tr><th>Data</th><th>Paciente</th><th>Sobre</th><th>Tipo</th><th>Mensagem</th></tr></thead><tbody>${fb.map(f=>`<tr><td>${fmtDate(f.date)}</td><td>${esc(getPatientName(f.patientId))}</td><td>${f.target==='site'?'Site MedAgenda':esc(getDoctorName(f.target))}</td><td>${esc(f.kind)}</td><td>${esc(f.text)}</td></tr>`).join('')||noResults(5)}</tbody></table></div></section>
 <section class="panel table-panel"><div class="panel-header"><h2>Nota média dos médicos</h2></div><div class="table-wrap"><table><thead><tr><th>Médico</th><th>Especialidade</th><th>Nota média</th><th>Avaliações</th></tr></thead><tbody>${state.doctors.map(d=>{const r=docRating(d.id);return `<tr><td>${esc(d.name)}</td><td>${esc(d.specialty)}</td><td>${r.n?`<span class="stars">${stars(r.avg)}</span> ${r.avg.toFixed(1).replace('.',',')}`:'—'}</td><td>${r.n}</td></tr>`;}).join('')}</tbody></table></div></section>`;}

document.addEventListener('click',e=>{
 const s=e.target.closest('[data-star]');
 if(s&&ratingDraft){ratingDraft.stars=+s.dataset.star;document.querySelectorAll('.star').forEach(b=>b.classList.toggle('on',+b.dataset.star<=ratingDraft.stars));document.getElementById('starLabel').textContent=`${ratingDraft.stars} de 5 — ${STAR_LABEL[ratingDraft.stars]}`;}
 const c=e.target.closest('[data-chat]');if(c){chatWith=Number(c.dataset.chat);renderPage();document.querySelector('#chatForm input')?.focus();}
});
document.addEventListener('submit',e=>{
 if(e.target.id==='chatForm'){e.preventDefault();const t=e.target.elements.text.value.trim();if(!t||chatWith===null)return;
  sendMessage(t,isDoctor()?chatWith:session.patientId,isDoctor()?session.doctorId:chatWith,isDoctor()?'doctor':'patient');renderPage();document.querySelector('#chatForm input')?.focus();}
 if(e.target.id==='feedbackForm'){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(d.text.trim().length<10)return toast('Escreva pelo menos 10 caracteres.','error');
  state.feedbacks.push({id:(state.feedbacks.at(-1)?.id||0)+1,patientId:session.patientId,target:d.target==='site'?'site':Number(d.target),kind:d.kind,text:d.text.trim(),date:todayIso()});persist();renderPage();toast('Feedback enviado. Obrigado!');}
});
window.addEventListener('storage',e=>{
 if(e.key!==STORAGE_KEY||!e.newValue||!session||document.getElementById('modalRoot').innerHTML)return;
 state=migrate(JSON.parse(e.newValue));
 const typing=[...document.querySelectorAll('#mainContent input,#mainContent textarea')].some(x=>x.value.trim());
 if(typing)return;
 const chatFocus=document.activeElement?.closest('#chatForm');renderPage();if(chatFocus)document.querySelector('#chatForm input')?.focus();
});

document.addEventListener('input',e=>{const k=e.target.dataset?.mask;if(k)e.target.value=maskValue(k,e.target.value);});
bindEvents();
try{session=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');}catch(_){session=null;}
if(session&&(session.role==='admin'||(session.role==='doctor'?getDoctor(session.doctorId):getPatient(session.patientId))))applySession();else{session=null;showAuth();}

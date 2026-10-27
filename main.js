/* Starter Vault — ReadyStack — MIT — source: https://github.com/jmshinhwa/readystack-starter-vault */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.js
var main_exports = {};
__export(main_exports, {
  default: () => StarterVault
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/i18n.js
var LANGS = ["en", "de", "es", "pt", "ja"];
var LANG_NAMES = { en: "English", de: "Deutsch", es: "Espa\xF1ol", pt: "Portugu\xEAs", ja: "\u65E5\u672C\u8A9E" };
var S = (h, ...lines) => [h, lines.length ? lines : [""]];
var TODO = "- [ ] ";
var L = {
  en: {
    folders: { inbox: "0 Inbox", projects: "1 Projects", areas: "2 Areas", resources: "3 Resources", archive: "4 Archive", journal: "5 Journal", daily: "5 Journal/Daily", reviews: "5 Journal/Reviews", templates: "6 Templates" },
    home: "Home",
    start: "Start here",
    names: { daily: "Daily note", project: "Project", weekly: "Weekly review", monthly: "Monthly review", quarterly: "Quarterly review", yearly: "Yearly review", meeting: "Meeting", person: "Person", book: "Book", area: "Area", decision: "Decision", goal: "Goal" },
    dailyTitle: "dddd, D MMMM YYYY",
    tpl: {
      daily: [S("Top 3 today", TODO, TODO, TODO), S("Tasks", TODO), S("Notes"), S("End of day", "- Done today:", "- Moves to tomorrow:", "- One thing I learned:")],
      project: [S("Outcome", 'What does "done" look like?', ""), S("Next actions", TODO), S("Notes"), S("Log", "- {{date:YYYY-MM-DD}} created")],
      weekly: [S("Wins", "- "), S("What didn't go to plan", "- "), S("Inbox to zero", "- [ ] Inbox emptied", "- [ ] Every active project has a next action"), S("Next week", TODO, TODO, TODO)],
      monthly: [S("Highlights of the month", "- "), S("What I learned", "- "), S("Areas check", "- Health:", "- Work:", "- Money:", "- People:"), S("Projects to start, pause or stop", "- "), S("Next month's 3 priorities", "1. ", "2. ", "3. ")],
      quarterly: [S("Goals: where do I stand?", "- "), S("Finished projects", "- "), S("What to stop doing", "- "), S("Next quarter's goals", "1. ", "2. ", "3. ")],
      yearly: [S("The year in one paragraph"), S("Best moments", "- "), S("What didn't work", "- "), S("Lessons", "- "), S("Next year's themes", "- ")],
      meeting: [S("Agenda", "- "), S("Notes"), S("Decisions", "- "), S("Action items", TODO)],
      person: [S("Context", "How we met, what they work on:", ""), S("Notes"), S("Follow-ups", TODO)],
      book: [S("Why I am reading it"), S("Key ideas", "- "), S("Quotes", "> "), S("What I will do differently", "- ")],
      area: [S("Standard to keep"), S("Active projects", "- "), S("Recurring", TODO), S("Notes")],
      decision: [S("Context"), S("Options", "1. ", "2. "), S("Decision"), S("Why"), S("Review on", "- [ ] Check this decision on: ")],
      goal: [S("Why it matters"), S("How I will measure it"), S("Projects that move it", "- "), S("Milestones", TODO)]
    },
    startOutcome: "This vault is set up and I use it every day.",
    startTasks: [`Open today's daily note (calendar icon on the left, or the command "Open today's daily note")`, 'Create your first real project with "New project"', "Put one loose note into {inbox}, then move it into a project, area or resource", 'On Friday, run "Preview this week"'],
    homeIntro: "Your vault, sorted the PARA way: **Projects** have an end date, **Areas** are ongoing, **Resources** are reference, **Archive** is done.",
    homeToday: "Today",
    homeFolders: "Folders",
    homeCommands: 'Commands (Ctrl/Cmd+P, type "Starter Vault")',
    review: { weekly: "Weekly review", monthly: "Monthly review", quarterly: "Quarterly review", numbers: "Numbers", created: "Notes created", changed: "Notes changed", done: "Tasks done", open: "Open tasks in projects", noNext: "Projects with no next action", stalled: "Stalled projects (14+ days untouched)", inbox: "Notes in the inbox", daily: "Daily notes written", overdue: "Overdue tasks", doneList: "Done", openList: "Open by project", noNextList: "Needs a next action", stalledList: "Stalled", createdList: "Created", overdueList: "Overdue", none: "\u2014 none", more: "\u2026 and {n} more", reflect: "Your review" },
    ui: {
      cmdSetup: "Set up my vault",
      cmdToday: "Open today's daily note",
      cmdProject: "New project",
      cmdPreview: "Preview this week",
      cmdWeekly: "Write this week's review",
      cmdMonthly: "Write this month's review",
      cmdQuarter: "Write this quarter's review",
      cmdArchive: "Move finished projects to the archive",
      cmdTemplates: "Add the 10 Pro templates",
      cmdPacks: "Template packs",
      cmdKey: "Enter licence key",
      setupTitle: "Set up your vault",
      setupIntro: "Nothing is overwritten: what already exists is skipped.",
      isNew: "new",
      isThere: "already there \u2014 skipped",
      btnCreate: "Create {n} items",
      created: "Created {n}, skipped {m}.",
      lang: "Language",
      projectName: "Project name",
      btnOk: "Create",
      proTitle: "Starter Vault Pro",
      proLine1: "Your weekly and monthly review written from your own vault: tasks done, open tasks per project, projects with no next action.",
      proLine2: "Folders, templates and prompts in 5 languages, added to the vault you already have \u2014 nothing is overwritten.",
      clubLine: "Packs club: one new template pack every month in 5 languages, installed from here. Your notes stay if you stop.",
      btnPro: "Get Pro \u2014 $39 once",
      btnClub: "Packs club \u2014 $6/month",
      btnYear: "or $59/year",
      haveKey: "I have a key",
      keyTitle: "Licence key",
      keyPh: "Paste the key from your Whop receipt",
      keyOk: "Key accepted: {tier}.",
      keyBad: "This key was not accepted.",
      keyOffline: "Could not reach getreadystack.com. Try again.",
      btnCheck: "Check key",
      btnRemove: "Remove key",
      packsTitle: "Template packs",
      packsIntro: "One new pack each month, in 5 languages.",
      btnInstall: "Install",
      packDone: "Installed {n} files, skipped {m}.",
      packsNeedClub: "Packs come with the Packs club.",
      packsFail: "Could not load the pack list.",
      previewTitle: "This week so far",
      reviewDone: "Review written: {path}",
      archiveNone: "No finished project (status: done) found.",
      archiveTitle: "Finished projects",
      btnMove: "Move {n} to {path}",
      archiveDone: "Moved {n} projects.",
      rolled: "Rolled over {n} open tasks from {date}.",
      templatesDone: "Added {n} templates, skipped {m}.",
      proOnly: "This is a Pro feature.",
      sLang: "Language for new notes",
      sLangDesc: "Folder names, headings and prompts.",
      sFolders: "Folders in use",
      sRerun: "Run setup again",
      sKey: "Licence",
      sStatus: "Status: {tier}",
      sNetwork: "Network: only the licence check and the pack list and download go to getreadystack.com. No telemetry.",
      tier: { free: "Free", pro: "Pro", club: "Packs club", year: "Packs club (yearly)" }
    },
    doneWords: ["done", "complete", "completed", "finished"]
  },
  de: {
    folders: { inbox: "0 Eingang", projects: "1 Projekte", areas: "2 Bereiche", resources: "3 Ressourcen", archive: "4 Archiv", journal: "5 Journal", daily: "5 Journal/T\xE4glich", reviews: "5 Journal/R\xFCckblicke", templates: "6 Vorlagen" },
    home: "Start",
    start: "Hier anfangen",
    names: { daily: "Tagesnotiz", project: "Projekt", weekly: "Wochenr\xFCckblick", monthly: "Monatsr\xFCckblick", quarterly: "Quartalsr\xFCckblick", yearly: "Jahresr\xFCckblick", meeting: "Besprechung", person: "Person", book: "Buch", area: "Bereich", decision: "Entscheidung", goal: "Ziel" },
    dailyTitle: "dddd, D. MMMM YYYY",
    tpl: {
      daily: [S("Die 3 wichtigsten heute", TODO, TODO, TODO), S("Aufgaben", TODO), S("Notizen"), S("Tagesabschluss", "- Heute erledigt:", "- Wandert auf morgen:", "- Das habe ich gelernt:")],
      project: [S("Ergebnis", "Woran erkenne ich, dass es fertig ist?", ""), S("N\xE4chste Schritte", TODO), S("Notizen"), S("Verlauf", "- {{date:YYYY-MM-DD}} angelegt")],
      weekly: [S("Erfolge", "- "), S("Was nicht nach Plan lief", "- "), S("Eingang leeren", "- [ ] Eingang ist leer", "- [ ] Jedes aktive Projekt hat einen n\xE4chsten Schritt"), S("N\xE4chste Woche", TODO, TODO, TODO)],
      monthly: [S("H\xF6hepunkte des Monats", "- "), S("Was ich gelernt habe", "- "), S("Bereiche pr\xFCfen", "- Gesundheit:", "- Arbeit:", "- Finanzen:", "- Menschen:"), S("Projekte starten, pausieren oder beenden", "- "), S("Die 3 Priorit\xE4ten f\xFCr n\xE4chsten Monat", "1. ", "2. ", "3. ")],
      quarterly: [S("Ziele: Wo stehe ich?", "- "), S("Abgeschlossene Projekte", "- "), S("Was ich nicht mehr tue", "- "), S("Ziele f\xFCr das n\xE4chste Quartal", "1. ", "2. ", "3. ")],
      yearly: [S("Das Jahr in einem Absatz"), S("Die besten Momente", "- "), S("Was nicht funktioniert hat", "- "), S("Lektionen", "- "), S("Themen f\xFCr das n\xE4chste Jahr", "- ")],
      meeting: [S("Tagesordnung", "- "), S("Notizen"), S("Entscheidungen", "- "), S("Aufgaben", TODO)],
      person: [S("Kontext", "Woher wir uns kennen, woran die Person arbeitet:", ""), S("Notizen"), S("Nachfassen", TODO)],
      book: [S("Warum ich es lese"), S("Kernideen", "- "), S("Zitate", "> "), S("Was ich anders machen werde", "- ")],
      area: [S("Standard, den ich halte"), S("Aktive Projekte", "- "), S("Wiederkehrend", TODO), S("Notizen")],
      decision: [S("Kontext"), S("Optionen", "1. ", "2. "), S("Entscheidung"), S("Begr\xFCndung"), S("\xDCberpr\xFCfen am", "- [ ] Entscheidung pr\xFCfen am: ")],
      goal: [S("Warum es wichtig ist"), S("Wie ich es messe"), S("Projekte, die es voranbringen", "- "), S("Meilensteine", TODO)]
    },
    startOutcome: "Dieser Tresor ist eingerichtet und ich nutze ihn t\xE4glich.",
    startTasks: ["Heutige Tagesnotiz \xF6ffnen (Kalendersymbol links oder Befehl \u201EHeutige Tagesnotiz \xF6ffnen\u201C)", "Das erste echte Projekt mit \u201ENeues Projekt\u201C anlegen", "Eine lose Notiz in {inbox} legen und dann einem Projekt, Bereich oder einer Ressource zuordnen", "Am Freitag \u201EDiese Woche ansehen\u201C ausf\xFChren"],
    homeIntro: "Dein Tresor nach PARA sortiert: **Projekte** haben ein Ende, **Bereiche** laufen dauerhaft, **Ressourcen** sind Nachschlagewissen, das **Archiv** ist erledigt.",
    homeToday: "Heute",
    homeFolders: "Ordner",
    homeCommands: "Befehle (Strg/Cmd+P, \u201EStarter Vault\u201C tippen)",
    review: { weekly: "Wochenr\xFCckblick", monthly: "Monatsr\xFCckblick", quarterly: "Quartalsr\xFCckblick", numbers: "Zahlen", created: "Neue Notizen", changed: "Ge\xE4nderte Notizen", done: "Erledigte Aufgaben", open: "Offene Aufgaben in Projekten", noNext: "Projekte ohne n\xE4chsten Schritt", stalled: "Stillstehende Projekte (14+ Tage unber\xFChrt)", inbox: "Notizen im Eingang", daily: "Geschriebene Tagesnotizen", overdue: "\xDCberf\xE4llige Aufgaben", doneList: "Erledigt", openList: "Offen nach Projekt", noNextList: "Braucht einen n\xE4chsten Schritt", stalledList: "Stillstand", createdList: "Neu angelegt", overdueList: "\xDCberf\xE4llig", none: "\u2014 keine", more: "\u2026 und {n} weitere", reflect: "Dein R\xFCckblick" },
    ui: {
      cmdSetup: "Meinen Tresor einrichten",
      cmdToday: "Heutige Tagesnotiz \xF6ffnen",
      cmdProject: "Neues Projekt",
      cmdPreview: "Diese Woche ansehen",
      cmdWeekly: "Wochenr\xFCckblick schreiben",
      cmdMonthly: "Monatsr\xFCckblick schreiben",
      cmdQuarter: "Quartalsr\xFCckblick schreiben",
      cmdArchive: "Abgeschlossene Projekte ins Archiv verschieben",
      cmdTemplates: "Die 10 Pro-Vorlagen hinzuf\xFCgen",
      cmdPacks: "Vorlagenpakete",
      cmdKey: "Lizenzschl\xFCssel eingeben",
      setupTitle: "Tresor einrichten",
      setupIntro: "Nichts wird \xFCberschrieben: Was schon da ist, wird \xFCbersprungen.",
      isNew: "neu",
      isThere: "schon da \u2014 \xFCbersprungen",
      btnCreate: "{n} Elemente anlegen",
      created: "{n} angelegt, {m} \xFCbersprungen.",
      lang: "Sprache",
      projectName: "Projektname",
      btnOk: "Anlegen",
      proTitle: "Starter Vault Pro",
      proLine1: "Dein Wochen- und Monatsr\xFCckblick aus deinem eigenen Tresor: erledigte Aufgaben, offene Aufgaben je Projekt, Projekte ohne n\xE4chsten Schritt.",
      proLine2: "Ordner, Vorlagen und Fragen in 5 Sprachen, in deinen bestehenden Tresor eingef\xFCgt \u2014 nichts wird \xFCberschrieben.",
      clubLine: "Paket-Club: jeden Monat ein neues Vorlagenpaket in 5 Sprachen, hier installiert. Deine Notizen bleiben, wenn du aufh\xF6rst.",
      btnPro: "Pro holen \u2014 39 $ einmalig",
      btnClub: "Paket-Club \u2014 6 $/Monat",
      btnYear: "oder 59 $/Jahr",
      haveKey: "Ich habe einen Schl\xFCssel",
      keyTitle: "Lizenzschl\xFCssel",
      keyPh: "Schl\xFCssel aus deinem Whop-Beleg einf\xFCgen",
      keyOk: "Schl\xFCssel angenommen: {tier}.",
      keyBad: "Dieser Schl\xFCssel wurde nicht angenommen.",
      keyOffline: "getreadystack.com nicht erreichbar. Bitte erneut versuchen.",
      btnCheck: "Schl\xFCssel pr\xFCfen",
      btnRemove: "Schl\xFCssel entfernen",
      packsTitle: "Vorlagenpakete",
      packsIntro: "Jeden Monat ein neues Paket, in 5 Sprachen.",
      btnInstall: "Installieren",
      packDone: "{n} Dateien installiert, {m} \xFCbersprungen.",
      packsNeedClub: "Pakete gibt es im Paket-Club.",
      packsFail: "Paketliste konnte nicht geladen werden.",
      previewTitle: "Diese Woche bisher",
      reviewDone: "R\xFCckblick geschrieben: {path}",
      archiveNone: "Kein abgeschlossenes Projekt (status: done) gefunden.",
      archiveTitle: "Abgeschlossene Projekte",
      btnMove: "{n} nach {path} verschieben",
      archiveDone: "{n} Projekte verschoben.",
      rolled: "{n} offene Aufgaben vom {date} \xFCbernommen.",
      templatesDone: "{n} Vorlagen hinzugef\xFCgt, {m} \xFCbersprungen.",
      proOnly: "Das ist eine Pro-Funktion.",
      sLang: "Sprache f\xFCr neue Notizen",
      sLangDesc: "Ordnernamen, \xDCberschriften und Fragen.",
      sFolders: "Verwendete Ordner",
      sRerun: "Einrichtung erneut ausf\xFChren",
      sKey: "Lizenz",
      sStatus: "Status: {tier}",
      sNetwork: "Netzwerk: Nur die Lizenzpr\xFCfung sowie Paketliste und -download gehen an getreadystack.com. Keine Telemetrie.",
      tier: { free: "Kostenlos", pro: "Pro", club: "Paket-Club", year: "Paket-Club (j\xE4hrlich)" }
    },
    doneWords: ["done", "complete", "completed", "finished", "erledigt", "abgeschlossen", "fertig"]
  },
  es: {
    folders: { inbox: "0 Bandeja de entrada", projects: "1 Proyectos", areas: "2 \xC1reas", resources: "3 Recursos", archive: "4 Archivo", journal: "5 Diario", daily: "5 Diario/D\xEDas", reviews: "5 Diario/Revisiones", templates: "6 Plantillas" },
    home: "Inicio",
    start: "Empieza aqu\xED",
    names: { daily: "Nota diaria", project: "Proyecto", weekly: "Revisi\xF3n semanal", monthly: "Revisi\xF3n mensual", quarterly: "Revisi\xF3n trimestral", yearly: "Revisi\xF3n anual", meeting: "Reuni\xF3n", person: "Persona", book: "Libro", area: "\xC1rea", decision: "Decisi\xF3n", goal: "Objetivo" },
    dailyTitle: "dddd, D [de] MMMM [de] YYYY",
    tpl: {
      daily: [S("Las 3 de hoy", TODO, TODO, TODO), S("Tareas", TODO), S("Notas"), S("Cierre del d\xEDa", "- Hecho hoy:", "- Pasa a ma\xF1ana:", "- Algo que aprend\xED:")],
      project: [S("Resultado", "\xBFC\xF3mo s\xE9 que est\xE1 terminado?", ""), S("Pr\xF3ximas acciones", TODO), S("Notas"), S("Registro", "- {{date:YYYY-MM-DD}} creado")],
      weekly: [S("Logros", "- "), S("Lo que no sali\xF3 seg\xFAn el plan", "- "), S("Bandeja a cero", "- [ ] Bandeja vac\xEDa", "- [ ] Cada proyecto activo tiene una pr\xF3xima acci\xF3n"), S("La pr\xF3xima semana", TODO, TODO, TODO)],
      monthly: [S("Lo mejor del mes", "- "), S("Lo que aprend\xED", "- "), S("Revisi\xF3n de \xE1reas", "- Salud:", "- Trabajo:", "- Dinero:", "- Personas:"), S("Proyectos que empezar, pausar o cerrar", "- "), S("Las 3 prioridades del pr\xF3ximo mes", "1. ", "2. ", "3. ")],
      quarterly: [S("Objetivos: \xBFd\xF3nde estoy?", "- "), S("Proyectos terminados", "- "), S("Qu\xE9 dejar de hacer", "- "), S("Objetivos del pr\xF3ximo trimestre", "1. ", "2. ", "3. ")],
      yearly: [S("El a\xF1o en un p\xE1rrafo"), S("Los mejores momentos", "- "), S("Lo que no funcion\xF3", "- "), S("Lecciones", "- "), S("Temas del pr\xF3ximo a\xF1o", "- ")],
      meeting: [S("Orden del d\xEDa", "- "), S("Notas"), S("Decisiones", "- "), S("Tareas", TODO)],
      person: [S("Contexto", "C\xF3mo nos conocimos y en qu\xE9 trabaja:", ""), S("Notas"), S("Seguimiento", TODO)],
      book: [S("Por qu\xE9 lo leo"), S("Ideas clave", "- "), S("Citas", "> "), S("Qu\xE9 har\xE9 distinto", "- ")],
      area: [S("Est\xE1ndar que mantengo"), S("Proyectos activos", "- "), S("Recurrente", TODO), S("Notas")],
      decision: [S("Contexto"), S("Opciones", "1. ", "2. "), S("Decisi\xF3n"), S("Por qu\xE9"), S("Revisar el", "- [ ] Revisar esta decisi\xF3n el: ")],
      goal: [S("Por qu\xE9 importa"), S("C\xF3mo lo mido"), S("Proyectos que lo impulsan", "- "), S("Hitos", TODO)]
    },
    startOutcome: "Esta b\xF3veda est\xE1 lista y la uso cada d\xEDa.",
    startTasks: ["Abrir la nota diaria de hoy (icono de calendario a la izquierda o comando \xABAbrir la nota diaria de hoy\xBB)", "Crear tu primer proyecto real con \xABNuevo proyecto\xBB", "Poner una nota suelta en {inbox} y luego moverla a un proyecto, \xE1rea o recurso", "El viernes, ejecutar \xABVer esta semana\xBB"],
    homeIntro: "Tu b\xF3veda ordenada con PARA: los **Proyectos** terminan, las **\xC1reas** son continuas, los **Recursos** son consulta y el **Archivo** es lo terminado.",
    homeToday: "Hoy",
    homeFolders: "Carpetas",
    homeCommands: "Comandos (Ctrl/Cmd+P, escribe \xABStarter Vault\xBB)",
    review: { weekly: "Revisi\xF3n semanal", monthly: "Revisi\xF3n mensual", quarterly: "Revisi\xF3n trimestral", numbers: "Cifras", created: "Notas creadas", changed: "Notas modificadas", done: "Tareas hechas", open: "Tareas abiertas en proyectos", noNext: "Proyectos sin pr\xF3xima acci\xF3n", stalled: "Proyectos parados (14+ d\xEDas sin tocar)", inbox: "Notas en la bandeja", daily: "Notas diarias escritas", overdue: "Tareas vencidas", doneList: "Hecho", openList: "Abiertas por proyecto", noNextList: "Necesita una pr\xF3xima acci\xF3n", stalledList: "Parados", createdList: "Creadas", overdueList: "Vencidas", none: "\u2014 ninguna", more: "\u2026 y {n} m\xE1s", reflect: "Tu revisi\xF3n" },
    ui: {
      cmdSetup: "Configurar mi b\xF3veda",
      cmdToday: "Abrir la nota diaria de hoy",
      cmdProject: "Nuevo proyecto",
      cmdPreview: "Ver esta semana",
      cmdWeekly: "Escribir la revisi\xF3n de esta semana",
      cmdMonthly: "Escribir la revisi\xF3n de este mes",
      cmdQuarter: "Escribir la revisi\xF3n del trimestre",
      cmdArchive: "Mover los proyectos terminados al archivo",
      cmdTemplates: "A\xF1adir las 10 plantillas Pro",
      cmdPacks: "Paquetes de plantillas",
      cmdKey: "Introducir la clave de licencia",
      setupTitle: "Configura tu b\xF3veda",
      setupIntro: "No se sobrescribe nada: lo que ya existe se omite.",
      isNew: "nuevo",
      isThere: "ya existe \u2014 se omite",
      btnCreate: "Crear {n} elementos",
      created: "{n} creados, {m} omitidos.",
      lang: "Idioma",
      projectName: "Nombre del proyecto",
      btnOk: "Crear",
      proTitle: "Starter Vault Pro",
      proLine1: "Tu revisi\xF3n semanal y mensual escrita a partir de tu propia b\xF3veda: tareas hechas, tareas abiertas por proyecto, proyectos sin pr\xF3xima acci\xF3n.",
      proLine2: "Carpetas, plantillas y preguntas en 5 idiomas, a\xF1adidas a la b\xF3veda que ya tienes \u2014 no se sobrescribe nada.",
      clubLine: "Club de paquetes: un paquete nuevo de plantillas cada mes en 5 idiomas, instalado desde aqu\xED. Tus notas se quedan si lo dejas.",
      btnPro: "Obtener Pro \u2014 39 $ una vez",
      btnClub: "Club de paquetes \u2014 6 $/mes",
      btnYear: "o 59 $/a\xF1o",
      haveKey: "Tengo una clave",
      keyTitle: "Clave de licencia",
      keyPh: "Pega la clave de tu recibo de Whop",
      keyOk: "Clave aceptada: {tier}.",
      keyBad: "Esta clave no se ha aceptado.",
      keyOffline: "No se pudo conectar con getreadystack.com. Int\xE9ntalo de nuevo.",
      btnCheck: "Comprobar clave",
      btnRemove: "Quitar clave",
      packsTitle: "Paquetes de plantillas",
      packsIntro: "Un paquete nuevo cada mes, en 5 idiomas.",
      btnInstall: "Instalar",
      packDone: "{n} archivos instalados, {m} omitidos.",
      packsNeedClub: "Los paquetes vienen con el Club de paquetes.",
      packsFail: "No se pudo cargar la lista de paquetes.",
      previewTitle: "Esta semana hasta ahora",
      reviewDone: "Revisi\xF3n escrita: {path}",
      archiveNone: "No hay proyectos terminados (status: done).",
      archiveTitle: "Proyectos terminados",
      btnMove: "Mover {n} a {path}",
      archiveDone: "{n} proyectos movidos.",
      rolled: "{n} tareas abiertas tra\xEDdas del {date}.",
      templatesDone: "{n} plantillas a\xF1adidas, {m} omitidas.",
      proOnly: "Esta funci\xF3n es de Pro.",
      sLang: "Idioma de las notas nuevas",
      sLangDesc: "Nombres de carpetas, t\xEDtulos y preguntas.",
      sFolders: "Carpetas en uso",
      sRerun: "Volver a configurar",
      sKey: "Licencia",
      sStatus: "Estado: {tier}",
      sNetwork: "Red: solo la comprobaci\xF3n de licencia y la lista y descarga de paquetes van a getreadystack.com. Sin telemetr\xEDa.",
      tier: { free: "Gratis", pro: "Pro", club: "Club de paquetes", year: "Club de paquetes (anual)" }
    },
    doneWords: ["done", "complete", "completed", "finished", "terminado", "hecho", "completado"]
  },
  pt: {
    folders: { inbox: "0 Caixa de entrada", projects: "1 Projetos", areas: "2 \xC1reas", resources: "3 Recursos", archive: "4 Arquivo", journal: "5 Di\xE1rio", daily: "5 Di\xE1rio/Dias", reviews: "5 Di\xE1rio/Revis\xF5es", templates: "6 Modelos" },
    home: "In\xEDcio",
    start: "Comece aqui",
    names: { daily: "Nota di\xE1ria", project: "Projeto", weekly: "Revis\xE3o semanal", monthly: "Revis\xE3o mensal", quarterly: "Revis\xE3o trimestral", yearly: "Revis\xE3o anual", meeting: "Reuni\xE3o", person: "Pessoa", book: "Livro", area: "\xC1rea", decision: "Decis\xE3o", goal: "Meta" },
    dailyTitle: "dddd, D [de] MMMM [de] YYYY",
    tpl: {
      daily: [S("As 3 de hoje", TODO, TODO, TODO), S("Tarefas", TODO), S("Notas"), S("Fechamento do dia", "- Feito hoje:", "- Passa para amanh\xE3:", "- Algo que aprendi:")],
      project: [S("Resultado", "Como sei que est\xE1 pronto?", ""), S("Pr\xF3ximas a\xE7\xF5es", TODO), S("Notas"), S("Registro", "- {{date:YYYY-MM-DD}} criado")],
      weekly: [S("Conquistas", "- "), S("O que n\xE3o saiu como planejado", "- "), S("Caixa de entrada zerada", "- [ ] Caixa de entrada vazia", "- [ ] Todo projeto ativo tem uma pr\xF3xima a\xE7\xE3o"), S("Pr\xF3xima semana", TODO, TODO, TODO)],
      monthly: [S("Destaques do m\xEAs", "- "), S("O que aprendi", "- "), S("Revis\xE3o das \xE1reas", "- Sa\xFAde:", "- Trabalho:", "- Dinheiro:", "- Pessoas:"), S("Projetos para come\xE7ar, pausar ou encerrar", "- "), S("As 3 prioridades do pr\xF3ximo m\xEAs", "1. ", "2. ", "3. ")],
      quarterly: [S("Metas: onde estou?", "- "), S("Projetos conclu\xEDdos", "- "), S("O que parar de fazer", "- "), S("Metas do pr\xF3ximo trimestre", "1. ", "2. ", "3. ")],
      yearly: [S("O ano em um par\xE1grafo"), S("Melhores momentos", "- "), S("O que n\xE3o funcionou", "- "), S("Li\xE7\xF5es", "- "), S("Temas do pr\xF3ximo ano", "- ")],
      meeting: [S("Pauta", "- "), S("Notas"), S("Decis\xF5es", "- "), S("Tarefas", TODO)],
      person: [S("Contexto", "Como nos conhecemos e no que trabalha:", ""), S("Notas"), S("Acompanhamento", TODO)],
      book: [S("Por que estou lendo"), S("Ideias principais", "- "), S("Cita\xE7\xF5es", "> "), S("O que vou fazer diferente", "- ")],
      area: [S("Padr\xE3o que mantenho"), S("Projetos ativos", "- "), S("Recorrente", TODO), S("Notas")],
      decision: [S("Contexto"), S("Op\xE7\xF5es", "1. ", "2. "), S("Decis\xE3o"), S("Por qu\xEA"), S("Revisar em", "- [ ] Revisar esta decis\xE3o em: ")],
      goal: [S("Por que importa"), S("Como vou medir"), S("Projetos que a movem", "- "), S("Marcos", TODO)]
    },
    startOutcome: "Este cofre est\xE1 pronto e eu uso todos os dias.",
    startTasks: ['Abrir a nota di\xE1ria de hoje (\xEDcone de calend\xE1rio \xE0 esquerda ou comando "Abrir a nota di\xE1ria de hoje")', 'Criar seu primeiro projeto real com "Novo projeto"', "Colocar uma nota solta em {inbox} e depois mov\xEA-la para um projeto, \xE1rea ou recurso", 'Na sexta-feira, rodar "Ver esta semana"'],
    homeIntro: "Seu cofre organizado pelo PARA: **Projetos** t\xEAm fim, **\xC1reas** s\xE3o cont\xEDnuas, **Recursos** s\xE3o consulta e o **Arquivo** \xE9 o que terminou.",
    homeToday: "Hoje",
    homeFolders: "Pastas",
    homeCommands: 'Comandos (Ctrl/Cmd+P, digite "Starter Vault")',
    review: { weekly: "Revis\xE3o semanal", monthly: "Revis\xE3o mensal", quarterly: "Revis\xE3o trimestral", numbers: "N\xFAmeros", created: "Notas criadas", changed: "Notas alteradas", done: "Tarefas feitas", open: "Tarefas abertas nos projetos", noNext: "Projetos sem pr\xF3xima a\xE7\xE3o", stalled: "Projetos parados (14+ dias sem mexer)", inbox: "Notas na caixa de entrada", daily: "Notas di\xE1rias escritas", overdue: "Tarefas atrasadas", doneList: "Feito", openList: "Abertas por projeto", noNextList: "Precisa de uma pr\xF3xima a\xE7\xE3o", stalledList: "Parados", createdList: "Criadas", overdueList: "Atrasadas", none: "\u2014 nenhuma", more: "\u2026 e mais {n}", reflect: "Sua revis\xE3o" },
    ui: {
      cmdSetup: "Configurar meu cofre",
      cmdToday: "Abrir a nota di\xE1ria de hoje",
      cmdProject: "Novo projeto",
      cmdPreview: "Ver esta semana",
      cmdWeekly: "Escrever a revis\xE3o desta semana",
      cmdMonthly: "Escrever a revis\xE3o deste m\xEAs",
      cmdQuarter: "Escrever a revis\xE3o do trimestre",
      cmdArchive: "Mover os projetos conclu\xEDdos para o arquivo",
      cmdTemplates: "Adicionar os 10 modelos Pro",
      cmdPacks: "Pacotes de modelos",
      cmdKey: "Inserir a chave de licen\xE7a",
      setupTitle: "Configure seu cofre",
      setupIntro: "Nada \xE9 sobrescrito: o que j\xE1 existe \xE9 pulado.",
      isNew: "novo",
      isThere: "j\xE1 existe \u2014 pulado",
      btnCreate: "Criar {n} itens",
      created: "{n} criados, {m} pulados.",
      lang: "Idioma",
      projectName: "Nome do projeto",
      btnOk: "Criar",
      proTitle: "Starter Vault Pro",
      proLine1: "Sua revis\xE3o semanal e mensal escrita a partir do seu pr\xF3prio cofre: tarefas feitas, tarefas abertas por projeto, projetos sem pr\xF3xima a\xE7\xE3o.",
      proLine2: "Pastas, modelos e perguntas em 5 idiomas, adicionados ao cofre que voc\xEA j\xE1 tem \u2014 nada \xE9 sobrescrito.",
      clubLine: "Clube de pacotes: um pacote novo de modelos todo m\xEAs em 5 idiomas, instalado daqui. Suas notas ficam se voc\xEA parar.",
      btnPro: "Obter Pro \u2014 US$ 39 uma vez",
      btnClub: "Clube de pacotes \u2014 US$ 6/m\xEAs",
      btnYear: "ou US$ 59/ano",
      haveKey: "Tenho uma chave",
      keyTitle: "Chave de licen\xE7a",
      keyPh: "Cole a chave do seu recibo da Whop",
      keyOk: "Chave aceita: {tier}.",
      keyBad: "Esta chave n\xE3o foi aceita.",
      keyOffline: "N\xE3o foi poss\xEDvel acessar getreadystack.com. Tente de novo.",
      btnCheck: "Verificar chave",
      btnRemove: "Remover chave",
      packsTitle: "Pacotes de modelos",
      packsIntro: "Um pacote novo todo m\xEAs, em 5 idiomas.",
      btnInstall: "Instalar",
      packDone: "{n} arquivos instalados, {m} pulados.",
      packsNeedClub: "Os pacotes v\xEAm com o Clube de pacotes.",
      packsFail: "N\xE3o foi poss\xEDvel carregar a lista de pacotes.",
      previewTitle: "Esta semana at\xE9 agora",
      reviewDone: "Revis\xE3o escrita: {path}",
      archiveNone: "Nenhum projeto conclu\xEDdo (status: done) encontrado.",
      archiveTitle: "Projetos conclu\xEDdos",
      btnMove: "Mover {n} para {path}",
      archiveDone: "{n} projetos movidos.",
      rolled: "{n} tarefas abertas trazidas de {date}.",
      templatesDone: "{n} modelos adicionados, {m} pulados.",
      proOnly: "Este recurso \xE9 do Pro.",
      sLang: "Idioma das notas novas",
      sLangDesc: "Nomes de pastas, t\xEDtulos e perguntas.",
      sFolders: "Pastas em uso",
      sRerun: "Configurar de novo",
      sKey: "Licen\xE7a",
      sStatus: "Status: {tier}",
      sNetwork: "Rede: s\xF3 a verifica\xE7\xE3o da licen\xE7a e a lista e o download dos pacotes v\xE3o para getreadystack.com. Sem telemetria.",
      tier: { free: "Gr\xE1tis", pro: "Pro", club: "Clube de pacotes", year: "Clube de pacotes (anual)" }
    },
    doneWords: ["done", "complete", "completed", "finished", "conclu\xEDdo", "concluido", "feito", "pronto"]
  },
  ja: {
    folders: { inbox: "0 \u53D7\u4FE1\u7BB1", projects: "1 \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", areas: "2 \u30A8\u30EA\u30A2", resources: "3 \u30EA\u30BD\u30FC\u30B9", archive: "4 \u30A2\u30FC\u30AB\u30A4\u30D6", journal: "5 \u30B8\u30E3\u30FC\u30CA\u30EB", daily: "5 \u30B8\u30E3\u30FC\u30CA\u30EB/\u30C7\u30A4\u30EA\u30FC", reviews: "5 \u30B8\u30E3\u30FC\u30CA\u30EB/\u632F\u308A\u8FD4\u308A", templates: "6 \u30C6\u30F3\u30D7\u30EC\u30FC\u30C8" },
    home: "\u30DB\u30FC\u30E0",
    start: "\u306F\u3058\u3081\u306B",
    names: { daily: "\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8", project: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", weekly: "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC", monthly: "\u6708\u6B21\u30EC\u30D3\u30E5\u30FC", quarterly: "\u56DB\u534A\u671F\u30EC\u30D3\u30E5\u30FC", yearly: "\u5E74\u6B21\u30EC\u30D3\u30E5\u30FC", meeting: "\u4F1A\u8B70", person: "\u4EBA\u7269", book: "\u672C", area: "\u30A8\u30EA\u30A2", decision: "\u610F\u601D\u6C7A\u5B9A", goal: "\u76EE\u6A19" },
    dailyTitle: "YYYY\u5E74M\u6708D\u65E5 (ddd)",
    tpl: {
      daily: [S("\u4ECA\u65E5\u306E3\u3064", TODO, TODO, TODO), S("\u30BF\u30B9\u30AF", TODO), S("\u30E1\u30E2"), S("\u4E00\u65E5\u306E\u7D42\u308F\u308A\u306B", "- \u4ECA\u65E5\u3084\u3063\u305F\u3053\u3068:", "- \u660E\u65E5\u306B\u56DE\u3059\u3053\u3068:", "- \u4ECA\u65E5\u5B66\u3093\u3060\u3053\u3068:")],
      project: [S("\u6210\u679C", "\u300C\u5B8C\u4E86\u300D\u3068\u306F\u3069\u3093\u306A\u72B6\u614B?", ""), S("\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3", TODO), S("\u30E1\u30E2"), S("\u30ED\u30B0", "- {{date:YYYY-MM-DD}} \u4F5C\u6210")],
      weekly: [S("\u3067\u304D\u305F\u3053\u3068", "- "), S("\u8A08\u753B\u3069\u304A\u308A\u306B\u3044\u304B\u306A\u304B\u3063\u305F\u3053\u3068", "- "), S("\u53D7\u4FE1\u7BB1\u3092\u30BC\u30ED\u306B", "- [ ] \u53D7\u4FE1\u7BB1\u304C\u7A7A", "- [ ] \u9032\u884C\u4E2D\u306E\u3059\u3079\u3066\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306B\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u304C\u3042\u308B"), S("\u6765\u9031", TODO, TODO, TODO)],
      monthly: [S("\u4ECA\u6708\u306E\u30CF\u30A4\u30E9\u30A4\u30C8", "- "), S("\u5B66\u3093\u3060\u3053\u3068", "- "), S("\u30A8\u30EA\u30A2\u306E\u70B9\u691C", "- \u5065\u5EB7:", "- \u4ED5\u4E8B:", "- \u304A\u91D1:", "- \u4EBA\u9593\u95A2\u4FC2:"), S("\u59CB\u3081\u308B\u30FB\u4E00\u6642\u505C\u6B62\u3059\u308B\u30FB\u3084\u3081\u308B\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", "- "), S("\u6765\u6708\u306E\u512A\u5148\u4E8B\u98053\u3064", "1. ", "2. ", "3. ")],
      quarterly: [S("\u76EE\u6A19\u306E\u9032\u307F\u5177\u5408", "- "), S("\u5B8C\u4E86\u3057\u305F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", "- "), S("\u3084\u3081\u308B\u3053\u3068", "- "), S("\u6765\u56DB\u534A\u671F\u306E\u76EE\u6A19", "1. ", "2. ", "3. ")],
      yearly: [S("\u4E00\u5E74\u3092\u3072\u3068\u8A00\u3067"), S("\u6700\u9AD8\u306E\u77AC\u9593", "- "), S("\u3046\u307E\u304F\u3044\u304B\u306A\u304B\u3063\u305F\u3053\u3068", "- "), S("\u6559\u8A13", "- "), S("\u6765\u5E74\u306E\u30C6\u30FC\u30DE", "- ")],
      meeting: [S("\u8B70\u984C", "- "), S("\u30E1\u30E2"), S("\u6C7A\u5B9A\u4E8B\u9805", "- "), S("\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0", TODO)],
      person: [S("\u80CC\u666F", "\u51FA\u4F1A\u3063\u305F\u304D\u3063\u304B\u3051\u30FB\u53D6\u308A\u7D44\u3093\u3067\u3044\u308B\u3053\u3068:", ""), S("\u30E1\u30E2"), S("\u30D5\u30A9\u30ED\u30FC\u30A2\u30C3\u30D7", TODO)],
      book: [S("\u8AAD\u3080\u7406\u7531"), S("\u91CD\u8981\u306A\u30A2\u30A4\u30C7\u30A2", "- "), S("\u5F15\u7528", "> "), S("\u3053\u308C\u304B\u3089\u5909\u3048\u308B\u3053\u3068", "- ")],
      area: [S("\u4FDD\u3061\u305F\u3044\u57FA\u6E96"), S("\u9032\u884C\u4E2D\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", "- "), S("\u5B9A\u671F\u30BF\u30B9\u30AF", TODO), S("\u30E1\u30E2")],
      decision: [S("\u80CC\u666F"), S("\u9078\u629E\u80A2", "1. ", "2. "), S("\u6C7A\u5B9A"), S("\u7406\u7531"), S("\u898B\u76F4\u3057\u65E5", "- [ ] \u3053\u306E\u6C7A\u5B9A\u3092\u898B\u76F4\u3059\u65E5: ")],
      goal: [S("\u306A\u305C\u5927\u5207\u304B"), S("\u3069\u3046\u6E2C\u308B\u304B"), S("\u524D\u306B\u9032\u3081\u308B\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", "- "), S("\u30DE\u30A4\u30EB\u30B9\u30C8\u30FC\u30F3", TODO)]
    },
    startOutcome: "\u3053\u306E\u4FDD\u7BA1\u5EAB\u304C\u6574\u3044\u3001\u6BCE\u65E5\u4F7F\u3063\u3066\u3044\u308B\u3002",
    startTasks: ["\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F(\u5DE6\u306E\u30AB\u30EC\u30F3\u30C0\u30FC\u30A2\u30A4\u30B3\u30F3\u3001\u307E\u305F\u306F\u30B3\u30DE\u30F3\u30C9\u300C\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F\u300D)", "\u300C\u65B0\u3057\u3044\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u300D\u3067\u6700\u521D\u306E\u672C\u7269\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u4F5C\u308B", "\u6563\u3089\u3070\u3063\u305F\u30E1\u30E2\u30921\u3064\u300C{inbox}\u300D\u306B\u5165\u308C\u3001\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30FB\u30A8\u30EA\u30A2\u30FB\u30EA\u30BD\u30FC\u30B9\u306E\u3069\u308C\u304B\u306B\u79FB\u3059", "\u91D1\u66DC\u65E5\u306B\u300C\u4ECA\u9031\u3092\u898B\u308B\u300D\u3092\u5B9F\u884C\u3059\u308B"],
    homeIntro: "PARA\u3067\u6574\u7406\u3057\u305F\u4FDD\u7BA1\u5EAB: **\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8**\u306F\u7D42\u308F\u308A\u304C\u3042\u308B\u3082\u306E\u3001**\u30A8\u30EA\u30A2**\u306F\u7D9A\u304F\u3082\u306E\u3001**\u30EA\u30BD\u30FC\u30B9**\u306F\u53C2\u8003\u8CC7\u6599\u3001**\u30A2\u30FC\u30AB\u30A4\u30D6**\u306F\u7D42\u308F\u3063\u305F\u3082\u306E\u3002",
    homeToday: "\u4ECA\u65E5",
    homeFolders: "\u30D5\u30A9\u30EB\u30C0",
    homeCommands: "\u30B3\u30DE\u30F3\u30C9(Ctrl/Cmd+P \u3067\u300CStarter Vault\u300D\u3068\u5165\u529B)",
    review: { weekly: "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC", monthly: "\u6708\u6B21\u30EC\u30D3\u30E5\u30FC", quarterly: "\u56DB\u534A\u671F\u30EC\u30D3\u30E5\u30FC", numbers: "\u6570\u5B57", created: "\u4F5C\u6210\u3057\u305F\u30CE\u30FC\u30C8", changed: "\u66F4\u65B0\u3057\u305F\u30CE\u30FC\u30C8", done: "\u5B8C\u4E86\u3057\u305F\u30BF\u30B9\u30AF", open: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u672A\u5B8C\u4E86\u30BF\u30B9\u30AF", noNext: "\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u304C\u306A\u3044\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8", stalled: "\u6B62\u307E\u3063\u3066\u3044\u308B\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8(14\u65E5\u4EE5\u4E0A\u672A\u66F4\u65B0)", inbox: "\u53D7\u4FE1\u7BB1\u306E\u30CE\u30FC\u30C8", daily: "\u66F8\u3044\u305F\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8", overdue: "\u671F\u9650\u5207\u308C\u306E\u30BF\u30B9\u30AF", doneList: "\u5B8C\u4E86", openList: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u5225\u306E\u672A\u5B8C\u4E86", noNextList: "\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u304C\u5FC5\u8981", stalledList: "\u505C\u6EDE", createdList: "\u4F5C\u6210", overdueList: "\u671F\u9650\u5207\u308C", none: "\u2014 \u306A\u3057", more: "\u2026 \u307B\u304B{n}\u4EF6", reflect: "\u632F\u308A\u8FD4\u308A" },
    ui: {
      cmdSetup: "\u4FDD\u7BA1\u5EAB\u3092\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7",
      cmdToday: "\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F",
      cmdProject: "\u65B0\u3057\u3044\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8",
      cmdPreview: "\u4ECA\u9031\u3092\u898B\u308B",
      cmdWeekly: "\u4ECA\u9031\u306E\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",
      cmdMonthly: "\u4ECA\u6708\u306E\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",
      cmdQuarter: "\u4ECA\u56DB\u534A\u671F\u306E\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",
      cmdArchive: "\u5B8C\u4E86\u3057\u305F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u30A2\u30FC\u30AB\u30A4\u30D6\u3078\u79FB\u52D5",
      cmdTemplates: "Pro \u30C6\u30F3\u30D7\u30EC\u30FC\u30C810\u7A2E\u3092\u8FFD\u52A0",
      cmdPacks: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30D1\u30C3\u30AF",
      cmdKey: "\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u3092\u5165\u529B",
      setupTitle: "\u4FDD\u7BA1\u5EAB\u3092\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7",
      setupIntro: "\u4E0A\u66F8\u304D\u306F\u3057\u307E\u305B\u3093\u3002\u3059\u3067\u306B\u3042\u308B\u3082\u306E\u306F\u30B9\u30AD\u30C3\u30D7\u3057\u307E\u3059\u3002",
      isNew: "\u65B0\u898F",
      isThere: "\u3059\u3067\u306B\u3042\u308A \u2014 \u30B9\u30AD\u30C3\u30D7",
      btnCreate: "{n}\u4EF6\u3092\u4F5C\u6210",
      created: "{n}\u4EF6\u4F5C\u6210\u3001{m}\u4EF6\u30B9\u30AD\u30C3\u30D7\u3002",
      lang: "\u8A00\u8A9E",
      projectName: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u540D",
      btnOk: "\u4F5C\u6210",
      proTitle: "Starter Vault Pro",
      proLine1: "\u3042\u306A\u305F\u306E\u4FDD\u7BA1\u5EAB\u304B\u3089\u9031\u6B21\u30FB\u6708\u6B21\u30EC\u30D3\u30E5\u30FC\u3092\u81EA\u52D5\u3067\u66F8\u304D\u307E\u3059: \u5B8C\u4E86\u3057\u305F\u30BF\u30B9\u30AF\u3001\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u5225\u306E\u672A\u5B8C\u4E86\u30BF\u30B9\u30AF\u3001\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u304C\u306A\u3044\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3002",
      proLine2: "\u30D5\u30A9\u30EB\u30C0\u30FB\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30FB\u554F\u3044\u304B\u3051\u30925\u8A00\u8A9E\u3067\u3001\u4ECA\u306E\u4FDD\u7BA1\u5EAB\u306B\u8FFD\u52A0 \u2014 \u4F55\u3082\u4E0A\u66F8\u304D\u3057\u307E\u305B\u3093\u3002",
      clubLine: "\u30D1\u30C3\u30AF\u30AF\u30E9\u30D6: \u6BCE\u6708\u65B0\u3057\u3044\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30D1\u30C3\u30AF\u30925\u8A00\u8A9E\u3067\u3001\u3053\u3053\u304B\u3089\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3002\u3084\u3081\u3066\u3082\u30CE\u30FC\u30C8\u306F\u6B8B\u308A\u307E\u3059\u3002",
      btnPro: "Pro \u3092\u5165\u624B \u2014 39\u30C9\u30EB(\u8CB7\u3044\u5207\u308A)",
      btnClub: "\u30D1\u30C3\u30AF\u30AF\u30E9\u30D6 \u2014 \u67086\u30C9\u30EB",
      btnYear: "\u307E\u305F\u306F\u5E7459\u30C9\u30EB",
      haveKey: "\u30AD\u30FC\u3092\u6301\u3063\u3066\u3044\u307E\u3059",
      keyTitle: "\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC",
      keyPh: "Whop \u306E\u9818\u53CE\u66F8\u306B\u3042\u308B\u30AD\u30FC\u3092\u8CBC\u308A\u4ED8\u3051",
      keyOk: "\u30AD\u30FC\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F: {tier}\u3002",
      keyBad: "\u3053\u306E\u30AD\u30FC\u306F\u53D7\u3051\u4ED8\u3051\u3089\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
      keyOffline: "getreadystack.com \u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
      btnCheck: "\u30AD\u30FC\u3092\u78BA\u8A8D",
      btnRemove: "\u30AD\u30FC\u3092\u524A\u9664",
      packsTitle: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30D1\u30C3\u30AF",
      packsIntro: "\u6BCE\u6708\u65B0\u3057\u3044\u30D1\u30C3\u30AF\u30015\u8A00\u8A9E\u3002",
      btnInstall: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
      packDone: "{n}\u30D5\u30A1\u30A4\u30EB\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3001{m}\u4EF6\u30B9\u30AD\u30C3\u30D7\u3002",
      packsNeedClub: "\u30D1\u30C3\u30AF\u306F\u30D1\u30C3\u30AF\u30AF\u30E9\u30D6\u306B\u542B\u307E\u308C\u307E\u3059\u3002",
      packsFail: "\u30D1\u30C3\u30AF\u4E00\u89A7\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
      previewTitle: "\u4ECA\u9031\u3053\u3053\u307E\u3067",
      reviewDone: "\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304D\u307E\u3057\u305F: {path}",
      archiveNone: "\u5B8C\u4E86\u3057\u305F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8(status: done)\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
      archiveTitle: "\u5B8C\u4E86\u3057\u305F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8",
      btnMove: "{n}\u4EF6\u3092 {path} \u3078\u79FB\u52D5",
      archiveDone: "{n}\u4EF6\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u79FB\u52D5\u3057\u307E\u3057\u305F\u3002",
      rolled: "{date} \u306E\u672A\u5B8C\u4E86\u30BF\u30B9\u30AF{n}\u4EF6\u3092\u5F15\u304D\u7D99\u304E\u307E\u3057\u305F\u3002",
      templatesDone: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8{n}\u4EF6\u3092\u8FFD\u52A0\u3001{m}\u4EF6\u30B9\u30AD\u30C3\u30D7\u3002",
      proOnly: "\u3053\u308C\u306F Pro \u306E\u6A5F\u80FD\u3067\u3059\u3002",
      sLang: "\u65B0\u3057\u3044\u30CE\u30FC\u30C8\u306E\u8A00\u8A9E",
      sLangDesc: "\u30D5\u30A9\u30EB\u30C0\u540D\u30FB\u898B\u51FA\u3057\u30FB\u554F\u3044\u304B\u3051\u3002",
      sFolders: "\u4F7F\u7528\u4E2D\u306E\u30D5\u30A9\u30EB\u30C0",
      sRerun: "\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u3092\u3082\u3046\u4E00\u5EA6",
      sKey: "\u30E9\u30A4\u30BB\u30F3\u30B9",
      sStatus: "\u72B6\u614B: {tier}",
      sNetwork: "\u901A\u4FE1: \u30E9\u30A4\u30BB\u30F3\u30B9\u78BA\u8A8D\u3068\u30D1\u30C3\u30AF\u4E00\u89A7\u30FB\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3060\u3051\u304C getreadystack.com \u306B\u9001\u3089\u308C\u307E\u3059\u3002\u30C6\u30EC\u30E1\u30C8\u30EA\u30FC\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
      tier: { free: "\u7121\u6599", pro: "Pro", club: "\u30D1\u30C3\u30AF\u30AF\u30E9\u30D6", year: "\u30D1\u30C3\u30AF\u30AF\u30E9\u30D6(\u5E74\u984D)" }
    },
    doneWords: ["done", "complete", "completed", "finished", "\u5B8C\u4E86", "\u6E08\u307F", "\u7D42\u4E86"]
  }
};
var FREE_TEMPLATES = ["daily", "project"];
var PRO_TEMPLATES = ["weekly", "monthly", "quarterly", "yearly", "meeting", "person", "book", "area", "decision", "goal"];
var FM = {
  daily: { type: "daily", date: "{{date:YYYY-MM-DD}}" },
  project: { type: "project", status: "active", area: "", created: "{{date:YYYY-MM-DD}}", due: "" },
  weekly: { type: "weekly-review", date: "{{date:YYYY-MM-DD}}" },
  monthly: { type: "monthly-review", date: "{{date:YYYY-MM-DD}}" },
  quarterly: { type: "quarterly-review", date: "{{date:YYYY-MM-DD}}" },
  yearly: { type: "yearly-review", date: "{{date:YYYY-MM-DD}}" },
  meeting: { type: "meeting", date: "{{date:YYYY-MM-DD}}", attendees: "" },
  person: { type: "person", company: "", role: "", email: "" },
  book: { type: "book", author: "", status: "reading", started: "{{date:YYYY-MM-DD}}", finished: "" },
  area: { type: "area" },
  decision: { type: "decision", date: "{{date:YYYY-MM-DD}}", status: "decided" },
  goal: { type: "goal", status: "active", due: "" }
};
function pickLang(code) {
  const c = String(code || "").toLowerCase().slice(0, 2);
  return LANGS.includes(c) ? c : "en";
}

// src/engine.js
var p2 = (n) => String(n).padStart(2, "0");
var ymd = (d) => d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
var parseYmd = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ""));
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
};
var addDays = (s, n) => {
  const d = parseYmd(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
};
var msToYmd = (ms) => ms ? ymd(new Date(ms)) : "";
function isoWeek(s) {
  const d = parseYmd(s), t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  return { year: y, week: Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7) };
}
function period(kind, s) {
  const d = parseYmd(s);
  if (kind === "weekly") {
    const start = addDays(s, -((d.getDay() + 6) % 7));
    const w = isoWeek(s);
    return { kind, start, end: addDays(start, 7), id: w.year + "-W" + p2(w.week) };
  }
  if (kind === "monthly") {
    const start = ymd(new Date(d.getFullYear(), d.getMonth(), 1));
    return { kind, start, end: ymd(new Date(d.getFullYear(), d.getMonth() + 1, 1)), id: start.slice(0, 7) };
  }
  if (kind === "quarterly") {
    const q = Math.floor(d.getMonth() / 3);
    return { kind, start: ymd(new Date(d.getFullYear(), q * 3, 1)), end: ymd(new Date(d.getFullYear(), q * 3 + 3, 1)), id: d.getFullYear() + "-Q" + (q + 1) };
  }
  throw new Error("unknown period " + kind);
}
function fmtDate(s, fmt2, lang) {
  const d = parseYmd(s), loc = lang === "pt" ? "pt-BR" : lang;
  const name = (o) => new Intl.DateTimeFormat(loc, o).format(d);
  return String(fmt2).replace(/\[([^\]]*)\]|YYYY|MMMM|MM|M|DD|D|dddd|ddd/g, (t, lit) => {
    if (lit !== void 0) return lit;
    switch (t) {
      case "YYYY":
        return String(d.getFullYear());
      case "MMMM":
        return lang === "ja" ? d.getMonth() + 1 + "\u6708" : name({ month: "long" });
      case "MM":
        return p2(d.getMonth() + 1);
      case "M":
        return String(d.getMonth() + 1);
      case "DD":
        return p2(d.getDate());
      case "D":
        return String(d.getDate());
      case "dddd":
        return name({ weekday: "long" });
      case "ddd":
        return name({ weekday: "short" }).replace(/\.$/, "");
    }
    return t;
  });
}
function fill(text, v, lang) {
  return String(text).replace(/\{\{title\}\}/g, v.title || "").replace(/\{\{date:([^}]+)\}\}/g, (_, f) => fmtDate(v.date, f, lang)).replace(/\{\{date\}\}/g, v.date).replace(/\{\{time\}\}/g, v.time || "");
}
function frontmatter(obj) {
  const keys = Object.keys(obj || {});
  if (!keys.length) return "";
  return "---\n" + keys.map((k) => k + ": " + obj[k]).join("\n") + "\n---\n";
}
function sectionsMd(sections) {
  return sections.map(([h, lines]) => "## " + h + "\n" + lines.join("\n")).join("\n\n") + "\n";
}
function templateText(lang, id) {
  const t = L[lang], body = t.tpl[id];
  if (!body) throw new Error("no template " + id);
  const h1 = id === "daily" ? "# {{date:" + t.dailyTitle + "}}" : "# {{title}}";
  return frontmatter(FM[id]) + "\n" + h1 + "\n\n" + sectionsMd(body);
}
var dailyNote = (lang, date) => fill(templateText(lang, "daily"), { date }, lang);
var projectNote = (lang, title, date) => fill(templateText(lang, "project"), { title, date }, lang);
function startProject(lang, date) {
  const t = L[lang];
  const tasks = t.startTasks.map((x) => "- [ ] " + x.replace("{inbox}", t.folders.inbox));
  return frontmatter({ type: "project", status: "active", area: "", created: date, due: "" }) + "\n# " + t.start + "\n\n" + sectionsMd([[t.tpl.project[0][0], [t.startOutcome]], [t.tpl.project[1][0], tasks]]);
}
function homeNote(lang, date) {
  const t = L[lang], f = t.folders, u = t.ui;
  const link = (p, label) => "[[" + p + "|" + (label || p.split("/").pop()) + "]]";
  return "# " + t.home + "\n\n" + t.homeIntro + "\n\n## " + t.homeFolders + "\n" + ["inbox", "projects", "areas", "resources", "archive", "daily", "reviews", "templates"].map((k) => "- " + f[k]).join("\n") + "\n\n## " + t.homeToday + "\n- " + link(f.projects + "/" + t.start, t.start) + "\n\n## " + t.homeCommands + "\n" + [u.cmdToday, u.cmdProject, u.cmdPreview, u.cmdWeekly, u.cmdMonthly, u.cmdArchive].map((c) => "- " + c).join("\n") + "\n";
}
function folderList(lang) {
  const f = L[lang].folders;
  return [f.inbox, f.projects, f.areas, f.resources, f.archive, f.journal, f.daily, f.reviews, f.templates];
}
function planInstall(lang, exists, opts) {
  const o = opts || {}, t = L[lang], f = t.folders, date = o.date || ymd(/* @__PURE__ */ new Date());
  const has = typeof exists === "function" ? exists : (p) => exists.has(p);
  const items = folderList(lang).map((p) => ({ path: p, kind: "folder" }));
  items.push({ path: t.home + ".md", kind: "file", content: homeNote(lang, date) });
  items.push({ path: f.projects + "/" + t.start + ".md", kind: "file", content: startProject(lang, date) });
  const tpls = FREE_TEMPLATES.concat(o.pro ? PRO_TEMPLATES : []);
  for (const id of tpls) items.push({ path: f.templates + "/" + t.names[id] + ".md", kind: "file", content: templateText(lang, id), template: id });
  for (const it of items) it.exists = !!has(it.path);
  return items;
}
function proTemplatePlan(lang, exists, folders) {
  const t = L[lang], has = typeof exists === "function" ? exists : (p) => exists.has(p), dir = (folders || t.folders).templates;
  return PRO_TEMPLATES.map((id) => {
    const path = dir + "/" + t.names[id] + ".md";
    return { path, kind: "file", content: templateText(lang, id), template: id, exists: !!has(path) };
  });
}
function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(String(text || ""));
  const out = {};
  if (!m) return out;
  for (const ln of m[1].split(/\r?\n/)) {
    const k = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(ln);
    if (k) out[k[1].toLowerCase()] = k[2].replace(/^["']|["']$/g, "").trim();
  }
  return out;
}
var TASK = /^(\s*[-*+]\s+)\[(.)\]\s+(.*)$/;
var DATE_RX = (marks) => new RegExp("(?:" + marks + ")\\s*(\\d{4}-\\d{2}-\\d{2})");
var DONE_AT = DATE_RX("\u2705|\\[completion::|done::|\\[done::");
var DUE_AT = DATE_RX("\u{1F4C5}|\\[due::|due::");
function parseTasks(text) {
  const out = [];
  String(text || "").split(/\r?\n/).forEach((line, i) => {
    const m = TASK.exec(line);
    if (!m) return;
    const body = m[3].trim();
    if (!body) return;
    const st = m[2];
    const done = st === "x" || st === "X";
    if (!done && st !== " ") return;
    const da = DONE_AT.exec(body), du = DUE_AT.exec(body);
    out.push({ done, text: body, line: i, doneDate: da ? da[1] : "", due: du ? du[1] : "" });
  });
  return out;
}
var taskKey = (s) => String(s).replace(/\s*(✅|📅|⏳|🛫|➕)\s*\d{4}-\d{2}-\d{2}/g, "").replace(/\s+/g, " ").trim().toLowerCase();
var ALL_DONE_WORDS = new Set([].concat(...LANGS.map((l) => L[l].doneWords)));
var isDoneStatus = (s) => ALL_DONE_WORDS.has(String(s || "").trim().toLowerCase());
var under = (path, folder) => !!folder && (path === folder || path.startsWith(folder + "/"));
var base = (p) => p.split("/").pop().replace(/\.md$/i, "");
function createdDay(file, fm) {
  for (const v of [fm.created, fm.date]) if (/^\d{4}-\d{2}-\d{2}/.test(v || "")) return v.slice(0, 10);
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(base(file.path));
  if (m) return m[1];
  return file.ctime ? msToYmd(file.ctime) : "";
}
function projectsOf(files, folders) {
  const map = /* @__PURE__ */ new Map();
  for (const f of files) {
    if (!under(f.path, folders.projects) || !/\.md$/i.test(f.path)) continue;
    const rest = f.path.slice(folders.projects.length + 1).split("/");
    const isFolder = rest.length > 1, key = isFolder ? rest[0] : base(f.path);
    const pr = map.get(key) || { key, isFolder, path: isFolder ? folders.projects + "/" + key : f.path, files: [], main: null };
    pr.files.push(f);
    if (!isFolder || base(f.path) === key) pr.main = f;
    map.set(key, pr);
  }
  for (const pr of map.values()) {
    if (!pr.main) pr.main = pr.files.slice().sort((a, b) => a.path.localeCompare(b.path))[0];
    pr.fm = parseFrontmatter(pr.main.text);
    pr.done = isDoneStatus(pr.fm.status);
    pr.lastTouch = Math.max(...pr.files.map((x) => x.mtime || 0));
  }
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}
function computeReview(files, folders, range, today, doneIndex) {
  const inR = (s) => !!s && s >= range.start && s < range.end;
  const notes = files.filter((f) => /\.md$/i.test(f.path) && !under(f.path, folders.templates) && !under(f.path, folders.reviews));
  const dailyDay = (f) => under(f.path, folders.daily) && /^\d{4}-\d{2}-\d{2}$/.test(base(f.path)) ? base(f.path) : "";
  const r = { range, today, created: [], changed: [], done: [], open: [], noNext: [], stalled: [], overdue: [], inbox: 0, daily: 0, openCount: 0 };
  const seen = /* @__PURE__ */ new Set();
  for (const f of notes) {
    const fm = parseFrontmatter(f.text), dd = dailyDay(f);
    if (dd) {
      if (inR(dd)) r.daily++;
    } else {
      const c = createdDay(f, fm);
      if (inR(c)) r.created.push(f.path);
      else if (inR(msToYmd(f.mtime))) r.changed.push(f.path);
    }
    if (under(f.path, folders.inbox)) r.inbox++;
    const idx = doneIndex && doneIndex[f.path] || {};
    for (const t of parseTasks(f.text)) {
      if (t.done) {
        const when = t.doneDate || idx[taskKey(t.text)] || (dd || "");
        const k = f.path + "\0" + taskKey(t.text);
        if (inR(when) && !seen.has(k)) {
          seen.add(k);
          r.done.push({ path: f.path, text: t.text, date: when });
        }
      } else if (t.due && t.due < today) r.overdue.push({ path: f.path, text: t.text, due: t.due });
    }
  }
  const stallBefore = addDays(today, -14);
  for (const pr of projectsOf(notes, folders)) {
    if (pr.done) continue;
    const open = [];
    for (const f of pr.files) for (const t of parseTasks(f.text)) if (!t.done) open.push({ path: f.path, text: t.text });
    r.openCount += open.length;
    r.open.push({ key: pr.key, path: pr.main.path, tasks: open });
    if (!open.length) r.noNext.push(pr.main.path);
    if (msToYmd(pr.lastTouch) < stallBefore) r.stalled.push({ path: pr.main.path, last: msToYmd(pr.lastTouch) });
  }
  r.done.sort((a, b) => a.date.localeCompare(b.date) || a.path.localeCompare(b.path));
  r.numbers = {
    created: r.created.length,
    changed: r.changed.length,
    done: r.done.length,
    open: r.openCount,
    noNext: r.noNext.length,
    stalled: r.stalled.length,
    inbox: r.inbox,
    daily: r.daily,
    overdue: r.overdue.length
  };
  return r;
}
var NUMBER_ORDER = ["done", "created", "changed", "open", "noNext", "stalled", "overdue", "inbox", "daily"];
function reviewPath(lang, folders, range) {
  return folders.reviews + "/" + range.id + ".md";
}
function renderReview(lang, r, opts) {
  const t = L[lang], R = t.review, o = opts || {}, cap = o.cap || 30;
  const link = (p) => "[[" + p.replace(/\.md$/i, "") + "|" + base(p) + "]]";
  const list = (arr, fn) => arr.length ? arr.slice(0, cap).map(fn).join("\n") + (arr.length > cap ? "\n" + R.more.replace("{n}", arr.length - cap) : "") : R.none;
  const kind = r.range.kind, last = addDays(r.range.end, -1);
  const out = [];
  out.push(frontmatter({ type: kind + "-review", period: r.range.id, from: r.range.start, to: last, generated: r.today }));
  out.push("# " + R[kind] + " " + r.range.id);
  out.push(fmtDate(r.range.start, "D MMMM YYYY", lang) + " \u2013 " + fmtDate(last, "D MMMM YYYY", lang) + "\n");
  out.push("## " + R.numbers + "\n| " + R[kind] + " | " + r.range.id + " |\n|---|---:|\n" + NUMBER_ORDER.map((k) => "| " + R[k] + " | " + r.numbers[k] + " |").join("\n") + "\n");
  out.push("## " + R.doneList + "\n" + list(r.done, (d) => "- [x] " + d.text + " \u2014 " + link(d.path)) + "\n");
  const withOpen = r.open.filter((p) => p.tasks.length);
  out.push("## " + R.openList + "\n" + (withOpen.length ? withOpen.map((p) => "### " + link(p.path) + " (" + p.tasks.length + ")\n" + list(p.tasks, (x) => "- " + x.text + (x.path !== p.path ? " \u2014 " + link(x.path) : ""))).join("\n") : R.none) + "\n");
  out.push("## " + R.noNextList + "\n" + list(r.noNext, (p) => "- " + link(p)) + "\n");
  out.push("## " + R.stalledList + "\n" + list(r.stalled, (s) => "- " + link(s.path) + " (" + s.last + ")") + "\n");
  out.push("## " + R.overdueList + "\n" + list(r.overdue, (x) => "- " + x.text + " \u2014 " + link(x.path)) + "\n");
  out.push("## " + R.createdList + "\n" + list(r.created, (p) => "- " + link(p)) + "\n");
  const refl = t.tpl[kind];
  if (refl) out.push("# " + R.reflect + "\n\n" + sectionsMd(refl));
  return out.join("\n");
}
function rollover(prevText) {
  const lines = String(prevText || "").split(/\r?\n/), moved = [];
  for (let i = 0; i < lines.length; i++) {
    const m = TASK.exec(lines[i]);
    if (m && m[2] === " " && m[3].trim()) {
      moved.push("- [ ] " + m[3].trim());
      lines[i] = m[1] + "[>] " + m[3];
    }
  }
  return { moved, prevText: lines.join("\n") };
}
function insertUnder(text, heading, newLines) {
  if (!newLines.length) return text;
  const lines = String(text).split("\n");
  const h = lines.findIndex((l) => l.trim() === "## " + heading);
  if (h < 0) return text.replace(/\s*$/, "\n\n## " + heading + "\n" + newLines.join("\n") + "\n");
  let end = h + 1;
  while (end < lines.length && !/^#{1,2} /.test(lines[end])) end++;
  const body = lines.slice(h + 1, end).filter((l) => l.trim() !== "" && l.trim() !== "- [ ]");
  return lines.slice(0, h + 1).concat(body, newLines, [""], lines.slice(end)).join("\n").replace(/\n{3,}/g, "\n\n");
}
function lastDailyBefore(paths, folders, today) {
  let best = "";
  for (const p of paths) {
    if (!under(p, folders.daily)) continue;
    const d = base(p);
    if (/^\d{4}-\d{2}-\d{2}$/.test(d) && d < today && d > base(best || "x/0000-00-00.md")) best = p;
  }
  return best;
}
function archivePlan(files, folders, today) {
  return projectsOf(files.filter((f) => /\.md$/i.test(f.path)), folders).filter((p) => p.done).map((p) => {
    const when = [p.fm.finished, p.fm.done, p.fm.completed].find((v) => /^\d{4}/.test(v || "")) || today;
    const target = folders.archive + "/" + when.slice(0, 4) + "/" + p.path.split("/").pop();
    return { key: p.key, from: p.path, to: target, isFolder: p.isFolder };
  });
}
function packPlan(pack, lang, folders, exists) {
  const has = typeof exists === "function" ? exists : (p) => exists.has(p);
  const title = pack.title && (pack.title[lang] || pack.title.en) || pack.id;
  const dir = folders.templates + "/Packs/" + pack.id + " " + title.replace(/[\\/:*?"<>|#^[\]]/g, "-");
  const files = pack.files && (pack.files[lang] || pack.files.en) || [];
  return files.map((x) => {
    const path = dir + "/" + x.name.replace(/[\\/:*?"<>|#^[\]]/g, "-") + ".md";
    return { path, kind: "file", content: x.text, exists: !!has(path) };
  });
}
var CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

// src/main.js
var SITE = "https://getreadystack.com";
var SLUG = "obsidian-starter-vault-plugin";
var DOORS = [[SLUG, "pro"], [SLUG + ".club", "club"], [SLUG + ".year", "year"]];
var BUY = { pro: SITE + "/api/buy/web/" + SLUG, club: SITE + "/api/buy/web/" + SLUG + ".club", year: SITE + "/api/buy/web/" + SLUG + ".year" };
var PACK_INDEX = SITE + "/apps/" + SLUG + "/packs-index.json";
var RECHECK = 7 * 864e5;
var GRACE = 30 * 864e5;
var DEFAULTS = { lang: "", folders: null, key: "", tier: "free", checkedAt: 0, doneIndex: {} };
var fmt = (s, v) => String(s).replace(/\{(\w+)\}/g, (_, k) => v && k in v ? v[k] : "{" + k + "}");
var StarterVault = class extends import_obsidian.Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
    if (!this.settings.lang) this.settings.lang = pickLang(window.localStorage.getItem("language") || "en");
    const u = this.t().ui;
    this.addRibbonIcon("calendar-check", u.cmdToday, () => this.openToday());
    this.addCommand({ id: "setup", name: u.cmdSetup, callback: () => new SetupModal(this).open() });
    this.addCommand({ id: "open-today", name: u.cmdToday, callback: () => this.openToday() });
    this.addCommand({ id: "new-project", name: u.cmdProject, callback: () => new NameModal(this, (n) => this.newProject(n)).open() });
    this.addCommand({ id: "preview-week", name: u.cmdPreview, callback: () => this.preview() });
    this.addCommand({ id: "write-weekly-review", name: u.cmdWeekly, callback: () => this.pro(() => this.writeReview("weekly")) });
    this.addCommand({ id: "write-monthly-review", name: u.cmdMonthly, callback: () => this.pro(() => this.writeReview("monthly")) });
    this.addCommand({ id: "write-quarterly-review", name: u.cmdQuarter, callback: () => this.pro(() => this.writeReview("quarterly")) });
    this.addCommand({ id: "archive-finished-projects", name: u.cmdArchive, callback: () => this.pro(() => this.archive()) });
    this.addCommand({ id: "add-pro-templates", name: u.cmdTemplates, callback: () => this.pro(() => this.addProTemplates()) });
    this.addCommand({ id: "template-packs", name: u.cmdPacks, callback: () => new PacksModal(this).open() });
    this.addCommand({ id: "enter-key", name: u.cmdKey, callback: () => new KeyModal(this).open() });
    this.addSettingTab(new SVSettings(this));
    this.timers = /* @__PURE__ */ new Map();
    this.app.workspace.onLayoutReady(async () => {
      await this.scanAll();
      this.registerEvent(this.app.vault.on("modify", (f) => this.queueIndex(f)));
      this.registerEvent(this.app.vault.on("create", (f) => this.queueIndex(f)));
      this.registerEvent(this.app.vault.on("delete", (f) => {
        delete this.settings.doneIndex[f.path];
        this.saveSoon();
      }));
      this.registerEvent(this.app.vault.on("rename", (f, old) => {
        const v = this.settings.doneIndex[old];
        delete this.settings.doneIndex[old];
        if (v) this.settings.doneIndex[f.path] = v;
        this.saveSoon();
      }));
      this.recheckKey();
    });
  }
  onunload() {
    for (const t of this.timers.values()) window.clearTimeout(t);
  }
  t() {
    return L[this.settings.lang] || L.en;
  }
  folders() {
    return this.settings.folders || this.t().folders;
  }
  today() {
    return ymd(/* @__PURE__ */ new Date());
  }
  isPro() {
    return ["pro", "club", "year"].includes(this.settings.tier);
  }
  isClub() {
    return ["club", "year"].includes(this.settings.tier);
  }
  pro(fn) {
    if (this.isPro()) return fn();
    new PaywallModal(this).open();
  }
  saveSoon() {
    window.clearTimeout(this.saveT);
    this.saveT = window.setTimeout(() => this.saveData(this.settings), 1500);
  }
  // ── vault helpers ──
  exists(p) {
    return !!this.app.vault.getAbstractFileByPath((0, import_obsidian.normalizePath)(p));
  }
  async ensureFolder(p) {
    const parts = (0, import_obsidian.normalizePath)(p).split("/");
    for (let i = 1; i <= parts.length; i++) {
      const q = parts.slice(0, i).join("/");
      if (!this.exists(q)) await this.app.vault.createFolder(q);
    }
  }
  async writeNew(p, text) {
    p = (0, import_obsidian.normalizePath)(p);
    if (this.exists(p)) return null;
    const dir = p.split("/").slice(0, -1).join("/");
    if (dir) await this.ensureFolder(dir);
    return this.app.vault.create(p, text);
  }
  async applyPlan(items) {
    let n = 0, m = 0;
    for (const it of items) {
      if (it.exists || this.exists(it.path)) {
        m++;
        continue;
      }
      if (it.kind === "folder") await this.ensureFolder(it.path);
      else await this.writeNew(it.path, it.content);
      n++;
    }
    return { n, m };
  }
  async open(file) {
    if (file instanceof import_obsidian.TFile) await this.app.workspace.getLeaf(false).openFile(file);
  }
  async files() {
    const out = [];
    for (const f of this.app.vault.getMarkdownFiles()) out.push({ path: f.path, text: await this.app.vault.cachedRead(f), mtime: f.stat.mtime, ctime: f.stat.ctime });
    return out;
  }
  // ── free ──
  async runSetup(lang) {
    this.settings.lang = lang;
    const items = planInstall(lang, (p) => this.exists(p), { pro: this.isPro(), date: this.today() });
    const r = await this.applyPlan(items);
    this.settings.folders = Object.assign({}, L[lang].folders);
    await this.saveData(this.settings);
    new import_obsidian.Notice(fmt(L[lang].ui.created, r));
    const home = this.app.vault.getAbstractFileByPath(L[lang].home + ".md");
    await this.open(home);
    return r;
  }
  async openToday() {
    const F = this.folders(), day = this.today(), p = (0, import_obsidian.normalizePath)(F.daily + "/" + day + ".md");
    let f = this.app.vault.getAbstractFileByPath(p);
    if (!f) {
      let text = dailyNote(this.settings.lang, day);
      if (this.isPro()) {
        const prevPath = lastDailyBefore(this.app.vault.getMarkdownFiles().map((x) => x.path), F, day);
        const prev = prevPath && this.app.vault.getAbstractFileByPath(prevPath);
        if (prev instanceof import_obsidian.TFile) {
          let moved = [];
          await this.app.vault.process(prev, (old) => {
            const r = rollover(old);
            moved = r.moved;
            return r.prevText;
          });
          if (moved.length) {
            text = insertUnder(text, this.t().tpl.daily[1][0], moved);
            new import_obsidian.Notice(fmt(this.t().ui.rolled, { n: moved.length, date: prev.basename }));
          }
        }
      }
      f = await this.writeNew(p, text);
    }
    await this.open(f);
  }
  async newProject(name) {
    name = String(name || "").trim().replace(/[\\/:*?"<>|#^[\]]/g, "-");
    if (!name) return;
    const p = this.folders().projects + "/" + name + ".md";
    const f = await this.writeNew(p, projectNote(this.settings.lang, name, this.today())) || this.app.vault.getAbstractFileByPath((0, import_obsidian.normalizePath)(p));
    await this.open(f);
  }
  async review(kind) {
    const range = period(kind, this.today());
    return computeReview(await this.files(), this.folders(), range, this.today(), this.settings.doneIndex);
  }
  async preview() {
    new PreviewModal(this, await this.review("weekly")).open();
  }
  // ── pro ──
  async writeReview(kind) {
    const lang = this.settings.lang, r = await this.review(kind);
    const p = (0, import_obsidian.normalizePath)(reviewPath(lang, this.folders(), r.range));
    let text = renderReview(lang, r);
    const old = this.app.vault.getAbstractFileByPath(p);
    if (old instanceof import_obsidian.TFile) {
      const head = "\n# " + this.t().review.reflect + "\n", prev = await this.app.vault.read(old), i = prev.indexOf(head), j = text.indexOf(head);
      if (i >= 0 && j >= 0) text = text.slice(0, j) + prev.slice(i);
      await this.app.vault.modify(old, text);
    } else await this.writeNew(p, text);
    new import_obsidian.Notice(fmt(this.t().ui.reviewDone, { path: p }));
    await this.open(this.app.vault.getAbstractFileByPath(p));
  }
  async archive() {
    const plan = archivePlan(await this.files(), this.folders(), this.today());
    if (!plan.length) return new import_obsidian.Notice(this.t().ui.archiveNone);
    new ArchiveModal(this, plan).open();
  }
  async moveProjects(plan) {
    let n = 0;
    for (const it of plan) {
      const src = this.app.vault.getAbstractFileByPath(it.from);
      if (!src || this.exists(it.to)) continue;
      await this.ensureFolder(it.to.split("/").slice(0, -1).join("/"));
      await this.app.fileManager.renameFile(src, it.to);
      n++;
    }
    new import_obsidian.Notice(fmt(this.t().ui.archiveDone, { n }));
  }
  async addProTemplates() {
    const r = await this.applyPlan(proTemplatePlan(this.settings.lang, (p) => this.exists(p), this.folders()));
    new import_obsidian.Notice(fmt(this.t().ui.templatesDone, r));
  }
  // ── licence (only the key you typed goes to getreadystack.com/api/lic) ──
  async validate(key) {
    let offline = false;
    for (const [door, tier] of DOORS) {
      try {
        const r = await (0, import_obsidian.requestUrl)({ url: SITE + "/api/lic?key=" + encodeURIComponent(key) + "&slug=" + encodeURIComponent(door), method: "GET", throw: false });
        if (r.status === 200 && r.json && r.json.ok) return { ok: true, tier, door };
        if (r.status >= 500) offline = true;
      } catch (e) {
        offline = true;
      }
    }
    return { ok: false, offline };
  }
  async enterKey(key) {
    key = String(key || "").trim();
    if (!key) return { ok: false };
    const r = await this.validate(key);
    if (r.ok) Object.assign(this.settings, { key, tier: r.tier, checkedAt: Date.now() });
    await this.saveData(this.settings);
    return r;
  }
  async removeKey() {
    Object.assign(this.settings, { key: "", tier: "free", checkedAt: 0 });
    await this.saveData(this.settings);
  }
  async recheckKey() {
    const s = this.settings;
    if (!s.key || Date.now() - s.checkedAt < RECHECK) return;
    const r = await this.validate(s.key);
    if (r.ok) Object.assign(s, { tier: r.tier, checkedAt: Date.now() });
    else if (!(r.offline && Date.now() - s.checkedAt < GRACE)) s.tier = "free";
    await this.saveData(s);
  }
  door() {
    return (DOORS.find((d) => d[1] === this.settings.tier) || DOORS[0])[0];
  }
  // ── packs ──
  async packIndex() {
    const r = await (0, import_obsidian.requestUrl)({ url: PACK_INDEX, throw: false });
    if (r.status !== 200) throw new Error("index " + r.status);
    return r.json;
  }
  async installPack(id) {
    const r = await (0, import_obsidian.requestUrl)({ url: SITE + "/api/dl/" + this.door() + "?key=" + encodeURIComponent(this.settings.key), throw: false });
    if (r.status !== 200) throw new Error("download " + r.status);
    const all = JSON.parse(new TextDecoder().decode(r.arrayBuffer));
    const pack = (all.packs || []).find((p) => p.id === id);
    if (!pack) throw new Error("no pack " + id);
    const res = await this.applyPlan(packPlan(pack, this.settings.lang, this.folders(), (p) => this.exists(p)));
    new import_obsidian.Notice(fmt(this.t().ui.packDone, res));
    return res;
  }
  // ── done-task index ──
  queueIndex(f) {
    if (!(f instanceof import_obsidian.TFile) || f.extension !== "md") return;
    window.clearTimeout(this.timers.get(f.path));
    this.timers.set(f.path, window.setTimeout(() => {
      this.timers.delete(f.path);
      this.indexFile(f, this.today()).then(() => this.saveSoon());
    }, 1500));
  }
  async indexFile(f, stamp) {
    const done = parseTasks(await this.app.vault.cachedRead(f)).filter((t) => t.done && !t.doneDate).map((t) => taskKey(t.text));
    const old = this.settings.doneIndex[f.path] || {}, next = {};
    for (const k of done) next[k] = k in old ? old[k] : stamp;
    if (done.length) this.settings.doneIndex[f.path] = next;
    else delete this.settings.doneIndex[f.path];
  }
  async scanAll() {
    const first = !this.settings.indexed, stamp = first ? "" : this.today();
    for (const f of this.app.vault.getMarkdownFiles()) await this.indexFile(f, stamp);
    this.settings.indexed = true;
    await this.saveData(this.settings);
  }
};
var SetupModal = class extends import_obsidian.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.lang = plugin.settings.lang;
  }
  onOpen() {
    this.render();
  }
  render() {
    const { contentEl } = this, u = L[this.lang].ui;
    contentEl.empty();
    contentEl.addClass("sv-modal");
    contentEl.createEl("h2", { text: u.setupTitle });
    new import_obsidian.Setting(contentEl).setName(u.lang).addDropdown((d) => {
      LANGS.forEach((l) => d.addOption(l, LANG_NAMES[l]));
      d.setValue(this.lang).onChange((v) => {
        this.lang = v;
        this.render();
      });
    });
    contentEl.createEl("p", { text: u.setupIntro, cls: "sv-muted" });
    const items = planInstall(this.lang, (p) => this.plugin.exists(p), { pro: this.plugin.isPro(), date: this.plugin.today() });
    const ul = contentEl.createEl("ul", { cls: "sv-plan" });
    for (const it of items) {
      const li = ul.createEl("li", { cls: it.exists ? "sv-skip" : "sv-new" });
      li.createSpan({ text: (it.kind === "folder" ? "\u{1F4C1} " : "\u{1F4C4} ") + it.path });
      li.createSpan({ text: " \u2014 " + (it.exists ? u.isThere : u.isNew), cls: "sv-muted" });
    }
    const n = items.filter((x) => !x.exists).length;
    new import_obsidian.Setting(contentEl).addButton((b) => b.setCta().setButtonText(fmt(u.btnCreate, { n })).setDisabled(!n).onClick(async () => {
      this.close();
      await this.plugin.runSetup(this.lang);
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var NameModal = class extends import_obsidian.Modal {
  constructor(plugin, done) {
    super(plugin.app);
    this.plugin = plugin;
    this.done = done;
  }
  onOpen() {
    const u = this.plugin.t().ui, { contentEl } = this;
    contentEl.createEl("h2", { text: u.cmdProject });
    let v = "";
    new import_obsidian.Setting(contentEl).setName(u.projectName).addText((t) => {
      t.onChange((x) => v = x);
      t.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.close();
          this.done(v);
        }
      });
      window.setTimeout(() => t.inputEl.focus(), 0);
    });
    new import_obsidian.Setting(contentEl).addButton((b) => b.setCta().setButtonText(u.btnOk).onClick(() => {
      this.close();
      this.done(v);
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
function paywallBlock(el, plugin) {
  const u = plugin.t().ui;
  const box = el.createDiv({ cls: "sv-pay" });
  box.createEl("h3", { text: u.proTitle });
  box.createEl("p", { text: u.proLine1 });
  box.createEl("p", { text: u.proLine2 });
  box.createEl("p", { text: u.clubLine, cls: "sv-muted" });
  new import_obsidian.Setting(box).addButton((b) => b.setCta().setButtonText(u.btnPro).onClick(() => window.open(BUY.pro))).addButton((b) => b.setButtonText(u.btnClub).onClick(() => window.open(BUY.club))).addButton((b) => b.setButtonText(u.btnYear).onClick(() => window.open(BUY.year))).addButton((b) => b.setButtonText(u.haveKey).onClick(() => new KeyModal(plugin).open()));
}
var PaywallModal = class extends import_obsidian.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  onOpen() {
    this.contentEl.addClass("sv-modal");
    this.contentEl.createEl("p", { text: this.plugin.t().ui.proOnly, cls: "sv-muted" });
    paywallBlock(this.contentEl, this.plugin);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var PreviewModal = class extends import_obsidian.Modal {
  constructor(plugin, r) {
    super(plugin.app);
    this.plugin = plugin;
    this.r = r;
  }
  onOpen() {
    const { contentEl } = this, t = this.plugin.t(), R = t.review, r = this.r;
    contentEl.addClass("sv-modal");
    contentEl.createEl("h2", { text: t.ui.previewTitle + " \xB7 " + r.range.id });
    const tb = contentEl.createEl("table", { cls: "sv-numbers" });
    for (const k of NUMBER_ORDER) {
      const tr = tb.createEl("tr");
      tr.createEl("td", { text: R[k] });
      tr.createEl("td", { text: String(r.numbers[k]), cls: "sv-num" });
    }
    if (r.noNext.length) {
      contentEl.createEl("h3", { text: R.noNextList });
      const ul = contentEl.createEl("ul");
      r.noNext.slice(0, 10).forEach((p) => ul.createEl("li", { text: p.split("/").pop().replace(/\.md$/, "") }));
    }
    if (this.plugin.isPro()) new import_obsidian.Setting(contentEl).addButton((b) => b.setCta().setButtonText(t.ui.cmdWeekly).onClick(() => {
      this.close();
      this.plugin.writeReview("weekly");
    }));
    else paywallBlock(contentEl, this.plugin);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ArchiveModal = class extends import_obsidian.Modal {
  constructor(plugin, plan) {
    super(plugin.app);
    this.plugin = plugin;
    this.plan = plan;
  }
  onOpen() {
    const { contentEl } = this, u = this.plugin.t().ui;
    contentEl.addClass("sv-modal");
    contentEl.createEl("h2", { text: u.archiveTitle });
    const ul = contentEl.createEl("ul", { cls: "sv-plan" });
    this.plan.forEach((it) => ul.createEl("li", { text: it.from + "  \u2192  " + it.to }));
    new import_obsidian.Setting(contentEl).addButton((b) => b.setCta().setButtonText(fmt(u.btnMove, { n: this.plan.length, path: this.plugin.folders().archive })).onClick(async () => {
      this.close();
      await this.plugin.moveProjects(this.plan);
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var KeyModal = class extends import_obsidian.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this, u = this.plugin.t().ui;
    contentEl.createEl("h2", { text: u.keyTitle });
    let v = this.plugin.settings.key || "";
    const msg = contentEl.createEl("p", { cls: "sv-muted" });
    new import_obsidian.Setting(contentEl).addText((t) => {
      t.setPlaceholder(u.keyPh).setValue(v).onChange((x) => v = x);
      t.inputEl.addClass("sv-key");
    });
    new import_obsidian.Setting(contentEl).addButton((b) => b.setCta().setButtonText(u.btnCheck).onClick(async () => {
      const r = await this.plugin.enterKey(v);
      msg.setText(r.ok ? fmt(u.keyOk, { tier: u.tier[r.tier] }) : r.offline ? u.keyOffline : u.keyBad);
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var PacksModal = class extends import_obsidian.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  async onOpen() {
    const { contentEl } = this, p = this.plugin, u = p.t().ui, lang = p.settings.lang;
    contentEl.addClass("sv-modal");
    contentEl.createEl("h2", { text: u.packsTitle });
    contentEl.createEl("p", { text: u.packsIntro, cls: "sv-muted" });
    let idx;
    try {
      idx = await p.packIndex();
    } catch (e) {
      contentEl.createEl("p", { text: u.packsFail });
      return;
    }
    for (const pk of idx.packs || []) {
      const s = new import_obsidian.Setting(contentEl).setName(pk.id + " \xB7 " + (pk.title[lang] || pk.title.en)).setDesc(pk.desc && (pk.desc[lang] || pk.desc.en) || "");
      s.addButton((b) => b.setButtonText(u.btnInstall).onClick(async () => {
        if (!p.isClub()) {
          new import_obsidian.Notice(u.packsNeedClub);
          return new PaywallModal(p).open();
        }
        try {
          await p.installPack(pk.id);
        } catch (e) {
          new import_obsidian.Notice(u.packsFail);
        }
      }));
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};
var SVSettings = class extends import_obsidian.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this, p = this.plugin, u = p.t().ui;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName(u.sLang).setDesc(u.sLangDesc).addDropdown((d) => {
      LANGS.forEach((l) => d.addOption(l, LANG_NAMES[l]));
      d.setValue(p.settings.lang).onChange(async (v) => {
        p.settings.lang = v;
        await p.saveData(p.settings);
        this.display();
      });
    });
    new import_obsidian.Setting(containerEl).setName(u.sFolders).setDesc(Object.values(p.folders()).filter((v, i, a) => a.indexOf(v) === i).join(" \xB7 ")).addButton((b) => b.setButtonText(u.sRerun).onClick(() => new SetupModal(p).open()));
    new import_obsidian.Setting(containerEl).setName(u.sKey).setHeading();
    new import_obsidian.Setting(containerEl).setName(fmt(u.sStatus, { tier: u.tier[p.settings.tier] || u.tier.free })).addButton((b) => b.setButtonText(u.cmdKey).onClick(() => new KeyModal(p).open())).addButton((b) => b.setButtonText(u.btnRemove).setDisabled(!p.settings.key).onClick(async () => {
      await p.removeKey();
      this.display();
    }));
    if (!p.isPro()) paywallBlock(containerEl, p);
    containerEl.createEl("p", { text: u.sNetwork, cls: "sv-muted" });
  }
};

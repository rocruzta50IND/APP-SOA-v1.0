## 🗺️ GLOBAL ROADMAP - [PROJECT NAME]

## READING AND UPDATE RULES

- [x]  = Task structurally completed, approved by the Guardian and mapped in `00-MASTER.md`.
- [ ]  = Pending task. The Agent must convert the first pending task into an Execution Queue in the `mission.md` file.

> ⚠️ **Slicing Directive (Domain Flow):** When converting a Macro Task into a Mission, the Agent MUST focus on solving **1 Complete Domain Flow** at a time. If the task requires deep refactoring in multiple simultaneous domains, the Agent must use the `[PROPAGATION PENDING]` status in the master file.

> 🧹 **Cognitive Hygiene Directive (The Janitor v12.0):** Upon finishing ALL tasks of a PHASE, it is MANDATORY to invoke `.agent/agents/janitor/agent-janitor.md` to clean historical waste from summaries BEFORE starting the first task of the next phase.

---

## PHASE 1: [PHASE_OR_MODULE_NAME_1_E_G_FOUNDATION]

- [ ]  [MACRO_TASK_1_E_G_CONFIGURE_NEXTJS_AND_TAILWIND]
- [ ]  [MACRO_TASK_2_E_G_CREATE_ROUTING_STRUCTURE]
- [ ]  [MACRO_TASK_3_E_G_CONFIGURE_DATABASE]
- [ ]  🛡️ **PHASE CHECKPOINT:** Invoke the Janitor (`.agent/agents/janitor/agent-janitor.md`) to compress memory.

## PHASE 2: [PHASE_OR_MODULE_NAME_2_E_G_AUTHENTICATION]

- [ ]  [MACRO_TASK_1_E_G_INTEGRATE_AUTH_PROVIDER]
- [ ]  [MACRO_TASK_2_E_G_CREATE_PROTECTION_MIDDLEWARE]
- [ ]  [MACRO_TASK_3_E_G_LOGIN_AND_REGISTRATION_PAGE]
- [ ]  🛡️ **PHASE CHECKPOINT:** Invoke the Janitor (`.agent/agents/janitor/agent-janitor.md`) to compress memory.

## PHASE N: [PHASE_OR_MODULE_NAME_N]

- [ ]  [MACRO_TASK_1]
- [ ]  [MACRO_TASK_2]
- [ ]  [MACRO_TASK_3]
- [ ]  🛡️ **PHASE CHECKPOINT:** Invoke the Janitor (`.agent/agents/janitor/agent-janitor.md`) to compress memory.

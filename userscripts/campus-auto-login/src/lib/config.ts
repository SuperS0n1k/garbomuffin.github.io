import { EmptyAutoLogin } from "./auto-login/auto-login";

/// <reference path="../gm.ts" />

declare var GM_config: any;

export class ConfigManager extends EmptyAutoLogin {
  onload(){
    (document.getElementById("install") as HTMLElement).style.display = "none";

    GM_config.open();
  }
}

GM_config.init({
  id: "CampusAutoLoginConfig",
  title: "Campus Auto Login Config",
  fields: {
    OldPortalSupport: {
      label: "Support old portal auto login",
      type: "checkbox",
      title: "Support auto login on campus.district112.org",
      section: "Site Support",
      default: true,
    },

    NewPortalSupport: {
      label: "Support new portal auto login",
      type: "checkbox",
      title: "Support auto login on campus.district112.org (new portal which is deprecated)",
      default: true,
    },

    BIMSupport: {
      label: "Support BIM auto login",
      type: "checkbox",
      title: "Support auto login on bigideasmath.com",
      default: true,
    },

    TCISupport: {
      label: "Support TCI auto login",
      type: "checkbox",
      title: "Support auto login on teachtci.com",
      default: true,
    },

    EmpowerSupport: {
      label: "Support Empower auto login",
      type: "checkbox",
      title: "Support auto login to empower.district112.org",
      default: true,
    },

    WordPlaySupport: {
      label: "Support wordplay auto login",
      type: "checkbox",
      title: "Support auto login to wordplay.com",
      default: true,
    },

    pltwSupport: {
      label: "Support PLTW auto login",
      type: "checkbox",
      title: "Support auto login to my.pltw.org",
      default: true,
    },
    
    pltwSupportAutoStudent: {
      label: "Support PLTW - Automatically select 'I Am a Student'",
      type: "checkbox",
      title: "Automatically hit 'I Am a Student' for my.pltw.org",
      default: false,
    },

    vhlSupport: {
      label: "Support VHL Central auto login",
      type: "checkbox",
      title: "Support auto login to vhlcentral.com",
      default: true,
    },

    GoogleUser: {
      label: "Which spot are you in in your Google user list? This can click that for you. -1 to disable. The first user is 0, second is 1, third is 2 etc. https://i.imgur.com/tqafElG.png",
      type: "int",
      title: "Should it automatically click on buttons from empower requesting drive acess. Actually granting that is covered later.",
      section: "Google",
      default: -1,
    },

    GoogleGrantPermissions: {
      label: "Grant Google permissions to empower",
      type: "checkbox",
      title: "Should it automatically click on buttons from Google to give Empower drive permissions.",
      default: true,
    }
  },
});

var foundMissing = false;

export const CONFIG = {
  SUPPORT_OLD_CAMPUS: getOrDefault("OldPortalSupport", true),
  SUPPORT_NEW_CAMPUS: getOrDefault("NewPortalSupport", true),
  SUPPORT_TCI: getOrDefault("TCISupport", true),
  SUPPORT_BIM: getOrDefault("BIMSupport", true),
  SUPPORT_EMPOWER: getOrDefault("EmpowerSupport", true),
  SUPPORT_WORDPLAY: getOrDefault("WordPlaySupport", true),
  SUPPORT_PLTW: getOrDefault("pltwSupport", true),
  SUPPORT_PLTW_AUTO_STUDENT: getOrDefault("pltwSupportAutoStudent", true),
  SUPPORT_VHL: getOrDefault("vhlSupport", true),
  GOOGLE: {
    USER: getOrDefault("GoogleUser", -1),
    CONSENT: getOrDefault("GoogleGrantPermissions", true),
  }
};

function getOrDefault(key: string, def: any): any {
  const val = GM_config.get(key);
  if (typeof val !== "undefined"){
    return val;
  }else{
    GM_config.set(key, def);
    foundMissing = true;
    return def;
  }
}

if (foundMissing) {
  GM_config.save();
}

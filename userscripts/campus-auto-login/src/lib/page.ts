export enum PageState {
  Normal,
  Error,
  Captcha
}

export enum PageType {
  CampusNew,
  CampusOld,
  TCI,
  BIM,
  Empower,
  GoogleChooseAccount,
  GoogleConsent,
  WordPlay,
  Config,
  VHL,
  PLTW,
}

export function getPageType(): PageType | null {
  if (location.host === "student.teachtci.com" && location.href.indexOf("student/sign_in") > -1) {
    return PageType.TCI;
  } else if (location.host === "campus.district112.org" && location.href.indexOf("campus/portal/isd112.jsp") > -1) {
    return PageType.CampusOld;
  } else if (location.host === "campus.district112.org" && location.href.indexOf("campus/portal/students/isd112") > -1) {
    return PageType.CampusNew;
  } else if (location.host === "bigideasmath.com" && location.href.indexOf("bigideasmath.com/BIM/login") > -1) {
    return PageType.BIM;
  } else if (location.host === "empower.district112.org" && location.href.indexOf("default.aspx") > -1) {
    return PageType.Empower;
  } else if (location.host === "accounts.google.com" && location.href.indexOf("signin/oauth/consent") > -1) {
    return PageType.GoogleConsent;
  } else if (location.host === "accounts.google.com" && location.href.indexOf("signin/oauth") > -1) {
    return PageType.GoogleChooseAccount;
  } else if (location.host === "wordplay.com") {
    return PageType.WordPlay;
  } else if (location.host === "pltw.auth0.com") {
    return PageType.PLTW;
  } else if (location.host === "www.vhlcentral.com" && (location.pathname === "/" || location.pathname === "/user_session")) {
    return PageType.VHL;
  } else if (location.host === "garbomuffin.github.io" && location.href.indexOf("userscripts/campus-auto-login/config.html") > -1) {
    return PageType.Config;
  } else {
    return null;
  }
}

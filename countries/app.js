(function() {
  "use strict";

  const memes =
    ["W3sibmFtZSI6IkFsYmFuaWEiLCJ0cmlnZ2VycyI6W1siXkFMQkFOSUEiXV19LHsibmFtZSI6IkFuZG9ycmEiLCJ0cmlnZ2VycyI6W1siXkFORE9SUkEiLCJeQU5ET1JBIl1dfSx7Im5hbWUiOiJBdXN0cmlhIiwidHJpZ2dlcnMiOltbIl5BVVNUUklBIl1dfSx7Im5hbWUiOiJCZWxhcnVzIiwidHJpZ2dlcnMiOltbIl5CRUxbQUVJXVJVUyJdXX0seyJuYW1lIjoiQmVsZ2l1bSIsInRyaWdnZXJzIjpbWyJeQkVMRyhJVXxVSSlNIl1dfSx7Im5hbWUiOiJCb3NuaWEgYW5kPGJyPkhlcnplZ292aW5hIiwidHJpZ2dlcnMiOltbIl5CT1NOSUEiXV19LHsibmFtZSI6IkJ1bGdhcmlhIiwidHJpZ2dlcnMiOltbIl5CVUxHQVJJQSJdXX0seyJuYW1lIjoiQ3JvYXRpYSIsInRyaWdnZXJzIjpbWyJeQ1JPQVRJQSJdXX0seyJuYW1lIjoiQ3plY2ggUmVwdWJsaWMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP0NaRUNIUkVQVUJMSUMiLCJeQ1pFQ0hJQSJdXX0seyJuYW1lIjoiRGVubWFyayIsInRyaWdnZXJzIjpbWyJeREVOTUFSSyJdXX0seyJuYW1lIjoiRXN0b25pYSIsInRyaWdnZXJzIjpbWyJeRVNUT05JQSJdXX0seyJuYW1lIjoiRmlubGFuZCIsInRyaWdnZXJzIjpbWyJeRklOTEFORCJdXX0seyJuYW1lIjoiRnJhbmNlIiwidHJpZ2dlcnMiOltbIl5GUkFOQ0UiXV19LHsibmFtZSI6Ikdlcm1hbnkiLCJ0cmlnZ2VycyI6W1siXkdFUk1BTlkiXV19LHsibmFtZSI6IkdyZWVjZSIsInRyaWdnZXJzIjpbWyJeR1JFRUNFIl1dfSx7Im5hbWUiOiJIdW5nYXJ5IiwidHJpZ2dlcnMiOltbIl5IVU5HW0FFXVJZIl1dfSx7Im5hbWUiOiJJY2VsYW5kIiwidHJpZ2dlcnMiOltbIl5JQ0VMQU5EIl1dfSx7Im5hbWUiOiJJcmVsYW5kIiwidHJpZ2dlcnMiOltbIl5JUkVMQU5EIl1dfSx7Im5hbWUiOiJJdGFseSIsInRyaWdnZXJzIjpbWyJeSVRBTFkiXV19LHsibmFtZSI6Iktvc292byIsInRyaWdnZXJzIjpbWyJeS09TT1ZPIl1dfSx7Im5hbWUiOiJMYXR2aWEiLCJ0cmlnZ2VycyI6W1siXkxBVFZJQSJdXX0seyJuYW1lIjoiTGllY2h0ZW5zdGVpbiIsInRyaWdnZXJzIjpbWyJeTFtFSV0rW0NIVF0rRU5TVChFSXxJRSlOIl1dfSx7Im5hbWUiOiJMaXRodWFuaWEiLCJ0cmlnZ2VycyI6W1siXkxJVEhVQU5JQSJdXX0seyJuYW1lIjoiTHV4ZW1ib3VyZyIsInRyaWdnZXJzIjpbWyJeTFVYRU1CW0VPVV0rUkciXV19LHsibmFtZSI6Ik1hY2Vkb25pYSIsInRyaWdnZXJzIjpbWyJeTUFDW0FFSV1ET05JQSIsIl5GWVJPTSJdXX0seyJuYW1lIjoiTWFsdGEiLCJ0cmlnZ2VycyI6W1siXk1BTFRBIl1dfSx7Im5hbWUiOiJNb2xkb3ZhIiwidHJpZ2dlcnMiOltbIl5NT0xET1ZBIl1dfSx7Im5hbWUiOiJNb25hY28iLCJ0cmlnZ2VycyI6W1siXk1bQU9dTltBRUlPXUNPIl1dfSx7Im5hbWUiOiJNb250ZW5lZ3JvIiwidHJpZ2dlcnMiOltbIl5NT05UW0FFSV1ORUdSTyJdXX0seyJuYW1lIjoiTmV0aGVybGFuZHMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP05FVEhFUkxBTkRTIiwiXkhPTExBTkQiXV19LHsibmFtZSI6Ik5vcndheSIsInRyaWdnZXJzIjpbWyJeTk9SV0FZIl1dfSx7Im5hbWUiOiJQb2xhbmQiLCJ0cmlnZ2VycyI6W1siXlBPTEFORCJdXX0seyJuYW1lIjoiUG9ydHVnYWwiLCJ0cmlnZ2VycyI6W1siXlBPUlRVR0FMIl1dfSx7Im5hbWUiOiJSb21hbmlhIiwidHJpZ2dlcnMiOltbIl5ST01BTklBIl1dfSx7Im5hbWUiOiJSdXNzaWEiLCJ0cmlnZ2VycyI6W1siXlJVU1NJQSJdXX0seyJuYW1lIjoiU2FuIE1hcmlubyIsInRyaWdnZXJzIjpbWyJeU0FOTUFSSU5PIl1dfSx7Im5hbWUiOiJTZXJiaWEiLCJ0cmlnZ2VycyI6W1siXlNFUkJJQSJdXX0seyJuYW1lIjoiU2xvdmFraWEiLCJ0cmlnZ2VycyI6W1siXlNMT1ZBS0lBIl1dfSx7Im5hbWUiOiJTbG92ZW5pYSIsInRyaWdnZXJzIjpbWyJeU0xPVkVOSUEiXV19LHsibmFtZSI6IlNwYWluIiwidHJpZ2dlcnMiOltbIl5TUEFJTiJdXX0seyJuYW1lIjoiU3dlZGVuIiwidHJpZ2dlcnMiOltbIl5TV0VERU4iXV19LHsibmFtZSI6IlN3aXR6ZXJsYW5kIiwidHJpZ2dlcnMiOltbIl5TV0lUWkVSTEFORCJdXX0seyJuYW1lIjoiVWtyYWluZSIsInRyaWdnZXJzIjpbWyJeVUtSQUlORSIsIl5USEVVS1JBSU5FIl1dfSx7Im5hbWUiOiJVbml0ZWQgS2luZ2RvbSIsInRyaWdnZXJzIjpbWyJeKFRIRSk",
    "KFVOSVRFREtJTkdET018VUspIiwiXihHUkVBVCk",
    "QlJJVEFJTiJdXX0seyJuYW1lIjoiVmF0aWNhbiBDaXR5IiwidHJpZ2dlcnMiOltbIl4oVEhFKT8oVkFUSUNBTnxIT0xZU0VFKSJdXX0seyJuYW1lIjoiQWZnaGFuaXN0YW4iLCJ0cmlnZ2VycyI6W1siXkFGR0g",
    "QU5bQUVJXVNUQU4iXV19LHsibmFtZSI6IkFybWVuaWEiLCJ0cmlnZ2VycyI6W1siXkFSTUVOSUEiXV19LHsibmFtZSI6IkF6ZXJiYWlqYW4iLCJ0cmlnZ2VycyI6W1siXkFEP1tKWl1FUkJbQUlFXStEP1tKWl1BTiJdXX0seyJuYW1lIjoiQmFocmFpbiIsInRyaWdnZXJzIjpbWyJeQkg",
    "QUg",
    "UkFJTiJdXX0seyJuYW1lIjoiQmFuZ2xhZGVzaCIsInRyaWdnZXJzIjpbWyJeQkFOR0xbQUVJXURFU0giXV19LHsibmFtZSI6IkJodXRhbiIsInRyaWdnZXJzIjpbWyJeQkg",
    "VUg",
    "VEFOIl1dfSx7Im5hbWUiOiJCcnVuZWkiLCJ0cmlnZ2VycyI6W1siXkJSVU5bQUVdSSJdXX0seyJuYW1lIjoiQ2FtYm9kaWEiLCJ0cmlnZ2VycyI6W1siXkNBTUJPRElBIl1dfSx7Im5hbWUiOiJDaGluYSIsInRyaWdnZXJzIjpbWyJeQ0hJTkEiLCJeUFJDIl1dfSx7Im5hbWUiOiJDeXBydXMiLCJ0cmlnZ2VycyI6W1siXkNZUFJVUyJdXX0seyJuYW1lIjoiRWFzdCBUaW1vciIsInRyaWdnZXJzIjpbWyJeRUFTVFRJTU9SIiwiXlRJTU9STEVTVEUiXV19LHsibmFtZSI6Ikdlb3JnaWEiLCJ0cmlnZ2VycyI6W1siXkdFT1JHSUEiXV19LHsibmFtZSI6IkluZGlhIiwidHJpZ2dlcnMiOltbIl5JTkRJQSJdXX0seyJuYW1lIjoiSW5kb25lc2lhIiwidHJpZ2dlcnMiOltbIl5JTkRPTkVTSUEiXV19LHsibmFtZSI6IklyYW4iLCJ0cmlnZ2VycyI6W1siXklSQU4iXV19LHsibmFtZSI6IklyYXEiLCJ0cmlnZ2VycyI6W1siXklSQVEiXV19LHsibmFtZSI6IklzcmFlbCIsInRyaWdnZXJzIjpbWyJeSVNSKEFFfEVBKUwiXV19LHsibmFtZSI6IkphcGFuIiwidHJpZ2dlcnMiOltbIl5KQVBBTiJdXX0seyJuYW1lIjoiSm9yZGFuIiwidHJpZ2dlcnMiOltbIl5KT1JEQU4iLCJeSk9SREVOIl1dfSx7Im5hbWUiOiJLYXpha2hzdGFuIiwidHJpZ2dlcnMiOltbIl5LSD9BWltBLVpdK1NUQU4iXV19LHsibmFtZSI6Ikt1d2FpdCIsInRyaWdnZXJzIjpbWyJeS1VXQUlUIl1dfSx7Im5hbWUiOiJLeXJneXpzdGFuIiwidHJpZ2dlcnMiOltbIl5LW0lZXVJHW0EtWl0rU1RBTiJdXX0seyJuYW1lIjoiTGFvcyIsInRyaWdnZXJzIjpbWyJeTEFPUyJdXX0seyJuYW1lIjoiTGViYW5vbiIsInRyaWdnZXJzIjpbWyJeTEVCW0FFSV1OT04iXV19LHsibmFtZSI6Ik1hbGF5c2lhIiwidHJpZ2dlcnMiOltbIl5NQUxBWVNJQSJdXX0seyJuYW1lIjoiTWFsZGl2ZXMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP01BTERJVkVTIl1dfSx7Im5hbWUiOiJNb25nb2xpYSIsInRyaWdnZXJzIjpbWyJeTU9OR09MSUEiXV19LHsibmFtZSI6Ik15YW5tYXIiLCJ0cmlnZ2VycyI6W1siXkJVUk1BIiwiXk1ZQU5NQVIiXV19LHsibmFtZSI6Ik5lcGFsIiwidHJpZ2dlcnMiOltbIl5ORVBBTCJdXX0seyJuYW1lIjoiTm9ydGggS29yZWEiLCJ0cmlnZ2VycyI6W1siXk5PUlRIS09SRUEiLCJeRFBSSyJdXX0seyJuYW1lIjoiT21hbiIsInRyaWdnZXJzIjpbWyJeT01BTiJdXX0seyJuYW1lIjoiUGFraXN0YW4iLCJ0cmlnZ2VycyI6W1siXlBBS1tBRUldU1RBTiJdXX0seyJuYW1lIjoiUGhpbGlwcGluZXMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP1BISUwrW0FFSV1QK0lORVMiXV19LHsibmFtZSI6IlFhdGFyIiwidHJpZ2dlcnMiOltbIl5RQVRBUiJdXX0seyJuYW1lIjoiU2F1ZGkgQXJhYmlhIiwidHJpZ2dlcnMiOltbIl5TQVVESUFSQUJJQSJdXX0seyJuYW1lIjoiU2luZ2Fwb3JlIiwidHJpZ2dlcnMiOltbIl5TSU5HW0FFSU9dUE9SRSJdXX0seyJuYW1lIjoiU291dGggS29yZWEiLCJ0cmlnZ2VycyI6W1siXlNPVVRIS09SRUEiLCJeUk9LIl1dfSx7Im5hbWUiOiJTcmkgTGFua2EiLCJ0cmlnZ2VycyI6W1siXlNSSUxBTktBIl1dfSx7Im5hbWUiOiJTeXJpYSIsInRyaWdnZXJzIjpbWyJeU1lSSUEiXV19LHsibmFtZSI6IlRhaXdhbiIsInRyaWdnZXJzIjpbWyJeVChBSXxJQSlXQU4iXV19LHsibmFtZSI6IlRhamlraXN0YW4iLCJ0cmlnZ2VycyI6W1siXlRBSltBLVpdK1NUQU4iXV19LHsibmFtZSI6IlRoYWlsYW5kIiwidHJpZ2dlcnMiOltbIl5USEFJTEFORCJdXX0seyJuYW1lIjoiVHVya2V5IiwidHJpZ2dlcnMiOltbIl5UVVJLRVkiXV19LHsibmFtZSI6IlR1cmttZW5pc3RhbiIsInRyaWdnZXJzIjpbWyJeVFVSS01FTltBRUldU1RBTiJdXX0seyJuYW1lIjoiVW5pdGVkIEFyYWIgRW1pcmF0ZXMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP1VOSVRFREFSQUJFTVtBRUldUkFURVMiLCJeVUFFIl1dfSx7Im5hbWUiOiJVemJla2lzdGFuIiwidHJpZ2dlcnMiOltbIl5VWkJFW0NLXStbQUVJXVNUQU4iXV19LHsibmFtZSI6IlZpZXRuYW0iLCJ0cmlnZ2VycyI6W1siXlZJRVROQU0iXV19LHsibmFtZSI6IlllbWVuIiwidHJpZ2dlcnMiOltbIl5ZRU1FTiJdXX0seyJuYW1lIjoiQWxnZXJpYSIsInRyaWdnZXJzIjpbWyJeQUxHRVJbSUVdQSJdXX0seyJuYW1lIjoiQW5nb2xhIiwidHJpZ2dlcnMiOltbIl5BTkdPTEEiXV19LHsibmFtZSI6IkJlbmluIiwidHJpZ2dlcnMiOltbIl5CRU5JTiJdXX0seyJuYW1lIjoiQm90c3dhbmEiLCJ0cmlnZ2VycyI6W1siXkJPVFNXQU5BIl1dfSx7Im5hbWUiOiJCdXJraW5hIEZhc28iLCJ0cmlnZ2VycyI6W1siXkJVUktJTkFGQVNPIl1dfSx7Im5hbWUiOiJCdXJ1bmRpIiwidHJpZ2dlcnMiOltbIl5CW0FFSVVdUlVOREkiXV19LHsibmFtZSI6IkNhbWVyb29uIiwidHJpZ2dlcnMiOltbIl5DQU1bQUVJT11ST09OIl1dfSx7Im5hbWUiOiJDYXBlIFZlcmRlIiwidHJpZ2dlcnMiOltbIl5DQVBFVkVSREUiLCJeQ0FCT1ZFUkRFIl1dfSx7Im5hbWUiOiJDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP0NFTlRSQUxBRlJJQ0FOUkVQVUJMSUMiLCJeQ0FSIl1dfSx7Im5hbWUiOiJDaGFkIiwidHJpZ2dlcnMiOltbIl5DSEFEIl1dfSx7Im5hbWUiOiJDb21vcm9zIiwidHJpZ2dlcnMiOltbIl4oVEhFKT9DT00rW0FFSU9dUk9TIl1dfSx7Im5hbWUiOiJDb3RlIGQnSXZvaXJlIiwidHJpZ2dlcnMiOltbIl5DT1RFREU",
    "SVZbSU9dK1JFIiwiXihUSEUpP0lWT1JZQ09BU1QiXV19LHsibmFtZSI6IkRlbW9jcmF0aWMgUmVwdWJsaWM8YnI+b2YgdGhlIENvbmdvIiwidHJpZ2dlcnMiOltbIkNPTkdPIiwiXkRSQyJdXX0seyJuYW1lIjoiRGppYm91dGkiLCJ0cmlnZ2VycyI6W1siXkRKW0FFSV1CKE9VfFVPfFUpVEkiXV19LHsibmFtZSI6IkVneXB0IiwidHJpZ2dlcnMiOltbIl5FR1lQVCJdXX0seyJuYW1lIjoiRXF1YXRvcmlhbCBHdWluZWEiLCJ0cmlnZ2VycyI6W1siXkVRVVtBRUldVE9SKElBfEVBKUxHKFVJfElVKU5FQSJdXX0seyJuYW1lIjoiRXJpdHJlYSIsInRyaWdnZXJzIjpbWyJeRVIrW0FFSV1UUltFSV1BIl1dfSx7Im5hbWUiOiJFdGhpb3BpYSIsInRyaWdnZXJzIjpbWyJeRVRISU9QSUEiXV19LHsibmFtZSI6IkdhYm9uIiwidHJpZ2dlcnMiOltbIl5HQUJPTiJdXX0seyJuYW1lIjoiR2FtYmlhIiwidHJpZ2dlcnMiOltbIl4oVEhFKT9HQU1CSUEiXV19LHsibmFtZSI6IkdoYW5hIiwidHJpZ2dlcnMiOltbIl5HSD9BSD9OQSJdXX0seyJuYW1lIjoiR3VpbmVhIiwidHJpZ2dlcnMiOltbIl5HKFVJfElVKU5FQSJdXX0seyJuYW1lIjoiR3VpbmVhLUJpc3NhdSIsInRyaWdnZXJzIjpbWyJeRyhVSXxJVSlORUFCW0FFSV1TK0FVIl1dfSx7Im5hbWUiOiJLZW55YSIsInRyaWdnZXJzIjpbWyJeS0VOWUEiXV19LHsibmFtZSI6Ikxlc290aG8iLCJ0cmlnZ2VycyI6W1siXkxbQUVPXVNPVEhPIl1dfSx7Im5hbWUiOiJMaWJlcmlhIiwidHJpZ2dlcnMiOltbIl5MSUJFUklBIl1dfSx7Im5hbWUiOiJMaWJ5YSIsInRyaWdnZXJzIjpbWyJeTElCWUEiXV19LHsibmFtZSI6Ik1hZGFnYXNjYXIiLCJ0cmlnZ2VycyI6W1siXk1BRFtBRUlPXUdBU0NBUiJdXX0seyJuYW1lIjoiTWFsYXdpIiwidHJpZ2dlcnMiOltbIl5NQUxBV0kiXV19LHsibmFtZSI6Ik1hbGkiLCJ0cmlnZ2VycyI6W1siXk1BTEkiXV19LHsibmFtZSI6Ik1hdXJpdGFuaWEiLCJ0cmlnZ2VycyI6W1siXk1bQU9VXStSW0FFSU9dVEFOSUEiXV19LHsibmFtZSI6Ik1hdXJpdGl1cyIsInRyaWdnZXJzIjpbWyJeTVtBT1VdK1JJVFtJT1VdK1MiXV19LHsibmFtZSI6Ik1vcm9jY28iLCJ0cmlnZ2VycyI6W1siXk1PUitPQytPIl1dfSx7Im5hbWUiOiJNb3phbWJpcXVlIiwidHJpZ2dlcnMiOltbIl5NT1pBTUJJUVVFIl1dfSx7Im5hbWUiOiJOYW1pYmlhIiwidHJpZ2dlcnMiOltbIl5OQU1JQklBIl1dfSx7Im5hbWUiOiJOaWdlciIsInRyaWdnZXJzIjpbWyJeTklHRVIiXV19LHsibmFtZSI6Ik5pZ2VyaWEiLCJ0cmlnZ2VycyI6W1siXk5JR0VSSUEiXV19LHsibmFtZSI6IlJlcHVibGljIG9mIHRoZSBDb25nbyIsInRyaWdnZXJzIjpbWyJDT05HTyJdXX0seyJuYW1lIjoiUndhbmRhIiwidHJpZ2dlcnMiOltbIl5SW1dVXUFOREEiXV19LHsibmFtZSI6IlPjbyBUb23pIGFuZCBQcu1uY2lwZSIsInRyaWdnZXJzIjpbWyJeU0FPVE9NRSJdXX0seyJuYW1lIjoiU2VuZWdhbCIsInRyaWdnZXJzIjpbWyJeU0VOW0FFSV1HQUwiXV19LHsibmFtZSI6IlNleWNoZWxsZXMiLCJ0cmlnZ2VycyI6W1siXlNFWUNIRUwrRVMiXV19LHsibmFtZSI6IlNpZXJyYSBMZW9uZSIsInRyaWdnZXJzIjpbWyJeU0lFUitBTEVPTkUiXV19LHsibmFtZSI6IlNvbWFsaWEiLCJ0cmlnZ2VycyI6W1siXlNPTVtBT11MSUEiXV19LHsibmFtZSI6IlNvdXRoIEFmcmljYSIsInRyaWdnZXJzIjpbWyJeU09VVEhBRlJJQ0EiXV19LHsibmFtZSI6IlNvdXRoIFN1ZGFuIiwidHJpZ2dlcnMiOltbIl5TT1VUSChFUk4pP1NVREFOIl1dfSx7Im5hbWUiOiJTdWRhbiIsInRyaWdnZXJzIjpbWyJeU1VEQU4iXV19LHsibmFtZSI6IlN3YXppbGFuZCIsInRyaWdnZXJzIjpbWyJeU1dBWklMQU5EIl1dfSx7Im5hbWUiOiJUYW56YW5pYSIsInRyaWdnZXJzIjpbWyJeVEFOWkFOSUEiXV19LHsibmFtZSI6IlRvZ28iLCJ0cmlnZ2VycyI6W1siXlRPR08iXV19LHsibmFtZSI6IlR1bmlzaWEiLCJ0cmlnZ2VycyI6W1siXlRVTltFSV1TSUEiXV19LHsibmFtZSI6IlVnYW5kYSIsInRyaWdnZXJzIjpbWyJeVUdBTkRBIl1dfSx7Im5hbWUiOiJaYW1iaWEiLCJ0cmlnZ2VycyI6W1siXlpBTUJJQSJdXX0seyJuYW1lIjoiWmltYmFid2UiLCJ0cmlnZ2VycyI6W1siXlpJTUJBQldFIl1dfSx7Im5hbWUiOiJBbnRpZ3VhIGFuZCBCYXJidWRhIiwidHJpZ2dlcnMiOltbIl5BTlRJR1VBIiwiXkJBUkJbT1VdK0RBIl1dfSx7Im5hbWUiOiJCYWhhbWFzIiwidHJpZ2dlcnMiOltbIl4oVEhFKT9CQUhBTUFTIl1dfSx7Im5hbWUiOiJCYXJiYWRvcyIsInRyaWdnZXJzIjpbWyJeQkFSQkFET1MiXV19LHsibmFtZSI6IkJlbGl6ZSIsInRyaWdnZXJzIjpbWyJeQkVMSVpFIl1dfSx7Im5hbWUiOiJDYW5hZGEiLCJ0cmlnZ2VycyI6W1siXkNBTkFEQSJdXX0seyJuYW1lIjoiQ29zdGEgUmljYSIsInRyaWdnZXJzIjpbWyJeQ09TVEFSSUNBIl1dfSx7Im5hbWUiOiJDdWJhIiwidHJpZ2dlcnMiOltbIl5DVUJBIl1dfSx7Im5hbWUiOiJEb21pbmljYSIsInRyaWdnZXJzIjpbWyJeRE9NSU5bQUVJXUNBIl1dfSx7Im5hbWUiOiJEb21pbmljYW4gUmVwdWJsaWMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP0RPTUlOW0FFSV1DQU5SRVBVQkxJQyJdXX0seyJuYW1lIjoiRWwgU2FsdmFkb3IiLCJ0cmlnZ2VycyI6W1siXkVMU0FMVltBRUldRE9SIl1dfSx7Im5hbWUiOiJHcmVuYWRhIiwidHJpZ2dlcnMiOltbIl5HUltBRUldTkFEQSJdXX0seyJuYW1lIjoiR3VhdGVtYWxhIiwidHJpZ2dlcnMiOltbIl5HKEFVfFVBKVRbQUVJXU1BTEEiXV19LHsibmFtZSI6IkhhaXRpIiwidHJpZ2dlcnMiOltbIl5IQUlUSSJdXX0seyJuYW1lIjoiSG9uZHVyYXMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP0hPTkRVUltBRUlPVV0rUyJdXX0seyJuYW1lIjoiSmFtYWljYSIsInRyaWdnZXJzIjpbWyJeSkFNKEFJfElBKUNBIl1dfSx7Im5hbWUiOiJNZXhpY28iLCJ0cmlnZ2VycyI6W1siXk1FWElDTyJdXX0seyJuYW1lIjoiTmljYXJhZ3VhIiwidHJpZ2dlcnMiOltbIl5OSUNbQUVJXVJBR1VBIl1dfSx7Im5hbWUiOiJQYW5hbWEiLCJ0cmlnZ2VycyI6W1siXlBBTkFNQSJdXX0seyJuYW1lIjoiU2FpbnQgS2l0dHMgYW5kIE5ldmlzIiwidHJpZ2dlcnMiOltbIl4oU0FJTlR8U1QpS0lUVFMiXV19LHsibmFtZSI6IlNhaW50IEx1Y2lhIiwidHJpZ2dlcnMiOltbIl4oU0FJTlR8U1QpTFVDSUEiXV19LHsibmFtZSI6IlNhaW50IFZpbmNlbnQgYW5kIHRoZTxicj5HcmVuYWRpbmVzIiwidHJpZ2dlcnMiOltbIl4oU0FJTlR8U1QpVklOQ0VOVCJdXX0seyJuYW1lIjoiVHJpbmlkYWQgYW5kIFRvYmFnbyIsInRyaWdnZXJzIjpbWyJeVFJJTltBRUldREFEIl1dfSx7Im5hbWUiOiJVbml0ZWQgU3RhdGVzIiwidHJpZ2dlcnMiOltbIl4oVEhFKT8oVU5JVEVEU1RBVEVTfFVOSVRFRCBTVEFURVN8VVNBKSIsIl5BTUVSSUNBIl1dfSx7Im5hbWUiOiJBcmdlbnRpbmEiLCJ0cmlnZ2VycyI6W1siXkFSR1tBRUldTlRJTkEiXV19LHsibmFtZSI6IkJvbGl2aWEiLCJ0cmlnZ2VycyI6W1siXkJPTElWSUEiXV19LHsibmFtZSI6IkJyYXppbCIsInRyaWdnZXJzIjpbWyJeQlJBW1NaXUlMIl1dfSx7Im5hbWUiOiJDaGlsZSIsInRyaWdnZXJzIjpbWyJeQ0hJTEUiXV19LHsibmFtZSI6IkNvbG9tYmlhIiwidHJpZ2dlcnMiOltbIl5DT0xPTUJJQSIsIl5DT0xVTUJJQSJdXX0seyJuYW1lIjoiRWN1YWRvciIsInRyaWdnZXJzIjpbWyJeRUMoVUF8QVUpRE9SIl1dfSx7Im5hbWUiOiJHdXlhbmEiLCJ0cmlnZ2VycyI6W1siXkdbQVVdWUFOQSJdXX0seyJuYW1lIjoiUGFyYWd1YXkiLCJ0cmlnZ2VycyI6W1siXlBBUltBRUldR1tBVV0rWSJdXX0seyJuYW1lIjoiUGVydSIsInRyaWdnZXJzIjpbWyJeUEVSVSJdXX0seyJuYW1lIjoiU3VyaW5hbWUiLCJ0cmlnZ2VycyI6W1siXlNVUltBRUldTkFNRSJdXX0seyJuYW1lIjoiVXJ1Z3VheSIsInRyaWdnZXJzIjpbWyJeVVJbQVVdR1tBVV0rWSJdXX0seyJuYW1lIjoiVmVuZXp1ZWxhIiwidHJpZ2dlcnMiOltbIl5WRU5bQUVJXVooRVV8VUUpTEEiXV19LHsibmFtZSI6IkF1c3RyYWxpYSIsInRyaWdnZXJzIjpbWyJeQVVTVFJBST9MW0VJXUEiXV19LHsibmFtZSI6IkZlZGVyYXRlZCBTdGF0ZXMgb2Y8YnI+TWljcm9uZXNpYSIsInRyaWdnZXJzIjpbWyJNSUNST05FU0lBIl1dfSx7Im5hbWUiOiJGaWppIiwidHJpZ2dlcnMiOltbIl5GSUpJIl1dfSx7Im5hbWUiOiJLaXJpYmF0aSIsInRyaWdnZXJzIjpbWyJeS0lSW0FFSV1CQVRJIl1dfSx7Im5hbWUiOiJNYXJzaGFsbCBJc2xhbmRzIiwidHJpZ2dlcnMiOltbIl4oVEhFKT9NQVJTSEFMTElTTEFORFMiXV19LHsibmFtZSI6Ik5hdXJ1IiwidHJpZ2dlcnMiOltbIl5OKEFVfFVBKVJVIl1dfSx7Im5hbWUiOiJOZXcgWmVhbGFuZCIsInRyaWdnZXJzIjpbWyJeTkVXWkVbQUVdTEFORCJdXX0seyJuYW1lIjoiUGFsYXUiLCJ0cmlnZ2VycyI6W1siXlBBTEFVIl1dfSx7Im5hbWUiOiJQYXB1YSBOZXcgR3VpbmVhIiwidHJpZ2dlcnMiOltbIl4oUEFQW0FVXSspP05FV0coVUl8SVUpTkVBIiwiXlBORyJdXX0seyJuYW1lIjoiU2Ftb2EiLCJ0cmlnZ2VycyI6W1siXlNbQU9dTU9BIl1dfSx7Im5hbWUiOiJTb2xvbW9uIElzbGFuZHMiLCJ0cmlnZ2VycyI6W1siXihUSEUpP1NPTFtBRUlPXU1bQUVPXU5JU0xBTkRTIl1dfSx7Im5hbWUiOiJUb25nYSIsInRyaWdnZXJzIjpbWyJeVE9OR0EiXV19LHsibmFtZSI6IlR1dmFsdSIsInRyaWdnZXJzIjpbWyJeVFVWW0FVXUxVIl1dfSx7Im5hbWUiOiJWYW51YXR1IiwidHJpZ2dlcnMiOltbIl5WQU5bVUFdK1RVIl1dfV0="];

  const countries = JSON.parse(atob(memes.join("/")));
  countries.forEach(i => i.done = false);
  countries.forEach(i => i.triggers = i.triggers.map(t => t.map(k => new RegExp(k, "i"))));
  countries.forEach(i => {
    const flat = [];
    for (const a of i.triggers) {
      for (const t of a) {
        flat.push(t);
      }
    }
    i.triggers = flat;
  });

  const landingDiv = document.getElementById("landing");
  const totalCountries = countries.length;

  const appDiv = document.getElementById("app");
  const inputEl = document.getElementById("input");
  const namedCountriesEl = document.getElementById("named");
  const totalCountriesEl = document.getElementById("total");
  const timerEl = document.getElementById("timer");

  const winDiv = document.getElementById("win");
  const winTimer = document.getElementById("win-time");
  const cheater = document.getElementById("cheater");

  let startingTime = 0;
  let lastTime = 0;
  let stopped = false;

  totalCountriesEl.innerHTML = countries.length;
  namedCountriesEl.innerHTML = "0";

  document.getElementById("start").addEventListener("click", () => start());
  inputEl.addEventListener("keyup", () => onchange());

  function onchange() {
    const value = inputEl.value.replace(/ /g, "");

    parent:
    for (const c of countries) {
      if (c.done) continue;
      for (const t of c.triggers) {
        if (t.test(value)) {
          c.done = true;
          update();
          break parent;
        }
      }
    }
  }

  function update() {
    const named = countries.filter(c => c.done).length;
    namedCountriesEl.innerHTML = named;
    inputEl.value = "";
    if (named === totalCountries) {
      win();
    }
  }

  function win() {
    appDiv.style.display = "none";
    winDiv.style.display = "block";
    stopped = true;
    winTimer.textContent = lastTime.formatted;
    if (lastTime.minutes === 0) {
      cheater.style.display = "block";
    }
    fetch("https://garbomuffin.com/iwonthecountriesquizforrealz?" + lastTime.formatted);
  }

  function start() {
    landingDiv.style.display = "none";
    appDiv.style.display = "block";
    startingTime = Date.now();
    timerLoop();
  }

  function timerLoop() {
    const currentTime = Date.now();
    let time = (currentTime - startingTime) / 1000;

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    const fmt = (t) => {
      const s = t.toString();
      if (s.length === 1) return "0" + s;
      return s;
    };
    const formatted = fmt(minutes) + ":" + fmt(seconds);
    lastTime = {formatted, minutes, seconds};

    timerEl.innerHTML = formatted;
    if (!stopped) {
      requestAnimationFrame(timerLoop);
    }
  }
}());

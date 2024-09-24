var Friend = [];
var Tidings = [];
var ActionCount = 0;
var Timeout;
var Countdown;
var Delayed_time;
var GroupsId;
var TestCount = 30;
var Start = 0;
var Total = 0;
var Host = "https://www.linkedin.com";
var Status = 0;

(function () {
  BindEven();
})();
$(document).ready(function () {
  InitLog();
  Host = window.location.host;
  BindLinkedin(false);
  AppendWindow();
});
function BindEven() {
  $("body").on("click", ".j-lyjl-bg", ShowOrHideWindow);
  $("body").on("click", "#j_logo", ShowOrHideWindow);
  $("body").on("click", ".j-nav-first-option", SelectFunctionPage);
  $("body").on("click", ".j-close-dialog", RemoveDialog);
  $("body").on("click", "#j_login", Login);
  $("body").on("keydown", "#j_pw", LoginEnter);
  $("body").on("click", "#j_addfriend .j-top-nav-box li", ShowAddOption);
  $("body").on("click", "#j_showInviteQueue", ShowInviteQueue);
  $("body").on("click", "input[name='selectAllInvite']", SelectAllInvite);
  $("body").on(
    "click",
    "#j_inviteQueue_paging .j-paging",
    GetInviteQueueSomePage
  );
  $("body").on("click", "#j_inviteQueue_paging .j-jump-btn", JumpInviteQueue);
  $("body").on(
    "keydown",
    "#j_inviteQueue_paging .j-jump",
    JumpInviteQueueEnter
  );
  $("body").on("click", "#j_removeInvite", RemoveInvite);
  $("body").on("click", "#j_startConnectInvite", StartConnectInvite);
  $("body").on("click", "#j_showMes", ShowMes);
  $("body").on("click", "#j_newMes", NewMes);
  $("body").on("click", "#j_mes_firstname", InsertMesFirstName);
  $("body").on("click", "#j_mes_lastname", InsertMesLastName);
  $("body").on("dblclick", ".j-mes-cont", ResetMes);
  $("body").on("click", "input[name='mes']", SelectMes);
  $("body").on("click", "input[name='selectAllMes']", SelectAllMes);
  $("body").on("click", "#j_deleteMes", DeleteMes);
  $("body").on("click", "#j_show_connect_condition", ShowMoreConnectCondition);
  $("body").on("click", "#j_clean_connect_condition", CleanConnectCondition);
  $("body").on("input", "#j_connect_search_country", GetConnectCountry);
  $("body").on(
    "click",
    "#j_connect_select_country .j-country-span",
    SelectConnectCountry
  );
  $("body").on("click", "#j_clean_connect_country", CleanSelectConnectCountry);
  $("body").on(
    "click",
    "#j_determine_connect_country",
    DetermineSelectConnectCountry
  );
  $("body").on("input", "#j_connect_search_mutual", GetConnectMutual);
  $("body").on(
    "click",
    "#j_connect_select_mutual .j-mutual-span",
    SelectConnectMutual
  );
  $("body").on("click", "#j_clean_connect_mutual", CleanSelectConnectMutual);
  $("body").on(
    "click",
    "#j_determine_connect_mutual",
    DetermineSelectConnectMutual
  );
  $("body").on("input", "#j_connect_search_industry", GetConnectIndustry);
  $("body").on(
    "click",
    "#j_connect_select_industry .j-industry-span",
    SelectConnectIndustry
  );
  $("body").on(
    "click",
    "#j_clean_connect_industry",
    CleanSelectConnectIndustry
  );
  $("body").on(
    "click",
    "#j_determine_connect_industry",
    DetermineSelectConnectIndustry
  );
  $("body").on("input", "#j_connect_search_company", GetConnectCompany);
  $("body").on(
    "click",
    "#j_connect_select_company .j-company-span",
    SelectConnectCompany
  );
  $("body").on("click", "#j_clean_connect_company", CleanSelectConnectCompany);
  $("body").on(
    "click",
    "#j_determine_connect_company",
    DetermineSelectConnectCompany
  );
  $("body").on("input", "#j_connect_search_school", GetConnectSchool);
  $("body").on(
    "click",
    "#j_connect_select_school .j-school-span",
    SelectConnectSchool
  );
  $("body").on("click", "#j_clean_connect_school", CleanSelectConnectSchool);
  $("body").on(
    "click",
    "#j_determine_connect_school",
    DetermineSelectConnectSchool
  );
  $("body").on("click", "#j_searchConnect", SearchConnect);
  $("body").on("keydown", "#j_searchConnect", SearchConnectEnter);
  $("body").on("click", "#j_connect_paging .j-paging", GetConnectSomePage);
  $("body").on("click", "#j_connect_paging .j-jump-btn", JumpConnect);
  $("body").on("keydown", "#j_connect_paging .j-jump", JumpConnectEnter);
  $("body").on("click", "input[name='selectAllConnect']", SelectAllConnect);
  $("body").on("click", "#j_startConnectSearch", StartConnectSearch);
  $("body").on("click", "#j_addInviteSearch", AddInviteSearch);
  $("body").on(
    "click",
    "#j_searchRecomm_paging .j-paging",
    GetSearchRecommSomePage
  );
  $("body").on("click", "#j_searchRecomm_paging .j-jump-btn", JumpSearchRecomm);
  $("body").on(
    "keydown",
    "#j_searchRecomm_paging .j-jump",
    JumpSearchRecommEnter
  );
  $("body").on("click", "#j_getLyComm", GetLyComm);
  $("body").on("click", "input[name='selectAllLyComm']", SelectAllLyComm);
  $("body").on("click", "#j_startConnectLyComm", StartConnectLyComm);
  $("body").on("click", "#j_addInviteLyComm", AddInviteLyComm);
  $("body").on("click", "#j_getJlComm", GetJlComm);
  $("body").on("click", "input[name='selectAllJlComm']", SelectAllJlComm);
  $("body").on("click", "#j_startConnectJlComm", StartConnectJlComm);
  $("body").on("click", "#j_addInviteJlComm", AddInviteJlComm);
  $("body").on("click", "#j_showLine", ShowLine);
  $("body").on("click", "#j_newLine", NewLine);
  $("body").on("click", "#j_sendmine", SendMine);
  $("body").on("click", "input[name='selectAllLine']", SelectAllLine);
  $("body").on("click", "#j_lineAdd_paging .j-paging", GetLineSomePage);
  $("body").on("click", "#j_lineAdd_paging .j-jump-btn", JumpLine);
  $("body").on("keydown", "#j_lineAdd_paging .j-jump", JumpLineEnter);
  $("body").on("click", "#j_removeLine", RemoveLine);
  $("body").on("click", "#j_startConnectLine", StartConnectLine);
  $("body").on("click", "#j_showRecall", ShowRecall);
  $("body").on("click", "input[name='selectAllRecall']", SelectAllRecall);
  $("body").on("click", "#j_recall_paging .j-paging", GetRecallSomePage);
  $("body").on("click", "#j_recall_paging .j-jump-btn", JumpRecall);
  $("body").on("keydown", "#j_recall_paging .j-jump", JumpRecallEnter);
  $("body").on("click", "#j_recall", RecallBatch);
  $("body").on("click", "#j_auto_addLinkedin", StartConnectLinkedin);
  $("body").on("click", "#j_friend .j-top-nav-box li", ShowFriendOption);
  $("body").on("click", "#j_showFriend", ShowFriend);
  $("body").on("keydown", "#j_friendKw", ShowFriendEnter);
  $("body").on("click", "input[name='selectAllFriend']", SelectAllFriend);
  $("body").on("click", "#j_friend_paging .j-paging", GetFriendSomePage);
  $("body").on("click", "#j_friend_paging .j-jump-btn", JumpFriend);
  $("body").on("keydown", "#j_friend_paging .j-jump", JumpFriendEnter);
  $("body").on("click", "#j_more_condition", ShowMoreCondition);
  $("body").on("click", ".j-bg-search-condition", ShowOrHideSearch);
  $("body").on("click", "#j_clean_friend_condition", CleanFriendCondition);
  $("body").on("input", "#j_friend_search_country", GetFriendCountry);
  $("body").on(
    "click",
    "#j_friend_select_country .j-country-span",
    SelectFriendCountry
  );
  $("body").on("click", "#j_clean_friend_country", CleanSelectFriendCountry);
  $("body").on(
    "click",
    "#j_determine_friend_country",
    DetermineSelectFriendCountry
  );
  $("body").on("input", "#j_friend_search_company", GetFriendCompany);
  $("body").on(
    "click",
    "#j_friend_select_company .j-company-span",
    SelectFriendCompany
  );
  $("body").on("click", "#j_clean_friend_company", CleanSelectFriendCompany);
  $("body").on(
    "click",
    "#j_determine_friend_company",
    DetermineSelectFriendCompany
  );
  $("body").on("input", "#j_friend_search_industry", GetFriendIndustry);
  $("body").on(
    "click",
    "#j_friend_select_industry .j-industry-span",
    SelectFriendIndustry
  );
  $("body").on("click", "#j_clean_friend_industry", CleanSelectFriendIndustry);
  $("body").on(
    "click",
    "#j_determine_friend_industry",
    DetermineSelectFriendIndustry
  );
  $("body").on("input", "#j_friend_search_school", GetFriendSchool);
  $("body").on(
    "click",
    "#j_friend_select_school .j-school-span",
    SelectFriendSchool
  );
  $("body").on("click", "#j_clean_friend_school", CleanSelectFriendSchool);
  $("body").on(
    "click",
    "#j_determine_friend_school",
    DetermineSelectFriendSchool
  );
  $("body").on("click", "#j_friend_tool .j-svg-grouping", Grouping);
  $("body").on("change", "#j_g_skip", SetGroupingSkip);
  $("body").on("click", "#j_friend_tool .j-svg-prohibit", AddProhibitForFriend);
  $("body").on("click", "#j_friend_tool .j-svg-send", StartSendForFriend);
  $("body").on("click", "#j_friend_tool .j-svg-dig", StartDigForFriend);
  $("body").on("click", ".j-friend .j-edit", EditRemark);
  $("body").on("click", ".j-friend .j-dig", DigA);
  $("body").on("click", ".j-friend .j-prohibit", UpdateProhibit);
  $("body").on("click", "#j_showTidings", ShowTidings);
  $("body").on("click", "#j_newTidings", NewTidings);
  $("body").on("click", "input[name='selectAllTidings']", SelectAllTidings);
  $("body").on("click", "#j_tidings_firstname", InsertTidingsFirstName);
  $("body").on("click", "#j_tidings_lastname", InsertTidingsLastName);
  $("body").on("dblclick", ".j-tidings-cont", EditTidings);
  $("body").on("click", "#j_deleteTidings", DeleteTidings);
  $("body").on("click", "input[name='tidings']", SelectTidings);
  $("body").on("click", "#j_showGroup", GetGroup);
  $("body").on("click", ".j-group", ShowGroupFriend);
  $("body").on("click", ".j-load-friend", LoadMoreGroupFriend);
  $("body").on("click", "#j_newGroup", NewGroup);
  $("body").on("click", ".j-group-edit .j-edit", EditGroup);
  $("body").on("click", ".j-group-edit .j-delete", DeleteGroup);
  $("body").on("click", ".j-group-edit .j-sort", StartSortGroup);
  $("body").on("click", ".j-up", SortUp);
  $("body").on("click", ".j-down", SortDown);
  $("body").on("click", ".j-group-tool .j-export", ExportGroupFriend);
  $("body").on("click", ".j-group-tool .j-dig", StartDigForGroup);
  $("body").on("click", ".j-group-tool .j-send", StartSendForGroup);
  $("body").on("click", ".j-gall", SelectAllGroupFriend);
  $("body").on("click", ".j-group-tool .j-prohibit", AddProhibitForGroup);
  $("body").on("click", ".j-group-tool .j-move", MoveGroup);
  $("body").on("click", ".j-friend .j-delete", RemoveGroupFriend);
  $("body").on("click", "#j_showProhibit", ShowProhibit);
  $("body").on("click", "input[name='selectAllProhibit']", SelectAllProhibit);
  $("body").on("click", "#j_prohibit_paging .j-paging", GetProhibitSomePage);
  $("body").on("click", "#j_prohibit_paging .j-jump-btn", JumpProhibit);
  $("body").on("keydown", "#j_prohibit_paging .j-jump", JumpProhibitEnter);
  $("body").on("click", "#j_removeProhibit", RemoveProhibit);
  $("body").on("click", "#j_showDig", ShowDig);
  $("body").on("click", "#j_dig_paging .j-paging", GetDigSomePage);
  $("body").on("click", "#j_dig_paging .j-jump-btn", JumpDig);
  $("body").on("keydown", "#j_dig_paging .j-jump", JumpDigEnter);
  $("body").on("click", "input[name='selectAllDig']", SelectAllDig);
  $("body").on("click", "#j_exportSelect", ExportForSelect);
  $("body").on("click", "#j_exportDigtime", ExportForDigTime);
  $("body").on("click", "#j_dig_box .j-look", ShowFriendProfile);
  $("body").on("dblclick", "#j_dig_box .j-profile", ShowFriendProfile);
  $("body").on("click", "#j_Groups .j-top-nav-box li", ShowGroupsOption);
  $("body").on("click", "#j_showGroups", ShowMyGroups);
  $("body").on("click", "#j_myGroups_paging .j-paging", GetMyGroupsSomePage);
  $("body").on("click", "#j_myGroups_paging .j-jump-btn", JumpMyGroups);
  $("body").on("keydown", "#j_myGroups_paging .j-jump", JumpMyGroupsEnter);
  $("body").on("click", ".j-all-groups-member", LookAllGroupsMemeber);
  $("body").on(
    "click",
    "#j_GroupsMember_paging .j-paging",
    GetGroupsMemberSomePage
  );
  $("body").on("click", "#j_GroupsMember_paging .j-jump-btn", JumpGroupsMember);
  $("body").on(
    "keydown",
    "#j_GroupsMember_paging .j-jump",
    JumpGroupsMemberEnter
  );
  $("body").on(
    "click",
    "input[name='selectallGroupsMember']",
    SelectAllGroupsMember
  );
  $("body").on("click", "#j_startConnectGroups", StartConnectGroups);
  $("body").on("click", "#j_addInviteGroups", AddInviteGroups);
  $("body").on("click", "#j_startSendGm", StartSendForGroups);
  $("body").on("click", "#j_copy_link", CopyLink);
  $("body").on("click", ".j-fold-head", ShowSetDetail);
  $("body").on("click", "#j_restore", RestoreSet);
  $("body").on("change", "#s_min_speed", SetSendMinSpeed);
  $("body").on("change", "#s_max_speed", SetSendMaxSpeed);
  $("body").on("change", "#s_limit", SetSendLimit);
  $("body").on("click", "#s_auto", SetSendAutoPageUp);
  $("body").on("click", "#s_skip", SetSendSkip);
  $("body").on("change", "#s_skip_time", SetSendSkipTime);
  $("body").on("change", "#a_min_speed", SetAddMinSpeed);
  $("body").on("change", "#a_max_speed", SetAddMaxSpeed);
  $("body").on("change", "#a_limit", SetAddLimit);
  $("body").on("change", "#j_i_count", SetInviteCount);
  $("body").on("change", "#d_min_speed", SetDigMinSpeed);
  $("body").on("change", "#d_max_speed", SetDigMaxSpeed);
  $("body").on("change", "#d_limit", SetDigLimit);
  $("body").on("change", "#t_min_speed", SetThumbsMinSpeed);
  $("body").on("change", "#t_max_speed", SetThumbsMaxSpeed);
  $("body").on("change", "#t_limit", SetThumbsLimit);
  $("body").on("click", "#j_risk", SetRisk);
  $("body").on("click", "#j_logout", LogOut);
  $("body").on("click", "#j_bind", ChangeLinkedin);
  $("body").on("click", ".j-unbind", Unbind);
  $("body").on("click", ".j-showbind", ShowMoreBind);
  $("body").on("click", "#j_opinion", ShowPropose);
  $("body").on("click", "#j_log", GetLog);
  $("body").on("click", "#j_stop_action", StopAction);
  $("body").on("dblclick", ".j-detail-bg", RemoveDialog);
  $("body").on("click", "#j_start_thumbs", StartThumbs);
  $("body").on("click", ".j-upgrade", Upgrade);
  $("body").on("click", "#j_level", GetLevel);
}

// Listen for messages from the background script

chrome.runtime.onMessage.addListener(function (c, b, a) {
  // } else {
  a({ result: true });
  if (c.type == "post") {
    console.log('c.result', c.result);
    if (c.result == 1 && c.data) {
      var d = JSON.parse(c.data);
      // var d = {
      //   data: [
      //     {
      //       is_select: "0",
      //       mess: "Hi [FirstName], this is recruiter Yuxin from intellipro, nice to meet you!",
      //       mess_id: "1726589708150"
      //     },
      //     {
      //       is_select: "0",
      //       mess: "Hello [FirstName], this is recruiter xxx from Intellipro.",
      //       mess_id: "1726517773687"
      //     },
      //     {
      //       is_select: "0",
      //       mess: "Hi, I wanted to reach out because I think you may fit this Sales Senior Manager & Sales Director (Sea Freight Forwarding) role with a leading parallel-import vehicle supplier, focused on international",
      //       mess_id: "1724453711450"
      //     }
      //   ],
      //   result: "1",
      //   tag: ""
      // };
      console.log('d value: '+ d);
      console.log('d value: ' + JSON.stringify(d));
      // 或者，为了更好的可读性：
      // console.log('d value:', JSON.stringify(d, null, 2));
      switch (parseInt(d.result)) {
        case 3:
          StopAction();
          ShowLoginDialog();
          PointOut("请先登录领英精灵账号");
          break;
        case 4:
          StopAction();
          JlConfirm(
            "没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？"
          );
          $("#j_ok").click(function () {
            BindLinkedin(true);
          });
          break;
        case 5:
          StopAction();
          ShowLoginDialog();
          PointOut("请先登录领英精灵账号");
          break;
        case 6:
          StopAction();
          ShowLoginDialog();
          PointOut("其它设备在登录中，已被挤出");
          break;
        case 7:
          StopAction();
          PointOut("没有权限", 1);
          ShowUpgrade("非会员", "您的领英精灵已过试用期，请升级会员使用。");
          chrome.storage.sync.set({ trial: 0, level: 0 }, function () {});
          break;
        case 8:
          StopAction();
          ShowLoginDialog();
          PointOut("账号不存在");
          break;
        case 9:
          StopAction();
          ContactMe();
          PointOut("请联系我们开通试用");
          break;
        case 20:
          PointOut("请更新领英精灵插件");
          Renew();
          break;
        case 0:
        case 1:
        case 2:
          switch (c.action) {
            case "fetchDataResponse":
              SendProcess(d);
              break;
            case "followup":
              handleFileUploadAndMessageSending(d);
              break;
            case "login":
              LoginResult(d);
              break;
            case "bindLinkedin":
              BindLinkedinResult(d);
              break;
            case "getBind":
              GetBindResult(d);
              break;
            case "unbind":
              UnbindResult(d);
              break;
            case "getInviteQueue":
              GetInviteQueueResult(d);
              break;
            case "removeInvite":
              RemoveInviteResult(d);
              break;
            case "getSearchRecomm":
              GetSearchRecommResult(d);
              break;
            case "saveMes":
              SaveMesResult(d);
              break;
            case "getMes":
              GetMesResult(d);
              break;
            case "selectMes":
              SelectMesResult(d);
              break;
            case "selectAllMes":
              SelectAllMesResult(d);
              break;
            case "deleteMes":
              DeleteMesResult(d);
              break;
            case "getMesAddFriend":
              GetMesAddFriendResult(d);
              break;
            case "getJlComm":
              GetJlCommResult(d);
              break;
            case "addInviteQueue":
              AddInviteQueueResult(d);
              break;
            case "newLine":
              NewLineResult(d);
              break;
            // case "SendMine":
            //   SendMine(d);
            //   break;
            case "getLine":
              GetLineResult(d);
              break;
            case "removeLine":
              RemoveLineResult(d);
              break;
            case "saveFriend":
              SaveFriendResult(d);
              break;
            case "getSendForFriend":
              GetSendForFriendResult(d);
              break;
            case "getSendForAuto":
              GetSendForAutoResult(d);
              break;
            case "getDigForFriend":
              GetDigForFriendResult(d);
              break;
            case "getDigForGroup":
              GetDigForGroupResult(d);
              break;
            case "getSendForGroup":
              GetSendForGroupResult(d);
              break;
            case "editRemark":
              EditRemarkResult(d);
              break;
            case "getTidings":
              GetTidingsResult(d);
              break;
            case "selectAllTidings":
              SelectAllTidingsResult(d);
              break;
            case "saveTidings":
              SaveTidingsResult(d);
              break;
            case "deleteTidings":
              DeleteTidingsResult(d);
              break;
            case "selectTidings":
              SelectTidingsResult(d);
              break;
            case "grouping":
              GroupingResult(d);
              break;
            case "getGroup":
              GetGroupResult(d);
              break;
            case "getGroupFriend":
              GetGroupFriendResult(d);
              break;
            case "saveGroup":
              SaveGroupResult(d);
              break;
            case "deleteGroup":
              DeleteGroupResult(d);
              break;
            case "sortGroup":
              SortGroupResult(d);
              break;
            case "getProhibit":
              GetProhibitResult(d);
              break;
            case "updateProhibit":
              UpdateProhibitResult(d);
              break;
            case "getDig":
              GetDigResult(d);
              break;
            case "getFriendProfile":
              GetFriendProfileResult(d);
            case "getYeji":
              GetYejiResult(d);
              break;
            case "startSendForGroups":
              StartSendForGroupsResult(d);
              break;
            case "getLog":
              GetLogResult(d);
              break;
            case "getLevel":
              GetLevelResult(d);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else {
      PointOut("失败，请检查网络，翻墙工具不要用全局模式！");
      return false;
    }
  } else {
    switch (c.action) {
      case "showWindow":
        ShowOrHideWindow();
        break;
      case "connectInvite":
        ConnectInvite();
        break;
      case "connectJlComm":
        ConnectJlComm();
        break;
      case "connectLyComm":
        ConnectLyComm();
        break;
      case "connectSales":
        ConnectSales();
        break;
      case "connectLinkedin":
        ConnectLinkedin();
        break;
      case "connectLine":
        ConnectLine();
        break;
      case "connectGroups":
        ConnectGroups();
        break;
      case "connectSearch":
        ConnectSearch();
        break;
      case "batchSendForFriend":
        BatchSendForFriend();
        break;
      case "batchSendForGroup":
        BatchSendForGroup();
        break;
      case "batchSendGroups":
        BatchSendGroups();
        break;
      case "batchDig":
        BatchDig();
        break;
      case "batchThumbs":
        BatchThumbs();
        break;
      default:
        break;
    }
  }
  // }
});
function AppendWindow() {
  chrome.runtime.sendMessage({ action: "getHtml" }, function (a) {
    $("body").append(a.result);
  });
}

function ShowOrHideWindow() {
  // chrome.storage.sync.get({ option: "addfriend" }, function (a) {
  $("#j_lyjl_window").slideToggle(200);
  $(".j-lyjl-bg").slideToggle(0);
  if ($("#j_lyjl_window").is(":hidden")) {
    ShowOption(String(a.option));
    // CheckLYZC();
    // InitMember();
  }
  // });
}

function CheckLYZC() {
  var b = window.location.host;
  if (b == "www.linkedin.cn") {
    $(".j-dialog").remove();
    var a =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-prompt-box j-div-center">' +
      '<p style="color:#f00; font-size:24px; text-align:center;">您登录的是领英职场，请先登录<a style="font-size:24px;" target="_black" href="http://linkedinjl.com/h?o=usein">领英国际版</a>的界面使用</p>' +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(a);
    $(".j-dialog").fadeIn(200);
    return false;
  }
}
function SelectFunctionPage() {
  if (!$(this).hasClass("j-nav-svg-active")) {
    var a = $(this).attr("nav-option");
    ShowOption(a);
  }
}
function ShowOption(b) {
  $("#lyjl .j-nav-first-option").each(function () {
    if ($(this).attr("nav-option") == b) {
      $(this).find("svg").removeClass("j-nav-svg");
      $(this).find("svg").addClass("j-nav-svg-active");
    } else {
      $(this).find("svg").removeClass("j-nav-svg-active");
      $(this).find("svg").addClass("j-nav-svg");
    }
  });
  $("#lyjl section").removeClass("j-select");
  $("#lyjl section").addClass("j-select-not");
  $("#j_" + b).removeClass("j-select-not");
  $("#j_" + b).addClass("j-select");
  chrome.storage.sync.set({ option: [b] }, function () {});
  switch (b) {
    case "addfriend":
      ShowAddFriendPage();
      break;
    case "share":
      ShowSharePage();
      break;
    case "set":
      ShowSetPage();
      break;
    case "more":
      break;
    default:
      break;
  }
  switch (b) {
    case "friend":
    case "addfriend":
    case "Groups":
      var a = $("#j_lyjl_window").height() - 90;
      break;
    case "more":
    case "customer":
      var a = $("#j_lyjl_window").height() - 12;
      break;
    default:
      var a = $("#j_lyjl_window").height() - 54;
      break;
  }
  $(".j-cont-box").css("height", a + "px");
}
function InitMember() {
  chrome.storage.sync.get(
    { account: "", my_urn: "", level: 0, img: "", name: "", public_id: "" },
    function (a) {
      // if (!String(a.account)) {
      //   ShowLoginDialog();
      //   PointOut("请登录领英精灵账号", 1);
      //   return false;
      // }
      if (String(a.my_urn)) {
        $(".j-linkedin .j-lyname").attr("href", "/in/" + a.public_id);
        $(".j-linkedin img").attr("src", a.img);
        $(".j-linkedin .j-lyname").text(a.name);
      } else {
        $(".j-linkedin .j-lyname").attr("href", "");
        $(".j-linkedin img").attr(
          "src",
          "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/linkedin.png"
        );
        $(".j-linkedin .j-lyname").text("未关联");
      }
      $("#j_account").text(a.account);
      $("#j_level").removeClass("j-level-try");
      $("#j_level").removeClass("j-level-vip");
      $("#j_level").removeClass("j-level-dia");
      $("#j_level").removeClass("j-level-sup");
      $(".j-me-svg").removeClass("j-try");
      $(".j-me-svg").removeClass("j-vip");
      $(".j-me-svg").removeClass("j-dia");
      switch (parseInt(a.level)) {
        case 0:
          $("#j_level").addClass("j-level-try");
          $("#j_level").attr("title", "您是试用会员");
          $(".j-me-svg").addClass("j-try");
          break;
        case 1:
          $("#j_level").addClass("j-level-vip");
          $("#j_level").attr("title", "您是VIP会员");
          $(".j-me-svg").addClass("j-vip");
          break;
        case 2:
          $("#j_level").addClass("j-level-dia");
          $("#j_level").attr("title", "您是钻石会员");
          $(".j-me-svg").addClass("j-dia");
          break;
        case 3:
          $("#j_level").addClass("j-level-sup");
          $("#j_level").attr("title", "您是至尊会员");
          $(".j-me-svg").addClass("j-dia");
          break;
        default:
          $("#j_level").addClass("j-level-try");
          $("#j_level").attr("title", "您是试用会员");
          $(".j-me-svg").addClass("j-try");
          break;
      }
    }
  );
}
function LogOut() {
  chrome.storage.sync.set(
    { run: false, trial: 0, level: 0, account: "" },
    function () {
      JlHttp("logout", "", "", "");
      // InitMember();
    }
  );
}
function BindLinkedin(a) {
  chrome.storage.sync.get({ my_urn: "", account: "" }, function (f) {
    var c = String(f.my_urn);
    var e = String(f.account);
    if (!e) {
      if (a) {
        PointOut("没有登录领英精灵，请登录领英精灵账号", 1);
        ShowLoginDialog();
      }
      return false;
    }
    var b = window.location.href;
    var i = Host + "/feed";
    var h = Host + "/login";
    var d = new RegExp(i, "i");
    var g = new RegExp(h, "i");
    if (!c || d.test(b) || a) {
      var j = getCookie("JSESSIONID");
      if (j) {
        j = j.replace(/"/g, "");
      } else {
        PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
        return false;
      }
      var b = "/voyager/api/me";
      $.ajax({
        url: b,
        type: "get",
        headers: {
          Accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": j,
          "x-restli-protocol-version": "2.0.0",
        },
        success: function (q) {
          if (q) {
            var o = q["included"][0]["firstName"];
            var m = q["included"][0]["lastName"];
            var n = GetName(o, m);
            var p = q["included"][0]["entityUrn"].split(":")[3];
            var l = q["included"][0]["publicIdentifier"];
            if (
              q["included"][0]["picture"] &&
              q["included"][0]["picture"]["rootUrl"]
            ) {
              var k =
                q["included"][0]["picture"]["rootUrl"] +
                q["included"][0]["picture"]["artifacts"][3][
                  "fileIdentifyingUrlPathSegment"
                ];
            } else {
              var k = "";
            }
            if (p) {
              chrome.storage.sync.set(
                { my_urn: [p], name: [n], img: [k], public_id: [l] },
                function () {}
              );
              var r = {
                my_urn: p,
                public_id: l,
                first_name: o,
                last_name: m,
                img: k,
              };
              r = JSON.stringify(r);
              JlHttp("bindLinkedin", r, "bind", a);
            } else {
              if (a) {
                PointOut("关联失败，请尝试刷新页面或重启浏览器");
              }
            }
          }
        },
        error: function () {
          if (a) {
            PointOut("关联失败，请确保已登录领英账号");
          }
        },
      });
    }
    if (g.test(b)) {
      chrome.storage.sync.set({ my_urn: "" }, function () {});
    }
  });
}
function BindLinkedinResult(a) {
  switch (a["result"]) {
    case 0:
      chrome.storage.sync.set(
        { my_urn: "", name: "", img: "", public_id: "" },
        function () {}
      );
      if (a["show"]) {
        PointOut("关联失败，请尝试刷新页面或重启浏览器");
      }
      break;
    case 1:
      if (a["show"]) {
        PointOut("关联成功");
      }
      break;
    case 2:
      chrome.storage.sync.set(
        { my_urn: "", name: "", img: "", public_id: "" },
        function () {}
      );
      if (a["show"]) {
        PointOut("失败，关联数量超过5个");
        JlConfirm(
          "关联失败，一个领英精灵账号最多可关联5个领英，请解绑领英账号再关联"
        );
        $("#j_ok").click(function () {
          GetBind();
        });
      }
      break;
    default:
      break;
  }
}
function GetBind() {
  JlHttp("getBind", "", "", "");
}
function GetBindResult(a) {
  if (a) {
    switch (a["result"]) {
      case 0:
        PointOut("失败");
        break;
      case 1:
        ShowBind(a["data"]);
        break;
      case 2:
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        break;
      default:
        PointOut("失败");
        break;
    }
  }
}
function ShowBind(d) {
  $(".j-dialog").remove();
  var c =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-bind-box j-div-center j-box-sha j-bg-w">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>已关联领英</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-bind-cont">';
  for (var b = 0; b < d.length; b++) {
    var a = GetName(d[b]["first_name"], d[b]["last_name"]);
    c +=
      '<div class="j-nowrap j-bind">' +
      '<div class="j-nowrap">' +
      '<div><img src="' +
      d[b]["img"] +
      '" /></div>' +
      '<div class="j-bind-name">' +
      "<div><p>" +
      a +
      "</p></div>" +
      "<div><p>关联时间：" +
      d[b]["bind_time"] +
      "</div>" +
      "</div>" +
      "</div>";
    if (d[b]["unbind"] == 1) {
      c +=
        '<div class="j-bind-action"><button class="j-unbind j-bg-btn j-btn j-layout-btn" unbind="1" urn=' +
        d[b]["my_urn"] +
        ">解绑</button></div>";
    } else {
      c +=
        '<div class="j-bind-action"><button style="background:#ccc;" class="j-unbind j-bg-btn j-btn j-layout-btn" unbind=0 urn=' +
        d[b]["my_urn"] +
        ">解绑</button></div>";
    }
    c += "</div>";
  }
  c +=
    '<div class="j-bind-note"><p>*每个领英精灵可关联5个领英账号，关联后1天后可解绑。</p></div>' +
    "</div>";
  "</div>" + "</div>";
  $("#j_lyjl_window").append(c);
  $(".j-dialog").fadeIn(200);
}
function ShowMoreBind() {
  JlHttp("getBind", "", "", "");
}
function Unbind() {
  var b = $(this).attr("unbind");
  var a = $(this).attr("urn");
  if (b == 1) {
    var c =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-confirm-box j-div-center j-box-sha">' +
      '<div class="j-nowrap">' +
      '<div class="j-nowrap">' +
      "<div>" +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
      '<circle cx="12" cy="12" r="10" style="fill:#00f" />' +
      '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>' +
      '<circle cx="12" cy="18" r="1" style="fill:#fff;" />' +
      "</svg>" +
      "</div>" +
      "<h3>确定</h3>" +
      "</div>" +
      "</div>" +
      '<div class="j-marg"><p>解绑后，该领英账号的分组、备注等会释放，确定要解绑吗？</p></div>' +
      '<div style="text-align:right;">' +
      '<button id="j_cancel" class="j-bg-btn j-layout-btn j-close-dialog">取消</button>' +
      '<button id="j_ok" class="j-bg-btn j-layout-btn j-close-dialog">确定</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(c);
    $(".j-dialog").fadeIn(0);
    $("#j_ok").click(function () {
      JlHttp("unbind", a, "", "");
    });
  } else {
    PointOut("关联时间未达1天，请过段时间再来解绑");
  }
}
function UnbindResult(a) {
  if (a && a["result"] == 1) {
    PointOut("解绑成功");
    GetBind();
  } else {
    PointOut("解绑失败");
    GetBind();
  }
}
function ChangeLinkedin() {
  BindLinkedin(true);
}
function ShowAddOption() {
  $("#j_addfriend .j-top-nav-box li").removeClass("j-active");
  $("#j_addfriend .j-top-nav-box li").addClass("j-active-not");
  $(this).removeClass("j-active-not");
  $(this).addClass("j-active");
  var a = $(this).attr("option");
  $("#j_addfriend .j-option").removeClass("j-option-active");
  $("#j_add_" + a).addClass("j-option-active");
}
function ShowAddFriendPage() {
  $("#j_jlsearch_option").css("display", "block");
}
function ShowInviteQueuePage() {
  GetInviteQueue(1);
}
function ShowInviteQueue() {
  GetInviteQueue(1);
}
function GetInviteQueue(a) {
  chrome.storage.sync.get({ i_count: 100 }, function (b) {
    PointOut("待加人脉获取中...", 10);
    var c = parseInt(b.i_count);
    var d = $("#j_inviteState").val();
    JlHttp("getInviteQueue", a, d, c);
  });
}
function GetInviteQueueResult(c) {
  if (c) {
    switch (c["result"]) {
      case 0:
        PointOut("获取失败, 请尝试刷新页面或重启浏览器");
        break;
      case 1:
        PointOut("获取成功", 1);
        $("input[name='selectAllInvite']").prop("checked", false);
        $("#j_inviteQueue_box").empty();
        ShowPaging("j_inviteQueue_paging", c["page"], c["total"], c["count"]);
        for (var a = 0; a < c["data"].length; a++) {
          AppendInviteQueue(c["data"][a]);
        }
        break;
      case 2:
        PointOut("待加队列中没有可邀请的人，请将要加的人添加到待加队列中");
        $("input[name='selectAllInvite']").prop("checked", false);
        $("#j_inviteQueue_box").empty();
        var b =
          '<div class="j-explain-box">' +
          "<p>待加队列中没有可邀请的人，请在精灵搜索人脉、领英推荐人脉、精灵推荐人脉、Groups中将要加的人脉添加到“待加”队列。</p>" +
          '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_inviteQueue_box").append(b);
        break;
      default:
        break;
    }
  } else {
    PointOut("获取失败, 请尝试刷新页面或重启浏览器");
  }
}
function AppendInviteQueue(c) {
  var a = GetName(c.first_name, c.last_name);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id="i_' +
    c["urn"] +
    '" fn="' +
    c["first_name"] +
    '" ln="' +
    c["last_name"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">';
  if (c["public_id"]) {
    b +=
      '<div><a href="https://www.linkedin.com/in/' +
      c["public_id"] +
      ' "target="_black" title="打开该好友Linkedin主页">' +
      '<img src="' +
      c["img"] +
      '"></a></div>' +
      '<div class="j-profile">' +
      '<h3 class="j-oneline">' +
      a +
      "</h3>";
  } else {
    b +=
      '<div><img src="' +
      c["img"] +
      '"></div>' +
      '<div class="j-profile">' +
      '<h3 class="j-oneline" style="color:blue">领英会员</h3>';
  }
  b +=
    '<p class="j-oneline j-posi">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>";
  if (c["state"] == 2) {
    b += '<input type="checkbox" name="invite">';
  } else {
    b +=
      '<div style="padding-top:16px;"><p>已邀请：' +
      c["invite_time"] +
      "</p></div>";
  }
  b += "</div>" + "</div>";
  $("#j_inviteQueue_box").append(b);
}
function SelectAllInvite() {
  if ($(this).prop("checked")) {
    $("input[name='invite']").prop("checked", true);
    var a = $("input[name='invite']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请点击“显示”按钮显示待加人脉");
    } else {
      PointOut("选择了 " + a + " 位", 1);
    }
  } else {
    $("input[name='invite']").prop("checked", false);
  }
}
function GetInviteQueueSomePage() {
  var a = parseInt($(this).text());
  GetInviteQueue(a);
}
function JumpInviteQueue() {
  var b = parseInt($("#j_inviteQueue_paging .j-paging:last").text());
  var c = parseInt($("#j_inviteQueue_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数");
    return false;
  }
  var d = parseInt($("#j_inviteQueue_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成", 1);
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内");
    return false;
  }
  GetInviteQueue(c);
}
function JumpInviteQueueEnter() {
  if (event.keyCode == 13) {
    JumpInviteQueue();
  }
}
function RemoveInvite() {
  chrome.storage.sync.get({ account: "", my_urn: "" }, function (b) {
    var e = String(b.account);
    var c = String(b.my_urn);
    if (!e) {
      ShowLoginDialog();
      PointOut("请先登录领英精灵账号");
      return false;
    }
    if (!c) {
      JlConfirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？");
      $("#j_ok").click(function () {
        BindLinkedin(true);
      });
      return false;
    }
    var d = $("input[name='invite']:checkbox:checked").length;
    if (d == 0) {
      PointOut("请先选择人脉");
    } else {
      var a = [];
      $("input[name='invite']:checkbox:checked").each(function () {
        a.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
      });
      if (a.length > 0) {
        a = JSON.stringify(a);
        JlHttp("removeInvite", a, "", "");
      } else {
        PointOut("请选择人脉");
      }
    }
  });
}
function RemoveInviteResult(a) {
  if (a && a["result"] == 1) {
    PointOut("移出成功");
    $("input[name='selectAllInvite']").prop("checked", false);
    $("input[name='invite']:checkbox:checked").each(function () {
      $(this).parents("div.j-friend").remove();
    });
  } else {
    PointOut("移出失败");
  }
}
function StartConnectInvite() {
  var a = $("input[name='invite']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请先选择人脉");
  } else {
    Friend = [];
    $("input[name='invite']:checkbox:checked").each(function () {
      var b = {};
      b["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      b["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      b["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      b["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      b["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      Friend.push(b);
    });
    if (Friend.length > 0) {
      JlHttp("getMesAddFriend", "", "invite", "");
    } else {
      PointOut("没有选择要加的人，请重新选择");
    }
  }
}
function ConnectInvite() {
  if (Friend.length > 0) {
    Connect(
      Friend[0]["urn"],
      Friend[0]["first_name"],
      Friend[0]["last_name"],
      Friend[0]["img"],
      "invite"
    );
    $("#i_" + Friend[0]["urn"]).remove();
    Friend.shift();
    chrome.storage.sync.get(
      { a_today_num: 0, a_min_speed: 30, a_max_speed: 60, risk: true },
      function (a) {
        var b = GetTime(
          parseInt(a.a_today_num),
          parseInt(a.a_min_speed),
          parseInt(a.a_max_speed),
          a.risk
        );
        Delayed_time = b;
        DelayedTime();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectInvite", other: "" },
            function (c) {}
          );
        }, b * 1000);
      }
    );
  } else {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
}
function GetMesAddFriendResult(a) {
  if (a["result"] == 1) {
    chrome.storage.sync.get(
      { level: 0, trial: 0, a_today_num: 0, a_limit: 100, run: false },
      function (b) {
        if (b.run) {
          PointOut("当前正在自动操作中，请先停止其它操作");
          return false;
        }
        // if (parseInt(b.level) < 1 && parseInt(b.trial) < 1) {
        //   ShowUpgrade(
        //     "试用期已过",
        //     "试用会员可试用一周，您的试用期已过，请升级会员使用",
        //     "立即升级"
        //   );
        //   return false;
        // }
        if (parseInt(b.a_today_num) >= parseInt(b.a_limit)) {
          JlAlert(
            "今天已发" +
              b.a_today_num +
              "条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！"
          );
          return false;
        }
        switch (a["tag"]) {
          case "invite":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加人...");
            ConnectInvite();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "search":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加搜索人脉...");
            ConnectSearch();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "line":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加链接人脉...");
            ConnectLine();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "linkedin":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加领英人脉...");
            ConnectLinkedin();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "sales":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加销售人脉...");
            ConnectSales();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "jlComm":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加精灵推荐人脉...");
            ConnectJlComm();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "lyComm":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加领英推荐人脉...");
            ConnectLyComm();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          case "groups":
            Tidings = a["data"];
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu("自动加Groups成员...");
            ConnectGroups();
            chrome.storage.sync.set({ run: true }, function () {});
            break;
          default:
            PointOut("错误");
            break;
        }
      }
    );
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function TestFastConnect(a) {
  chrome.storage.sync.get({ fast: true }, function (c) {
    if (c.fast) {
      var b = [];
      for (var d = 0; d < 3; d++) {
        b.push(a[d]["urn"]);
      }
      FastConnect(b);
    }
  });
}
function FastConnect(g) {
  var h = [];
  var b = g.length;
  for (var f = 0; f < b; f++) {
    var d = {
      emberEntityName: "growth/invitation/norm-invitation",
      invitee: {
        "com.linkedin.voyager.growth.invitation.InviteeProfile": {
          profileId: g[f],
        },
      },
      trackingId: randomString(22) + "==",
    };
    h.push(d);
  }
  var a = {
    invitations: h,
    defaultCountryCode: "",
    uploadTransactionId: randomString(22) + "==",
  };
  var c = getCookie("JSESSIONID");
  if (c) {
    c = c.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var e = "/voyager/api/growth/normInvitations?action=batchCreate";
  $.ajax({
    url: e,
    type: "post",
    data: JSON.stringify(a),
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": c,
      "content-type": "application/json; charset=UTF-8",
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (i) {
      chrome.storage.sync.get({ a_today_num: 0 }, function (j) {
        var k = parseInt(j.a_today_num) + b;
        chrome.storage.sync.set({ a_today_num: [k] }, function () {});
        JlHttp("saveConnectRecord", b, "fast", 200);
      });
    },
    error: function (i, k, j) {
      JlHttp("saveConnectRecord", b, "fast", i.status);
      switch (i.status) {
        case 403:
          chrome.storage.sync.set({ fast: false }, function (l) {});
          break;
        case 429:
          break;
        default:
          break;
      }
    },
  });
}
function ShowMes() {
  GetMes(1);
}
function GetMes() {
  JlHttp("getMes", "", "", "");
}
function GetMesResult(c) {
  console.log('GetMesResult c'+c);
  if ((c && c["result"] == 1)) {
    if (c["data"].length > 0) {
      $("#j_mes_box").empty();
      $("input[name='selectAllMes']").prop("checked", false);
      PointOut("获取成功");
      for (var a = 0; a < c["data"].length; a++) {
        AppendMes(c["data"][a]);
      }
    } else {
      PointOut("没有个性邀请消息");
      $("#j_mes_box").empty();
      var b =
        '<div class="j-explain-box">' +
        "<p>没有设置个性邀请消息，点击“新增”按钮可以创建个性邀请消息模板。</p>" +
        '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
        "</div>";
      $("#j_mes_box").append(b);
    }
  } else {
    PointOut("获取失败，请尝试刷新页面或重启浏览器");
  }
}
function AppendMes(b) {
  var a =
    '<div class="j-nowrap j-w j-mes" mid="' +
    b["mess_id"] +
    '">' +
    '<div class="j-mes-cont" title="双击修改内容">' +
    b["mess"] +
    "</div>";
  if (parseInt(b["is_select"]) == 1) {
    a +=
      '<div class="j-tidings-select"><input type="checkbox" name="mes" checked=true' +
      "></div>";
  } else {
    a +=
      '<div class="j-tidings-select"><input type="checkbox" name="mes"></div>';
  }
  a += "</div>" + $("#j_mes_box").append(a);
}
function NewMes() {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>新增个性邀请消息</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<textarea id="j_mes" class="j-msg-cont" maxlength=300 placeholder="1.个性化邀请消息会在给对方发送邀请时显示给对方，越短越好，非领英会员不超过200个字符，领英会员不超过300个字符。&#13;&#10;2.可根据对方姓名智能插入姓氏或名字，把光标定位在需要加入姓氏或名字的位置，点击左下角的“插入姓氏”或“插入名字”按钮即可。"></textarea>' +
    "</div>" +
    '<div class="j-prompt-ctrl j-nowrap">' +
    "<div>" +
    '<button id="j_mes_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>' +
    '<button id="j_mes_firstname" style="margin-left:6px;" class="j-bg-btn j-layout-btn">插入名字</button>' +
    "</div>" +
    "<div>" +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var b = $.trim($("#j_mes").val());
    if (!b) {
      PointOut("个性邀请消息不能为空", 2);
      return false;
    }
    var c = String(new Date().getTime());
    JlHttp("saveMes", c, "", b);
  });
}
function InsertMesFirstName() {
  var a = document.getElementById("j_mes");
  InsertAfterText(a, "[FirstName]");
}
function InsertMesLastName() {
  var a = document.getElementById("j_mes");
  InsertAfterText(a, "[LastName]");
}
function SaveMesResult(a) {
  if (a && a["result"] == 1) {
    PointOut("新增成功");
    $(".j-dialog").remove();
    GetMes();
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function ResetMes() {
  var a = $.trim($(this).text());
  var b = $.trim($(this).parents(".j-mes").attr("mid"));
  $(".j-dialog").remove();
  var c =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>新增个性邀请消息</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<textarea id="j_mes" class="j-msg-cont" maxlength=300 placeholder="1.个性化邀请消息会在给对方发送邀请时显示给对方，越短越好，非领英会员不超过200个字符，领英会员不超过300个字符。&#13;&#10;2.可根据对方姓名智能插入姓氏或名字，把光标定位在需要加入姓氏或名字的位置，点击左下角的“插入姓氏”或“插入名字”按钮即可。">' +
    a +
    "</textarea>" +
    "</div>" +
    '<div class="j-prompt-ctrl j-nowrap">' +
    "<div>" +
    '<button id="j_mes_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>' +
    '<button id="j_mes_firstname" class="j-bg-btn j-layout-btn">插入名字</button>' +
    "</div>" +
    "<div>" +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(c);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var d = $.trim($("#j_mes").val());
    if (!d) {
      PointOut("个性化邀请消息不能为空", 2);
      return false;
    }
    if (d == a) {
      $(".j-dialog").remove();
      PointOut("更新成功");
      return false;
    }
    JlHttp("saveMes", b, "", d);
  });
}
function SelectMes() {
  if ($(this).prop("checked")) {
    var a = $.trim($(this).parents(".j-mes").attr("mid"));
    JlHttp("selectMes", a, "", 1);
  } else {
    var a = $.trim($(this).parents(".j-mes").attr("mid"));
    JlHttp("selectMes", a, "", 0);
  }
}
function SelectMesResult(a) {
  if (a && a["result"] == 1) {
  } else {
    PointOut("失败");
  }
}
function SelectAllMes() {
  if ($(this).prop("checked")) {
    var a = $("input[name='mes']").length;
    if (a == 0) {
      PointOut("没有可选，请先新增个性邀请消息", 1);
    } else {
      JlHttp("selectAllMes", 1, "", a);
    }
  } else {
    JlHttp("selectAllMes", 0, "", a);
  }
}
function SelectAllMesResult(a) {
  if (a && a["result"] == 1) {
    if (a["action"] == 1) {
      $("input[name='mes']").prop("checked", true);
      PointOut("选择了 " + a["count"] + " 条");
    } else {
      $("input[name='mes']").prop("checked", false);
      PointOut("个性化邀请消息已全部取消，邀请好友时不会发送消息。");
    }
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function DeleteMes() {
  var a = $("input[name='mes']:checkbox:checked").length;
  if (a <= 0) {
    PointOut("请选择要删除的个性化邀请消息");
    return false;
  } else {
    JlConfirm("确定要删除选择的 " + a + " 条个性邀请消息吗？", "确定");
    $("#j_ok").on("click", function () {
      JlHttp("deleteMes", "", "", "");
    });
  }
}
function DeleteMesResult(a) {
  if (a && a["result"] == 1) {
    PointOut("删除成功");
    GetMes();
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function ShowMoreConnectCondition() {
  if ($(".j-connect-condition-box").is(":hidden")) {
    $(this).text("隐藏");
    $(this).attr("title", "隐藏更多过滤条件");
  } else {
    $(this).text("高级");
    $(this).attr("title", "显示更多过滤条件");
  }
  $(".j-connect-condition-box").slideToggle(100);
}
function CleanConnectCondition() {
  CleanSelectConnectCountry();
  CleanSelectConnectCompany();
  CleanSelectConnectIndustry();
  CleanSelectConnectSchool();
  CleanSelectConnectMutual();
  PointOut("清除完成", 1);
}
function GetConnectCountry() {
  var c = $.trim($(this).val());
  $("#j_connect_select_country").empty();
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  if (c) {
    if (isChinese(c)) {
      var d = "zh_CN";
    } else {
      var d = "en_US";
    }
    var b =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      encodeURIComponent(c) +
      "&q=type&query=(typeaheadFilterQuery:(geoSearchTypes:List(MARKET_AREA,COUNTRY_REGION,ADMIN_DIVISION_1,CITY)))&type=GEO";
    $.ajax({
      url: b,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": a,
        "x-li-lang": d,
        "x-restli-protocol-version": "2.0.0",
      },
      success: function (j) {
        if (j) {
          var h = j["data"]["elements"];
          var e = h.length;
          if (e > 0) {
            for (var f = 0; f < e; f++) {
              var k = h[f]["trackingUrn"].split(":")[3];
              var l = h[f]["title"]["text"];
              var g =
                "<div>" +
                '<span class="j-country-span" urn="' +
                k +
                '">' +
                l +
                "</span>" +
                "</div>";
              $("#j_connect_select_country").append(g);
            }
          }
        }
      },
      error: function () {
        PointOut("地区搜索失败");
      },
    });
  }
}
function SelectConnectCountry() {
  var b = $.trim($(this).attr("urn"));
  var c = $(this).text();
  $(this).parent("div").remove();
  $('input[name="connectcountry"]').each(function () {
    if ($.trim($(this).val()) == b) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var a =
    "<li>" +
    '<input type="checkbox" name="connectcountry" checked="checked" value="' +
    b +
    '">' +
    "<span>" +
    c +
    "</span>" +
    "</li>";
  $("#j_connect_country").append(a);
}
function CleanSelectConnectCountry() {
  $("#j_connect_country").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="connectcountry" value="102890883">' +
    "<span> 中国</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="connectcountry" value="103644278">' +
    "<span> 美国</span>" +
    "</li>";
  $("#j_connect_country").append(a);
  $("#j_connect_country_btn span").text("所在地区");
  PointOut("清除完成", 1);
}
function DetermineSelectConnectCountry() {
  var a = $('input[name="connectcountry"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="connectcountry"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_connect_country_btn span").text("所在地区(" + a + ")");
  } else {
    $("#j_connect_country_btn span").text("所在地区");
  }
  $(".j-condition").slideUp(200);
  $("#j_connect_search_country").val("");
  $("#j_connect_select_country").empty();
}
function GetConnectMutual() {
  var c = $.trim($(this).val());
  $("#j_connect_select_mutual").empty();
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  if (c) {
    if (isChinese(c)) {
      var d = "zh_CN";
    } else {
      var d = "en_US";
    }
    var b =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      encodeURIComponent(c) +
      "&q=type&query=(typeaheadFilterQuery:(geoSearchTypes:List(MARKET_AREA,COUNTRY_REGION,ADMIN_DIVISION_1,CITY)))&type=CONNECTIONS";
    $.ajax({
      url: b,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": a,
        "x-li-lang": d,
        "x-restli-protocol-version": "2.0.0",
      },
      success: function (j) {
        if (j) {
          $("#j_connect_select_mutual").empty();
          var h = j["data"]["elements"];
          if (h.length > 0) {
            for (var f = 0; f < h.length; f++) {
              var e = {};
              e["urn"] = h[f]["target"]["*profile"].split(":")[3];
              e["name"] = h[f]["title"]["text"];
              if (h[f]["subtitle"] && h[f]["subtitle"]["text"]) {
                e["position"] = h[f]["subtitle"]["text"];
              } else {
                e["position"] = "";
              }
              if (
                h[f]["image"]["attributes"][0]["detailDataUnion"] &&
                h[f]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ] &&
                h[f]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ]["vectorImage"] &&
                h[f]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["rootUrl"]
              ) {
                e["img"] =
                  h[f]["image"]["attributes"][0]["detailDataUnion"][
                    "nonEntityProfilePicture"
                  ]["vectorImage"]["rootUrl"] +
                  h[f]["image"]["attributes"][0]["detailDataUnion"][
                    "nonEntityProfilePicture"
                  ]["vectorImage"]["artifacts"][0][
                    "fileIdentifyingUrlPathSegment"
                  ];
              } else {
                e["img"] = "";
              }
              var g =
                '<div class="j-nowrap-left j-mutual-span" title="点击选择" urn="' +
                e["urn"] +
                '" na="' +
                e["name"] +
                '">' +
                '<div class="j-mutual-img"><img src="' +
                e["img"] +
                '"></div>' +
                '<div style="width:252px;">' +
                '<h3 class="j-oneline">' +
                e["name"] +
                "</h3>" +
                '<p class="j-oneline">' +
                e["position"] +
                "</p>" +
                "</div>" +
                "</div>";
              $("#j_connect_select_mutual").append(g);
            }
          }
        }
      },
      error: function () {
        PointOut("共同好友搜索失败");
      },
    });
  }
}
function SelectConnectMutual() {
  var c = $.trim($(this).attr("urn"));
  var a = $(this).attr("na");
  $(this).remove();
  $('input[name="connectmutual"]').each(function () {
    $(this).parent("li").remove();
  });
  var b =
    "<li>" +
    '<input type="checkbox" name="connectmutual" checked="checked" value="' +
    c +
    '">' +
    "<span>" +
    a +
    "</span>" +
    "</li>";
  $("#j_connect_mutual").append(b);
}
function CleanSelectConnectMutual() {
  $("#j_connect_mutual").empty();
  $("#j_connect_mutual_btn span").text("共同好友");
  PointOut("清除完成", 1);
}
function DetermineSelectConnectMutual() {
  var a = $('input[name="connectmutual"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="connectmutual"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_connect_mutual_btn span").text("共同好友(" + a + ")");
  } else {
    $("#j_connect_mutual_btn span").text("共同好友");
  }
  $(".j-condition").slideUp(200);
  $("#j_connect_search_mutual").val("");
  $("#j_connect_select_mutual").empty();
}
function GetConnectIndustry() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_connect_select_industry").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      d +
      "&q=type&query=(typeaheadFilterQuery:(standardizationEntityType:industry))&type=INDUSTRY";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k = l["data"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var g = 0; g < f; g++) {
              var m = k[g]["trackingUrn"].split(":")[3];
              var h = k[g]["title"]["text"];
              var j =
                "<div>" +
                '<span class="j-industry-span" urn="' +
                m +
                '">' +
                h +
                "</span>" +
                "</div>";
              $("#j_connect_select_industry").append(j);
            }
          }
        }
      },
      error: function () {
        PointOut("获取行业信息出错");
      },
    });
  }
}
function SelectConnectIndustry() {
  var c = $.trim($(this).attr("urn"));
  var a = $(this).text();
  $(this).parent("div").remove();
  $('input[name="connectindustry"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var b =
    "<li>" +
    '<input type="checkbox" name="connectindustry" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    a +
    "</span>" +
    "</li>";
  $("#j_connect_industry").append(b);
}
function CleanSelectConnectIndustry() {
  $("#j_connect_industry").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="connectindustry" value="6">' +
    "<span> 互联网</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="connectindustry" value="11">' +
    "<span> 电器/电子制造</span>" +
    "</li>";
  $("#j_connect_industry").append(a);
  $("#j_connect_industry_btn span").text("行业");
  PointOut("清除完成", 1);
}
function DetermineSelectConnectIndustry() {
  var a = $('input[name="connectindustry"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="connectindustry"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_connect_industry_btn span").text("行业(" + a + ")");
  } else {
    $("#j_connect_industry_btn span").text("行业");
  }
  $(".j-condition").slideUp(200);
  $("#j_connect_search_industry").val("");
  $("#j_connect_select_industry").empty();
}
function GetConnectCompany() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_connect_select_company").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      d +
      "&q=type&query=()&type=COMPANY";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k = l["data"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var g = 0; g < f; g++) {
              var m = k[g]["trackingUrn"].split(":")[3];
              var j = k[g]["title"]["text"];
              var h =
                "<div>" +
                '<span class="j-company-span" urn="' +
                m +
                '">' +
                j +
                "</span>" +
                "</div>";
              $("#j_connect_select_company").append(h);
            }
          }
        }
      },
      error: function () {
        PointOut("获取公司信息出错");
      },
    });
  }
}
function SelectConnectCompany() {
  var c = $.trim($(this).attr("urn"));
  var b = $(this).text();
  $(this).parent("div").remove();
  $('input[name="connectcompany"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var a =
    "<li>" +
    '<input type="checkbox" name="connectcompany" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    b +
    "</span>" +
    "</li>";
  $("#j_connect_company").append(a);
}
function CleanSelectConnectCompany() {
  $("#j_connect_company").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="connectcompany" value="14160">' +
    "<span> 阿里巴巴</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="connectcompany" value="3014">' +
    "<span> 华为</span>" +
    "</li>";
  $("#j_connect_company").append(a);
  $("#j_connect_company_btn span").text("目前就职");
  PointOut("清除完成", 1);
}
function DetermineSelectConnectCompany() {
  var a = $('input[name="connectcompany"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="connectcompany"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_connect_company_btn span").text("目前就职(" + a + ")");
  } else {
    $("#j_connect_company_btn span").text("目前就职");
  }
  $(".j-condition").slideUp(200);
  $("#j_connect_search_company").val("");
  $("#j_connect_select_company").empty();
}
function GetConnectSchool() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_connect_select_school").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/graphql?variables=(keywords:" +
      d +
      ",query:(),type:SCHOOL)&queryId=voyagerSearchDashReusableTypeahead.23c9f700d1a32edbb7f6646dda5e7480";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k =
            l["data"]["data"]["searchDashReusableTypeaheadByType"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var h = 0; h < f; h++) {
              var m = k[h]["trackingUrn"].slice(19);
              var g = k[h]["title"]["text"];
              var j =
                "<div>" +
                '<span class="j-school-span" urn="' +
                m +
                '">' +
                g +
                "</span>" +
                "</div>";
              $("#j_connect_select_school").append(j);
            }
          }
        }
      },
      error: function () {
        PointOut("获取就读学校错误");
      },
    });
  }
}
function SelectConnectSchool() {
  var c = $.trim($(this).attr("urn"));
  var a = $(this).text();
  $(this).parent("div").remove();
  $('input[name="connectschool"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var b =
    "<li>" +
    '<input type="checkbox" name="connectschool" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    a +
    "</span>" +
    "</li>";
  $("#j_connect_school").append(b);
}
function CleanSelectConnectSchool() {
  $("#j_connect_school").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="connectschool" value="20289">' +
    "<span> 北京大学</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="connectschool" value="14022">' +
    "<span> 清华大学</span>" +
    "</li>";
  $("#j_connect_school").append(a);
  $("#j_connect_school_btn span").text("就读学校");
  PointOut("清除完成", 1);
}
function DetermineSelectConnectSchool() {
  var a = $('input[name="connectschool"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="connectschool"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_connect_school_btn span").text("就读学校(" + a + ")");
  } else {
    $("#j_connect_school_btn span").text("就读学校");
  }
  $(".j-condition").slideUp(200);
  $("#j_connect_search_school").val("");
  $("#j_connect_select_school").empty();
}
function SearchConnect() {
  GetConnect(1);
}
function SearchConnectEnter() {
  if (event.keyCode == 13) {
    GetConnect(1);
  }
}
function GetConnect(a) {
  chrome.storage.sync.get({ my_urn: "", account: "", level: 0 }, function (i) {
    // if (!String(i.account)) {
    //   ShowLoginDialog();
    //   PointOut("请先登录领英精灵账号");
    //   return false;
    // }
    // if (!String(i.my_urn)) {
    //   JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
    //   $("#j_ok").click(function () {
    //     BindLinkedin(true);
    //   });
    //   return false;
    // }
    // if (parseInt(i.level) < 1) {
    //   ShowUpgrade("没有权限", "非会员不支持此功能，请升级会员使用。");
    //   return false;
    // }
    var j = "";
    var g = $.trim($("#j_connectKw").val());
    if (g) {
      j += "keywords:" + encodeURIComponent(g) + ",";
    }
    j += "flagshipSearchIntent:SEARCH_SRP,queryParameters:List(";
    var f = "";
    $('input[name="connectmutual"]:checkbox:checked').each(function () {
      f += $.trim($(this).val()) + ",";
    });
    if (f) {
      f = "(key:connectionOf,value:List(" + f.substr(0, f.length - 1) + ")),";
      j += f;
    }
    var l = "";
    $('input[name="connectcompany"]:checkbox:checked').each(function () {
      l += $.trim($(this).val()) + ",";
    });
    if (l) {
      l = "(key:currentCompany,value:List(" + l.substr(0, l.length - 1) + ")),";
      j += l;
    }
    var n = "";
    $('input[name="connectcountry"]:checkbox:checked').each(function () {
      n += $.trim($(this).val()) + ",";
    });
    if (n) {
      n = "(key:geoUrn,value:List(" + n.substr(0, n.length - 1) + ")),";
      j += n;
    }
    var k = "";
    $('input[name="connectindustry"]:checkbox:checked').each(function () {
      k += $.trim($(this).val()) + ",";
    });
    if (k) {
      k = "(key:industry,value:List(" + k.substr(0, k.length - 1) + ")),";
      j += k;
    }
    var c = "";
    if ($('input[name="distance_s"]').is(":checked")) {
      c += "S";
    }
    if ($('input[name="distance_o"]').is(":checked")) {
      if (c) {
        c += ",O";
      } else {
        c += "O";
      }
    }
    if (!c) {
      PointOut("请选择人脉度数");
      return false;
    } else {
      j += "(key:network,value:List(" + c + ")),";
    }
    j += "(key:resultType,value:List(PEOPLE)),";
    var h = "";
    $('input[name="connectschool"]:checkbox:checked').each(function () {
      h += $.trim($(this).val()) + ",";
    });
    if (h) {
      h = "(key:schoolFilter,value:List(" + h.substr(0, h.length - 1) + ")),";
      j += h;
    }
    var m = $.trim($("#j_connectTitle").val());
    if (m) {
      j += "(key:title,value:List(" + encodeURIComponent(m) + ")),";
    }
    j = j.substr(0, j.length - 1) + "),includeFiltersInResponse:false))";
    if (a > 0) {
      var d = (a - 1) * 10;
    } else {
      var d = 0;
    }
    var b =
      "https://www.linkedin.com/voyager/api/graphql?variables=(start:" +
      d +
      ",origin:FACETED_SEARCH,query:(" +
      j +
      "&&queryId=voyagerSearchDashClusters.a3ebd8258d1b429e3d95ff512f377687";
    var o = getCookie("JSESSIONID");
    if (o) {
      o = o.replace(/"/g, "");
    } else {
      PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
      return false;
    }
    if (isChinese(g)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    PointOut("搜索中...", 10);
    $.ajax({
      url: b,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": o,
        "x-restli-protocol-version": "2.0.0",
        "x-li-lang": e,
      },
      success: function (v) {
        $("#j_show_connect_condition").text("高级");
        $("#j_show_connect_condition").attr("title", "显示更多过滤条件");
        $(".j-connect-condition-box").slideUp();
        if (!v) {
          PointOut("失败，请再尝试一次或刷新领英页面");
          return false;
        }
        $("#j_connect_box").empty();
        PointOut("完成");
        if (v["data"]["data"]["searchDashClustersByAll"]["elements"]) {
          var q = [];
          var x = v["data"]["data"]["searchDashClustersByAll"]["elements"];
          for (var w = 0; w < x.length; w++) {
            for (var u = 0; u < x[w]["items"].length; u++) {
              if (
                x[w]["items"][u]["$type"] ==
                  "com.linkedin.voyager.dash.search.SearchItem" &&
                x[w]["items"][u]["item"]["*entityResult"] &&
                x[w]["items"][u]["item"]["*entityResult"].substr(0, 53) ==
                  "urn:li:fsd_entityResultViewModel:(urn:li:fsd_profile:"
              ) {
                q.push(
                  x[w]["items"][u]["item"]["*entityResult"].substr(53, 39)
                );
              }
            }
          }
        } else {
          var t =
            '<div class="j-explain-box">' +
            "<p>没有搜索到人脉，请切换关键词或过滤条件。</p>" +
            '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_connect_box").append(t);
          ShowPaging("j_connect_paging", 1, 0, 10);
          PointOut("没有搜索到人脉，请切换关键词或过滤条件。");
        }
        if (
          v["data"]["data"]["searchDashClustersByAll"]["metadata"][
            "totalResultCount"
          ]
        ) {
          var r =
            v["data"]["data"]["searchDashClustersByAll"]["metadata"][
              "totalResultCount"
            ];
        } else {
          var t =
            '<div class="j-explain-box">' +
            "<p>没有搜索到人脉，请切换关键词或过滤条件。</p>" +
            '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_connect_box").append(t);
          ShowPaging("j_connect_paging", 1, 0, 10);
          PointOut("没有搜索到人脉，请切换关键词或过滤条件。");
          return false;
        }
        if (v["data"]["data"]["searchDashClustersByAll"]["paging"]) {
          var z =
            v["data"]["data"]["searchDashClustersByAll"]["paging"]["total"];
        } else {
          var z = 0;
        }
        var t = '<div class="j-num">大约 ' + r + " 条结果</div>";
        $("#j_connect_box").append(t);
        ShowPaging("j_connect_paging", a, z, 10);
        var y = v["included"];
        var p = "";
        var B = [];
        Friend = [];
        if (q.length < 1) {
          var t =
            '<div class="j-explain-box">' +
            "<p>没有搜索到人脉，请切换关键词或过滤条件。</p>" +
            '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_connect_box").append(t);
          ShowPaging("j_connect_paging", 1, 0, 10);
          PointOut("没有搜索到人脉，请切换关键词或过滤条件。");
          return false;
        }
        for (var w = 0; w < q.length; w++) {
          for (var u = 0; u < y.length; u++) {
            if (
              y[u]["$type"] ==
                "com.linkedin.voyager.dash.search.EntityResultViewModel" &&
              y[u]["entityUrn"].substr(53, 39) == q[w]
            ) {
              var A = {};
              A["urn"] = q[w];
              p += A["urn"] + ",";
              var s = /^https:\/\/[www.]*linkedin.com\/in\//;
              if (y[u]["navigationUrl"] && s.test(y[u]["navigationUrl"])) {
                A["name"] = y[u]["title"]["text"];
                A["first_name"] = GetFirstName(y[u]["title"]["text"]);
                A["last_name"] = GetLastName(y[u]["title"]["text"]);
                A["public_id"] = decodeURIComponent(
                  y[u]["navigationUrl"].split("?")[0].substr(28)
                );
              } else {
                A["name"] = "领英会员";
                A["first_name"] = "";
                A["last_name"] = "";
                A["public_id"] = "";
              }
              if (y[u]["primarySubtitle"]) {
                A["position"] = y[u]["primarySubtitle"]["text"].substr(0, 140);
              } else {
                A["position"] = "";
              }
              if (y[u]["badgeText"]) {
                A["distance"] = y[u]["badgeText"]["text"];
              } else {
                A["distance"] = "";
              }
              if (
                y[u]["image"] &&
                y[u]["image"]["attributes"] &&
                y[u]["image"]["attributes"][0] &&
                y[u]["image"]["attributes"][0]["detailData"] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ]["vectorImage"] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"][0] &&
                y[u]["image"]["attributes"][0]["detailData"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"][0][
                  "fileIdentifyingUrlPathSegment"
                ]
              ) {
                A["img"] =
                  y[u]["image"]["attributes"][0]["detailData"][
                    "nonEntityProfilePicture"
                  ]["vectorImage"]["artifacts"][0][
                    "fileIdentifyingUrlPathSegment"
                  ];
              } else {
                A["img"] = "";
              }
              B.push(A);
            }
          }
        }
        if (p) {
          p = p.substring(0, p.length - 1);
          b = "/voyager/api/identity/profileActionsV2?ids=List(" + p + ")";
          $.ajax({
            url: b,
            type: "get",
            headers: {
              Accept: "application/vnd.linkedin.normalized+json+2.1",
              "csrf-token": o,
              "x-restli-protocol-version": "2.0.0",
            },
            success: function (F) {
              if (F) {
                var E = F["included"];
                for (var D = 0; D < B.length; D++) {
                  for (var C = 0; C < E.length; C++) {
                    if (B[D]["urn"] == E[C]["entityUrn"].split(":")[3]) {
                      if (
                        E[C]["primaryAction"] &&
                        E[C]["primaryAction"]["action"]
                      ) {
                        B[D]["action"] =
                          E[C]["primaryAction"]["action"]["$type"].split(
                            "."
                          )[6];
                      } else {
                        B[D]["action"] != "";
                      }
                    }
                  }
                }
                $("input[name='selectAllConnect']").prop("checked", false);
                if (B.length > 0) {
                  for (var D = 0; D < B.length; D++) {
                    AppendConnectToTable(B[D]);
                    if (B[D]["action"] != "InvitationPending") {
                      Friend.push(B[D]);
                    }
                  }
                }
              } else {
                PointOut("人脉搜索失败，请尝试刷新页面");
              }
            },
          });
        }
      },
      error: function (p, r, q) {
        PointOut("失败，请尝试刷新页面或重启浏览器");
      },
    });
  });
}
function AppendConnectToTable(b) {
  var a =
    '<div class="j-friend j-nowrap" id="c_' +
    b["urn"] +
    '" fn="' +
    b["first_name"] +
    '" ln="' +
    b["last_name"] +
    '" pid="' +
    b["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">';
  if (b["public_id"]) {
    a +=
      '<div><a href="https://www.linkedin.com/in/' +
      b["public_id"] +
      ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
      b["img"] +
      '"></a></div>';
  } else {
    a += '<div><img src="' + b["img"] + '"></div>';
  }
  a +=
    '<div class="j-profile">' +
    '<div class="j-nowrap-left">' +
    '<h3 class="j-oneline">' +
    b["name"] +
    "</h3>" +
    '<span class="j-distance">' +
    b["distance"] +
    "</span>" +
    "</div>" +
    '<p class="j-oneline j-posi">' +
    b["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>";
  switch (b["action"]) {
    case "Connect":
    case "SendInMail":
    case "Follow":
      a += '<input type="checkbox" name="connect">';
      break;
    case "InvitationPending":
      a += "<p style='padding-top:18px;'>待通过<p>";
      break;
    default:
      break;
  }
  a += "</div>" + "</div>";
  $("#j_connect_box").append(a);
}
function GetConnectSomePage() {
  var a = parseInt($(this).text());
  GetConnect(a);
}
function JumpConnect() {
  var b = parseInt($("#j_connect_paging .j-paging:last").text());
  var c = parseInt($("#j_connect_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_connect_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetConnect(c);
}
function JumpConnectEnter() {
  if (event.keyCode == 13) {
    JumpConnect();
  }
}
function GetSearchRecomm(a) {
  JlHttp("getSearchRecomm", a, "", "");
}
function GetSearchRecommResult(c) {
  if (c && c["result"] == 1) {
    if (c["page"] == 1) {
      var b =
        '<div style="color:#ccc; text-align:center; padding:12px;">----------  您的领英账号达到这个月的搜索上限，以下是推荐的人脉  ----------</div>';
      $("#j_connect_box").append(b);
    } else {
      $("#j_connect_box").empty();
    }
    ShowPaging("j_searchRecomm_paging", c["page"], 10000, 40);
    ShowPaging("j_connect_paging", 1, 0, 10);
    for (var a = 0; a < c["data"].length; a++) {
      AppendSearchRecomm(c["data"][a]);
    }
  } else {
    PointOut("推荐人脉获取失败");
  }
}
function AppendSearchRecomm(c) {
  var a = GetName(c["first_name"], c["last_name"]);
  var b =
    '<div class="j-friend j-nowrap" id="c_' +
    c["urn"] +
    '" fn="' +
    c["first_name"] +
    '" ln="' +
    c["last_name"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">';
  if (c["public_id"]) {
    b +=
      '<div><a href="https://www.linkedin.com/in/' +
      c["public_id"] +
      ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
      c["img"] +
      '"></a></div>';
  } else {
    b += '<div><img src="' + c["img"] + '"></div>';
  }
  b +=
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline j-posi">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="connect">' +
    "</div>" +
    "</div>";
  $("#j_connect_box").append(b);
}
function GetSearchRecommSomePage() {
  var a = parseInt($(this).text());
  GetSearchRecomm(a);
}
function JumpSearchRecomm() {
  var b = parseInt($("#j_searchRecomm_paging .j-paging:last").text());
  var c = parseInt($("#j_searchRecomm_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_searchRecomm_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetSearchRecomm(c);
}
function JumpSearchRecommEnter() {
  if (event.keyCode == 13) {
    GetSearchRecomm();
  }
}
function SelectAllConnect() {
  if ($(this).prop("checked")) {
    $("input[name='connect']").prop("checked", true);
    var a = $("input[name='connect']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请先搜索人脉", 1);
    } else {
      PointOut("选择了 " + a + " 位人脉", 1);
    }
  } else {
    $("input[name='connect']").prop("checked", false);
  }
}
function StartConnectSearch() {
  var a = $("input[name='connect']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请先选择人脉");
    return false;
  } else {
    Friend = [];
    $("input[name='connect']:checkbox:checked").each(function () {
      var b = {};
      b["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      b["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      b["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      b["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      b["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      b["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      Friend.push(b);
    });
    if (Friend.length > 0) {
      JlHttp("getMesAddFriend", "", "search", "");
    } else {
      PointOut("没有选择要加的人，请重新选择");
    }
  }
}
function AddInviteSearch() {
  var b = $("input[name='connect']:checkbox:checked").length;
  if (b == 0) {
    PointOut("请先选择人脉");
  } else {
    var a = [];
    $("input[name='connect']:checkbox:checked").each(function () {
      var c = {};
      c["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      c["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      c["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      c["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      c["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      c["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      a.push(c);
    });
    if (a.length > 0) {
      a = JSON.stringify(a);
      JlHttp("addInviteQueue", a, "connect", "");
    } else {
      PointOut("请选择人脉");
    }
  }
}
function ConnectSearch() {
  if (Friend.length > 0) {
    Connect(
      Friend[0]["urn"],
      Friend[0]["first_name"],
      Friend[0]["last_name"],
      Friend[0]["img"],
      "Search"
    );
    $("#c_" + Friend[0]["urn"]).remove();
    Friend.shift();
    if (Friend.length == 0) {
      var a = parseInt($("#j_connect_paging .j-paging:last").text());
      var b = parseInt($("#j_connect_paging .j-curpage").text());
      if (b < a) {
        b++;
        GetConnect(b);
      }
    }
    chrome.storage.sync.get(
      { a_today_num: 0, a_min_speed: 30, a_max_speed: 60, risk: true },
      function (c) {
        var d = GetTime(
          parseInt(c.a_today_num),
          parseInt(c.a_min_speed),
          parseInt(c.a_max_speed),
          c.risk
        );
        Delayed_time = d;
        DelayedTime();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectSearch", other: "" },
            function (e) {}
          );
        }, d * 1000);
      }
    );
  } else {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
}
function GetLyComm() {
  PointOut("获取领英推荐人脉中...", 10);
  var d = $("#j_getLyComm").attr("start");
  var c = $("#j_getLyComm").attr("total");
  if (d >= c) {
    d = 0;
  }
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var b =
    "https://www.linkedin.com/voyager/api/relationships/discovery?count=12&paginationToken=1214007020&q=cohort&reasons=List((sourceType:PYMK_ENTITY,reasonContext:PYMK_ENTITY))&start=" +
    d;
  $.ajax({
    url: b,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": a,
      "content-type": "application/json; charset=UTF-8",
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (m) {
      if (m["data"] && m["included"] && m["data"]["*elements"]) {
        PointOut("完成");
        $("input[name='selectAllLyComm']").prop("checked", false);
        if (m["data"]["paging"]) {
          c = m["data"]["paging"]["total"];
          d = m["data"]["paging"]["start"] + m["data"]["paging"]["count"];
        }
        $("#j_getLyComm").attr("start", d);
        $("#j_getLyComm").attr("total", c);
        if (parseInt(c) == 0) {
          $("#j_lyComm_box").empty();
          PointOut("没有推荐的人");
          var k =
            '<div class="j-explain-box">' +
            "<p>没有推荐的人<p/>" +
            '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_lyComm_box").append(k);
          return false;
        }
        var f = [];
        Friend = [];
        var l = m["data"]["*elements"];
        var n = m["included"];
        for (var h = 0; h < l.length; h++) {
          var e = {};
          e["urn"] = l[h].substr(l[h].length - 45, 39);
          for (var g = 0; g < n.length; g++) {
            if (
              n[g]["$type"] ==
                "com.linkedin.voyager.identity.shared.MiniProfile" &&
              n[g]["entityUrn"].substr(22) == e["urn"]
            ) {
              e["first_name"] = n[g]["firstName"];
              e["last_name"] = n[g]["lastName"];
              e["public_id"] = n[g]["publicIdentifier"];
              if (n[g]["occupation"]) {
                e["position"] = n[g]["occupation"];
              } else {
                e["position"] = "";
              }
              if (
                n[g]["picture"] &&
                n[g]["picture"]["artifacts"] &&
                n[g]["picture"]["rootUrl"]
              ) {
                e["img"] =
                  n[g]["picture"]["rootUrl"] +
                  n[g]["picture"]["artifacts"][0][
                    "fileIdentifyingUrlPathSegment"
                  ];
              } else {
                e["img"] = "";
              }
            }
          }
          f.push(e);
          Friend.push(e);
        }
        if (f.length > 0) {
          $("#j_lyComm_box").empty();
          $("#j_getLyComm").text("换一批");
          for (var h = 0; h < f.length; h++) {
            AppendLyComm(f[h]);
          }
        } else {
          $("#j_lyComm_box").empty();
          PointOut("没有推荐的人");
          var k =
            '<div class="j-explain-box">' +
            "<p>没有推荐的人<p/>" +
            '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_lyComm_box").append(k);
          return false;
        }
      } else {
        $("#j_lyComm_box").empty();
        PointOut("没有推荐的人");
        var k =
          '<div class="j-explain-box">' +
          "<p>没有推荐的人<p/>" +
          '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_lyComm_box").append(k);
        return false;
      }
    },
    error: function (e, g, f) {
      PointOut("失败，请尝试刷新页面或重启浏览器");
    },
  });
}
function AppendLyComm(c) {
  var a = GetName(c.first_name, c.last_name);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id="y_' +
    c["urn"] +
    '" fn="' +
    c["first_name"] +
    '" ln="' +
    c["last_name"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">';
  if (c["public_id"]) {
    b +=
      '<div><a href="https://www.linkedin.com/in/' +
      c["public_id"] +
      ' "target="_black" title="打开该好友Linkedin主页">' +
      '<img src="' +
      c["img"] +
      '"></a></div>';
  } else {
    b += '<div><img src="' + c["img"] + '"></div>';
  }
  b +=
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline j-posi">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>";
  b += '<input type="checkbox" name="lyComm">';
  b += "</div>" + "</div>";
  $("#j_lyComm_box").append(b);
}
function SelectAllLyComm() {
  if ($(this).prop("checked")) {
    $("input[name='lyComm']").prop("checked", true);
    var a = $("input[name='lyComm']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请点击“换一批”按钮获取人脉");
    } else {
      PointOut("选择了 " + a + " 位人脉", 1);
    }
  } else {
    $("input[name='lyComm']").prop("checked", false);
  }
}
function StartConnectLyComm() {
  var a = $("input[name='lyComm']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请先选择人脉");
  } else {
    Friend = [];
    $("input[name='lyComm']:checkbox:checked").each(function () {
      var b = {};
      b["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      b["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      b["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      b["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      b["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      Friend.push(b);
    });
    if (Friend.length > 0) {
      JlHttp("getMesAddFriend", "", "lyComm", "");
    } else {
      PointOut("没有选择要加的人，请重新选择");
    }
  }
}
function ConnectLyComm() {
  if (Friend.length > 0) {
    Connect(
      Friend[0]["urn"],
      Friend[0]["first_name"],
      Friend[0]["last_name"],
      Friend[0]["img"],
      "lyComm"
    );
    $("#y_" + Friend[0]["urn"]).remove();
    Friend.shift();
    if (Friend.length == 0) {
      GetLyComm();
    }
    chrome.storage.sync.get(
      { a_today_num: 0, a_min_speed: 30, a_max_speed: 60, risk: true },
      function (a) {
        var b = GetTime(
          parseInt(a.a_today_num),
          parseInt(a.a_min_speed),
          parseInt(a.a_max_speed),
          a.risk
        );
        Delayed_time = b;
        DelayedTime();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectLyComm", other: "" },
            function (c) {}
          );
        }, b * 1000);
      }
    );
  } else {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
}
function AddInviteLyComm() {
  var b = $("input[name='lyComm']:checkbox:checked").length;
  if (b == 0) {
    PointOut("请先选择人脉");
  } else {
    var a = [];
    $("input[name='lyComm']:checkbox:checked").each(function () {
      var c = {};
      c["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      c["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      c["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      c["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      c["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      c["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      a.push(c);
    });
    if (a.length > 0) {
      a = JSON.stringify(a);
      JlHttp("addInviteQueue", a, "lyComm", "");
    } else {
      PointOut("请选择人脉");
    }
  }
}
function GetJlComm() {
  PointOut("获取精灵推荐人脉中...", 10);
  JlHttp("getJlComm", "", "", "");
}
function GetJlCommResult(b) {
  if (b && b["result"] == 1) {
    PointOut("获取成功");
    $("#j_getJlComm").text("换一批");
    $("input[name='selectAllJlComm']").prop("checked", false);
    $("#j_jlComm_box").empty();
    for (var a = 0; a < b["data"].length; a++) {
      AppendJlComm(b["data"][a]);
    }
  } else {
    PointOut("获取失败");
  }
}
function AppendJlComm(c) {
  var a = GetName(c.first_name, c.last_name);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id="j_' +
    c["urn"] +
    '" fn="' +
    c["first_name"] +
    '" ln="' +
    c["last_name"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">';
  if (c["public_id"]) {
    b +=
      '<div><a href="https://www.linkedin.com/in/' +
      c["public_id"] +
      ' "target="_black" title="打开该好友Linkedin主页">' +
      '<img src="' +
      c["img"] +
      '"></a></div>';
  } else {
    b += '<div><img src="' + c["img"] + '"></div>';
  }
  b +=
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline j-posi">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>";
  b += '<input type="checkbox" name="jlComm">';
  b += "</div>" + "</div>";
  $("#j_jlComm_box").append(b);
}
function SelectAllJlComm() {
  if ($(this).prop("checked")) {
    $("input[name='jlComm']").prop("checked", true);
    var a = $("input[name='jlComm']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请点击“换一批”按钮获取人脉");
    } else {
      PointOut("选择了 " + a + " 位人脉", 1);
    }
  } else {
    $("input[name='jlComm']").prop("checked", false);
  }
}
function StartConnectJlComm() {
  var a = $("input[name='jlComm']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请先选择人脉");
  } else {
    Friend = [];
    $("input[name='jlComm']:checkbox:checked").each(function () {
      var b = {};
      b["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      b["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      b["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      b["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      b["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      b["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      Friend.push(b);
    });
    if (Friend.length > 0) {
      JlHttp("getMesAddFriend", "", "jlComm", "");
    } else {
      PointOut("没有选择要加的人，请重新选择");
    }
  }
}
function ConnectJlComm() {
  if (Friend.length > 0) {
    Connect(
      Friend[0]["urn"],
      Friend[0]["first_name"],
      Friend[0]["last_name"],
      Friend[0]["img"],
      "JlComm"
    );
    $("#j_" + Friend[0]["urn"]).remove();
    Friend.shift();
    chrome.storage.sync.get(
      { a_today_num: 0, a_min_speed: 30, a_max_speed: 60, risk: true },
      function (a) {
        var b = GetTime(
          parseInt(a.a_today_num),
          parseInt(a.a_min_speed),
          parseInt(a.a_max_speed),
          a.risk
        );
        Delayed_time = b;
        DelayedTime();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectJlComm", other: "" },
            function (c) {}
          );
        }, b * 1000);
      }
    );
  } else {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
}
function Connect(b, e, d, c, a) {
  chrome.storage.sync.get(
    { a_today_num: 0, a_limit: 100, level: 0 },
    function (h) {
      if (parseInt(h.level) < 1 && parseInt(h.a_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "今日试用名额已用完。您是试用会员，试用会员每天有" +
                TestCount +
                "个试用名额，升级会员不受此限制。"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(h.a_today_num) >= parseInt(h.a_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今天邀请量已过设置的最大量，请明天来加或在精灵设置里把每日邀请量设置大些。"
          );
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", c);
      var g = getCookie("JSESSIONID");
      if (!g) {
        StopAction();
        setTimeout(function () {
          alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
        }, 50);
        return false;
      } else {
        g = g.replace(/"/g, "");
      }
      var j = RandomTidings(e, d);
      if (j) {
        var f = {
          inviteeProfileUrn: "urn:li:fsd_profile:" + b,
          customMessage: j,
        };
      } else {
        var f = { inviteeProfileUrn: "urn:li:fsd_profile:" + b };
      }
      var i =
        "/voyager/api/voyagerRelationshipsDashMemberRelationships?action=verifyQuotaAndCreate";
      $.ajax({
        url: i,
        type: "post",
        data: JSON.stringify(f),
        headers: {
          Accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": g,
          "content-type": "application/json; charset=UTF-8",
          "x-restli-protocol-version": "2.0.0",
        },
        success: function (l) {
          ActionCount++;
          var k = parseInt(h.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (k > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + k + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + k + "人");
          }
          chrome.storage.sync.set({ a_today_num: [k] }, function () {});
          JlHttp("saveConnectRecord", b, a, 200);
        },
        error: function (l, n, m) {
          JlHttp("saveConnectRecord", b, a, l.status);
          if (l.status == 429) {
            StopAction();
            setTimeout(function () {
              if (Tidings.length > 0) {
                alert("你的领英没有了个性化邀请名额，请尝试不加邀请消息加人。");
              } else {
                alert("你的领英达到本周邀请上限，请下周再来加");
              }
            }, 50);
            return false;
          }
          ActionCount++;
          var k = parseInt(h.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (k > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + k + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + k + "人");
          }
          chrome.storage.sync.set({ a_today_num: [k] }, function () {});
        },
      });
    }
  );
}
function AddInviteJlComm() {
  var b = $("input[name='jlComm']:checkbox:checked").length;
  if (b == 0) {
    PointOut("请先选择人脉");
  } else {
    var a = [];
    $("input[name='jlComm']:checkbox:checked").each(function () {
      var c = {};
      c["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      c["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      c["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      c["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      c["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      c["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      a.push(c);
    });
    if (a.length > 0) {
      a = JSON.stringify(a);
      JlHttp("addInviteQueue", a, "jlComm", "");
    } else {
      PointOut("请选择人脉");
    }
  }
}
function AddInviteQueueResult(a) {
  if (a && a["result"] == 1) {
    PointOut("加入成功，可在“待加”队列里启动加人");
    $("input[name='" + a["tag"] + "']").prop("checked", false);
  } else {
    PointOut("加入失败，请重试或尝试重启浏览器");
  }
}
function ShowLine() {
  GetLine(1);
}
function GetLine(a) {
  JlHttp("getLine", a, "", "");
}
function GetLineResult(c) {
  if (c) {
    switch (c["result"]) {
      case 0:
        PointOut("获取好友失败，请尝试刷新页面或重启浏览器");
        break;
      case 1:
        PointOut("获取成功", 1);
        $("#j_lineAdd_box").empty();
        ShowPaging("j_lineAdd_paging", c["page"], c["total"], c["count"]);
        for (var a = 0; a < c["data"].length; a++) {
          AppendLine(c["data"][a]);
        }
        break;
      case 2:
        $("#j_lineAdd_box").empty();
        var b =
          '<div class="j-explain-box">' +
          "<p>链接加人，只需要对方的主页链接即可加为好友。通过对方链接加人时不会智能插入对方称呼，所以在设置邀请消息模板时要区分开。</p>" +
          '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_lineAdd_box").append(b);
        PointOut("没有可加的链接人脉");
        break;
    }
  } else {
    PointOut("获取好友失败，请尝试刷新页面或重启浏览器");
  }
}
function AppendLine(b) {
  var a =
    '<div id="l_' +
    b["id"] +
    '" class="j-line-box j-nowrap" ws="' +
    b["websites"] +
    '">' +
    '<div class="j-nowrap">' +
    '<p class="j-oneline">https://www.linkedin.com/in/' +
    b["websites"] +
    "</p>" +
    '<a style="margin-left:36px;" href="https://www.linkedin.com/in/' +
    b["websites"] +
    '" target="_black">查看主页</a>' +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="lineAdd">' +
    "</div>" +
    "</div>";
  $("#j_lineAdd_box").append(a);
}
function NewLine() {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>新增链接人脉</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<div calss="j-w">' +
    '<textarea id="j_line" class="j-line-cont" placeholder="网址要求：&#13;&#10;1.一行一条&#13;&#10;2.网址一定要是对方主页的地址&#13;&#10;3.一次最多添加1000条&#13;&#10;&#13;&#10;例：&#13;&#10;https://www.linkedin.com/in/kai-tai-askwx3611a&#13;&#10;https://www.linkedin.com/in/kai-wang-a473611a&#13;&#10;https://www.linkedin.com/in/志强-胡&#13;&#10;"></textarea>' +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-ctrl">' +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var b = $.trim($("#j_line").val());
    if (!b) {
      PointOut("内容不能为空");
      return false;
    }
    b = b.split("\n");
    var c = [];
    for (var d = 0; d < b.length; d++) {
      if (b[d]) {
        var e = /^http[s]*:\/\/[www.]*linkedin.com\/in\//;
        if (e.test(b[d])) {
          b[d] = $.trim(b[d]).replace(
            /^http[s]*:\/\/[www.]*linkedin.com\/in\//g,
            ""
          );
          b[d] = b[d].replace("/", "");
          b[d] = b[d].replace(",", "");
          b[d] = b[d].replace("，", "");
          c.push(b[d]);
        }
      }
    }
    if (c.length > 0) {
      c = JSON.stringify(c);
      JlHttp("newLine", c, "", "");
    } else {
      PointOut("格式错误");
    }
  });
}
function NewLineResult(a) {
  if (a && a["result"] == 1) {
    $(".j-dialog").remove();
    $("input[name='selectAllLine']").prop("checked", false);
    GetLine(1);
    PointOut("新增成功");
  } else {
    PointOut("新增失败，请尝试刷新页面或重启浏览器");
  }
}

function SelectAllLine() {
  if ($(this).prop("checked")) {
    $("input[name='lineAdd']").prop("checked", true);
    var a = $("input[name='lineAdd']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请点击“显示”按钮");
    } else {
      PointOut("选择了 " + a + " 位", 1);
    }
  } else {
    $("input[name='lineAdd']").prop("checked", false);
  }
}
function GetLineSomePage() {
  var a = parseInt($(this).text());
  GetLine(a);
}
function JumpLine() {
  var b = parseInt($("#j_lineAdd_paging .j-paging:last").text());
  var c = parseInt($("#j_lineAdd_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数");
    return false;
  }
  var d = parseInt($("#j_lineAdd_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成", 1);
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内");
    return false;
  }
  GetLine(c);
}
function JumpLineEnter() {
  if (event.keyCode == 13) {
    JumpLine();
  }
}
function RemoveLine() {
  chrome.storage.sync.get({ account: "", my_urn: "" }, function (b) {
    var e = String(b.account);
    var c = String(b.my_urn);
    // if (!e) {
    //   ShowLoginDialog();
    //   PointOut("请先登录领英精灵账号");
    //   return false;
    // }
    // if (!c) {
    //   JlConfirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？");
    //   $("#j_ok").click(function () {
    //     BindLinkedin(true);
    //   });
    //   return false;
    // }
    var d = $("input[name='lineAdd']:checkbox:checked").length;
    if (d == 0) {
      PointOut("请先选择人脉");
    } else {
      var a = [];
      $("input[name='lineAdd']:checkbox:checked").each(function () {
        a.push($.trim($(this).parents("div.j-line-box").attr("ws")));
      });
      if (a.length > 0) {
        a = JSON.stringify(a);
        JlHttp("removeLine", a, "", "");
      } else {
        PointOut("请选择人脉");
      }
    }
  });
}
function RemoveLineResult(a) {
  if (a && a["result"] == 1) {
    PointOut("移出成功");
    $("input[name='selectAllLine']").prop("checked", false);
    $("input[name='lineAdd']:checkbox:checked").each(function () {
      $(this).parents("div.j-line-box").remove();
    });
  } else {
    PointOut("移出失败");
  }
}
function StartConnectLine() {
  chrome.storage.sync.get(
    { level: 0, trial: 0, a_today_num: 0, a_limit: 100, run: false },
    function (a) {
      if (a.run) {
        PointOut("当前正在自动操作中，请先停止其它操作");
        return false;
      }
      // if (parseInt(a.level) < 1 && parseInt(a.trial) < 1) {
      //   ShowUpgrade(
      //     "试用期已过",
      //     "试用会员可试用一周，您的试用期已过，请升级会员使用",
      //     "立即升级"
      //   );
      //   return false;
      // }
      if (parseInt(a.a_today_num) >= parseInt(a.a_limit)) {
        JlAlert(
          "今天已发" +
            a.a_today_num +
            "条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！"
        );
        return false;
      }
      Friend = [];
      $("input[name='lineAdd']:checkbox:checked").each(function () {
        var b = {};
        b["id"] = $(this).parents("div.j-line-box").attr("id").slice(2);
        b["public_id"] = $(this).parents("div.j-line-box").attr("ws");
        Friend.push(b);
      });
      if (Friend.length > 0) {
        JlHttp("getMesAddFriend", "", "line", "");
      } else {
        PointOut("没有选择要加的人，请重新选择");
      }
    }
  );
}

function StartConnectLine2() {
  Friend = [];
  $("input[name='lineAdd']:checkbox:checked").each(function () {
    var b = {};
    b["id"] = $(this).parents("div.j-line-box").attr("id").slice(2);
    b["public_id"] = $(this).parents("div.j-line-box").attr("ws");
    Friend.push(b);
  });
  if (Friend.length > 0) {
    JlHttp("getMesAddFriend", "", "line", "");
  } else {
    PointOut("没有选择要加的人，请重新选择");
  }
}

// Function to handle sending connection request and updating row
// Usage
var rowId = 3; // assuming the row ID to update is 3
const updates = {
  "Status": "Sent"
};


// function fetchNameValue() {
//   // return new Promise((resolve, reject) => {
//   //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   //     chrome.scripting.executeScript({
//   //       target: { tabId: tabs[0].id },
//   //       function: function() {
//   //         // Define the CSS selector to select the image element with specific classes
//   //         const selector = '.global-nav__primary-link.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view img';
//   //         const element = document.querySelector(selector);
//   //         return element ? element.alt : null; // Return the alt attribute value if the element is found
//   //       }
//   //     }, function(result) {
//   //       const value = result[0].result;
//   //       resolve(value); // Resolve the Promise with the fetched value
//   //     });
//   //   });
//   // });
//   var j = getCookie("JSESSIONID");
//   if (j) {
//     j = j.replace(/"/g, "");
//   } else {
//     PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
//     return false;
//   }
//   var b = "/voyager/api/me";
//   $.ajax({
//     url: b,
//     type: "get",
//     headers: {
//       Accept: "application/vnd.linkedin.normalized+json+2.1",
//       "csrf-token": j,
//       "x-restli-protocol-version": "2.0.0",
//     },
//     success: function (q) {
//       if (q) {
//         var o = q["included"][0]["firstName"];
//         var m = q["included"][0]["lastName"];
//         var n = GetName(o, m);
//         var p = q["included"][0]["entityUrn"].split(":")[3];
//         var l = q["included"][0]["publicIdentifier"];
//         console.log(n);
//         resolve(n);
//       } else {
//         reject("No data found"); // Reject the Promise if 'q' is falsy
//       }
//         // if (
//         //   q["included"][0]["picture"] &&
//         //   q["included"][0]["picture"]["rootUrl"]
//         // ) {
//         //   var k =
//         //     q["included"][0]["picture"]["rootUrl"] +
//         //     q["included"][0]["picture"]["artifacts"][3][
//         //       "fileIdentifyingUrlPathSegment"
//         //     ];
//         // } else {
//         //   var k = "";
//         // }
//         // if (p) {
//         //   chrome.storage.sync.set(
//         //     { my_urn: [p], name: [n], img: [k], public_id: [l] },
//         //     function () {}
//         //   );
//         //   var r = {
//         //     my_urn: p,
//         //     public_id: l,
//         //     first_name: o,
//         //     last_name: m,
//         //     img: k,
//         //   };
//         //   r = JSON.stringify(r);
//         //   JlHttp("bindLinkedin", r, "bind", a);
//       },
//       error: function(xhr, status, error) {
//         reject(error); // Reject the Promise with the error message if the request fails
//       }
//     });
// }

function fetchNameValue() {
  return new Promise((resolve, reject) => {
    var j = getCookie("JSESSIONID");
    if (j) {
      j = j.replace(/"/g, "");
    } else {
      PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
      reject(new Error("LinkedIn account not logged in"));
      return; // Return early to prevent further execution
    }
    var b = "/voyager/api/me";
    $.ajax({
      url: b,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": j,
        "x-restli-protocol-version": "2.0.0",
      },
      success: function (q) {
        if (q) {
          var o = q["included"][0]["firstName"];
          var m = q["included"][0]["lastName"];
          var n = GetName(o, m);
          var p = q["included"][0]["entityUrn"].split(":")[3];
          var l = q["included"][0]["publicIdentifier"];
          console.log(n);
          resolve(n);
        } else {
          reject("No data found"); // Reject the Promise if 'q' is falsy
        }
      },
      error: function(xhr, status, error) {
        reject(error); // Reject the Promise with the error message if the request fails
      }
    });
  });
}

function randomString(b) {
  b = b || 22;
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+0123456789";
  var a = c.length;
  var e = "";
  for (var d = 0; d < b; d++) {
      e += c.charAt(Math.floor(Math.random() * a))
  }
  return e
}

// function sendingConnection(template, profileId, JSESSIONID) {
//   // Generate tracking ID
//   var trackingId = randomString(22) + "==";
//   var connectionLink = 'https://www.linkedin.com/voyager/api/growth/normInvitations';

//   var payload = {
//       "emberEntityName": "growth/invitation/norm-invitation",
//       "invitee": {
//           "com.linkedin.voyager.growth.invitation.InviteeProfile": {
//               "profileId": profileId
//           }
//       },
//       "message": template,
//       "trackingId": trackingId
//   };

//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', connectionLink, true);
//   xhr.setRequestHeader('Accept', 'application/vnd.linkedin.normalized+json+2.1');
//   xhr.setRequestHeader('csrf-token', JSESSIONID.replace(/"/g, ""));
//   xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
//   xhr.setRequestHeader('x-restli-protocol-version', '2.0.0');
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//           if (xhr.status === 201) {
//               console.log('Success:' + profileId);
//           } else {
//               console.error('Error:', xhr.statusText);
//           }
//       }
//   };
//   xhr.send(JSON.stringify(payload));
// }


// var b = getCookie("JSESSIONID");
// if (!b) {
//   StopAction();
//   setTimeout(function () {
//     alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
//   }, 50);
//   return false;
// } else {
//   b = b.replace(/"/g, "");
// }
// var f = randomString(22) + "==";
// var g = RandomTidings("", "");
// if (g) {
//   var a = {
//     emberEntityName: "growth/invitation/norm-invitation",
//     invitee: {
//       "com.linkedin.voyager.growth.invitation.InviteeProfile": {
//         profileId: Friend[0]["public_id"],
//       },
//     },
//     message: g,
//     trackingId: f,
//   };
// } else {
//   var a = {
//     emberEntityName: "growth/invitation/norm-invitation",
//     invitee: {
//       "com.linkedin.voyager.growth.invitation.InviteeProfile": {
//         profileId: Friend[0]["public_id"],
//       },
//     },
//     trackingId: f,
//   };
// }
// var d = "/voyager/api/growth/normInvitations";
// $.ajax({
//   url: d,
//   type: "post",
//   data: JSON.stringify(a),
//   headers: {
//     Accept: "application/vnd.linkedin.normalized+json+2.1",
//     "csrf-token": b,
//     "content-type": "application/json; charset=UTF-8",
//     "x-restli-protocol-version": "2.0.0",
//   },
//   success: function (i) {
//     ActionCount++;
//     var h = parseInt(c.a_today_num) + 1;
//     $("#j_action_count").text("本次已加：" + ActionCount + "人");
//     if (h > 100) {
//       $("#j_today_count").html(
//         '<font style="color:#f00;">今日已加：' + h + "人</font>"
//       );
//     } else {
//       $("#j_today_count").text("今日已加：" + h + "人");
//     }
//     chrome.storage.sync.set({ a_today_num: [h] }, function () {});
//     JlHttp("saveConnectRecord", Friend[0]["public_id"], "line", 200);
//   },
//   error: function (i, k, j) {
//     JlHttp("saveConnectRecord", Friend[0]["public_id"], "line", i.status);
//     if (i.status == 429) {
//       StopAction();
//       setTimeout(function () {
//         if (Tidings.length > 0) {
//           alert("你的领英没有了个性化邀请，请尝试不加邀请消息加人。");
//         } else {
//           alert("你的领英达到本周邀请上限，请下周再来加");
//         }
//       }, 50);
//       return false;
//     }
//     ActionCount++;
//     var h = parseInt(c.a_today_num) + 1;
//     $("#j_action_count").text("本次已加：" + ActionCount + "人");
//     if (h > 100) {
//       $("#j_today_count").html(
//         '<font style="color:#f00;">今日已加：' + h + "人</font>"
//       );
//     } else {
//       $("#j_today_count").text("今日已加：" + h + "人");
//     }
//     chrome.storage.sync.set({ a_today_num: [h] }, function () {});
//   },
// });


// function sendingConnection(template, profileId, JSESSIONID, indexNum) {
//   return new Promise((resolve, reject) => {
//     // Generate tracking ID
//     var trackingId = randomString(22) + "==";
//     var connectionLink = 'https://www.linkedin.com/voyager/api/growth/normInvitations';

//     var payload = {
//       "emberEntityName": "growth/invitation/norm-invitation",
//       "invitee": {
//         "com.linkedin.voyager.growth.invitation.InviteeProfile": {
//           "profileId": profileId
//         }
//       },
//       "message": template,
//       "trackingId": trackingId
//     };

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', connectionLink, true);
//     xhr.setRequestHeader('Accept', 'application/vnd.linkedin.normalized+json+2.1');
//     xhr.setRequestHeader('csrf-token', JSESSIONID.replace(/"/g, ""));
//     xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
//     xhr.setRequestHeader('x-restli-protocol-version', '2.0.0');
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         if (xhr.status === 201) {
//           console.log('Success:' + profileId);
//           PointOut("成功添加第" + (indexNum).toString() + "位候选人：" + profileId); 
//           resolve(); // Resolve the promise if the request is successful
//         } else {
//           PointOut("添加失败第" + (indexNum).toString() + "位候选人：" + profileId); 
//           console.error('Error:', xhr.statusText);
//           reject(new Error(xhr.statusText)); // Reject the promise with an error if the request fails
//         }
//       }
//     };
//     xhr.send(JSON.stringify(payload));
//   });
// }
// function sendingConnection(template, profileId, JSESSIONID, indexNum) {
//   return new Promise((resolve, reject) => {
//     // Generate tracking ID
//     var trackingId = randomString(22) + "==";
//     var connectionLink = 'https://www.linkedin.com/voyager/api/growth/normInvitations';

//     var payload = {
//       "emberEntityName": "growth/invitation/norm-invitation",
//       "invitee": {
//         "com.linkedin.voyager.growth.invitation.InviteeProfile": {
//           "profileId": profileId
//         }
//       },
//       "message": template,
//       "trackingId": trackingId
//     };

//     $.ajax({
//       url: connectionLink,
//       type: "POST",
//       data: JSON.stringify(payload),
//       headers: {
//         Accept: "application/vnd.linkedin.normalized+json+2.1",
//         "csrf-token": JSESSIONID.replace(/"/g, ""),
//         "content-type": "application/json; charset=UTF-8",
//         "x-restli-protocol-version": "2.0.0",
//       },
//       success: function (response) {
//         console.log('Success:' + profileId);
//         PointOut("成功添加第" + (indexNum).toString() + "位候选人：" + profileId);
//         resolve(); // Resolve the promise if the request is successful
//       },
//       error: function (xhr, textStatus, errorThrown) {
//         PointOut("添加失败第" + (indexNum).toString() + "位候选人：" + profileId);
//         console.error('Error:', xhr.statusText);
//         reject(new Error(xhr.statusText)); // Reject the promise with an error if the request fails
//       }
//     });
//   });
// }
function sendingConnection(template, profileId, JSESSIONID, indexNum) {
  return new Promise((resolve, reject) => {
    // Generate tracking ID
    var trackingId = randomString(22) + "==";
    var connectionLink = 'https://www.linkedin.com/voyager/api/growth/normInvitations';
    var payload = {
      "emberEntityName": "growth/invitation/norm-invitation",
      "invitee": {
        "com.linkedin.voyager.growth.invitation.InviteeProfile": {
          "profileId": profileId
        }
      },
      "message": template,
      "trackingId": trackingId
    };
    $.ajax({
      url: connectionLink,
      type: "POST",
      data: JSON.stringify(payload),
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": JSESSIONID.replace(/"/g, ""),
        "content-type": "application/json; charset=UTF-8",
        "x-restli-protocol-version": "2.0.0",
      },
      success: function (response) {
        console.log('Success:' + profileId);
        PointOut("成功添加第" + (indexNum).toString() + "位候选人：" + profileId);
        resolve(true); // Resolve the promise with true for success
      },
      error: function (xhr, textStatus, errorThrown) {
        if (xhr.status === 429) {
          PointOut("添加失败第" + (indexNum).toString() + "位候选人：" + profileId);
          console.error('Error:', xhr.statusText);
          reject(false); // Reject the promise with false for status code 423
        } else if (xhr.status === 400) {
          PointOut("添加失败第" + (indexNum).toString() + "位候选人：" + profileId+'已添加');
          console.error('Error:', xhr.statusText);
          reject(true); // Reject the promise with true for status code 400
        } else {
          // For other status codes, reject with the error message
          reject(false);
        }
      }
    });
  });
}

// error: function (i, k, j) {
//   JlHttp("saveConnectRecord", Friend[0]["public_id"], "line", i.status);
//   if (i.status == 429) {
//     StopAction();
//     setTimeout(function () {
//       if (Tidings.length > 0) {
//         alert("你的领英没有了个性化邀请，请尝试不加邀请消息加人。");
//       } else {
//         alert("你的领英达到本周邀请上限，请下周再来加");
//       }
//     }, 50);
//     return false;
//   }

// function SendMine() {
//   // Fetch data using fetchNameValue()
//   fetchNameValue()
//     .then(name => {
//       // Use the fetched name to fetch data
//       return fetchData(name);
//     })
//     .then(data => {
//       // Use the fetched data to update row
//       const rowId = data.id;
//       const template = data.Template;
//       const connectionId = data.connectionId;
//       // Send LinkedIn connection request
//       var JSESSIONID = getCookie("JSESSIONID");
//       if (JSESSIONID) {
//         JSESSIONID = JSESSIONID.replace(/"/g, "");
//       } else {
//         PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
//         return false;
//       }
//       console.log(JSESSIONID);
//       sendingConnection(template, connectionId, JSESSIONID)
//       // return new Promise((resolve, reject) => {
//       //   chrome.cookies.getAll(getDetails('getAll'), (cookies) => {
//       //     var { li_at, JSESSIONID } = getLinkedInCookies(cookies);
//       //     // const JSESSIONID = getCookie("JSESSIONID");
//       //     console.log(JSESSIONID)
//       //     sendingConnection(template, connectionId, JSESSIONID);
//       //     resolve();
//       //   });
//       // })
//       .then(() => {
//         // Update the row status to "Sent" if LinkedIn connection request succeeds
//         return updateRowData(rowId, {"Status": "Sent"});
//       })
//       .catch(error => {
//         // Log or display appropriate error message
//         console.error('Error sending connection request:', error);
//         // Update the row status to "Fail" with error message
//         return updateRowData(rowId, {"Status": "Fail: "+error.message});
//       });
//     })
//     .catch(error => {
//       // Log or display appropriate error message
//       console.error('Error fetching data:', error);
//     });
// }
// function SendMine() {
//   // Fetch data using fetchNameValue()
//   fetchNameValue()
//     .then(name => {
//       Timeout = setTimeout(function () {
//         chrome.runtime.sendMessage(
//           { action: "fetchData", result: name, other: "" },
//           function (e) {}
//         );
//       }, 5 * 1000);
//       // chrome.runtime.sendMessage({ action: 'fetchData', sendingName: name });
//     })
//     .catch(error => {
//       // Log or display appropriate error message
//       console.error('Error fetching name value:', error);
//     });
// }
function SendMine() {
  // Fetch data using fetchNameValue()
  fetchNameValue()
    .then(name => {
      PointOut("准备发送我的发送");
      Timeout = setTimeout(function () {
        // chrome.runtime.sendMessage(
        //   { action: 'fetchData', result: name },
        //   function (p) {}
        // );
        chrome.runtime.sendMessage(
          { action: 'fetchData', result: name },
          function (response) {
            if (chrome.runtime.lastError) {
              console.error('Error sending message:', chrome.runtime.lastError.message);
            } else {
              console.log('Message sent successfully');
            }
          }
        );
      }, 16 * 1000);
      // // Set a timeout for the message
      // const timeoutId = setTimeout(() => {
      //   console.error('Timeout occurred while waiting for response.');
      //   // Close the message port due to timeout
      //   chrome.runtime.onMessage.removeListener(messageListener);
      // }, 5000); // 5 seconds timeout

      // // Send message to background script
      // chrome.runtime.sendMessage({ action: 'fetchData', sendingName: name }, response => {
      //   // Response received, clear the timeout
      //   clearTimeout(timeoutId);

      //   if (chrome.runtime.lastError) {
      //     // Handle error if any
      //     console.error('Error sending message:', chrome.runtime.lastError.message);
      //   } else {
      //     console.log('Response received:', response);
      //     // Process response if needed
      //   }
      // });
    })
    .catch(error => {
      // Log or display appropriate error message
      console.error('Error fetching name value:', error);
    });
}

// switch (parseInt(b["result"])) {
//   case 0:
//     $("#j_errmsg").html(
//       '*账号不存在<a href="http://linkedinjl.com/r" target="_black">立即注册</a>'
//     );
//     $("#j_errmsg").css("color", "#f00");
//     break;
//   case 1:

// function SendProcess(d) {
//   switch (parseInt(d["result"])) {
//     case 0:
//       PointOut("我的发送没有待发送候选人");
//       break;
//     case 1:
//       const data = d.data;
//       const rowId = data.id;
//       const template = data.Template;
//       const connectionId = data.connectionId;
//       // Send LinkedIn connection request
//       var JSESSIONID = getCookie("JSESSIONID");
//       if (JSESSIONID) {
//         JSESSIONID = JSESSIONID.replace(/"/g, "");
//       } else {
//         PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
//         return false;
//       }
//       console.log(JSESSIONID);
//       sendingConnection(template, connectionId, JSESSIONID,indexNum)
//         .then(() => {
//           // Update the row status to "Sent" if LinkedIn connection request succeeds
//           // chrome.runtime.sendMessage({ action: 'updateRowData', rowId: rowId, updates: {"Status": "Sent"} });
//           // chrome.runtime.sendMessage(
//           //   { action: "updateRowData", rowId:rowId, updates: {"Status": "Sent"}, other: "" },
//           //   function (h) {}
//           // );
//           Timeout = setTimeout(function () {
//             // chrome.runtime.sendMessage(
//             //   { action: 'fetchData', result: name },
//             //   function (p) {}
//             // );
//             chrome.runtime.sendMessage(
//               { action: 'updateRowData', rowId:rowId, updates: {"Status": "Sent"}},
//               function (response) {
//                 if (chrome.runtime.lastError) {
//                   console.error('Error sending message:', chrome.runtime.lastError.message);
//                 } else {
//                   console.log('Message sent successfully');
//                 }
//               }
//             );
//           }, 3 * 1000);
//         })
//         .catch(error => {
//           // Log or display appropriate error message
//           console.error('Error sending connection request:', error);
//           // Update the row status to "Fail" with error message
//           // chrome.runtime.sendMessage({ action: 'updateRowData', rowId: rowId, updates: {"Status": "Fail: "+error.message} });
//           // chrome.runtime.sendMessage(
//           //   { action: "updateRowData", rowId:rowId, updates: {"Status": "Fail: "+error.message}, other: "" },
//           //   function (h) {}
//           // );
//           Timeout = setTimeout(function () {
//             // chrome.runtime.sendMessage(
//             //   { action: 'fetchData', result: name },
//             //   function (p) {}
//             // );
//             chrome.runtime.sendMessage(
//               { action: 'updateRowData', rowId:rowId, updates: {"Status": "Fail: "+error.message}},
//               function (response) {
//                 if (chrome.runtime.lastError) {
//                   console.error('Error sending message:', chrome.runtime.lastError.message);
//                 } else {
//                   console.log('Message sent successfully');
//                 }
//               }
//             );
//           }, 3 * 1000);
//         });
//       break;
//     case 2:
//       PointOut("发送出现错误");
//       break;
//     }
// }

// function SendProcess(d) {
//   switch (parseInt(d["result"])) {
//     case 0:
//       PointOut("我的发送没有待发送候选人");
//       break;
//     case 1:
//       console.log(d);
//       const list_ = d.data;
//       console.log(list_);
//       // Send LinkedIn connection request for each connection ID
//       var JSESSIONID = getCookie("JSESSIONID");
//       if (JSESSIONID) {
//         JSESSIONID = JSESSIONID.replace(/"/g, "");
//       } else {
//         PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
//         return false;
//       }
      
//       console.log(JSESSIONID);

//       // Function to send invitation with random sleep time
//       function sendInvitationWithDelay(index) {
//         if (index >= list_.length) {
//           alert("本次已发送 " + list_.length + " 条邀请");
//           return; // All invitations sent
//         }
//         const rowId = list_[index].id;
//         const template = list_[index].Template;
//         const connectionId = list_[index].connectionId; // List of connection IDs
//         const sleepTime = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Random time between 30 and 60 seconds in milliseconds
//         console.log(rowId+template+connectionId);
//         // Send invitation after random sleep time
//         sendingConnection(template, connectionId, JSESSIONID, index + 1)
//           .then(() => {
//             // Update row data after successful sending
//             chrome.runtime.sendMessage(
//               { action: 'updateRowData', rowId: rowId, updates: {"Status": "Sent"}},
//               function (response) {
//                 if (chrome.runtime.lastError) {
//                   console.error('Error sending message:', chrome.runtime.lastError.message);
//                 } else {
//                   console.log('Message sent successfully');
//                 }
//               }
//             );
//           })
//           .catch(error => {
//             console.error('Error sending connection request:', error);
//             // Update row data with error message
//             chrome.runtime.sendMessage(
//               { action: 'updateRowData', rowId: rowId, updates: {"Status": "Fail: " + error.message}},
//               function (response) {
//                 if (chrome.runtime.lastError) {
//                   console.error('Error sending message:', chrome.runtime.lastError.message);
//                 } else {
//                   console.log('Message sent successfully');
//                 }
//               }
//             );
//           })
//           .finally(() => {
//             // Send the next invitation after random sleep time
//             setTimeout(() => {
//               sendInvitationWithDelay(index + 1);
//             }, sleepTime);
//           });
//       }

//       // Start sending invitations with delay
//       sendInvitationWithDelay(0);
//       break;
//     case 2:
//       PointOut("发送出现错误");
//       break;
//   }
// }

function SendProcess(d) {
  switch (parseInt(d["result"])) {
    case 0:
      PointOut("我的发送没有待发送候选人");
      break;
    case 1:
      console.log(d);
      const list_ = d.data;
      console.log(list_);
      // Send LinkedIn connection request for each connection ID
      var JSESSIONID = getCookie("JSESSIONID");
      if (JSESSIONID) {
        JSESSIONID = JSESSIONID.replace(/"/g, "");
      } else {
        PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
        return false;
      }
      console.log(JSESSIONID);
      // Function to send invitation with random sleep time
      function sendInvitationWithDelay(index,continueLoop) {
        if (index >= list_.length) {
          alert("本次已发送 " + list_.length + " 条邀请");
          return; // All invitations sent
        }
        const rowId = list_[index].id;
        const template = list_[index].Template;
        const connectionId = list_[index].connectionId; // List of connection IDs
        const sleepTime = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Random time between 30 and 60 seconds in milliseconds
        console.log(rowId+template+connectionId);
        
        // Send invitation after random sleep time
        sendingConnection(template, connectionId, JSESSIONID, index + 1)
          .then(result => {
            console.log('results: '+ result);
            if (!result) {
              continueLoop = false;
              return; // Stop the loop if sendingConnection returns false
            }
            // Update row data after successful sending
            chrome.runtime.sendMessage(
              { action: 'updateRowData', rowId: rowId, updates: {"Status": "Sent"}},
              function (response) {
                if (chrome.runtime.lastError) {
                  console.error('Error sending message:', chrome.runtime.lastError.message);
                } else {
                  console.log('Message sent successfully');
                }
              }
            );
          })
          .catch(error => {
            console.error('Error sending connection request:', error);
            console.log('error: '+ error);
            if (error === false) {
              // Stop the loop if sendingConnection returns false
              continueLoop = false;
              return;
            }
            // Update row data with error message
            chrome.runtime.sendMessage(
              { action: 'updateRowData', rowId: rowId, updates: {"Status": "Fail: duplicate adding"}},//error.message
              function (response) {
                if (chrome.runtime.lastError) {
                  console.error('Error sending message:', chrome.runtime.lastError.message);
                } else {
                  console.log('Message sent successfully');
                }
              }
            );
          })
          .finally(() => {
            console.log('continueLoop'+index.toString()+': '+continueLoop)
            // Send the next invitation after random sleep time
            if (!continueLoop) {
              alert("本周额度已使用完，请下周继续发送");
              return; // All invitations sent
            }
            setTimeout(() => {
              sendInvitationWithDelay(index + 1,continueLoop);
            }, sleepTime);
          });
      }
      // Start sending invitations with delay
      sendInvitationWithDelay(0,true);
      break;
    case 2:
      PointOut("发送出现错误");
      break;
  }
}


// FOLLOWUP
// function streamS3LinkToBuffer(s3Link) {
//   return new Promise((resolve, reject) => {
//     // Make a GET request to the S3 link with stream enabled
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', s3Link);
//     xhr.responseType = 'blob'; // Enable blob response type
//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         const blob = xhr.response;
//         // Create a FileReader to read blob data
//         const reader = new FileReader();
//         reader.onload = function () {
//           // Get buffer, file name, and file size
//           const buffer = reader.result;
//           const fileName = decodeURIComponent(s3Link.split('/').pop());
//           const fileSize = blob.size; // Assuming blob.size gives file size
//           // Resolve the promise with buffer, file name, and file size
//           resolve({ buffer, fileName, fileSize });
//         };
//         // Read blob data as ArrayBuffer
//         reader.readAsArrayBuffer(blob);
//       } else {
//         reject(new Error(`Failed to load ${s3Link}: ${xhr.status}`));
//       }
//     };
//     xhr.onerror = function () {
//       reject(new Error(`Network error while loading ${s3Link}`));
//     };
//     xhr.send();
//   });
// }

function streamS3LinkToBuffer(s3Link) {
  return new Promise((resolve, reject) => {
    // Make a GET request to the S3 link with stream enabled
    $.ajax({
      url: s3Link,
      type: 'GET',
      xhrFields: {
        responseType: 'blob' // Enable blob response type
      },
      success: function (data) {
        const blob = data;
        // Create a FileReader to read blob data
        const reader = new FileReader();
        reader.onload = function () {
          // Get buffer, file name, and file size
          const buffer = reader.result;
          const fileName = decodeURIComponent(s3Link.split('/').pop());
          const fileSize = blob.size; // Assuming blob.size gives file size
          // Resolve the promise with buffer, file name, and file size
          resolve({ buffer, fileName, fileSize });
        };
        // Read blob data as ArrayBuffer
        reader.readAsArrayBuffer(blob);
      },
      error: function (xhr, status, error) {
        reject(new Error(`Failed to load ${s3Link}: ${status}`));
      }
    });
  });
}


// function fileUploadLinkedin(s3Link,JSESSIONID) {
//   // Stream the S3 link to buffer
//   return streamS3LinkToBuffer(s3Link)
//       .then(({ buffer, fileName, fileSize }) => {
//           // Get media upload type
//           const mediaUploadType = getMediaUploadType(fileName)[0];
//           const url = "https://www.linkedin.com/voyager/api/voyagerVideoDashMediaUploadMetadata?action=upload";
//           const payload = {
//               mediaUploadType: mediaUploadType,
//               fileSize: fileSize,
//               filename: fileName
//           };

//           return new Promise((resolve, reject) => {
//               const xhr = new XMLHttpRequest();
//               xhr.open('POST', url);
//               // xhr.setRequestHeader('Content-Type', 'application/json');
//               xhr.setRequestHeader('Accept', 'application/vnd.linkedin.normalized+json+2.1');
//               xhr.setRequestHeader('csrf-token', JSESSIONID.replace(/"/g, ''));
//               xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
//               xhr.setRequestHeader('x-restli-protocol-version', '2.0.0');
//               // xhr.setRequestHeader('cookie', `li_at=${cookies.li_at}; JSESSIONID=${cookies.JSESSIONID}`);

//               xhr.onload = function() {
//                   if (xhr.status === 200) {
                      
//                       const responseData = JSON.parse(xhr.responseText);
//                       console.log(responseData)
//                       const singleUploadUrl = responseData.data.value.singleUploadUrl;

//                       // Upload file
//                       const uploadXHR = new XMLHttpRequest();
//                       uploadXHR.open('PUT', singleUploadUrl);
//                       uploadXHR.setRequestHeader('Accept', '*/*');
//                       uploadXHR.setRequestHeader('csrf-token', JSESSIONID.replace(/"/g, ''));
//                       uploadXHR.setRequestHeader('content-type', getMediaUploadType(fileName)[1]);
//                       uploadXHR.onload = function() {
//                           const attachments = [{
//                               id: responseData.data.value.urn,
//                               name: fileName,
//                               byteSize: fileSize,
//                               mediaType: getMediaUploadType(fileName)[1]
//                           }];
//                           resolve({ response: responseData, attachments: attachments });
//                       };
//                       uploadXHR.onerror = function() {
//                           console.error('Error uploading file:', xhr.statusText);
//                           reject({ error: xhr.statusText });
//                       };
//                       uploadXHR.send(buffer);
//                   } else {
//                       console.error('Error uploading file:', xhr.statusText);
//                       reject({ error: xhr.statusText });
//                   }
//               };
//               xhr.onerror = function() {
//                   console.error('Error uploading file:', xhr.statusText);
//                   reject({ error: xhr.statusText });
//               };

//               xhr.send(JSON.stringify(payload));
//           });
//       })
//       .catch(error => {
//           console.error('Error uploading file:', error);
//           throw error;
//       });
// }

function fileUploadLinkedin(s3Link, JSESSIONID) {
  // Stream the S3 link to buffer
  return streamS3LinkToBuffer(s3Link)
    .then(({ buffer, fileName, fileSize }) => {
      // Get media upload type
      const mediaUploadType = getMediaUploadType(fileName)[0];
      const url = "https://www.linkedin.com/voyager/api/voyagerVideoDashMediaUploadMetadata?action=upload";
      const payload = {
        mediaUploadType: mediaUploadType,
        fileSize: fileSize,
        filename: fileName
      };

      return $.ajax({
        url: url,
        type: 'POST',
        headers: {
          'Accept': 'application/vnd.linkedin.normalized+json+2.1',
          'csrf-token': JSESSIONID.replace(/"/g, ''),
          'content-type': 'application/json; charset=UTF-8',
          'x-restli-protocol-version': '2.0.0'
        },
        data: JSON.stringify(payload)
      })
      .then(responseData => {
        console.log(responseData);
        const singleUploadUrl = responseData.data.value.singleUploadUrl;

        // Upload file
        return $.ajax({
          url: singleUploadUrl,
          type: 'PUT',
          headers: {
            'Accept': '*/*',
            'csrf-token': JSESSIONID.replace(/"/g, ''),
            'content-type': getMediaUploadType(fileName)[1]
          },
          data: buffer,
          processData: false // Prevent jQuery from processing the data
        })
        .then(() => {
          const attachments = [{
            id: responseData.data.value.urn,
            name: fileName,
            byteSize: fileSize,
            mediaType: getMediaUploadType(fileName)[1]
          }];
          return { response: responseData, attachments: attachments };
        })
        .fail((xhr, status, error) => {
          console.error('Error uploading file:', error);
          throw error;
        });
      })
      .fail((xhr, status, error) => {
        console.error('Error uploading file:', error);
        throw error;
      });
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      throw error;
    });
}


function getMediaUploadType(fileName) {
  var extension = fileName.split('.').pop().toLowerCase();
  var linkedinMediaTypes = {
      'pdf': 'MESSAGING_FILE_ATTACHMENT',
      'png': 'MESSAGING_PHOTO_ATTACHMENT',
      'jpg': 'MESSAGING_PHOTO_ATTACHMENT',
      'jpeg': 'MESSAGING_PHOTO_ATTACHMENT',
      'doc': 'MESSAGING_FILE_ATTACHMENT',
      'docx': 'MESSAGING_FILE_ATTACHMENT',
      'xls': 'MESSAGING_FILE_ATTACHMENT',
      'xlsx': 'MESSAGING_FILE_ATTACHMENT',
      'csv': 'MESSAGING_FILE_ATTACHMENT',
      'ppt': 'MESSAGING_FILE_ATTACHMENT',
      'pptx': 'MESSAGING_FILE_ATTACHMENT'
      // Add more file extensions and corresponding media types as needed
  };
  var defaultLinkedinFileMediaType = 'MESSAGING_FILE_ATTACHMENT';
  var mediaTypes = {
      'pdf': 'application/pdf',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'csv': 'text/csv',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      // Add more file extensions and corresponding media types as needed
  };
  var defaultMediaType = 'application/octet-stream';

  return [linkedinMediaTypes[extension] || defaultLinkedinFileMediaType, mediaTypes[extension] || defaultMediaType];
}

function generateUUID() {
  // Generate 16 random bytes (128 bits)
  const randomBytes = new Uint8Array(16);
  for (let i = 0; i < randomBytes.length; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256);
  }
  // Convert bytes to hexadecimal string format
  let uuid = '';
  for (let i = 0; i < randomBytes.length; i++) {
      let hex = randomBytes[i].toString(16);
      if (hex.length === 1) {
          hex = '0' + hex; // Ensure each byte is represented by two hex characters
      }
      uuid += hex;
  }
  // Format the hexadecimal string as UUID version 4
  uuid = uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-' + uuid.substr(12, 4) + '-' +
      uuid.substr(16, 4) + '-' + uuid.substr(20);
  return uuid;
}
function generateTrackingIdAsCharString() {
  var trackingIdString = '';
  for (var i = 0; i < 16; i++) {
      trackingIdString += String.fromCharCode(Math.floor(Math.random() * 256));
  }
  return trackingIdString;
}

// function messageSending(li_at, JSESSIONID, Message, SenderUrn, ConversationID, attachments = []) {
  
//   // Generate tokens and tracking ID
//   var originToken = generateUUID();
//   var bolbToken = generateUUID();
//   var trackingId = generateTrackingIdAsCharString();

//   // LinkedIn connection
//   var headers = {
//       "Accept": "application/json",
//       "csrf-token": JSESSIONID.replace(/"/g, ''),
//       "content-type": "text/plain;charset=UTF-8",
//       "x-restli-protocol-version": "2.0.0"
//   };
//   var messageLink = "https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessages?action=createMessage";
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", messageLink);
//   // Set headers
//   for (var header in headers) {
//       xhr.setRequestHeader(header, headers[header]);
//   }
//   // xhr.setRequestHeader("Content-Type", "application/json");
//   // xhr.setRequestHeader("Cookie", `li_at=${li_at}; JSESSIONID=${JSESSIONID}`);
//   xhr.onload = function() {
//       if (xhr.status === 200) {
//           console.log("Success: " + Message);
//       } else if (xhr.status === 400) {
//           console.log(`${JSON.parse(xhr.responseText).data.code}: ${Message}`);
//       } else {
//           console.log(`${xhr.responseText}: ${Message}`);
//       }
//   };
//   xhr.onerror = function() {
//       console.error("Error sending message:", xhr.statusText);
//   };

//   var renderContentUnions = [];
//   if (attachments.length > 0 && Object.keys(attachments[0]).length > 0) {
//       renderContentUnions.push({
//           file: {
//               assetUrn: attachments[0].id,
//               byteSize: attachments[0].byteSize,
//               mediaType: attachments[0].mediaType,
//               name: attachments[0].name,
//               url: "blob:https://www.linkedin.com/" + bolbToken
//           }
//       });
//   }

//   var payload = {
//       message: {
//           body: {
//               attributes: [],
//               text: Message
//           },
//           renderContentUnions: renderContentUnions,
//           conversationUrn: "urn:li:msg_conversation:(urn:li:fsd_profile:" + SenderUrn + "," + ConversationID + ")",
//           originToken: originToken
//       },
//       mailboxUrn: "urn:li:fsd_profile:" + SenderUrn,
//       trackingId: trackingId,
//       dedupeByClientGeneratedToken: false
//   };
//   console.log(payload);
//   xhr.send(JSON.stringify(payload));
// }
function messageSending(li_at, JSESSIONID, Message, SenderUrn, ConversationID, attachments = []) {
  // Generate tokens and tracking ID
  var originToken = generateUUID();
  var bolbToken = generateUUID();
  var trackingId = generateTrackingIdAsCharString();
  // LinkedIn connection
  var headers = {
    "Accept": "application/json",
    "csrf-token": JSESSIONID.replace(/"/g, ''),
    "content-type": "text/plain;charset=UTF-8",
    "x-restli-protocol-version": "2.0.0"
  };
  var renderContentUnions = [];
  if (attachments.length > 0 && Object.keys(attachments[0]).length > 0) {
    renderContentUnions.push({
      file: {
        assetUrn: attachments[0].id,
        byteSize: attachments[0].byteSize,
        mediaType: attachments[0].mediaType,
        name: attachments[0].name,
        url: "blob:https://www.linkedin.com/" + bolbToken
      }
    });
  }
  var payload = {
    message: {
      body: {
        attributes: [],
        text: Message
      },
      renderContentUnions: renderContentUnions,
      conversationUrn: "urn:li:msg_conversation:(urn:li:fsd_profile:" + SenderUrn + "," + ConversationID + ")",
      originToken: originToken
    },
    mailboxUrn: "urn:li:fsd_profile:" + SenderUrn,
    trackingId: trackingId,
    dedupeByClientGeneratedToken: false
  };
  console.log(payload);
  $.ajax({
    url: "https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessages?action=createMessage",
    type: "POST",
    headers: headers,
    data: JSON.stringify(payload),
    contentType: "application/json",
    success: function(data) {
      console.log("Success: " + Message);
    },
    error: function(xhr, status, error) {
      console.error("Error sending message:", error);
    }
  });
}


// Define a function to handle file upload and message sending
function handleFileUploadAndMessageSending(d) {
  var sendername = d.data.sendername;
  var return_status=d.data.return_status;
  var message_content = "";
  console.log(return_status);
  console.log("js.js received: " + sendername);
  fetchNameValue()
    .then(name => {
      console.log(name, sendername, name !== sendername);
      if (name !== sendername) {
        // Generate a random delay between 5 to 15 seconds (5000 to 15000 milliseconds)
        const delay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;

        // Delay execution of the rest of the function by the randomly generated delay
        setTimeout(() => {
          var s3Link = 'https://amazon-connect-97349569df87.s3.amazonaws.com/bitfufu%20financial%20product%20manager%2020240201.pdf';
          var JSESSIONID = getCookie("JSESSIONID"); // Replace with the actual JSESSIONID value

          // File Upload
          fileUploadLinkedin(s3Link, JSESSIONID)
            .then(({ response, attachments }) => {
              console.log('Response:', response);
              console.log('File uploaded successfully:', response.data);
              console.log('Attachments:', attachments);

              if (return_status=='1'){
                var message_content="Sure, It's my pleasure\n\nJob Opportunity - Enterprise Account Executive\nHope all is well! Thanks for accepting my connection. If you're interested in the role I mentioned in the last message, I would like to provide more details about the job and also learn more from you and gauge your interest in the role. Our client, Vesoft Inc., founded in October 2018, leads in graph database tech. The team, from Facebook, Alibaba, and IBM, developed NebulaGraph (https://www.nebula-graph.io/), a top open-source, distributed graph database used by Snapchat and Binance. Committed to robust global software, Vesoft is advancing in graph database innovation, enhancing data management efficiency and security. Here's the website: \nhttps://vesoft.com/\n\nJob Position: Enterprise Account Executive\nLocation: San Francisco Bay Area, USA (Remote)\nLanguage: English, Mandarin is a plus\n\nThey seek a candidate with 2-5 years in software sales, ideally in database and distributed systems, who exceeds sales targets and possesses excellent communication, negotiation, and trust-building skills.\n\nIf this looks like a fit for you/you would like to learn more, I'd like to schedule a quick call with you and my manager Blake Zhu (His phone number is 4156328638). Please kindly provide a few dates and time windows that work for you this week (as well as your phone number if available). Look forward to talking to you soon!\n\nBest regards,\nYedan"
                // Message Sending
                messageSending(
                  "AQEDAStyFm0DxYM8AAABjspBGbkAAAGO7k2duVYAlxEPN0oSYG9CzrkqRNnFG37335LWlu5h2d1vV7P-Ac6ir2oBHgkiTA-t6lBIQnZK-LwqQ9IIwczwiZ8MpieD-EOxk0bTqJENJZO9d__mDQxvrRHv",
                  JSESSIONID,
                  message_content,
                  "ACoAACtyFm0BW2P4KhWCCscwpcsx2m71ROWP4tg",
                  "2-MjgxMDUyMzAtMDU0NS00MmY3LTljOWUtMTEwODFlOGJlY2YyXzAxMg==",
                  attachments
                );
              }else if (return_status=='2'){
                var message_content="Sorry to hear that, we could continue to find better job for you later! Thanks, Have a great day!"
                messageSending(
                  "AQEDAStyFm0DxYM8AAABjspBGbkAAAGO7k2duVYAlxEPN0oSYG9CzrkqRNnFG37335LWlu5h2d1vV7P-Ac6ir2oBHgkiTA-t6lBIQnZK-LwqQ9IIwczwiZ8MpieD-EOxk0bTqJENJZO9d__mDQxvrRHv",
                  JSESSIONID,
                  message_content,
                  "ACoAACtyFm0BW2P4KhWCCscwpcsx2m71ROWP4tg",
                  "2-MjgxMDUyMzAtMDU0NS00MmY3LTljOWUtMTEwODFlOGJlY2YyXzAxMg=="
                );
              } else{
                console.error("Invalid return_status:", return_status);
                return;
              }

            })
            .catch(error => {
              // Log or display appropriate error message
              console.error('Error:', error.message);
            });
        }, delay);
      }
    });
}



function ConnectLine() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      a_today_num: 0,
      a_limit: 100,
      a_min_speed: 30,
      a_max_speed: 60,
      level: 0,
      risk: true,
    },
    function (c) {
      // if (parseInt(c.level) < 1 && parseInt(c.a_today_num) >= TestCount) {
      //   StopAction();
      //   setTimeout(function () {
      //     if (
      //       confirm(
      //         "今日试用名额已用完。您是试用会员，试用会员每天有" +
      //           TestCount +
      //           "个试用名额，升级会员不受此限制，确定要升级吗？"
      //       )
      //     ) {
      //       Upgrade();
      //     }
      //   }, 50);
      //   return false;
      // }
      if (parseInt(c.a_today_num) >= parseInt(c.a_limit)) {
        StopAction();
        setTimeout(function () {
          alert("本次已发送 " + ActionCount + " 条邀请");
        }, 50);
        return false;
      }
      var b = getCookie("JSESSIONID");
      if (!b) {
        StopAction();
        setTimeout(function () {
          alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
        }, 50);
        return false;
      } else {
        b = b.replace(/"/g, "");
      }
      var f = randomString(22) + "==";
      var g = RandomTidings("", "");
      if (g) {
        var a = {
          emberEntityName: "growth/invitation/norm-invitation",
          invitee: {
            "com.linkedin.voyager.growth.invitation.InviteeProfile": {
              profileId: Friend[0]["public_id"],
            },
          },
          message: g,
          trackingId: f,
        };
      } else {
        var a = {
          emberEntityName: "growth/invitation/norm-invitation",
          invitee: {
            "com.linkedin.voyager.growth.invitation.InviteeProfile": {
              profileId: Friend[0]["public_id"],
            },
          },
          trackingId: f,
        };
      }
      var d = "/voyager/api/growth/normInvitations";
      $.ajax({
        url: d,
        type: "post",
        data: JSON.stringify(a),
        headers: {
          Accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": b,
          "content-type": "application/json; charset=UTF-8",
          "x-restli-protocol-version": "2.0.0",
        },
        success: function (i) {
          ActionCount++;
          var h = parseInt(c.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (h > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + h + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + h + "人");
          }
          chrome.storage.sync.set({ a_today_num: [h] }, function () {});
          JlHttp("saveConnectRecord", Friend[0]["public_id"], "line", 200);
        },
        error: function (i, k, j) {
          JlHttp("saveConnectRecord", Friend[0]["public_id"], "line", i.status);
          if (i.status == 429) {
            StopAction();
            setTimeout(function () {
              if (Tidings.length > 0) {
                alert("你的领英没有了个性化邀请，请尝试不加邀请消息加人。");
              } else {
                alert("你的领英达到本周邀请上限，请下周再来加");
              }
            }, 50);
            return false;
          }
          ActionCount++;
          var h = parseInt(c.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (h > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + h + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + h + "人");
          }
          chrome.storage.sync.set({ a_today_num: [h] }, function () {});
        },
      });
      $("#l_" + Friend[0]["id"]).remove();
      var e = GetTime(
        parseInt(c.a_today_num),
        parseInt(c.a_min_speed),
        parseInt(c.a_max_speed),
        c.risk
      );
      Delayed_time = e;
      DelayedTime();
      Timeout = setTimeout(function () {
        Friend.shift();
        chrome.runtime.sendMessage(
          { action: "loop", result: "connectLine", other: "" },
          function (h) {}
        );
      }, e * 1000);
    }
  );
}
function ShowRecall() {
  GetRecall(1);
}
function GetRecall(c) {
  var a = getCookie("JSESSIONID");
  if (!a) {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  } else {
    a = a.replace(/"/g, "");
  }
  PointOut("正在获取中...", 10);
  var b = "/voyager/api/relationships/genericInvitationFacets?q=sent";
  $.ajax({
    url: b,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": a,
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (j) {
      if (j && j["data"] && j["data"]["elements"]) {
        var h = j["data"]["elements"];
        for (var f = 0; f < h.length; f++) {
          if (h[f]["invitationType"] == "CONNECTION") {
            var g = parseInt(h[f]["count"]);
            if (g > 0) {
              var k = (c - 1) * 100;
              var e = "/voyager/api/relationships/sentInvitationViewsV2";
              var d = {
                count: 100,
                invitationType: "CONNECTION",
                q: "invitationType",
                start: k,
              };
              $.ajax({
                url: e,
                type: "get",
                data: d,
                headers: {
                  Accept: "application/vnd.linkedin.normalized+json+2.1",
                  "csrf-token": a,
                  "x-restli-protocol-version": "2.0.0",
                },
                success: function (s) {
                  PointOut("获取完成");
                  $("input[name='selectAllRecall']").prop("checked", false);
                  if (
                    s &&
                    s["data"] &&
                    s["data"]["*elements"] &&
                    s["included"]
                  ) {
                    $("#j_recall_box").empty();
                    var r = s["data"]["*elements"];
                    if (r.length > 0) {
                      var q = s["included"];
                      for (var o = 0; o < r.length; o++) {
                        var m = {};
                        m["invite_urn"] = r[o].split(":")[6];
                        for (var n = 0; n < q.length; n++) {
                          if (
                            q[n]["$type"] ==
                              "com.linkedin.voyager.relationships.invitation.Invitation" &&
                            q[n]["entityUrn"].split(":")[3] == m["invite_urn"]
                          ) {
                            m["urn"] = q[n]["toMemberId"];
                            m["sentTime"] = q[n]["sentTime"];
                            for (var l = 0; l < q.length; l++) {
                              if (
                                q[l]["$type"] ==
                                  "com.linkedin.voyager.identity.shared.MiniProfile" &&
                                q[l]["entityUrn"].split(":")[3] == m["urn"]
                              ) {
                                m["firstName"] = q[l]["firstName"];
                                m["lastName"] = q[l]["lastName"];
                                m["position"] = q[l]["occupation"];
                                m["publicId"] = q[l]["publicIdentifier"];
                                if (
                                  q[l]["picture"] &&
                                  q[l]["picture"]["rootUrl"] &&
                                  q[l]["picture"]["artifacts"] &&
                                  q[l]["picture"]["artifacts"][0]
                                ) {
                                  m["img"] =
                                    q[l]["picture"]["rootUrl"] +
                                    q[l]["picture"]["artifacts"][0][
                                      "fileIdentifyingUrlPathSegment"
                                    ];
                                } else {
                                  m["img"] =
                                    "http://linkedinjl.com/expand/version1/img/me.png";
                                }
                                break;
                              }
                            }
                            break;
                          }
                        }
                        AppendRecallToTable(m);
                      }
                      if (g > 2000) {
                        g = 2000;
                      }
                      ShowPaging("j_recall_paging", c, g, 100);
                    }
                  } else {
                    $("#j_recall_box").empty();
                    var p =
                      '<div class="j-explain-box j-w">' +
                      "<p>您没有未通过的邀请。</p>" +
                      '<a href="http://linkedinjl.com/help?o=recall" target="_black">查看详细教程</a>' +
                      "</div>";
                    $("#j_recall_box").append(p);
                    PointOut("您没有未通过的邀请");
                    ShowPaging("j_recall_paging", 1, 0, 100);
                  }
                },
              });
            }
            break;
          }
        }
      } else {
        PointOut("获取失败");
      }
    },
  });
}
function AppendRecallToTable(c) {
  var a = GetName(c.firstName, c.lastName);
  c["sentTime"] = new Date(c["sentTime"]).Format("yyyy-MM-dd HH:mm");
  c["sentTime"] = "邀请日期：" + c["sentTime"];
  var b =
    '<div class="j-friend j-nowrap" id="r_' +
    c["invite_urn"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">' +
    '<div><a href="/in/' +
    c["publicId"] +
    ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
    c["img"] +
    '"></a></div>' +
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline">' +
    c["position"] +
    "</p>" +
    '<p class="j-oneline j-remark">' +
    c["sentTime"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="recall">';
  "</div>" + "</div>";
  $("#j_recall_box").append(b);
}
function SelectAllRecall() {
  if ($(this).prop("checked")) {
    $("input[name='recall']").prop("checked", true);
    var a = $("input[name='recall']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选，请点击“显示未通过邀请”显示", 3);
    } else {
      PointOut("选择了 " + a + " 位", 1);
    }
  } else {
    $("input[name='recall']").prop("checked", false);
  }
}
function JumpRecall() {
  var c = parseInt($("#j_recall_paging .j-jump").val());
  var b = parseInt($("#j_recall_paging .j-paging:last").text());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_recall_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入有效页数: 1 - " + b + " 范围内", 3);
    return false;
  }
  GetRecall(c);
  return true;
}
function JumpRecallEnter(a) {
  if (a.keyCode == 13) {
    JumpRecall();
  }
}
function GetRecallSomePage() {
  var a = parseInt($(this).text());
  GetRecall(a);
}
function RecallBatch() {
  chrome.storage.sync.get({ level: 0, trial: 0, r_today_num: 0 }, function (a) {
    var c = $("input[name='recall']:checkbox:checked").length;
    if (c <= 0) {
      PointOut("请选择要撤回的邀请");
      return false;
    }
    if (parseInt(a.level) < 1 && parseInt(a.trial) < 1) {
      ShowUpgrade(
        "试用期已过",
        "试用会员可试用一周，您的试用期已过，请升级会员使用",
        "立即升级"
      );
      return false;
    }
    var b = parseInt(a.r_today_num) + c;
    if (parseInt(a.level) == 0 && b > 100) {
      ShowUpgrade(
        "试用名额用完",
        "您是试用会员，每天有100个批量撤回名额，你的名额已用完，升级会员可无限撤回。"
      );
      return false;
    }
    JlConfirm("确定要撤回选择的 " + c + " 个邀请吗？", "确定");
    $("#j_ok").on("click", function () {
      var e = [];
      $("input[name='recall']:checkbox:checked").each(function () {
        var h = {};
        h["entityUrn"] =
          "urn:li:fs_relInvitation:" +
          $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
        h["genericInvitation"] = false;
        h["genericInvitationType"] = "CONNECTION";
        e.push(h);
      });
      var f = getCookie("JSESSIONID");
      if (!f) {
        PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
        return false;
      } else {
        f = f.replace(/"/g, "");
      }
      var d = { inviteActionType: "ACTOR_WITHDRAW", inviteActionData: e };
      var g = "/voyager/api/relationships/invitations?action=closeInvitations";
      $.ajax({
        url: g,
        type: "post",
        data: JSON.stringify(d),
        headers: {
          Accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": f,
          "content-type": "application/json; charset=UTF-8",
          "x-restli-protocol-version": "2.0.0",
        },
        success: function (j) {
          if (j) {
            PointOut("成功撤回");
            b += c;
            chrome.storage.sync.set({ r_today_num: [b] }, function () {});
            for (var h = 0; h < e.length; h++) {
              $("#r_" + e[h]["entityUrn"].split(":")[3]).remove();
            }
            JlHttp("saveRecallRecord", c, "", "");
          } else {
            PointOut("撤回失败，请尝试刷新页面或重启浏览器");
          }
        },
        error: function () {
          PointOut("撤回失败，请尝试刷新页面或重启浏览器");
        },
      });
    });
  });
}

function SaveRecallRecordResult(a) {
  if (a && a["result"]) {
    a = JSON.parse(a);
    switch (parseInt(a["result"])) {
      case 0:
        break;
      case 1:
        break;
      case 3:
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        break;
      case 4:
        JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
        $("#j_ok").click(function () {
          BindLinkedin(true);
        });
        break;
      case 5:
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        break;
      case 6:
        ShowLoginDialog();
        PointOut("其它设备在登录中");
        break;
      case 7:
        ShowUpgrade(
          "试用期已过",
          "注册后可以试用1周，您的试用期已过，升级会员可继续使用，感谢支持"
        );
        break;
      default:
        break;
    }
  }
}
function StartConnectLinkedin() {
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      level: 0,
      trial: 0,
      a_today_num: 0,
      a_limit: 100,
      run: false,
    },
    function (b) {
      if (b.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量加好友！", 3);
        return false;
      }
      if (!String(b.account)) {
        PointOut("没有登录领英精灵，请登录领英精灵账号", 1);
        ShowLoginDialog();
        return false;
      }
      if (!String(b.my_urn)) {
        JlConfirm("没有关联Linkedin账号,请先关联Linkeidn账号，确定要关联吗！");
        $("#j_ok").on("click", function () {
          BindLinkedin();
        });
        return false;
      }
      if (parseInt(b.level) < 1 && parseInt(b.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      if (parseInt(b.a_today_num) >= parseInt(b.a_limit)) {
        JlAlert(
          "今天已发" +
            b.a_today_num +
            "条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！"
        );
        return false;
      }
      var c = window.location.href;
      var e = new RegExp("search/results/people", "i");
      var a = new RegExp("sales/search/people", "i");
      if (e.test(c)) {
        JlHttp("getMesAddFriend", "", "linkedin", "");
        return false;
      }
      if (a.test(c)) {
        StartConnectSales();
        return false;
      }
      var d =
        '<div class="j-dialog j-div-center j-close-dialog">' +
        '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:260px; text-align:center;">' +
        '<div style="margin:24px">' +
        "<p>自动加好友前，请先在领英页面搜索出要加的人</p>" +
        '<div style="margin:12px;">' +
        '<a href=\'/search/results/people/?network=%5B"S"%2C"O"%5D\'>前往领英搜索人脉</a></div>' +
        "</div>" +
        "</div>" +
        "</div>";
      $("#j_lyjl_window").append(d);
      $(".j-dialog").fadeIn(200);
    }
  );
}
function ConnectLinkedin() {
  chrome.storage.sync.get(
    {
      a_min_speed: 30,
      a_max_speed: 60,
      a_limit: 100,
      a_today_num: 0,
      risk: true,
      level: 0,
    },
    function (j) {
      if (parseInt(j.level) < 1 && parseInt(j.a_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "试用名额已用完，试用会员每天有" +
                TestCount +
                "个试用名额，若要添加更多，请升级会员使用"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(j.a_today_num) >= parseInt(j.a_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计发送 " +
              parseInt(j.a_today_num) +
              " 条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！"
          );
        }, 50);
        return false;
      }
      if (
        $(
          "ul.reusable-search__entity-result-list li.reusable-search__result-container"
        ).length > 0
      ) {
        var l = $(
          "ul.reusable-search__entity-result-list li.reusable-search__result-container:first"
        );
        if (l.length > 0) {
          if (
            $(
              "ul.reusable-search__entity-result-list li.reusable-search__result-container"
            ).length % 4
          ) {
            $("html, body").animate({ scrollTop: "0px" }, 1000);
          } else {
            $("html, body").animate({ scrollTop: "1000px" }, 1000);
          }
          var c = l.find("button.artdeco-button--secondary");
          if (c.length > 0) {
            var h = $.trim(c.find("span").text());
            if (
              !c.prop("disabled") &&
              (h == "加为好友" ||
                h == "Connect" ||
                h == "建立關係" ||
                h == "发消息" ||
                h == "Message" ||
                h == "訊息")
            ) {
              var f = $.trim(
                ArrangeFid(
                  decodeURIComponent(
                    l
                      .find("span.entity-result__title-text.t-16 a")
                      .attr("href")
                      .split("?")[0]
                  )
                )
              );
              var i = $.trim(l.find("img:first").attr("src"));
              var b = $.trim(
                l
                  .find("span.entity-result__title-text.t-16 span span:first")
                  .text()
              );
              var k = GetFirstName(b);
              var m = GetLastName(b);
              if (!f) {
                StopAction();
                setTimeout(function () {
                  alert("本次成功发送 " + ActionCount + " 条邀请");
                }, 50);
              }
              $("#j_head_img").attr("src", i);
              var n = getCookie("JSESSIONID");
              if (!n) {
                StopAction();
                setTimeout(function () {
                  alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
                }, 50);
                return false;
              } else {
                n = n.replace(/"/g, "");
              }
              var g = randomString(22) + "==";
              var d = RandomTidings(k, m);
              if (d) {
                var o = {
                  emberEntityName: "growth/invitation/norm-invitation",
                  invitee: {
                    "com.linkedin.voyager.growth.invitation.InviteeProfile": {
                      profileId: f,
                    },
                  },
                  message: d,
                  trackingId: g,
                };
              } else {
                var o = {
                  emberEntityName: "growth/invitation/norm-invitation",
                  invitee: {
                    "com.linkedin.voyager.growth.invitation.InviteeProfile": {
                      profileId: f,
                    },
                  },
                  trackingId: g,
                };
              }
              var a = "/voyager/api/growth/normInvitations";
              $.ajax({
                url: a,
                type: "post",
                data: JSON.stringify(o),
                headers: {
                  Accept: "application/vnd.linkedin.normalized+json+2.1",
                  "csrf-token": n,
                  "content-type": "application/json; charset=UTF-8",
                  "x-restli-protocol-version": "2.0.0",
                },
                success: function (q) {
                  ActionCount++;
                  var p = parseInt(j.a_today_num) + 1;
                  $("#j_action_count").text("本次已加：" + ActionCount + "人");
                  if (p > 100) {
                    $("#j_today_count").html(
                      '<font style="color:#f00;">今日已加：' + p + "人</font>"
                    );
                  } else {
                    $("#j_today_count").text("今日已加：" + p + "人");
                  }
                  chrome.storage.sync.set({ a_today_num: [p] }, function () {});
                  JlHttp("saveConnectRecord", f, "linkedin", 200);
                },
                error: function (q, s, r) {
                  JlHttp("saveConnectRecord", f, "linkedin", q.status);
                  if (q.status == 429) {
                    StopAction();
                    setTimeout(function () {
                      if (Tidings.length > 0) {
                        alert(
                          "你的领英没有了个性化邀请，请尝试不加邀请消息加人。"
                        );
                      } else {
                        alert("你的领英达到本周邀请上限，请下周再来加");
                      }
                    }, 50);
                    return false;
                  }
                  ActionCount++;
                  var p = parseInt(j.a_today_num) + 1;
                  $("#j_action_count").text("本次已加：" + ActionCount + "人");
                  if (p > 100) {
                    $("#j_today_count").html(
                      '<font style="color:#f00;">今日已加：' + p + "人</font>"
                    );
                  } else {
                    $("#j_today_count").text("今日已加：" + p + "人");
                  }
                  chrome.storage.sync.set({ a_today_num: [p] }, function () {});
                },
              });
              var e = GetTime(
                parseInt(j.a_today_num),
                parseInt(j.a_min_speed),
                parseInt(j.a_max_speed),
                j.risk
              );
              Delayed_time = e;
              DelayedTime();
              Timeout = setTimeout(function () {
                l.remove();
                chrome.runtime.sendMessage(
                  { action: "loop", result: "connectLinkedin" },
                  function (p) {}
                );
              }, e * 1000);
            } else {
              l.remove();
              chrome.runtime.sendMessage(
                { action: "loop", result: "connectLinkedin" },
                function (p) {}
              );
            }
          } else {
            l.remove();
            chrome.runtime.sendMessage(
              { action: "loop", result: "connectLinkedin" },
              function (p) {}
            );
          }
        } else {
          if (
            $(".artdeco-pagination__button--next").length > 0 &&
            !$(".artdeco-pagination__button--next").prop("disabled")
          ) {
            $(".artdeco-pagination__button--next").click();
            Timeout = setTimeout(function () {
              chrome.runtime.sendMessage(
                { action: "loop", result: "connectLinkedin" },
                function (p) {}
              );
            }, 15000);
          } else {
            StopAction();
            setTimeout(function () {
              alert("本次成功发送 " + ActionCount + " 条邀请");
            }, 50);
          }
          return false;
        }
      } else {
        var l = $(
          "ul.search-results__list li.search-result__occluded-item:first"
        );
        if (l.length < 1) {
          if (
            $(".artdeco-pagination__button--next").length > 0 &&
            !$(".artdeco-pagination__button--next").prop("disabled")
          ) {
            $(".artdeco-pagination__button--next").click();
            Timeout = setTimeout(function () {
              chrome.runtime.sendMessage(
                { action: "loop", result: "connectLinkedin" },
                function (p) {}
              );
            }, 15000);
          } else {
            StopAction();
            setTimeout(function () {
              alert("本次成功发送 " + ActionCount + " 条邀请");
            }, 50);
          }
          return false;
        }
        if (
          $("ul.search-results__list li.search-result__occluded-item").length %
          4
        ) {
          $("html, body").animate({ scrollTop: "0px" }, 1000);
        } else {
          $("html, body").animate({ scrollTop: "1000px" }, 1000);
        }
        var c = l.find("button.search-result__actions--primary");
        if (
          c.length > 0 &&
          c.attr("data-control-name") == "srp_profile_actions" &&
          !c.prop("disabled")
        ) {
          var f = $.trim(
            ArrangeFid(
              decodeURIComponent(
                l
                  .find("span.entity-result__title-text.t-16 a")
                  .attr("href")
                  .split("?")[0]
              )
            )
          );
          var i = $.trim(l.find("img:first").attr("src"));
          var b = $.trim(l.find(".name.actor-name").text());
          var k = GetFirstName(b);
          var m = GetLastName(b);
          if (!f) {
            StopAction();
            setTimeout(function () {
              alert("本次成功发送 " + ActionCount + " 条邀请");
            }, 50);
          }
          $("#j_head_img").attr("src", i);
          var n = getCookie("JSESSIONID");
          if (!n) {
            StopAction();
            setTimeout(function () {
              alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
            }, 50);
            return false;
          } else {
            n = n.replace(/"/g, "");
          }
          var g = randomString(22) + "==";
          var d = RandomTidings(k, m);
          if (d) {
            var o = {
              emberEntityName: "growth/invitation/norm-invitation",
              invitee: {
                "com.linkedin.voyager.growth.invitation.InviteeProfile": {
                  profileId: f,
                },
              },
              message: d,
              trackingId: g,
            };
          } else {
            var o = {
              emberEntityName: "growth/invitation/norm-invitation",
              invitee: {
                "com.linkedin.voyager.growth.invitation.InviteeProfile": {
                  profileId: f,
                },
              },
              trackingId: g,
            };
          }
          var a = "/voyager/api/growth/normInvitations";
          $.ajax({
            url: a,
            type: "post",
            data: JSON.stringify(o),
            headers: {
              Accept: "application/vnd.linkedin.normalized+json+2.1",
              "csrf-token": n,
              "content-type": "application/json; charset=UTF-8",
              "x-restli-protocol-version": "2.0.0",
            },
            success: function (q) {
              ActionCount++;
              var p = parseInt(j.a_today_num) + 1;
              $("#j_action_count").text("本次已加：" + ActionCount + "人");
              if (p > 100) {
                $("#j_today_count").html(
                  '<font style="color:#f00;">今日已加：' + p + "人</font>"
                );
              } else {
                $("#j_today_count").text("今日已加：" + p + "人");
              }
              chrome.storage.sync.set({ a_today_num: [p] }, function () {});
              JlHttp("saveConnectRecord", f, "linkedin2", 200);
              return true;
            },
            error: function (q, s, r) {
              if (q.status == 429) {
                StopAction();
                setTimeout(function () {
                  if (Tidings.length > 0) {
                    alert("你的领英没有了个性化邀请，请尝试不加邀请消息加人。");
                  } else {
                    alert("你的领英达到本周邀请上限，请下周再来加");
                  }
                }, 50);
                return false;
              }
              ActionCount++;
              var p = parseInt(j.a_today_num) + 1;
              $("#j_action_count").text("本次已加：" + ActionCount + "人");
              if (p > 100) {
                $("#j_today_count").html(
                  '<font style="color:#f00;">今日已加：' + p + "人</font>"
                );
              } else {
                $("#j_today_count").text("今日已加：" + p + "人");
              }
              chrome.storage.sync.set({ a_today_num: [p] }, function () {});
              JlHttp("saveConnectRecord", f, "linkedin2", q.status);
            },
          });
          var e = GetTime(
            parseInt(j.a_today_num),
            parseInt(j.a_min_speed),
            parseInt(j.a_max_speed),
            j.risk
          );
          Delayed_time = e;
          DelayedTime();
          Timeout = setTimeout(function () {
            l.remove();
            chrome.runtime.sendMessage(
              { action: "loop", result: "connectLinkedin" },
              function (p) {}
            );
          }, e * 1000);
        } else {
          l.remove();
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectLinkedin" },
            function (p) {}
          );
        }
      }
    }
  );
}
function StartConnectSales() {
  if (Status == 1) {
    PointOut("批量加人准备中，请不要重复点击", 5);
    return false;
  } else {
    Status = 1;
    setTimeout(function () {
      Status = 0;
    }, 5000);
  }
  var i = window.location.search;
  var f = GetUrlParam(i, "page");
  if (f > 0) {
    var b = (f - 1) * 25;
  } else {
    var b = 0;
  }
  var g = GetUrlParam(i, "query");
  var c = GetUrlParam(i, "recentSearchId");
  var e = GetUrlParam(i, "savedSearchId");
  var d = GetUrlParam(i, "sessionId");
  var a = "https://www.linkedin.com/sales-api/salesApiLeadSearch";
  if (c) {
    a += "?q=recentSearchId&recentSearchId=" + c;
  }
  if (e) {
    a += "?q=savedSearchId&savedSearchId=" + e;
  }
  if (g) {
    a += "?q=searchQuery&query=" + g;
  }
  a +=
    "&start=" +
    b +
    "&count=25" +
    "&trackingParam=(sessionId:" +
    d +
    ")&decorationId=com.linkedin.sales.deco.desktop.searchv2.LeadSearchResult-9";
  var h = getCookie("JSESSIONID");
  if (!h) {
    alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  } else {
    h = h.replace(/"/g, "");
  }
  $.ajax({
    url: a,
    type: "get",
    headers: { "csrf-token": h, "x-restli-protocol-version": "2.0.0" },
    success: function (m) {
      if (m) {
        var l = m["elements"];
        Friend = [];
        for (var k = 0; k < l.length; k++) {
          if (l[k]["pendingInvitation"] == false && l[k]["degree"] != 1) {
            var j = {};
            j["urn"] = l[k]["entityUrn"].substr(24, 39);
            j["last_name"] = l[k]["lastName"];
            j["first_name"] = l[k]["firstName"];
            if (
              l[k]["profilePictureDisplayImage"] &&
              l[k]["profilePictureDisplayImage"]["rootUrl"] &&
              l[k]["profilePictureDisplayImage"]["artifacts"]
            ) {
              j["img"] =
                l[k]["profilePictureDisplayImage"]["rootUrl"] +
                l[k]["profilePictureDisplayImage"]["artifacts"][0][
                  "fileIdentifyingUrlPathSegment"
                ];
            } else {
              j["img"] = "";
            }
            Friend.push(j);
          }
        }
        Start = m["paging"]["start"];
        Total = m["paging"]["total"];
        if (Friend) {
          JlHttp("getMesAddFriend", "", "sales", "");
        } else {
          PointOut("当前页面没有可加的人，请翻到其它页试试");
        }
      } else {
        PointOut("当前页面没有可加的人，请翻到其它页试试");
      }
    },
    error: function () {
      PointOut("失败，请尝试刷新页面或重启浏览器");
    },
  });
}
function ConnectSales() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      a_today_num: 0,
      a_limit: 100,
      a_min_speed: 30,
      a_max_speed: 60,
      level: 0,
      risk: true,
    },
    function (c) {
      if (parseInt(c.level) < 1 && parseInt(c.a_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "今日试用名额已用完。您是试用会员，试用会员每天有" +
                TestCount +
                "个试用名额，升级会员不受此限制，确定要升级吗？"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(c.a_today_num) >= parseInt(c.a_limit)) {
        StopAction();
        setTimeout(function () {
          alert("本次已发送 " + ActionCount + " 条邀请");
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", Friend[0]["img"]);
      var b = getCookie("JSESSIONID");
      if (!b) {
        StopAction();
        setTimeout(function () {
          alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
        }, 50);
        return false;
      } else {
        b = b.replace(/"/g, "");
      }
      var f = RandomTidings(Friend[0]["first_name"], Friend[0]["last_name"]);
      if (f) {
        var a = { member: Friend[0]["urn"], message: f };
      } else {
        var a = { member: Friend[0]["urn"], message: "" };
      }
      var d =
        "https://www.linkedin.com/sales-api/salesApiConnection?action=connectV2";
      $.ajax({
        url: d,
        type: "post",
        data: JSON.stringify(a),
        headers: {
          Accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": b,
          "content-type": "application/json; charset=UTF-8",
          "x-restli-protocol-version": "2.0.0",
        },
        success: function (h) {
          ActionCount++;
          var g = parseInt(c.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (g > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + g + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + g + "人");
          }
          chrome.storage.sync.set({ a_today_num: [g] }, function () {});
          JlHttp("saveConnectRecord", Friend[0]["urn"], "sales", 200);
        },
        error: function (h, j, i) {
          JlHttp("saveConnectRecord", Friend[0]["urn"], "sales", h.status);
          if (h.status == 429) {
            StopAction();
            setTimeout(function () {
              if (Tidings.length > 0) {
                alert("你的领英没有了个性化邀请，请尝试不加邀请消息加人。");
              } else {
                alert("你的领英达到本周邀请上限，请下周再来加");
              }
            }, 50);
            return false;
          }
          ActionCount++;
          var g = parseInt(c.a_today_num) + 1;
          $("#j_action_count").text("本次已加：" + ActionCount + "人");
          if (g > 100) {
            $("#j_today_count").html(
              '<font style="color:#f00;">今日已加：' + g + "人</font>"
            );
          } else {
            $("#j_today_count").text("今日已加：" + g + "人");
          }
          chrome.storage.sync.set({ a_today_num: [g] }, function () {});
        },
      });
      setTimeout(function () {
        Friend.shift();
        Start = Start + 25;
        if (Friend.length == 0 && Start < 25000 && Start < Total) {
          GetFriendForSales(Start);
        }
      }, 2500);
      var e = GetTime(
        parseInt(c.a_today_num),
        parseInt(c.a_min_speed),
        parseInt(c.a_max_speed),
        c.risk
      );
      Delayed_time = e;
      DelayedTime();
      Timeout = setTimeout(function () {
        chrome.runtime.sendMessage(
          { action: "loop", result: "connectSales", other: "" },
          function (g) {}
        );
      }, e * 1000);
    }
  );
}
function GetFriendForSales(h) {
  if (h > 0) {
  } else {
    h = 0;
  }
  var d = window.location.search;
  var f = GetUrlParam(d, "query");
  var c = GetUrlParam(d, "recentSearchId");
  var e = GetUrlParam(d, "savedSearchId");
  var g = GetUrlParam(d, "sessionId");
  var b = "https://www.linkedin.com/sales-api/salesApiLeadSearch";
  if (c) {
    b += "?q=recentSearchId&recentSearchId=" + c;
  }
  if (e) {
    b += "?q=savedSearchId&savedSearchId=" + e;
  }
  if (f) {
    b += "?q=searchQuery&query=" + f;
  }
  b +=
    "&start=" +
    h +
    "&count=25" +
    "&trackingParam=(sessionId:" +
    g +
    ")&decorationId=com.linkedin.sales.deco.desktop.searchv2.LeadSearchResult-9";
  var a = getCookie("JSESSIONID");
  if (!a) {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  } else {
    a = a.replace(/"/g, "");
  }
  $.ajax({
    url: b,
    type: "get",
    headers: { "csrf-token": a, "x-restli-protocol-version": "2.0.0" },
    success: function (m) {
      if (m) {
        var l = m["elements"];
        Friend = [];
        for (var k = 0; k < l.length; k++) {
          if (l[k]["pendingInvitation"] == false && l[k]["degree"] != 1) {
            var j = {};
            j["urn"] = l[k]["entityUrn"].substr(24, 39);
            j["last_name"] = l[k]["lastName"];
            j["first_name"] = l[k]["firstName"];
            if (
              l[k]["profilePictureDisplayImage"] &&
              l[k]["profilePictureDisplayImage"]["rootUrl"] &&
              l[k]["profilePictureDisplayImage"]["artifacts"]
            ) {
              j["img"] =
                l[k]["profilePictureDisplayImage"]["rootUrl"] +
                l[k]["profilePictureDisplayImage"]["artifacts"][0][
                  "fileIdentifyingUrlPathSegment"
                ];
            } else {
              j["img"] = "";
            }
            Friend.push(j);
          }
        }
        Start = m["paging"]["start"];
        Total = m["paging"]["total"];
      }
    },
  });
}
function ShowFriendOption() {
  $("#j_friend .j-top-nav-box li").removeClass("j-active");
  $("#j_friend .j-top-nav-box li").addClass("j-active-not");
  $(this).removeClass("j-active-not");
  $(this).addClass("j-active");
  var a = $(this).attr("option");
  $("#j_friend .j-option").removeClass("j-option-active");
  $("#j_" + a).addClass("j-option-active");
}
function ShowFriend() {
  GetFriend(1, false);
}
function ShowFriendEnter() {
  if (event.keyCode == 13) {
    ShowFriend(1, false);
  }
}
function GetFriend(a, b) {
  chrome.storage.sync.get({ my_urn: "", account: "" }, function (f) {
    // if (!String(f.account)) {
    //   ShowLoginDialog();
    //   PointOut("请先登录领英精灵账号");
    //   return false;
    // }
    // if (!String(f.my_urn)) {
    //   JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
    //   $("#j_ok").click(function () {
    //     BindLinkedin(true);
    //   });
    //   return false;
    // }
    PointOut("获取好友中...");
    $(".j-more-condition-box").slideUp();
    $("#j_more_condition").attr("title", "显示更多过滤条件");
    $("#j_more_condition").text("高级");
    var e = $.trim($.trim($("#j_friendKw").val()));
    var i = $.trim($.trim($("#j_friendTitle").val()));
    var d = $('input[name="friendcountry"]:checkbox:checked').length;
    var g = $('input[name="friendcompany"]:checkbox:checked').length;
    var h = $('input[name="friendindustry"]:checkbox:checked').length;
    var c = $('input[name="friendschool"]:checkbox:checked').length;
    if (e || i || d || g || c || h) {
      GetFriendForSearch(a, b);
    } else {
      if (a == 1) {
        GetNumFriend();
      }
      GetFriendForAll(a, b);
    }
  });
}
function GetFriendForAll(c, e) {
  var d = (c - 1) * 40;
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var b =
    "/voyager/api/relationships/dash/connections?count=40&decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-15&q=search&sortType=RECENTLY_ADDED&start=" +
    d;
  $.ajax({
    url: b,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": a,
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (f) {
      chrome.storage.sync.get({ total: 0 }, function (p) {
        if (f && f["data"]["*elements"] && f["included"]) {
          PointOut("获取完成", 1);
          $("#j_friend_box").empty();
          $("input[name='selectAllFriend']").prop("checked", false);
          var q = parseInt(p.total);
          ShowPaging("j_friend_paging", c, q, 40);
          if (q == 0) {
            var h =
              '<div class="j-explain-box">' +
              "<p>没有匹配的人脉，请切换关键词或过滤条件。<p/>" +
              '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
              "</div>";
            $("#j_friend_box").append(h);
            return false;
          }
          var g = f["data"]["*elements"];
          var o = f["included"];
          var l = [];
          var k = [];
          for (var n = 0; n < g.length; n++) {
            var r = {};
            r["urn"] = g[n].split(":")[3];
            k.push(r["urn"]);
            for (var m = 0; m < o.length; m++) {
              if (
                o[m]["$type"] ==
                  "com.linkedin.voyager.dash.identity.profile.Profile" &&
                o[m]["entityUrn"].split(":")[3] == r["urn"]
              ) {
                r["first_name"] = o[m]["firstName"];
                r["last_name"] = o[m]["lastName"];
                if (o[m]["headline"]) {
                  r["position"] = o[m]["headline"].substr(0, 140);
                } else {
                  r["position"] = "";
                }
                if (
                  o[m]["profilePicture"] &&
                  o[m]["profilePicture"]["displayImageReference"] &&
                  o[m]["profilePicture"]["displayImageReference"][
                    "vectorImage"
                  ] &&
                  o[m]["profilePicture"]["displayImageReference"][
                    "vectorImage"
                  ]["rootUrl"]
                ) {
                  r["img"] =
                    o[m]["profilePicture"]["displayImageReference"][
                      "vectorImage"
                    ]["rootUrl"] +
                    o[m]["profilePicture"]["displayImageReference"][
                      "vectorImage"
                    ]["artifacts"][0]["fileIdentifyingUrlPathSegment"];
                } else {
                  r["img"] = "";
                }
                r["public_id"] = o[m]["publicIdentifier"];
                AppendFriendToTable(r);
                l.push(r);
              }
            }
          }
          if (l.length > 0) {
            l = JSON.stringify(l);
            JlHttp("saveFriend", l, "", "");
            if (e) {
              var k = JSON.stringify(k);
              chrome.storage.sync.get(
                { s_skip: true, s_skip_time: 3 },
                function (i) {
                  if (i.s_skip) {
                    var j = 1;
                  } else {
                    var j = 0;
                  }
                  JlHttp("getSendForAuto", k, j, parseInt(i.s_skip_time));
                }
              );
            }
          }
        } else {
          PointOut("好友获取失败，请尝试刷新页面", 3);
        }
      });
    },
    error: function () {
      PointOut("好友获取失败，请尝试刷新页面", 3);
    },
  });
}
function GetSendForAutoResult(a) {
  if (a && a["result"] == 1) {
    Friend = a["data"];
  }
}
function GetNumFriend() {
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var b = "/voyager/api/relationships/connectionsSummary/";
  $.ajax({
    url: b,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": a,
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (d) {
      if (d && d["data"] && d["data"]["numConnections"]) {
        var c = d["data"]["numConnections"];
        chrome.storage.sync.set({ total: [c] }, function () {});
      } else {
        chrome.storage.sync.set({ total: 0 }, function () {});
      }
    },
  });
}
function GetFriendForSearch(e, l) {
  var b = (e - 1) * 10;
  var m = getCookie("JSESSIONID");
  if (m) {
    m = m.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var f = "";
  var k = $.trim($("#j_friendKw").val());
  if (isChinese(k)) {
    var c = "zh_CN";
  } else {
    var c = "en_US";
  }
  if (k) {
    f += "keywords:" + encodeURIComponent(k) + ",";
  }
  f += "flagshipSearchIntent:SEARCH_SRP,queryParameters:(";
  var h = "";
  $('input[name="friendcompany"]:checkbox:checked').each(function () {
    h += $.trim($(this).val()) + ",";
  });
  if (h) {
    h = "currentCompany:List(" + h.substr(0, h.length - 1) + "),";
    f += h;
  }
  var j = "";
  $('input[name="friendcountry"]:checkbox:checked').each(function () {
    j += $.trim($(this).val()) + ",";
  });
  if (j) {
    j = "geoUrn:List(" + j.substr(0, j.length - 1) + "),";
    f += j;
  }
  var g = "";
  $('input[name="friendindustry"]:checkbox:checked').each(function () {
    g += $.trim($(this).val()) + ",";
  });
  if (g) {
    g = "industry:List(" + g.substr(0, g.length - 1) + "),";
    f += g;
  }
  f += "network:List(F),resultType:List(PEOPLE),";
  var d = "";
  $('input[name="friendschool"]:checkbox:checked').each(function () {
    d += $.trim($(this).val()) + ",";
  });
  if (d) {
    d = "schoolFreetext:List(" + d.substr(0, d.length - 1) + "),";
    f += d;
  }
  var i = $.trim($("#j_friendTitle").val());
  if (i) {
    f += "title:List(" + encodeURIComponent(i) + "),";
  }
  f = f.substr(0, f.length - 1) + "),includeFiltersInResponse:false)";
  var a =
    "https://www.linkedin.com/voyager/api/search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-161&origin=FACETED_SEARCH&q=all&query=(" +
    f +
    "&start=" +
    b;
  chrome.storage.sync.get({ my_urn: "" }, function (n) {
    var o = String(n.my_urn);
    PointOut("获取好友中...", 10);
    $.ajax({
      url: a,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": m,
        "x-restli-protocol-version": "2.0.0",
        "x-li-lang": c,
        "x-li-page-instance":
          "urn:li:page:d_flagship3_search_srp_people_load_more;GToX++oWQU+AxjzOpfsgLg==",
      },
      success: function (u) {
        if (u) {
          PointOut("获取成功", 1);
          $("#j_friend_box").empty();
          $("input[name='selectAllFriend']").prop("checked", false);
          var t = u["data"]["paging"]["total"];
          if (t == 0) {
            var s =
              '<div class="j-explain-box j-w">' +
              '<p style="text-align:center">没有匹配的好友,请切换搜索条件</p>' +
              '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
              "</div>";
            $("#j_friend_box").append(s);
            ShowPaging("j_friend_paging", e, 0, 10);
            return false;
          }
          var w = u["included"];
          var r = [];
          var v = [];
          for (var q = 0; q < w.length; q++) {
            if (
              w[q]["$type"] &&
              w[q]["$type"] ==
                "com.linkedin.voyager.dash.search.EntityResultViewModel"
            ) {
              var p = {};
              p["urn"] = w[q]["entityUrn"].substr(53, 39);
              v.push(p["urn"]);
              p["first_name"] = GetFirstName(w[q]["title"]["text"]);
              p["last_name"] = GetLastName(w[q]["title"]["text"]);
              if (w[q]["primarySubtitle"]) {
                p["position"] = w[q]["primarySubtitle"]["text"].substr(0, 140);
              } else {
                p["position"] = "";
              }
              p["public_id"] = w[q]["navigationUrl"].split("?")[0].substr(28);
              if (
                w[q]["image"] &&
                w[q]["image"]["attributes"] &&
                w[q]["image"]["attributes"][0]["detailDataUnion"] &&
                w[q]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ] &&
                w[q]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ]["vectorImage"] &&
                w[q]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"] &&
                w[q]["image"]["attributes"][0]["detailDataUnion"][
                  "nonEntityProfilePicture"
                ]["vectorImage"]["artifacts"][0][
                  "fileIdentifyingUrlPathSegment"
                ]
              ) {
                p["img"] =
                  w[q]["image"]["attributes"][0]["detailDataUnion"][
                    "nonEntityProfilePicture"
                  ]["vectorImage"]["artifacts"][0][
                    "fileIdentifyingUrlPathSegment"
                  ];
              } else {
                p["img"] = "";
              }
              if (p["urn"] != o) {
                AppendFriendToTable(p);
                r.push(p);
              }
            }
          }
          ShowPaging("j_friend_paging", e, t, 10);
          if (r.length > 0) {
            var r = JSON.stringify(r);
            JlHttp("saveFriend", r, "", "");
          }
          if (l) {
            var v = JSON.stringify(v);
            chrome.storage.sync.get(
              { s_skip: true, s_skip_time: 3 },
              function (x) {
                if (x.s_skip) {
                  var y = 1;
                } else {
                  var y = 0;
                }
                JlHttp("getSendForAuto", v, y, parseInt(x.s_skip_time));
              }
            );
          }
        } else {
          PointOut("好友获取失败，请尝试刷新页面", 3);
        }
      },
      error: function () {
        PointOut("好友获取失败，请尝试刷新页面", 3);
      },
    });
  });
}
function AppendFriendToTable(c) {
  var a = GetName(c.first_name, c.last_name);
  var b =
    '<div class="j-friend j-nowrap" id="f_' +
    c["urn"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">' +
    '<div><a href="https://www.linkedin.com/in/' +
    c["public_id"] +
    ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
    c["img"] +
    '"></a></div>' +
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline">' +
    c["position"] +
    "</p>" +
    '<p class="j-oneline"></p>' +
    '<div class="j-nowrap-left">' +
    '<div class="j-edit j-svg-ico18" title="修改备注">' +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M3 15 l12 0" class="j-svg"/>' +
    '<path d="M3 14 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />' +
    '<path d="M12 4 l1 -1 l1 1 l-1 1 z" class="j-svg" />' +
    "</svg>" +
    "</div>" +
    '<div><p class="j-oneline j-remark"></p></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="j-tool-box">' +
    '<p class="j-grouping j-oneline" title="分组">未分组</p>' +
    '<p class="j-sendtime j-oneline" title="通过领英精灵最后一次群发日期">群发：未群发过</p>' +
    '<div class="j-nowrap-left">' +
    '<div class="j-dig j-svg-ico18" state=0 title="未挖掘，点击挖掘">' +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1">' +
    '<circle cx="9" cy="9" r="3" class="j-svg-0" />' +
    '<path d="M2 9 Q9 2 16 9" class="j-svg-0" />' +
    '<path d="M2 9 Q9 16 16 9" class="j-svg-0" />' +
    "</svg>" +
    "</div>" +
    '<div class="j-prohibit j-svg-ico18" state=0 title="未在禁发名单，点击加入">' +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="9" cy="9" r="5" class="j-svg-0" />' +
    '<path d="M5 5 l8 8" class="j-svg-0" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="friend">' +
    "</div>" +
    "</div>";
  $("#j_friend_box").append(b);
}
function SaveFriendResult(b) {
  if (b && b["result"] == 1) {
    for (var a = 0; a < b["data"].length; a++) {
      if (b["data"][a]["send_time"] == null) {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-sendtime")
          .text("群发：未群发过");
      } else {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-sendtime")
          .html(
            '<font style="color:#f00;">群发：' +
              b["data"][a]["send_time"] +
              "</font>"
          );
      }
      $("#f_" + b["data"][a]["friend_urn"])
        .find(".j-remark")
        .text(b["data"][a]["remark"]);
      $("#f_" + b["data"][a]["friend_urn"])
        .find(".j-remark")
        .attr("title", b["data"][a]["remark"]);
      if (b["data"][a]["group_name"] == null) {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-grouping")
          .text("未分组");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-grouping")
          .attr("grouping", 0);
      } else {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-grouping")
          .html(
            '<h3 class="j-oneline">' + b["data"][a]["group_name"] + "</h3>"
          );
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-grouping")
          .attr("grouping", 1);
      }
      if (b["data"][a]["is_prohibit"] == "1") {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-prohibit svg *")
          .addClass("j-svg-1");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-prohibit svg *")
          .removeClass("j-svg-0");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-prohibit")
          .attr("title", "已在禁发名单，点击移出");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-prohibit")
          .attr("state", "1");
      }
      if (b["data"][a]["dig_state"] == "1") {
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-dig svg *")
          .addClass("j-svg-1");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-dig svg *")
          .removeClass("j-svg-0");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-dig")
          .attr("title", "已挖掘，点击查看详情");
        $("#f_" + b["data"][a]["friend_urn"])
          .find(".j-dig")
          .attr("state", "1");
      }
    }
  } else {
    PointOut("精灵同步失败");
  }
}
function GetFriendSomePage() {
  var a = parseInt($(this).text());
  GetFriend(a, false);
}
function JumpFriend() {
  var b = parseInt($("#j_friend_paging .j-paging:last").text());
  var c = parseInt($("#j_friend_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_friend_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetFriend(c, false);
}
function JumpFriendEnter() {
  if (event.keyCode == 13) {
    JumpFriend();
  }
}
function SelectAllFriend() {
  if ($(this).prop("checked")) {
    $("input[name='friend']").prop("checked", true);
    var a = $("input[name='friend']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选择的好友", 1);
    } else {
      PointOut("选择了 " + a + " 位好友", 1);
    }
  } else {
    $("input[name='friend']").prop("checked", false);
  }
}
function ShowMoreCondition() {
  if ($(".j-more-condition-box").is(":hidden")) {
    $(this).text("隐藏");
    $(this).attr("title", "隐藏更多过滤条件");
  } else {
    $(this).text("高级");
    $(this).attr("title", "显示更多过滤条件");
  }
  $(".j-more-condition-box").slideToggle();
}
function ShowOrHideSearch() {
  if ($(this).next().is(":visible")) {
    $(this).next().slideUp(200);
  } else {
    $(".j-condition").slideUp(0);
    $(this).next().slideDown(200);
  }
}
function CleanFriendCondition() {
  CleanSelectFriendCountry();
  CleanSelectFriendCompany();
  CleanSelectFriendIndustry();
  CleanSelectFriendSchool();
  PointOut("清除完成", 1);
}
function GetFriendCountry() {
  var c = $.trim($(this).val());
  $("#j_friend_select_country").empty();
  var a = getCookie("JSESSIONID");
  if (a) {
    a = a.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  if (c) {
    if (isChinese(c)) {
      var d = "zh_CN";
    } else {
      var d = "en_US";
    }
    var b =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      encodeURIComponent(c) +
      "&q=type&query=(typeaheadFilterQuery:(geoSearchTypes:List(MARKET_AREA,COUNTRY_REGION,ADMIN_DIVISION_1,CITY)))&type=GEO";
    $.ajax({
      url: b,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": a,
        "x-li-lang": d,
        "x-restli-protocol-version": "2.0.0",
      },
      success: function (j) {
        if (j) {
          var h = j["data"]["elements"];
          var e = h.length;
          if (e > 0) {
            for (var f = 0; f < e; f++) {
              var k = h[f]["trackingUrn"].split(":")[3];
              var l = h[f]["title"]["text"];
              var g =
                "<div>" +
                '<span class="j-country-span" urn="' +
                k +
                '">' +
                l +
                "</span>" +
                "</div>";
              $("#j_friend_select_country").append(g);
            }
          }
        }
      },
      error: function () {
        PointOut("地区搜索失败");
      },
    });
  }
}
function SelectFriendCountry() {
  var b = $.trim($(this).attr("urn"));
  var c = $(this).text();
  $(this).parent("div").remove();
  $('input[name="friendcountry"]').each(function () {
    if ($.trim($(this).val()) == b) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var a =
    "<li>" +
    '<input type="checkbox" name="friendcountry" checked="checked" value="' +
    b +
    '">' +
    "<span>" +
    c +
    "</span>" +
    "</li>";
  $("#j_friend_country").append(a);
}
function CleanSelectFriendCountry() {
  $("#j_friend_country").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="friendcountry" value="102890883">' +
    "<span> 中国</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="friendcountry" value="103644278">' +
    "<span> 美国</span>" +
    "</li>";
  $("#j_friend_country").append(a);
  $("#j_friend_country_btn span").text("所在地区");
  PointOut("清除完成", 1);
}
function DetermineSelectFriendCountry() {
  var a = $('input[name="friendcountry"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="friendcountry"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_friend_country_btn span").text("所在地区(" + a + ")");
  } else {
    $("#j_friend_country_btn span").text("所在地区");
  }
  $(".j-condition").slideUp(200);
  $("#j_friend_search_country").val("");
  $("#j_friend_select_country").empty();
}
function GetFriendCompany() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_friend_select_company").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      d +
      "&q=type&query=()&type=COMPANY";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k = l["data"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var g = 0; g < f; g++) {
              var m = k[g]["trackingUrn"].split(":")[3];
              var j = k[g]["title"]["text"];
              var h =
                "<div>" +
                '<span class="j-company-span" urn="' +
                m +
                '">' +
                j +
                "</span>" +
                "</div>";
              $("#j_friend_select_company").append(h);
            }
          }
        }
      },
      error: function () {
        PointOut("获取公司信息出错");
      },
    });
  }
}
function SelectFriendCompany() {
  var c = $.trim($(this).attr("urn"));
  var b = $(this).text();
  $(this).parent("div").remove();
  $('input[name="friendcompany"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var a =
    "<li>" +
    '<input type="checkbox" name="friendcompany" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    b +
    "</span>" +
    "</li>";
  $("#j_friend_company").append(a);
}
function CleanSelectFriendCompany() {
  $("#j_friend_company").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="friendcompany" value="14160">' +
    "<span> 阿里巴巴</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="friendcompany" value="3014">' +
    "<span> 华为</span>" +
    "</li>";
  $("#j_friend_company").append(a);
  $("#j_friend_company_btn span").text("目前就职");
  PointOut("清除完成", 1);
}
function DetermineSelectFriendCompany() {
  var a = $('input[name="friendcompany"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="friendcompany"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_friend_company_btn span").text("目前就职(" + a + ")");
  } else {
    $("#j_friend_company_btn span").text("目前就职");
  }
  $(".j-condition").slideUp(200);
  $("#j_friend_search_company").val("");
  $("#j_friend_select_company").empty();
}
function GetFriendIndustry() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_friend_select_industry").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-28&keywords=" +
      d +
      "&q=type&query=(typeaheadFilterQuery:(standardizationEntityType:industry))&type=INDUSTRY";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k = l["data"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var g = 0; g < f; g++) {
              var m = k[g]["trackingUrn"].split(":")[3];
              var h = k[g]["title"]["text"];
              var j =
                "<div>" +
                '<span class="j-industry-span" urn="' +
                m +
                '">' +
                h +
                "</span>" +
                "</div>";
              $("#j_friend_select_industry").append(j);
            }
          }
        }
      },
      error: function () {
        PointOut("获取行业信息出错");
      },
    });
  }
}
function SelectFriendIndustry() {
  var c = $.trim($(this).attr("urn"));
  var a = $(this).text();
  $(this).parent("div").remove();
  $('input[name="friendindustry"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var b =
    "<li>" +
    '<input type="checkbox" name="friendindustry" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    a +
    "</span>" +
    "</li>";
  $("#j_friend_industry").append(b);
}
function CleanSelectFriendIndustry() {
  $("#j_friend_industry").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="friendindustry" value="6">' +
    "<span> 互联网</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="friendindustry" value="11">' +
    "<span> 电器/电子制造</span>" +
    "</li>";
  $("#j_friend_industry").append(a);
  $("#j_friend_industry_btn span").text("行业");
  PointOut("清除完成", 1);
}
function DetermineSelectFriendIndustry() {
  var a = $('input[name="friendindustry"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="friendindustry"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_friend_industry_btn span").text("行业(" + a + ")");
  } else {
    $("#j_friend_industry_btn span").text("行业");
  }
  $(".j-condition").slideUp(200);
  $("#j_friend_search_industry").val("");
  $("#j_friend_select_industry").empty();
}
function GetFriendSchool() {
  var d = $.trim($(this).val());
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  $("#j_friend_select_school").empty();
  var a =
    "urn:li:page:d_flagship3_search_srp_people;" + randomString(22) + "==";
  if (d && b) {
    if (isChinese(d)) {
      var e = "zh_CN";
    } else {
      var e = "en_US";
    }
    var c =
      "https://www.linkedin.com/voyager/api/graphql?variables=(keywords:" +
      d +
      ",query:(),type:SCHOOL)&queryId=voyagerSearchDashReusableTypeahead.23c9f700d1a32edbb7f6646dda5e7480";
    $.ajax({
      url: c,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-page-instance": a,
        "x-li-lang": e,
      },
      success: function (l) {
        if (l) {
          var k =
            l["data"]["data"]["searchDashReusableTypeaheadByType"]["elements"];
          var f = k.length;
          if (f > 0) {
            for (var h = 0; h < f; h++) {
              var m = k[h]["trackingUrn"].slice(19);
              var g = k[h]["title"]["text"];
              var j =
                "<div>" +
                '<span class="j-school-span" urn="' +
                m +
                '">' +
                g +
                "</span>" +
                "</div>";
              $("#j_friend_select_school").append(j);
            }
          }
        }
      },
      error: function () {
        PointOut("获取就读学校错误");
      },
    });
  }
}
function SelectFriendSchool() {
  var c = $.trim($(this).attr("urn"));
  var a = $(this).text();
  $(this).parent("div").remove();
  $('input[name="friendschool"]').each(function () {
    if ($.trim($(this).val()) == c) {
      $(this).parent("li").remove();
      return true;
    }
  });
  var b =
    "<li>" +
    '<input type="checkbox" name="friendschool" checked="checked" value="' +
    c +
    '">' +
    "<span> " +
    a +
    "</span>" +
    "</li>";
  $("#j_friend_school").append(b);
}
function CleanSelectFriendSchool() {
  $("#j_friend_school").empty();
  var a =
    "<li>" +
    '<input type="checkbox" name="friendschool" value="20289">' +
    "<span> 北京大学</span>" +
    "</li>" +
    "<li>" +
    '<input type="checkbox" name="friendschool" value="14022">' +
    "<span> 清华大学</span>" +
    "</li>";
  $("#j_friend_school").append(a);
  $("#j_friend_school_btn span").text("就读学校");
  PointOut("清除完成", 1);
}
function DetermineSelectFriendSchool() {
  var a = $('input[name="friendschool"]:checkbox:checked').length;
  if (a > 0) {
    $('input[name="friendschool"]').each(function () {
      if (!$(this).prop("checked")) {
        $(this).parent("li").remove();
      }
    });
    $("#j_friend_school_btn span").text("就读学校(" + a + ")");
  } else {
    $("#j_friend_school_btn span").text("就读学校");
  }
  $(".j-condition").slideUp(200);
  $("#j_friend_search_school").val("");
  $("#j_friend_select_school").empty();
}
function Grouping() {
  var a = [];
  chrome.storage.sync.get(
    { latelyGroupId: "1", level: 0, trial: 0 },
    function (b) {
      if (parseInt(b.level) < 1 && parseInt(b.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      var c = String(b.latelyGroupId);
      if ($("input[name='friend']:checkbox:checked").length > 0) {
        JlHttp("getGroup", c, "friend", "");
      } else {
        PointOut("请选择要分组的好友");
      }
    }
  );
}
function ShowGroupingDialog(b, a) {
  $(".j-dialog").remove();
  chrome.storage.sync.get({ g_skip: false }, function (c) {
    var e =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-prompt-box j-div-center j-box-sha j-bg-w" style="width:40%;">' +
      '<div class="j-prompt-title j-bg-0 j-nowrap">' +
      '<div class="j-nowrap-left">' +
      "<div>" +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
      '<circle cx="12" cy="12" r="10" style="fill:#00f" />' +
      '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>' +
      '<circle cx="12" cy="18" r="1" style="fill:#fff;" />' +
      "</svg>" +
      "</div>" +
      "<div>" +
      "<p>分组到...</p>" +
      "</div>" +
      "</div>" +
      '<div title="关闭" class="j-close-dialog j-sha">' +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
      '<line x1="6" y1="6" x2="18" y2="18" />' +
      '<line x1="18" y1="6" x2="6" y2="18" />' +
      "</svg>" +
      "</div>" +
      "</div>" +
      '<div class="j-prompt-cont">' +
      '<div><select id="j_select_group" style="padding:6px; width:90%;">';
    for (var d = 0; d < b.length; d++) {
      if (b[d]["group_id"] == a) {
        e +=
          '<option selected="selected" value=' +
          b[d]["group_id"] +
          ">" +
          b[d]["group_name"] +
          "</option>";
      } else {
        e +=
          "<option value=" +
          b[d]["group_id"] +
          ">" +
          b[d]["group_name"] +
          "</option>";
      }
    }
    e += "<option value=0>移出分组</option>";
    e +=
      "</select></div>" +
      "</div>" +
      '<div class="j-prompt-ctrl j-nowrap" style="width:90%;">' +
      "<div>" +
      '<input id="j_g_skip" type="checkbox" style="margin-right:6px;">跳过已分组的好友' +
      "</div>" +
      '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(e);
    $(".j-dialog").fadeIn(200);
    $("#j_g_skip").prop("checked", Boolean(c.g_skip));
    $("#j_ok").on("click", function () {
      var f = $.trim($("#j_select_group").val());
      if (!f) {
        PointOut("请选择分组");
        return false;
      }
      chrome.storage.sync.get({ g_skip: false }, function (g) {
        var h = [];
        $("input[name='friend']:checkbox:checked").each(function () {
          if (g.g_skip) {
            if (
              parseInt(
                $(this)
                  .parents("div.j-friend")
                  .find(".j-grouping")
                  .attr("grouping")
              ) == 0
            ) {
              h.push(
                $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41)
              );
            }
          } else {
            h.push(
              $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41)
            );
          }
        });
        if (h.length > 0) {
          h = JSON.stringify(h);
          JlHttp("grouping", h, "friend", f);
          chrome.storage.sync.set({ latelyGroupId: [f] }, function () {});
        } else {
          PointOut("选择的好友可能已分组，跳过");
        }
      });
    });
  });
}
function SetGroupingSkip() {
  chrome.storage.sync.set({ g_skip: $(this).prop("checked") }, function () {});
}
function DigData(h, d, i) {
  var c = {};
  var f = [];
  var b = [];
  var e = [];
  var g = getCookie("JSESSIONID");
  if (g) {
    g = g.replace(/"/g, "");
  } else {
    StopAction();
    alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var a = "/voyager/api/identity/profiles/" + d + "/profileView";
  $.ajax({
    url: a,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": g,
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (m) {
      if (m["included"]) {
        var t = m["included"];
        for (var n = 0; n < t.length; n++) {
          if (
            t[n]["$type"] == "com.linkedin.voyager.identity.profile.Profile"
          ) {
            c["urn"] = h;
            c["publicId"] = d;
            var q = t[n];
            if (q && q["locationName"]) {
              c["city"] = q["locationName"].substr(0, 50);
            } else {
              c["city"] = "";
            }
            if (q && q["industryName"]) {
              c["industry"] = q["industryName"].substr(0, 50);
            } else {
              c["industry"] = "";
            }
            if (q && q["summary"]) {
              c["about"] = q["summary"].substr(0, 1000);
            } else {
              c["about"] = "";
            }
            if (q && q["geoCountryName"]) {
              c["country"] = q["geoCountryName"].substr(0, 50);
            } else {
              c["country"] = "";
            }
          }
          if (
            t[n]["$type"] == "com.linkedin.voyager.identity.shared.MiniProfile"
          ) {
            var u = t[n];
            if (u && u["firstName"]) {
              c["firstname"] = u["firstName"].substr(0, 50);
            } else {
              c["firstname"] = "";
            }
            if (u && u["lastName"]) {
              c["lastname"] = u["lastName"].substr(0, 50);
            } else {
              c["lastname"] = "";
            }
            if (u && u["occupation"]) {
              c["position"] = u["occupation"].substr(0, 120);
            } else {
              c["position"] = "";
            }
            if (
              u &&
              u["picture"] &&
              u["picture"]["rootUrl"] &&
              u["picture"]["artifacts"] &&
              u["picture"]["artifacts"][0]["fileIdentifyingUrlPathSegment"]
            ) {
              c["img"] =
                u["picture"]["rootUrl"] +
                u["picture"]["artifacts"][0]["fileIdentifyingUrlPathSegment"];
            } else {
              c["img"] = "";
            }
          }
          if (
            t[n]["$type"] == "com.linkedin.voyager.identity.profile.Position"
          ) {
            var k = {};
            if (t[n]["entityUrn"]) {
              var p = t[n]["entityUrn"].split(",")[1];
              k["workId"] = p.substring(0, p.length - 1);
            } else {
              k["workId"] = null;
            }
            if (t[n]["companyName"]) {
              if (!c["company"]) {
                c["company"] = t[n]["companyName"].substr(0, 120);
              }
              k["companyName"] = t[n]["companyName"].substr(0, 120);
            } else {
              k["companyName"] = "";
              c["company"] = "";
            }
            if (t[n]["locationName"]) {
              k["locationName"] = t[n]["locationName"].substr(0, 120);
            } else {
              k["locationName"] = "";
            }
            if (t[n]["title"]) {
              k["position"] = t[n]["title"].substr(0, 140);
            } else {
              k["position"] = "";
            }
            if (t[n]["description"]) {
              k["description"] = t[n]["description"].substr(0, 2000);
            } else {
              k["description"] = "";
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["startDate"] &&
              t[n]["timePeriod"]["startDate"]["year"]
            ) {
              k["startYear"] = t[n]["timePeriod"]["startDate"]["year"];
            } else {
              k["startYear"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["startDate"] &&
              t[n]["timePeriod"]["startDate"]["month"]
            ) {
              k["startMonth"] = t[n]["timePeriod"]["startDate"]["month"];
            } else {
              k["startMonth"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["endDate"] &&
              t[n]["timePeriod"]["endDate"]["year"]
            ) {
              k["endYear"] = t[n]["timePeriod"]["endDate"]["year"];
            } else {
              k["endYear"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["endDate"] &&
              t[n]["timePeriod"]["endDate"]["month"]
            ) {
              k["endMonth"] = t[n]["timePeriod"]["endDate"]["month"];
            } else {
              k["endMonth"] = 0;
            }
            f.push(k);
          }
          if (
            t[n]["$type"] == "com.linkedin.voyager.identity.profile.Education"
          ) {
            var l = {};
            if (t[n]["entityUrn"]) {
              var s = t[n]["entityUrn"].split(",")[1];
              l["eduId"] = s.substring(0, s.length - 1);
            } else {
              l["eduId"] = null;
            }
            if (t[n]["schoolName"]) {
              c["school"] = t[n]["schoolName"];
              l["schoolName"] = t[n]["schoolName"].substr(0, 120);
            } else {
              c["school"] = "";
              l["schoolName"] = "";
            }
            if (t[n]["fieldOfStudy"]) {
              l["major"] = t[n]["fieldOfStudy"].substr(0, 120);
            } else {
              l["major"] = "";
            }
            if (t[n]["degreeName"]) {
              l["degreeName"] = t[n]["degreeName"].substr(0, 120);
            } else {
              l["degreeName"] = "";
            }
            if (t[n]["description"]) {
              l["description"] = t[n]["description"].substr(0, 1000);
            } else {
              l["description"] = "";
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["startDate"] &&
              t[n]["timePeriod"]["startDate"]["year"]
            ) {
              l["startYear"] = t[n]["timePeriod"]["startDate"]["year"];
            } else {
              l["startYear"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["startDate"] &&
              t[n]["timePeriod"]["startDate"]["month"]
            ) {
              l["startMonth"] = t[n]["timePeriod"]["startDate"]["month"];
            } else {
              l["startMonth"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["endDate"] &&
              t[n]["timePeriod"]["endDate"]["year"]
            ) {
              l["endYear"] = t[n]["timePeriod"]["endDate"]["year"];
            } else {
              l["endYear"] = 0;
            }
            if (
              t[n]["timePeriod"] &&
              t[n]["timePeriod"]["endDate"] &&
              t[n]["timePeriod"]["endDate"]["month"]
            ) {
              l["endMonth"] = t[n]["timePeriod"]["endDate"]["month"];
            } else {
              l["endMonth"] = 0;
            }
            b.push(l);
          }
          if (t[n]["$type"] == "com.linkedin.voyager.identity.profile.Skill") {
            var r = {};
            if (t[n]["entityUrn"]) {
              var o = t[n]["entityUrn"].split(",")[1];
              r["skillId"] = o.substring(0, o.length - 1);
            } else {
              r["skillId"] = null;
            }
            if (t[n]["name"]) {
              r["skillName"] = t[n]["name"];
            } else {
              r["skillName"] = "";
            }
            e.push(r);
          }
        }
        var j = "/voyager/api/identity/profiles/" + d + "/profileContactInfo";
        $.ajax({
          url: j,
          type: "get",
          headers: {
            Accept: "application/vnd.linkedin.normalized+json+2.1",
            "csrf-token": g,
            "x-restli-protocol-version": "2.0.0",
          },
          success: function (A) {
            if (A["data"]) {
              var v = A["data"];
              if (v["emailAddress"]) {
                c["email"] = v["emailAddress"];
              } else {
                c["email"] = "";
              }
              if (v["address"]) {
                c["address"] = v["address"].substr(0, 140);
              } else {
                c["address"] = "";
              }
              if (v["connectedAt"]) {
                c["connected"] = v["connectedAt"];
              } else {
                c["connected"] = 10000000;
              }
              if (v["ims"]) {
                var x = "";
                for (var y = 0; y < v["ims"].length; y++) {
                  x =
                    x + v["ims"][y]["provider"] + ":" + v["ims"][y]["id"] + ",";
                }
                c["ims"] = x;
              } else {
                c["ims"] = "";
              }
              if (v["phoneNumbers"]) {
                var w = "";
                for (var y = 0; y < v["phoneNumbers"].length; y++) {
                  w =
                    w +
                    v["phoneNumbers"][y]["type"] +
                    ":" +
                    v["phoneNumbers"][y]["number"] +
                    " ";
                }
                c["phone"] = w;
              } else {
                c["phone"] = "";
              }
              if (v["twitterHandles"]) {
                var z = "";
                for (var y = 0; y < v["twitterHandles"].length; y++) {
                  z = z + v["twitterHandles"][y]["name"] + " ";
                }
                c["twitter"] = z;
              } else {
                c["twitter"] = "";
              }
              if (v["websites"]) {
                var C = "";
                for (var y = 0; y < v["websites"].length; y++) {
                  C =
                    C +
                    v["websites"][y]["type"]["category"] +
                    ":" +
                    v["websites"][y]["url"] +
                    " ";
                }
                c["websites"] = C.substr(0, 200);
              } else {
                c["websites"] = "";
              }
              var B = JSON.stringify(c);
              JlHttp("saveDigData", B, i, "");
              if (i == "f_" || i == "g_") {
                PointOut("挖掘完成", 1);
                $("#" + i + h)
                  .find(".j-dig svg *")
                  .removeClass("j-svg-0");
                $("#" + i + h)
                  .find(".j-dig svg *")
                  .addClass("j-svg-1");
                $("#" + i + h)
                  .find(".j-dig")
                  .attr("title", "已挖掘，点击查看详情");
                $("#" + i + h)
                  .find(".j-dig")
                  .attr("state", 1);
                ShowProfile(c);
              }
              chrome.storage.sync.get({ d_today_num: 0 }, function (D) {
                var E = parseInt(D.d_today_num) + 1;
                chrome.storage.sync.set({ d_today_num: [E] }, function () {});
              });
            }
          },
        });
      }
    },
    error: function (j, l, k) {
      if (j.status == 403) {
        JlHttp("deleteInvalidFriend", h, "", "");
      }
    },
  });
}
function ShowProfile(c) {
  var a = GetName(c["firstname"], c["lastname"]);
  var b =
    '<div class="j-dialog j-div-center j-detail-bg" title="双击关闭">' +
    '<div class="j-detail-box j-div-center">' +
    "<div>" +
    "<h2>" +
    a +
    "</h2>" +
    "</div>" +
    "<hr>";
  if (c["email"]) {
    b +=
      '<div class="j-nowrap-left j-contact"><font>邮箱：</font><span>' +
      c["email"] +
      "</span></div>";
  }
  if (c["phone"]) {
    b +=
      '<div class="j-nowrap-left j-contact"><font>电话：</font><span>' +
      c["phone"] +
      "</span></div>";
  }
  if (c["ims"]) {
    b +=
      '<div class="j-nowrap-left j-contact"><font>社交账号：</font><span>' +
      c["ims"] +
      "</span></div>";
  }
  if (c["twitter"]) {
    b +=
      '<div class="j-nowrap-left j-contact"><font>推特：</font><span>' +
      c["twitter"] +
      "</span></div>";
  }
  if (c["school"]) {
    b +=
      '<div class="j-nowrap-left"><font>学校：</font><span>' +
      c["school"] +
      "</span></div>";
  }
  if (c["country"]) {
    b +=
      '<div class="j-nowrap-left"><font>国家：</font><span>' +
      c["country"] +
      "</span></div>";
  }
  if (c["city"]) {
    b +=
      '<div class="j-nowrap-left"><font>城市：</font><span>' +
      c["city"] +
      "</span></div>";
  }
  if (c["address"]) {
    b +=
      '<div class="j-nowrap-left"><font>详细地址：</font><span>' +
      c["address"] +
      "</span></div>";
  }
  if (c["company"]) {
    b +=
      '<div class="j-nowrap-left"><font>公司：</font><span>' +
      c["company"] +
      "</span></div>";
  }
  if (c["position"]) {
    b +=
      '<div class="j-nowrap-left"><font>职位：</font><span>' +
      c["position"] +
      "</span></div>";
  }
  if (c["websites"]) {
    b +=
      '<div class="j-nowrap-left"><font>网址：</font><span>' +
      c["websites"] +
      "</span></div>";
  }
  if (c["about"]) {
    b +=
      '<div class="j-nowrap-left"><font>个人简介：</font></div>' +
      '<div class="j-about"><p>' +
      c["about"] +
      "</p></div>";
  }
  b += "</div>" + "</div>";
  $("#j_lyjl_window").append(b);
  $(".j-dialog").fadeIn(200);
}
function StartDigForFriend() {
  chrome.storage.sync.get(
    { account: "", my_urn: "", run: false, level: 0, trial: 0 },
    function (a) {
      if (a.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量挖掘！");
        return;
      }
      var d = String(a.account);
      var b = String(a.my_urn);
      if (!d) {
        ShowLoginDialog();
        PointOut("没有登录领英精灵，请登录领英精灵账号", 1);
        return false;
      }
      if (!b) {
        JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
        $("#j_ok").on("click", function () {
          BindLinkedin(true);
        });
        return false;
      }
      if (parseInt(a.level) < 1 && parseInt(a.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      var c = $("input[name='friend']:checkbox:checked").length;
      if (c == 0) {
        PointOut("请先选择要挖掘的好友");
      } else {
        JlConfirm("挖掘过的会跳过，确定要挖掘吗？");
        $("#j_ok").click(function () {
          var e = [];
          $("input[name='friend']:checkbox:checked").each(function () {
            e.push(
              $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41)
            );
          });
          e = JSON.stringify(e);
          JlHttp("getDigForFriend", e, "", "");
        });
      }
    }
  );
}
function GetDigForFriendResult(a) {
  if (a && a["result"] == 1) {
    if (a["data"].length == 0) {
      PointOut("选择的好友可能已全部挖掘过");
      return false;
    }
    Friend = a["data"];
    ActionCount = 0;
    ShowStatu("批量挖掘中...");
    ShowOrHideWindow();
    BatchDig();
    chrome.storage.sync.set({ run: true }, function () {});
  } else {
    PointOut("失败，请重启或尝试刷新页面或重启浏览器，VPN不要使用全局模式！");
  }
}
function BatchDig() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已挖掘 " + ActionCount + " 条");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      d_today_num: 0,
      d_limit: 100,
      d_min_speed: 60,
      d_max_speed: 120,
      risk: true,
    },
    function (a) {
      if (!String(a.account)) {
        StopAction();
        setTimeout(function () {
          alert("没有登录领英精灵账号，可能有其它设备登录，被挤出");
        }, 50);
        return false;
      }
      if (parseInt(a.d_today_num) >= parseInt(a.d_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计挖掘 " +
              a.d_today_num +
              " 条，已超设置的每日最多挖掘量，请明天再来挖掘或将每日挖掘量设置大些！"
          );
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", Friend[0]["img"]);
      DigData(Friend[0]["urn"], Friend[0]["public_id"], "batch");
      ActionCount++;
      var b = parseInt(a.d_today_num) + 1;
      $("#j_action_count").text("本次已挖：" + ActionCount + "条");
      if (b > 100) {
        $("#j_today_count").html(
          '<font style="color:#f00;">今日已挖：' + b + "条</font>"
        );
      } else {
        $("#j_today_count").text("今日已挖：" + b + "条");
      }
      Friend.shift();
      var c = GetTime(
        parseInt(a.d_today_num),
        parseInt(a.d_min_speed),
        parseInt(a.d_max_speed),
        a.risk
      );
      Delayed_time = c;
      DelayedTime();
      Timeout = setTimeout(function () {
        chrome.runtime.sendMessage(
          { action: "loop", result: "batchDig", other: "" },
          function (d) {}
        );
      }, c * 1000);
    }
  );
}
function StartSendForGroup() {
  var a = $.trim($(this).parents("div.j-group-box").attr("groupid"));
  var b = $.trim(
    $(this).parents("div.j-group-box").find(".j-groupname").text()
  );
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      level: 0,
      trial: 0,
      run: false,
      s_today_num: 0,
      s_limit: 100,
      s_skip: true,
      s_skip_time: 3,
    },
    function (c) {
      if (c.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量群发！");
        return;
      }
      var g = String(c.account);
      var d = String(c.my_urn);
      if (!g) {
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        return false;
      }
      if (!d) {
        JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
        $("#j_ok").click(function () {
          BindLinkedin(true);
        });
        return false;
      }
      if (parseInt(c.level) < 1 && parseInt(c.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      if (parseInt(c.level) < 1 && parseInt(c.s_today_num) >= TestCount) {
        ShowUpgrade(
          "试用名额用完",
          "您是试用会员，试用会员每天有" +
            TestCount +
            "个群发名额。今日群发名额已用完，升级会员不受此限制。"
        );
        return false;
      }
      var f = parseInt(c.s_limit) - parseInt(c.s_today_num);
      if (f <= 0) {
        PointOut(
          "您今天已累计群发" +
            parseInt(c.s_today_num) +
            "条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！"
        );
        return false;
      }
      if (f > 400) {
        f = 400;
      }
      if (c.s_skip) {
        var e = parseInt(c.s_skip_time);
      } else {
        var e = 0;
      }
      JlConfirm('确定要给 "' + b + '" 分组好友群发消息吗？');
      $("#j_ok").click(function () {
        JlHttp("getSendForGroup", a, e, f);
      });
    }
  );
}
function GetSendForGroupResult(a) {
  if (a && a["result"]) {
    if (a["tidings"].length == 0) {
      PointOut("群发前请设置或选择要群发的消息内容");
      NewTidings();
      return false;
    }
    if (a["data"].length == 0) {
      PointOut("分组中没有可群发的好友，可能在禁发名单或在指定天内有群发过");
      return false;
    }
    Tidings = a["tidings"];
    Friend = a["data"];
    ActionCount = 0;
    ShowStatu("批量群发消息中...");
    ShowOrHideWindow();
    BatchSendForGroup();
    chrome.storage.sync.set({ run: true }, function () {});
  } else {
    PointOut(
      "失败，请重试或尝试刷新页面或重启浏览器，VPN工具不要使用全局模式！"
    );
  }
}
function BatchSendForGroup() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已群发 " + ActionCount + " 条消息");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      s_today_num: 0,
      s_limit: 100,
      s_min_speed: 30,
      s_max_speed: 60,
      risk: true,
      level: 0,
    },
    function (a) {
      if (!String(a.account)) {
        StopAction();
        setTimeout(function () {
          alert("没有登录领英精灵账号，可能有其它设备登录，被挤出");
        }, 50);
        return false;
      }
      if (!String(a.my_urn)) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？"
            )
          ) {
            BindLinkedin(false);
          }
        }, 50);
        return false;
      }
      if (parseInt(a.level) < 1 && parseInt(a.s_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "您是试用会员，试用会员每天有" +
                TestCount +
                "个群发名额。今日群发名额已用完，升级会员可无限制群发"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(a.s_today_num) >= parseInt(a.s_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计群发 " +
              a.s_today_num +
              " 条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！"
          );
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", Friend[0]["img"]);
      var c = RandomTidings(Friend[0]["first_name"], Friend[0]["last_name"]);
      SendMsg(Friend[0]["urn"], c);
      ActionCount++;
      var b = parseInt(a.s_today_num) + 1;
      $("#j_action_count").text("本次已发：" + ActionCount + "条");
      if (b > 100) {
        $("#j_today_count").html(
          '<font style="color:#f00;">今日已发：' + b + "条</font>"
        );
      } else {
        $("#j_today_count").text("今日已发：" + b + "条");
      }
      Friend.shift();
      var d = GetTime(
        parseInt(a.s_today_num),
        parseInt(a.s_min_speed),
        parseInt(a.s_max_speed),
        a.risk
      );
      Delayed_time = d;
      DelayedTime();
      Timeout = setTimeout(function () {
        chrome.runtime.sendMessage(
          { action: "loop", result: "batchSendForGroup", other: "" },
          function (e) {}
        );
      }, d * 1000);
    }
  );
}
function AddProhibitForFriend() {
  var a = [];
  $("input[name='friend']:checkbox:checked").each(function () {
    a.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
  });
  if (a.length <= 0) {
    PointOut("请选择要添加到禁发名单的好友");
  } else {
    JlConfirm(
      "确定要将选择的 " + a.length + " 位好友添加到禁发名单吗？",
      "确定"
    );
    $("#j_ok").on("click", function () {
      a = JSON.stringify(a);
      JlHttp("updateProhibit", a, "f_", 1);
    });
  }
}
function StartSendForFriend() {
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      run: false,
      level: 0,
      trial: 0,
      s_today_num: 0,
      s_skip: true,
      s_skip_time: 3,
      s_auto: true,
    },
    function (a) {
      if (a.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量群发消息！");
        return;
      }
      var e = String(a.account);
      var b = String(a.my_urn);
      if (!e) {
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        return false;
      }
      if (!b) {
        JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
        $("#j_ok").click(function () {
          BindLinkedin(true);
        });
        return false;
      }
      if (parseInt(a.level) < 1 && parseInt(a.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      var d = $("input[name='friend']:checkbox:checked").length;
      if (d == 0) {
        PointOut("请先选择要群发的好友");
      } else {
        if (a.s_skip) {
          var c = 1;
        } else {
          var c = 0;
        }
        if (a.s_auto) {
          JlConfirm("确定要从此页开始群发消息吗？会自动翻页！");
        } else {
          JlConfirm("确定要给选择的 " + d + " 位好友群发消息吗？");
        }
        $("#j_ok").click(function () {
          var f = [];
          $("input[name='friend']:checkbox:checked").each(function () {
            f.push(
              $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41)
            );
          });
          f = JSON.stringify(f);
          JlHttp("getSendForFriend", f, c, parseInt(a.s_skip_time));
        });
      }
    }
  );
}
function GetSendForFriendResult(a) {
  if (a && a["result"] == 1) {
    if (a["tidings"].length == 0) {
      PointOut("群发前请设置或选择要群发的消息内容");
      NewTidings();
      return false;
    }
    if (a["data"].length == 0) {
      PointOut("选择的好友可能在禁发名单中或在指定天内有发送过");
      return false;
    }
    Tidings = a["tidings"];
    Friend = a["data"];
    ActionCount = 0;
    ShowStatu("批量群发消息中...");
    ShowOrHideWindow();
    BatchSendForFriend();
    chrome.storage.sync.set({ run: true }, function () {});
  } else {
    PointOut("失败，请检查网络，翻墙工具不要使用全局模式！");
  }
}
function BatchSendForFriend() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已群发 " + ActionCount + " 条消息");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      s_today_num: 0,
      s_limit: 100,
      s_min_speed: 30,
      s_max_speed: 60,
      risk: true,
      level: 0,
      s_auto: true,
    },
    function (b) {
      if (!String(b.account)) {
        StopAction();
        setTimeout(function () {
          alert("没有登录领英精灵账号，可能有其它设备登录，被挤出");
        }, 50);
        return false;
      }
      if (!String(b.my_urn)) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？"
            )
          ) {
            BindLinkedin(false);
          }
        }, 50);
        return false;
      }
      if (parseInt(b.level) < 1 && parseInt(b.s_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "您是试用会员，试用会员每天有" +
                TestCount +
                "个群发名额。今日群发名额已用完，升级会员可无限制群发"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(b.s_today_num) >= parseInt(b.s_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计群发 " +
              b.s_today_num +
              " 条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！"
          );
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", Friend[0]["img"]);
      var d = RandomTidings(Friend[0]["first_name"], Friend[0]["last_name"]);
      SendMsg(Friend[0]["urn"], d);
      ActionCount++;
      var c = parseInt(b.s_today_num) + 1;
      $("#j_action_count").text("本次已发：" + ActionCount + "条");
      if (c > 100) {
        $("#j_today_count").html(
          '<font style="color:#f00;">今日已发：' + c + "条</font>"
        );
      } else {
        $("#j_today_count").text("今日已发：" + c + "条");
      }
      Friend.shift();
      if (Friend.length == 0 && b.s_auto) {
        var a = parseInt($("#j_friend_paging .j-paging:last").text());
        var e = parseInt($("#j_friend_paging .j-curpage").text()) + 1;
        if (e <= a) {
          GetFriend(e, true);
        }
      }
      var f = GetTime(
        parseInt(b.s_today_num),
        parseInt(b.s_min_speed),
        parseInt(b.s_max_speed),
        b.risk
      );
      Delayed_time = f;
      DelayedTime();
      Timeout = setTimeout(function () {
        chrome.runtime.sendMessage(
          { action: "loop", result: "batchSendForFriend", other: "" },
          function (g) {}
        );
      }, f * 1000);
    }
  );
}
function SendMsg(d, e) {
  var a = {
    conversationCreate: {
      eventCreate: {
        value: {
          "com.linkedin.voyager.messaging.create.MessageCreate": {
            attachments: [],
            attributedBody: { attributes: [], text: e },
          },
        },
      },
      recipients: [d],
      subtype: "MEMBER_TO_MEMBER",
    },
    keyVersion: "LEGACY_INBOX",
  };
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    StopAction();
    alert("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var c = "/voyager/api/messaging/conversations?action=create";
  $.ajax({
    url: c,
    type: "post",
    data: JSON.stringify(a),
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": b,
      "content-type": "application/json; charset=UTF-8",
      "x-restli-protocol-version": "2.0.0",
    },
    success: function (f) {
      chrome.storage.sync.get({ s_today_num: 0 }, function (g) {
        var h = parseInt(g.s_today_num) + 1;
        chrome.storage.sync.set({ s_today_num: [h] }, function () {});
        JlHttp("saveSendRecord", d, "", "");
      });
    },
    error: function (f, h, g) {
      JlHttp("saveSendRecord", d, "", "");
    },
  });
}
function ShowTidings() {
  GetTidings(1);
}
function GetTidings() {
  JlHttp("getTidings", "", "", "");
}
function GetTidingsResult(c) {
  console.log('c value in GetTidingsResult is '+c);
  if (c && c["result"] == 1) {
    if (c["data"].length > 0) {
      $("#j_tidings_box").empty();
      $("input[name='selectAllTidings']").prop("checked", false);
      PointOut("获取成功");
      for (var a = 0; a < c["data"].length; a++) {
        AppendTidings(c["data"][a]);
      }
    } else {
      PointOut("没有个性邀请消息");
      $("#j_tidings_box").empty();
      var b =
        '<div class="j-explain-box">' +
        "<p>没有群发消息内容，点击“新增”按钮可新增群发消息内容。</p>" +
        '<a href="http://linkedinjl.com/help?o=sendmsg" target="_black">查看详细教程</a>' +
        "</div>";
      $("#j_tidings_box").append(b);
    }
  } else {
    PointOut("获取失败，请尝试刷新页面或重启浏览器");
  }
}
function AppendTidings(b) {
  var a =
    "<div j-w>" +
    '<table class="j-tidings-table">' +
    "<tbody>" +
    '<tr class="j-tidings" tid="' +
    b["tidings_id"] +
    '">' +
    '<td title="标题"><h4>' +
    b["tidings_title"] +
    "</h4></td>" +
    '<td><div class="j-tidings-cont" title="双击修改内容">' +
    b["tidings"] +
    "</div></td>";
  if (parseInt(b["is_select"]) == 1) {
    a +=
      '<td><div class="j-tidings-select"><input type="checkbox" name="tidings" checked=true' +
      "></div></td>";
  } else {
    a +=
      '<td><div class="j-tidings-select"><input type="checkbox" name="tidings"></div></td>';
  }
  "<tr>" + "</tbody>" + "</table>" + "</div>";
  $("#j_tidings_box").append(a);
}
function SelectAllTidings() {
  if ($(this).prop("checked")) {
    var a = $("input[name='tidings']").length;
    if (a == 0) {
      PointOut("没有可选，请先新增群发内容", 1);
    } else {
      JlHttp("selectAllTidings", 1, "", a);
    }
  } else {
    JlHttp("selectAllTidings", 0, "", a);
  }
}
function SelectAllTidingsResult(a) {
  if (a && a["result"] == 1) {
    if (a["action"] == 1) {
      $("input[name='tidings']").prop("checked", true);
      PointOut("选择了 " + a["count"] + " 条");
    } else {
      $("input[name='tidings']").prop("checked", false);
      PointOut("消息内容已全部取消，群发前要先选择群发的消息内容");
    }
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function NewTidings() {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>新增群发消息内容</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<input id="j_tidingsTitle" type="text" style="width:94%; margin-bottom:6px;" maxlength=16 placeholder="标题，最长16个字符（标题在群发时不会发送，仅用来方便你管理）">' +
    '<textarea id="j_tidingsCont" class="j-msg-cont j-w96" maxlength=10000 placeholder="1.群发内容请不要违反领英规则，由于违反领英规则造成的后果由自己承担。&#13;&#10;2.可根据对方姓名智能插入姓氏或名字，把光标定位在需要加入姓氏或名字的位置，点击左下角的“插入姓氏”或“插入名字”按钮即可。"></textarea>' +
    "</div>" +
    '<div class="j-prompt-ctrl j-nowrap">' +
    "<div>" +
    '<button id="j_tidings_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>' +
    '<button id="j_tidings_firstname" style="margin-left:6px;" class="j-bg-btn j-layout-btn">插入名字</button>' +
    "</div>" +
    "<div>" +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var b = $.trim($("#j_tidingsCont").val());
    if (!b) {
      PointOut("发送内容不能为空", 2);
      return false;
    }
    var c = String(new Date().getTime());
    var d = $.trim($("#j_tidingsTitle").val());
    JlHttp("saveTidings", c, d, b);
  });
}
function InsertTidingsFirstName() {
  var a = document.getElementById("j_tidingsCont");
  InsertAfterText(a, "[FirstName]");
}
function InsertTidingsLastName() {
  var a = document.getElementById("j_tidingsCont");
  InsertAfterText(a, "[LastName]");
}
function SaveTidingsResult(a) {
  if (a && a["result"] == 1) {
    PointOut("新增成功");
    $(".j-dialog").remove();
    GetTidings();
  } else {
    PointOut("新增失败，请尝试刷新页面或重启浏览器");
  }
}
function EditTidings() {
  var b = $(this).text();
  var c = $(this).parents("tr").attr("tid");
  var d = $(this).parents("tr").find("h4").text();
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>修改群发消息内容</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<input id="j_tidingsTitle" type="text" maxlength=16 style="width:94%; margin-bottom:6px;" placeholder="群发消息内容标题，最长16个字符（标题在群发时不会发送，仅用来方便你管理）" value="' +
    d +
    '">' +
    '<textarea id="j_tidingsCont" class="j-msg-cont" maxlength=10000 placeholder="1.群发内容请不要违反领英规则，由于违反领英规则造成的后果由自己承担。&#13;&#10;2.可根据对方姓名智能插入姓氏或名字，把光标定位在需要加入姓氏或名字的位置，点击左下角的“插入姓氏”或“插入名字”按钮即可。">' +
    b +
    "</textarea>" +
    "</div>" +
    '<div class="j-prompt-ctrl j-nowrap">' +
    "<div>" +
    '<button id="j_tidings_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>' +
    '<button id="j_tidings_firstname" style="margin-left:6px;" class="j-bg-btn j-layout-btn">插入名字</button>' +
    "</div>" +
    "<div>" +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var e = $.trim($("#j_tidingsCont").val());
    var f = $.trim($("#j_tidingsTitle").val());
    if (!e) {
      PointOut("发送内容不能为空", 2);
      return false;
    }
    if (e == b && f == d) {
      $(".j-dialog").remove();
      PointOut("更新成功");
      return false;
    }
    JlHttp("saveTidings", c, f, e);
  });
}
function DeleteTidings() {
  var a = $("input[name='tidings']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请选择要删除的消息内容");
    return false;
  } else {
    JlConfirm("确定要删除选择的 " + a + " 条消息内容吗？", "确定");
  }
  $("#j_ok").on("click", function () {
    JlHttp("deleteTidings", "", "", "");
  });
}
function DeleteTidingsResult(a) {
  if (a && a["result"] == 1) {
    PointOut("删除成功");
    GetTidings();
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function SelectTidings() {
  if ($(this).prop("checked")) {
    var a = $.trim($(this).parents(".j-tidings").attr("tid"));
    JlHttp("selectTidings", a, "", 1);
  } else {
    var a = $.trim($(this).parents(".j-tidings").attr("tid"));
    JlHttp("selectTidings", a, "", 0);
  }
}
function SelectTidingsResult(a) {
  if (a && a["result"] != 1) {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function GetGroup() {
  JlHttp("getGroup", "", "show", "");
}
function GetGroupResult(c) {
  if (c && c["result"] == 1) {
    switch (c["tag"]) {
      case "show":
        $("#j_group_box").empty();
        if (c["data"].length > 0) {
          for (var a = 0; a < c["data"].length; a++) {
            AppendGroup(c["data"][a]);
          }
          PointOut("完成");
        } else {
          var b =
            '<div class="j-explain-box">' +
            "<p>没有分组，点击“新增”按钮可以创建分组。</p>" +
            '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_group_box").append(b);
          PointOut("没有分组");
        }
        break;
      case "move":
        ShowMoveGroupDialog(c["data"], c["groupId"]);
        break;
      case "friend":
        if (c["data"].length > 0) {
          ShowGroupingDialog(c["data"], c["groupId"]);
        } else {
          NewGroup();
          PointOut("分组前请先新增分组");
        }
        break;
      case "sort":
        SortGroup(c["data"]);
        break;
    }
  }
}
function AppendGroup(b) {
  var a =
    "<div>" +
    '<div class="j-group-box j-group-box-not-active j-nowrap" groupid=' +
    b["group_id"] +
    ">" +
    '<div class="j-group j-nowrap-left">' +
    "<div>" +
    '<div class="j-svg-group">' +
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:12px;height:12px;">' +
    '<polyline stroke="#666" points="0 4, 6 10, 12 4" style="fill:none;stroke-width:1" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<span class="j-groupname">' +
    b["group_name"] +
    "</span>" +
    '<span id="j_gnum_' +
    b["group_id"] +
    '" class="j-group-num"></span>' +
    "</div>" +
    "</div>" +
    '<div class="j-group-edit">' +
    '<div style="display: flex; justify-content:flex-end;">' +
    '<div class="j-edit j-svg-ico24" title="修改分组">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 18 l12 0" class="j-svg" style="stroke:#ccc;" />' +
    '<path d="M6 17 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />' +
    '<path d="M15 7 l1 -1 l1 1 l-1 1 z" class="j-svg" />' +
    "</svg>" +
    "</div>" +
    '<div class="j-delete j-svg-ico24" title="删除分组">' +
    '<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="6" r="1" class="j-svg-bg"/>' +
    '<path d="M6 8 l12 0" class="j-svg"/>' +
    '<path d="M8 10 l8 0 l-1 8 l-6 0 z" class="j-svg"/>' +
    '<path d="M12 10 l0 8" class="j-svg"/>' +
    "</svg>" +
    "</div>" +
    '<div class="j-sort j-svg-ico24" title="分组排序">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M12 5 l6 5 l-12 0 z" class="j-svg-bg" />' +
    '<path d="M4 12 l16 0" class="j-svg" />' +
    '<path d="M12 19 l6 -5 l-12 0 z" class="j-svg-bg" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="j-group-tool">' +
    '<div style="display: flex; justify-content:flex-end;">' +
    '<div class="j-move j-svg-ico24" title="移到到其它分组">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 7 l8 0 l0 -3 l4 4.5 l-4 4.5 l0 -3 l-8 0 z" class="j-svg-bg"/>' +
    '<path d="M6 16 l4 -4.5 l0 3 l8 0 l0 3 l-8 0 l0 3 z" class="j-svg-bg"/>' +
    "</svg>" +
    "</svg>" +
    "</div>" +
    '<div class="j-export j-svg-ico24" title="导出分组中已挖掘的好友资料">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 14 l0 4 l12 0 l0 -4" class="j-svg" />' +
    '<path d="M10 16 l0 -6 l4 0 l0 6 z" class="j-svg-bg" />' +
    '<path d="M7 11 l5 -6 l5 6 z" class="j-svg-bg"/>' +
    "</svg>" +
    "</div>" +
    '<div class="j-dig j-svg-ico24" title="批量挖掘分组中的好友">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="12" r="4" class="j-svg" />' +
    '<path d="M2 12 Q12 2 22 12" class="j-svg" />' +
    '<path d="M2 12 Q12 22 22 12" class="j-svg" />' +
    "</svg>" +
    "</div>" +
    '<div class="j-send j-svg-ico24" title="批量给分组好友群发消息">' +
    '<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M9 19 L10 16 A8 5 0 1 1 15 16 Z" class="j-svg"/>' +
    '<circle cx="8" cy="12" r="1" class="j-svg-bg"/>' +
    '<circle cx="12" cy="12" r="1" class="j-svg-bg"/>' +
    '<circle cx="16" cy="12" r="1" class="j-svg-bg"/>' +
    "</svg>" +
    "</div>" +
    '<div class="j-prohibit j-svg-ico24" title="批量添加到禁发名单">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="12" r="6" class="j-svg" />' +
    '<path d="M7 7 l10 10" class="j-svg" />' +
    "</svg>" +
    "</div>" +
    '<div style="margin-top:4px; margin-left:12px; text-align:center;"><input class="j-gall" type="checkbox" title="全选/全不选"/></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="j-group-friend" id="j_group_' +
    b["group_id"] +
    '"></div>' +
    "</div>";
  $("#j_group_box").append(a);
}
function ShowGroupFriend() {
  var a = $(this);
  chrome.storage.sync.get({ level: 0, trial: 0 }, function (b) {
    if (parseInt(b.level) < 1 && parseInt(b.trial) < 1) {
      ShowUpgrade(
        "试用期已过",
        "试用会员可试用一周，您的试用期已过，请升级会员使用",
        "立即升级"
      );
      return false;
    }
    $(".j-group-box").addClass("j-group-box-not-active");
    $(".j-group-box").removeClass("j-group-box-active");
    $(".j-group-tool").css("display", "none");
    $(".j-group-edit").css("display", "block");
    $(".j-group-friend").slideUp(200);
    $(".j-svg-group").removeClass("j-svg-show");
    if (a.parent().next().is(":visible") == false) {
      a.parent().addClass("j-group-box-active");
      a.parent().removeClass("j-group-box-not-active");
      a.parent().find(".j-group-tool").css("display", "block");
      a.parent().find(".j-group-edit").css("display", "none");
      a.find(".j-svg-group").addClass("j-svg-show");
      a.parent().next().slideDown(200);
      if (a.parent().next().children().length == 0) {
        var e = $.trim(a.parent(".j-group-box").attr("groupid"));
        var d = $("#j_group_firstname").val();
        var c = $("#j_group_lastname").val();
        var f = { firstName: d, lastName: c, gid: e, start: 0, count: 10 };
        f = JSON.stringify(f);
        JlHttp("getGroupFriend", f, "", "");
      }
    }
  });
}
function GetGroupFriendResult(b) {
  if (b && b["result"] == 1) {
    $("#j_gnum_" + b["groupId"]).text("(" + b["total"] + ")");
    if (b["total"] == 0) {
      $("#j_group_" + b["groupId"]).empty();
      $("#j_group_" + b["groupId"]).append(
        '<div class="j-friend-not"><p>该分组中没有匹配的好友</p></div>'
      );
      return false;
    }
    if (b["data"]) {
      for (var a = 0; a < b["data"].length; a++) {
        AppendGroupFriend(b["groupId"], b["data"][a]);
      }
    }
    if (b["pos"] >= b["total"]) {
      $("#j_group_" + b["groupId"]).append(
        '<div class="j-friend-not"><p>到底了，没有更多</p></div>'
      );
    } else {
      $("#j_group_" + b["groupId"]).append(
        '<div class="j-load-more j-load-friend" groupid=' +
          b["groupId"] +
          " start=" +
          b["pos"] +
          ' title="显示更多好友">显示更多</div>'
      );
    }
  } else {
    PointOut("失败，请检查网络，翻墙工具不要使用全局模式！");
  }
}
function AppendGroupFriend(c, f) {
  if (!f["img"]) {
    f["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  if (parseInt(f["dig_state"]) == 1) {
    var d = "已挖掘，点击查看详情";
  } else {
    f["dig_state"] = 0;
    var d = "未挖掘，点击挖掘";
  }
  if (parseInt(f["is_prohibit"]) == 1) {
    var b = "已在禁发名单，点击移出";
  } else {
    f["is_prohibit"] = 0;
    var b = "未在禁发名单，点击加入";
  }
  if (f["send_time"]) {
    f["send_time"] =
      '<font style="color:#f00;">群发:' + f["send_time"] + "</font>";
  } else {
    f["send_time"] = "未群发过";
  }
  var a = GetName(f["first_name"], f["last_name"]);
  var e =
    '<div class="j-friend j-nowrap" id=g_' +
    f["urn"] +
    ' pid="' +
    f["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">' +
    '<div><a href="/in/' +
    f["public_id"] +
    ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
    f["img"] +
    '"></a></div>' +
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline">' +
    f["position"] +
    "</p>" +
    '<div class="j-nowrap-left">' +
    '<div class="j-edit j-svg-ico18" title="修改备注">' +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M3 15 l12 0" class="j-svg"/>' +
    '<path d="M3 14 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />' +
    '<path d="M12 4 l1 -1 l1 1 l-1 1 z" class="j-svg" />' +
    "</svg>" +
    "</div>" +
    '<div><p class="j-oneline j-remark" title="' +
    f["remark"] +
    '">' +
    f["remark"] +
    "</p></div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="j-tool-box">' +
    '<div title="最后群发日期">' +
    f["send_time"] +
    "</div>" +
    '<div class="j-nowrap-left" style="margin-top:18px;">' +
    '<div class="j-dig j-svg-ico18" state=' +
    f["dig_state"] +
    " title=" +
    d +
    ">" +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="9" cy="9" r="3" class="j-svg-' +
    f["dig_state"] +
    '" />' +
    '<path d="M2 9 Q9 2 16 9" class="j-svg-' +
    f["dig_state"] +
    '" />' +
    '<path d="M2 9 Q9 16 16 9" class="j-svg-' +
    f["dig_state"] +
    '" />' +
    "</svg>" +
    "</div>" +
    '<div class="j-prohibit j-svg-ico18" state=' +
    f["is_prohibit"] +
    " title=" +
    b +
    ">" +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="9" cy="9" r="5" class="j-svg-' +
    f["is_prohibit"] +
    '"/>' +
    '<path d="M5 5 l8 8" class="j-svg-' +
    f["is_prohibit"] +
    '"/>' +
    "</svg>" +
    "</div>" +
    '<div class="j-delete j-svg-ico18" title="将该好友移出分组">' +
    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="9" cy="3" r="1" class="j-svg-bg"/>' +
    '<path d="M3 5 l12 0" class="j-svg"/>' +
    '<path d="M5 7 l8 0 l-1 8 l-6 0 z" class="j-svg"/>' +
    '<path d="M9 7 l0 8" class="j-svg"/>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name=g_' +
    c +
    ">" +
    "</div>" +
    "</div>";
  $("#j_group_" + c).append(e);
}
function LoadMoreGroupFriend() {
  var b = $(this).attr("groupid");
  var e = parseInt($(this).attr("start"));
  $(this).remove();
  var c = $("#j_group_firstname").val();
  var a = $("#j_group_lastname").val();
  var d = { firstName: c, lastName: a, gid: b, start: e, count: 50 };
  d = JSON.stringify(d);
  JlHttp("getGroupFriend", d, "", "");
}
function NewGroup() {
  chrome.storage.sync.get({ account: "", my_urn: "" }, function (a) {
    var d = String(a.account);
    var b = String(a.my_urn);
    if (!d) {
      ShowLoginDialog();
      PointOut("没有登录领英精灵，请登录领英精灵账号", 1);
      return false;
    }
    if (!b) {
      JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
      $("#j_ok").on("click", function () {
        BindLinkedin(true);
      });
      return false;
    }
    $(".j-dialog").remove();
    var c =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:40%;">' +
      '<div class="j-prompt-title j-bg-0 j-nowrap">' +
      '<div class="j-nowrap-left">' +
      "<div>" +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
      '<line x1="6" y1="12" x2="18" y2="12" />' +
      '<line x1="12" y1="6" x2="12" y2="18" />' +
      "</svg>" +
      "</div>" +
      "<div>" +
      "<p>新增分组</p>" +
      "</div>" +
      "</div>" +
      '<div title="关闭" class="j-close-dialog j-sha">' +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
      '<line x1="6" y1="6" x2="18" y2="18" />' +
      '<line x1="18" y1="6" x2="6" y2="18" />' +
      "</svg>" +
      "</div>" +
      "</div>" +
      '<div class="j-prompt-cont">' +
      '<input id="j_group_name" style="width:90%;" type="text" placeholder="请输入分组名（最多16个字符）" maxlength=16 autofocus="autofocus" />' +
      "</div>" +
      '<div class="j-prompt-ctrl" style="width:90%;">' +
      '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(c);
    $(".j-dialog").fadeIn(200);
    $("#j_ok").on("click", function () {
      var f = $.trim($("#j_group_name").val());
      if (!f) {
        PointOut("分组名不能为空");
        $("#j_group_name").focus();
        return;
      }
      var e = String(new Date().getTime());
      JlHttp("saveGroup", e, "", f);
    });
  });
}
function EditGroup() {
  var c = $.trim($(this).parents(".j-group-box").find("span:first").text());
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  $(".j-dialog").remove();
  var b =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:40%;">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 18 l12 0" class="j-svg" style="stroke:#fff;" />' +
    '<path d="M6 17 l2 -4 l5 -5 l2 2 l-5 5 z" calss="j-svg" style="stroke:none; fill:#fff;" />' +
    '<path d="M15 7 l1 -1 l1 1 l-1 1 z" class="j-svg" style="stroke:none; fill:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>修改分组名</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<input id="j_group_name" style="width:90%;" type="text" placeholder="请输入分组名（最多16个字符）" maxlength=16 autofocus="autofocus" value="' +
    c +
    '" />' +
    "</div>" +
    '<div class="j-prompt-ctrl" style="width:90%;">' +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(b);
  $(".j-dialog").fadeIn(200);
  $("#j_ok").on("click", function () {
    var d = $.trim($("#j_group_name").val());
    if (!d) {
      PointOut("分组名不能为空");
      $("#j_group_name").focus();
      return false;
    }
    if (d == c) {
      PointOut("重命名成功");
      $(".j-dialog").remove();
      return false;
    }
    JlHttp("saveGroup", a, "", d);
  });
}
function SaveGroupResult(a) {
  if (a && a["result"] == 1) {
    PointOut("新增成功");
    $(".j-dialog").remove();
    GetGroup();
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function DeleteGroup() {
  var b = $.trim($(this).parents(".j-group-box").find("span:first").text());
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  JlConfirm('确定要删除 "' + b + '" 分组吗?', "确定");
  $("#j_ok").on("click", function () {
    JlHttp("deleteGroup", a, "", b);
  });
}
function DeleteGroupResult(a) {
  if (a && a["result"] == 1) {
    PointOut("分组删除成功");
    GetGroup();
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function StartSortGroup() {
  JlHttp("getGroup", "", "sort", "");
}
function SortGroup(c) {
  $(".j-dialog").remove();
  var b =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:50%;">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 18 l12 0" class="j-svg" style="stroke:#fff;" />' +
    '<path d="M6 17 l2 -4 l5 -5 l2 2 l-5 5 z" calss="j-svg" style="stroke:#fff;" />' +
    '<path d="M15 7 l1 -1 l1 1 l-1 1 z" class="j-svg" style="stroke:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>修改分组名</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<div class="j-sort-group-box">';
  for (var a = 0; a < c.length; a++) {
    b +=
      '<div class="j-sort-group j-nowrap" groupid=' +
      c[a]["group_id"] +
      ">" +
      "<div>" +
      "<p>" +
      c[a]["group_name"] +
      "</p>" +
      "</div>" +
      '<div class="j-nowrap">' +
      '<div class="j-svg-ico24 j-up" title="上移">' +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
      '<path d="M4 16 l8 -10 l8 10 z" class="j-svg-bg" />' +
      "</svg>" +
      "</div>" +
      '<div class="j-svg-ico24 j-down" title="下移">' +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
      '<path d="M4 8 l8 10 l8 -10 z" class="j-svg-bg" />' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  b +=
    "</div>" +
    "</div>" +
    '<div class="j-prompt-ctrl">' +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(b);
  $(".j-dialog").fadeIn(0);
  $("#j_ok").on("click", function () {
    var e = [];
    var d = $(".j-sort-group").length;
    $(".j-sort-group").each(function () {
      var f = {};
      f["groupId"] = $.trim($(this).attr("groupid"));
      f["sort"] = d;
      d--;
      e.push(f);
    });
    e = JSON.stringify(e);
    JlHttp("sortGroup", e, "", "");
  });
}
function SortGroupResult(a) {
  if (a && a["result"] == 1) {
    PointOut("排序成功");
    $(".j-dialog").remove();
    GetGroup();
  } else {
    PointOut("排序失败，请尝试刷新页面或重启浏览器");
  }
}
function SortUp() {
  var a = $(this).parents(".j-sort-group");
  if (a.index() != 0) {
    a.prev().before(a);
    PointOut("上移", 1);
  } else {
    PointOut("第一个，无法上移", 1);
  }
}
function SortDown() {
  var a = $(this).parents(".j-sort-group");
  var b = $(".j-sort-group").length;
  if (a.index() != b - 1) {
    a.next().after(a);
    PointOut("下移", 1);
  } else {
    PointOut("最后一个，无法下移", 1);
  }
}
function SelectAllGroupFriend() {
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  if ($(this).prop("checked")) {
    $("input[name='g_" + a + "']").prop("checked", true);
    var b = $("input[name='g_" + a + "']:checkbox:checked").length;
    if (b == 0) {
      PointOut("该分组中没有可选好友", 1);
    } else {
      PointOut("选择了 " + b + " 位好友", 1);
    }
  } else {
    $("input[name='g_" + a + "']").prop("checked", false);
  }
}
function AddProhibitForGroup() {
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  var b = [];
  $("input[name='g_" + a + "']:checkbox:checked").each(function () {
    b.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
  });
  if (b.length <= 0) {
    PointOut("请选择要添加到禁发名单的好友");
  } else {
    JlConfirm(
      "确定要将选择的 " + b.length + " 位好友添加到禁发名单吗？",
      "确定"
    );
    $("#j_ok").on("click", function () {
      b = JSON.stringify(b);
      JlHttp("updateProhibit", b, "g_", 1);
    });
  }
}
function MoveGroup() {
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  var b = [];
  if ($("input[name='g_" + a + "']:checkbox:checked").length > 0) {
    JlHttp("getGroup", a, "move", "");
  } else {
    PointOut("请选择要移动的好友");
  }
}
function ShowMoveGroupDialog(d, b) {
  var c =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-box-sha j-bg-w" style="width:40%;">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 7 l8 0 l0 -3 l4 4.5 l-4 4.5 l0 -3 l-8 0 z" class="j-svg" style="stroke:none; fill:#fff;"/>' +
    '<path d="M6 16 l4 -4.5 l0 3 l8 0 l0 3 l-8 0 l0 3 z" class="j-svg" style="stroke:none; fill:#fff;"/>' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>移动分组</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '<div><select id="j_select_group" style="padding:6px; width:90%;">';
  for (var a = 0; a < d.length; a++) {
    if (d[a]["group_id"] == b) {
      c +=
        '<option selected="selected" value=' +
        d[a]["group_id"] +
        ">" +
        d[a]["group_name"] +
        "</option>";
    } else {
      c +=
        "<option value=" +
        d[a]["group_id"] +
        ">" +
        d[a]["group_name"] +
        "</option>";
    }
  }
  c += "<option value=0>移出分组</option>";
  c +=
    "</select></div>" +
    "</div>" +
    '<div class="j-prompt-ctrl" style="width:90%;">' +
    '<button id="j_move_group" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(c);
  $(".j-dialog").fadeIn(200);
  $("#j_move_group").on("click", function () {
    var f = $.trim($("#j_select_group").val());
    if (!f) {
      PointOut("请选择分组");
      return false;
    }
    if (f == b) {
      PointOut("选择的分组与原分组相同");
      return false;
    }
    var e = [];
    $("input[name='g_" + b + "']:checkbox:checked").each(function () {
      e.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
    });
    e = JSON.stringify(e);
    JlHttp("grouping", e, "group", f);
  });
}
function ExportGroupFriend() {
  var b = $.trim($(this).parents(".j-group-box").find(".j-groupname").text());
  var a = $.trim($(this).parents(".j-group-box").attr("groupid"));
  chrome.storage.sync.get({ account: "", my_urn: "", level: 0 }, function (c) {
    if (parseInt(c.level) < 2) {
      ShowUpgrade(
        "没有权限",
        "非钻石会员不支持导出功能，升级钻石会员可一键导出。"
      );
      return false;
    }
    var e = String(c.account);
    var d = String(c.my_urn);
    if (!e) {
      ShowLoginDialog();
      PointOut("请先登录领英精灵账号");
      return false;
    }
    if (!d) {
      JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
      $("#j_ok").click(function () {
        BindLinkedin(true);
      });
      return false;
    }
    JlConfirm('确定要导出 "' + b + '" 分组中已挖掘的好友资料吗？', "确定");
    $("#j_ok").on("click", function () {
      window.open(
        "http://linkedinjl.com/showexport/type/group/account/" +
          e +
          "/my_urn/" +
          d +
          "/gid/" +
          a
      );
    });
  });
}
function StartDigForGroup() {
  var a = $.trim($(this).parents("div.j-group-box").attr("groupid"));
  var b = $.trim(
    $(this).parents("div.j-group-box").find(".j-groupname").text()
  );
  chrome.storage.sync.get(
    { account: "", run: false, d_today_num: 0, d_limit: 100 },
    function (c) {
      if (c.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量挖掘！");
        return;
      }
      if (!String(c.account)) {
        ShowLoginDialog();
        return false;
      }
      var d = parseInt(c.d_limit) - parseInt(c.d_today_num);
      if (d > 300) {
        d = 300;
      }
      if (d <= 0) {
        PointOut(
          "您今天已累计挖掘" +
            parseInt(c.d_today_num) +
            "条，已超设置的每日最多挖掘量，请明天再来挖掘或将每日挖掘量设置大些！"
        );
        return false;
      }
      JlConfirm("确定要挖掘 “" + b + '" 好友资料吗？');
      $("#j_ok").click(function () {
        JlHttp("getDigForGroup", a, "", d);
      });
    }
  );
}
function GetDigForGroupResult(a) {
  if (a && a["result"] == 1) {
    if (a["data"].length == 0) {
      PointOut("分组中的好友可能已全部挖掘过");
      return false;
    }
    Friend = a["data"];
    ActionCount = 0;
    ShowStatu("批量挖掘中...");
    ShowOrHideWindow();
    BatchDig();
    chrome.storage.sync.set({ run: true }, function () {});
  } else {
    PointOut("失败，请检查网络，翻墙工具不要使用全局模式！");
  }
}
function EditRemark() {
  $(".j-dialog").remove();
  var d = $.trim($(this).parents("div.j-friend").find(".j-remark").text());
  var b = $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
  var a = $.trim($(this).parents("div.j-friend").attr("id")).slice(0, 2);
  var c =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-box-sha j-bg-w" style="width:50%;">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<path d="M6 18 l12 0" class="j-svg" style="stroke:#fff;" />' +
    '<path d="M6 17 l2 -4 l5 -5 l2 2 l-5 5 z" calss="j-svg" style="stroke:none; fill:#fff;" />' +
    '<path d="M15 7 l1 -1 l1 1 l-1 1 z" class="j-svg" style="stroke:none; fill:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>修改备注</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont" style="width:96%;">' +
    '<textarea maxlength=200 id="j_remark" placeholder="请输入备注（最多200个字符）" style="height:100px;">' +
    d +
    "</textarea>" +
    "</div>" +
    '<div class="j-prompt-ctrl" style="width:92%;">' +
    '<button id="j_edit_remark" class="j-bg-btn j-layout-btn">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(c);
  $(".j-dialog").fadeIn(200);
  $("#j_remark").focus();
  $("#j_edit_remark").click(function () {
    var e = $.trim($("#j_remark").val());
    if (e == d) {
      PointOut("修改成功");
      $(".j-dialog").remove();
      return false;
    } else {
      JlHttp("editRemark", b, a, e);
    }
  });
}
function EditRemarkResult(a) {
  if (a && a["result"] == 1) {
    PointOut("修改成功", 1);
    $(".j-dialog").remove();
    $("#" + a["tag"] + a["urn"])
      .find(".j-remark")
      .text(a["remark"]);
    $("#" + a["tag"] + a["urn"])
      .find(".j-remark")
      .attr("title", a["remark"]);
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function DigA() {
  var b = $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
  var a = $.trim($(this).parents("div.j-friend").attr("id")).slice(0, 2);
  var c = $(this).attr("state");
  if (c == "1") {
    JlHttp("getFriendProfile", b, "", "");
  } else {
    PointOut("挖掘中...");
    var d = $.trim($(this).parents("div.j-friend").attr("pid"));
    DigData(b, d, a);
  }
}
function ShowFriendProfile() {
  var a = $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
  JlHttp("getFriendProfile", a, "", "");
}
function GetFriendProfileResult(a) {
  if (a && a["result"] == 1) {
    if (a["data"]) {
      ShowProfile(a["data"][0]);
    } else {
      PointOut("获取失败，请尝试刷新页面或重启浏览器");
    }
  } else {
    PointOut("失败，请检查网络，翻墙工具不要使用全局模式！");
  }
}
function UpdateProhibit() {
  var c = [];
  var b = $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
  var a = $.trim($(this).parents("div.j-friend").attr("id")).slice(0, 2);
  var d = parseInt($(this).attr("state"));
  if (d == 0) {
    var d = 1;
  } else {
    var d = 0;
  }
  c.push(b);
  c = JSON.stringify(c);
  JlHttp("updateProhibit", c, a, d);
}
function RemoveGroupFriend() {
  var a = [];
  a.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
  a = JSON.stringify(a);
  JlHttp("grouping", a, "group", "0");
}
function GroupingResult(b) {
  if (b && b["result"] == 1) {
    switch (b["tag"]) {
      case "group":
        PointOut("成功");
        $(".j-dialog").remove();
        if (b["data"]) {
          for (var a = 0; a < b["data"].length; a++) {
            $("#g_" + b["data"][a]).remove();
          }
        }
        break;
      case "friend":
        $(".j-dialog").remove();
        PointOut("成功");
        if (b["data"]) {
          for (var a = 0; a < b["data"].length; a++) {
            $("#f_" + b["data"][a])
              .find(".j-grouping")
              .html('<h3 class="j-oneline">' + b["groupName"] + "</h3>");
            $("#f_" + b["data"][a])
              .find(".j-grouping")
              .attr("grouping", 1);
          }
        }
        break;
      default:
        PointOut("失败，请尝试刷新页面或重启浏览器");
        break;
    }
  }
}
function ShowProhibit() {
  GetProhibit(1);
}
function GetProhibit(c) {
  var b = $.trim($("#j_prohibitFirstName").val());
  var a = $.trim($("#j_prohibitLastName").val());
  PointOut("禁发名单获取中...", 10);
  JlHttp("getProhibit", c, b, a);
}
function GetProhibitResult(c) {
  if (c) {
    switch (c["result"]) {
      case 0:
        PointOut("失败，请尝试刷新页面或重启浏览器");
        break;
      case 1:
        PointOut("获取成功");
        $("#j_prohibit_box").empty();
        $("input[name='selectAllProhibit']").prop("checked", false);
        for (var a = 0; a < c["data"].length; a++) {
          AppendProhibit(c["data"][a]);
        }
        ShowPaging("j_prohibit_paging", c["page"], c["total"], c["count"]);
        break;
      case 2:
        $("#j_prohibit_box").empty();
        var b =
          '<div class="j-explain-box">' +
          "<p>没有禁发人员，在“我的好友”或“我的分组”中可将好友添加到禁发名单。</p>" +
          '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_prohibit_box").append(b);
        PointOut("没有禁发人员");
        break;
      default:
        PointOut("失败，请尝试刷新页面或重启浏览器");
        break;
    }
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function AppendProhibit(c) {
  var a = GetName(c["first_name"], c["last_name"]);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id=p_' +
    c["urn"] +
    ">" +
    '<div class="j-profile-box j-nowrap-left">' +
    '<div><a href="/in/' +
    c["public_id"] +
    ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
    c["img"] +
    '"></a></div>' +
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="prohibit">' +
    "</div>" +
    "</div>";
  $("#j_prohibit_box").append(b);
}
function GetProhibitSomePage() {
  var a = parseInt($(this).text());
  GetProhibit(a);
}
function JumpProhibit() {
  var b = parseInt($("#j_prohibit_paging .j-paging:last").text());
  var c = parseInt($("#j_prohibit_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_prohibit_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetProhibit(c);
}
function JumpProhibitEnter(a) {
  if (a.keyCode == 13) {
    JumpProhibit();
  }
}
function SelectAllProhibit() {
  if ($(this).prop("checked")) {
    $("input[name='prohibit']").prop("checked", true);
    var a = $("input[name='prohibit']:checkbox:checked").length;
    if (a == 0) {
      PointOut("禁发名单中没有可选", 1);
    } else {
      PointOut("选择了 " + a + " 位好友", 1);
    }
  } else {
    $("input[name='prohibit']").prop("checked", false);
  }
}
function RemoveProhibit() {
  var a = [];
  $("input[name='prohibit']:checkbox:checked").each(function () {
    a.push($.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41));
  });
  if (a.length <= 0) {
    PointOut("请选择要移出的好友");
  } else {
    JlConfirm("确定要将选择的 " + a.length + " 位好友移出禁发名单吗？", "确定");
    $("#j_ok").on("click", function () {
      a = JSON.stringify(a);
      JlHttp("updateProhibit", a, "p_", 0);
    });
  }
}
function UpdateProhibitResult(b) {
  if (b && b["result"] == 1) {
    if (b["tag"] == "p_") {
      PointOut("禁发名单移出成功");
      for (var a = 0; a < b["friend"].length; a++) {
        $("#" + b["tag"] + b["friend"][a]).remove();
      }
      return false;
    }
    if (parseInt(b["state"]) == 1) {
      PointOut("已添加到禁发名单");
      for (var a = 0; a < b["friend"].length; a++) {
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit svg *")
          .removeClass("j-svg-0");
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit svg *")
          .addClass("j-svg-1");
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit")
          .attr("state", b["state"]);
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit")
          .attr("title", "已在禁发名单，点击移出");
      }
    } else {
      PointOut("已移出禁发名单");
      for (var a = 0; a < b["friend"].length; a++) {
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit svg *")
          .removeClass("j-svg-1");
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit svg *")
          .addClass("j-svg-0");
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit")
          .attr("state", b["state"]);
        $("#" + b["tag"] + b["friend"][a])
          .find(".j-prohibit")
          .attr("title", "未在禁发名单，点击加入");
      }
    }
  }
}
function ShowDig() {
  GetDig(1);
}
function GetDig(a) {
  PointOut("获取中...");
  JlHttp("getDig", a, "", "");
}
function GetDigResult(c) {
  if (c) {
    switch (c["result"]) {
      case 0:
        PointOut("失败，请尝试刷新页面或重启浏览器");
        break;
      case 1:
        PointOut("获取成功");
        $("#j_dig_box").empty();
        $("input[name='selectAllDig']").prop("checked", false);
        for (var a = 0; a < c["data"].length; a++) {
          AppendDig(c["data"][a]);
        }
        ShowPaging("j_dig_paging", c["page"], c["total"], c["count"]);
        break;
      case 2:
        $("#j_dig_box").empty();
        var b =
          '<div class="j-explain-box">' +
          "<p>没有已挖掘的好友，在“我的好友”或“我的分组”中可挖掘好友的资料</p>" +
          '<a href="http://linkedinjl.com/h" target="_black">查看详细教程</a>' +
          "</div>" +
          $("#j_dig_box").append(b);
        PointOut("没有已挖掘的好友");
        break;
      default:
        PointOut("失败，请尝试刷新页面或重启浏览器");
        break;
    }
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function AppendDig(c) {
  var a = GetName(c["first_name"], c["last_name"]);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id=e_' +
    c["urn"] +
    ">" +
    '<div class="j-profile-box j-nowrap-left">' +
    '<div><a href="/in/' +
    c["public_id"] +
    ' "target="_black" title="打开该好友Linkedin主页"><img src="' +
    c["img"] +
    '"></a></div>' +
    '<div class="j-profile" title="双击显示详细资料">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p class="j-oneline">' +
    c["position"] +
    "</p>" +
    '<p style="color:#999;">挖掘日期：' +
    c["dig_time"] +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="j-tool-box" style="padding-top:24px;">' +
    '<a class="j-look" href="javascript:;" title="查看详细资料">查看详情</a>' +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="dig">' +
    "</div>" +
    "</div>";
  $("#j_dig_box").append(b);
}
function GetDigSomePage() {
  var a = parseInt($(this).text());
  GetDig(a);
}
function JumpDig() {
  var b = parseInt($("#j_dig_paging .j-paging:last").text());
  var c = parseInt($("#j_dig_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_dig_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetDig(c);
}
function JumpDigEnter(a) {
  if (a.keyCode == 13) {
    JumpDig();
  }
}
function SelectAllDig() {
  if ($(this).prop("checked")) {
    $("input[name='dig']").prop("checked", true);
    var a = $("input[name='dig']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选择的好友", 1);
    } else {
      PointOut("选择了 " + a + " 位好友", 1);
    }
  } else {
    $("input[name='dig']").prop("checked", false);
  }
}
function ExportForSelect() {
  chrome.storage.sync.get({ account: "", my_urn: "", level: 0 }, function (a) {
    if (parseInt(a.level) < 2) {
      ShowUpgrade(
        "没有权限",
        "非钻石会员不支持导出功能，升级钻石会员可一键导出。"
      );
      return false;
    }
    var d = String(a.account);
    var b = String(a.my_urn);
    if (!d) {
      ShowLoginDialog();
      PointOut("请先登录领英精灵账号");
      return false;
    }
    if (!b) {
      JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
      $("#j_ok").click(function () {
        BindLinkedin(true);
      });
      return false;
    }
    var c = $("input[name='dig']:checkbox:checked").length;
    if (c == 0) {
      PointOut("请选择要导出的好友");
    } else {
      JlConfirm("确定要导出选择的 " + c + " 位好友吗？");
      $("#j_ok").click(function () {
        var e = [];
        $("input[name='dig']:checkbox:checked").each(function () {
          e.push(
            $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41)
          );
        });
        e = JSON.stringify(e);
        window.open(
          "http://linkedinjl.com/showexport/type/select/account/" +
            d +
            "/my_urn/" +
            b +
            "/f/" +
            e
        );
      });
    }
  });
}
function ExportForDigTime() {
  chrome.storage.sync.get({ account: "", my_urn: "", level: 0 }, function (a) {
    if (parseInt(a.level) < 2) {
      ShowUpgrade(
        "没有权限",
        "非钻石会员不支持导出功能，升级钻石会员可一键导出。"
      );
      return false;
    }
    var d = String(a.account);
    var b = String(a.my_urn);
    if (!d) {
      ShowLoginDialog();
      PointOut("请先登录领英精灵账号");
      return false;
    }
    if (!b) {
      JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
      $("#j_ok").click(function () {
        BindLinkedin(true);
      });
      return false;
    }
    var c =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-confirm-box j-digdate j-div-center j-box-sha">' +
      "<div>" +
      "<p>选择挖掘时间</p>" +
      "</div>" +
      '<div class="j-nowrap">' +
      '<div title="导出今日挖掘的"><input type="radio" name="digtime" value="today" checked="checked">今日</div>' +
      '<div title="导出近一周挖掘的"><input type="radio" name="digtime" value="week">一周</div>' +
      '<div title="导出近一月挖掘的"><input type="radio" name="digtime" value="month">一月</div>' +
      '<div title="导出全部挖掘的"><input type="radio" name="digtime" value="all">全部</div>' +
      "</div>" +
      '<div style="text-align:right;">' +
      '<button id="j_ok" class="j-bg-btn j-layout-btn j-close-dialog">确定</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    var c =
      '<div class="j-dialog j-div-center">' +
      '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:40%;">' +
      '<div class="j-prompt-title j-bg-0 j-nowrap">' +
      '<div class="j-nowrap-left">' +
      "<div>" +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
      '<circle cx="12" cy="12" r="10" style="fill:#00f" />' +
      '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>' +
      '<circle cx="12" cy="18" r="1" style="fill:#fff;" />' +
      "</svg>" +
      "</div>" +
      "<div>" +
      "<p>选择挖掘时间</p>" +
      "</div>" +
      "</div>" +
      '<div title="关闭" class="j-close-dialog j-sha">' +
      '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
      '<line x1="6" y1="6" x2="18" y2="18" />' +
      '<line x1="18" y1="6" x2="6" y2="18" />' +
      "</svg>" +
      "</div>" +
      "</div>" +
      '<div class="j-prompt-cont">' +
      '<div class="j-nowrap" style="width:80%; margin:auto;">' +
      '<div title="导出今日挖掘的"><input type="radio" name="digtime" value="today" checked="checked">今日</div>' +
      '<div title="导出近一周挖掘的"><input type="radio" name="digtime" value="week">一周</div>' +
      '<div title="导出近一月挖掘的"><input type="radio" name="digtime" value="month">一月</div>' +
      '<div title="导出全部挖掘的"><input type="radio" name="digtime" value="all">全部</div>' +
      "</div>" +
      "</div>" +
      '<div class="j-prompt-ctrl" style="width:90%;">' +
      '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(c);
    $(".j-dialog").fadeIn(200);
    $("#j_ok").on("click", function () {
      var e = $.trim($("input[name='digtime']:checked").val());
      window.open(
        "http://linkedinjl.com/showexport/type/digtime/account/" +
          d +
          "/my_urn/" +
          b +
          "/digtime/" +
          e
      );
    });
  });
}
function ShowFriendProfile() {
  var a = $.trim($(this).parents("div.j-friend").attr("id")).slice(2, 41);
  JlHttp("getFriendProfile", a, "", "");
}
function ShowGroupsOption() {
  $("#j_Groups .j-top-nav-box li").removeClass("j-active");
  $("#j_Groups .j-top-nav-box li").addClass("j-active-not");
  $(this).removeClass("j-active-not");
  $(this).addClass("j-active");
  var a = $(this).attr("option");
  $("#j_Groups .j-option").removeClass("j-option-active");
  $("#j_" + a).addClass("j-option-active");
}
function ShowMyGroups() {
  GetMyGroups(1);
}
function GetMyGroups(a) {
  chrome.storage.sync.get({ account: "", my_urn: "" }, function (c) {
    var g = String(c.account);
    var e = String(c.my_urn);
    if (!g) {
      ShowLoginDialog();
      PointOut("请先登录领英精灵账号");
      return false;
    }
    if (!e) {
      JlConfirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？");
      $("#j_ok").click(function () {
        BindLinkedin(true);
      });
      return false;
    }
    var b = getCookie("JSESSIONID");
    if (b) {
      b = b.replace(/"/g, "");
    } else {
      PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
      return false;
    }
    var f = 10;
    var h = (a - 1) * 10;
    var d =
      "https://www.linkedin.com/voyager/api/voyagerGroupsDashGroups?decorationId=com.linkedin.voyager.dash.deco.groups.GroupListingPage-2&count=" +
      f +
      "&membershipStatuses=List(MEMBER,MANAGER,OWNER)&profileUrn=urn%3Ali%3Afsd_profile%3A" +
      e +
      "&q=member&start=" +
      h;
    PointOut("获取Groups中...", 10);
    $.ajax({
      url: d,
      type: "get",
      headers: {
        Accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": b,
        "x-restli-protocol-version": "2.0.0",
        "x-li-lang": "en_US",
      },
      success: function (q) {
        if (q && q["data"] && q["data"]["*elements"] && q["included"]) {
          PointOut("获取完成", 1);
          $("#j_myGroups_box").empty();
          if (q["data"]["paging"]) {
            var o = q["data"]["paging"]["total"];
          } else {
            var o = 0;
          }
          ShowPaging("j_myGroups_paging", a, o, f);
          if (o == 0) {
            var n =
              '<div class="j-explain-box">' +
              '<p>你没有Groups，请在领英上<a href="https://www.linkedin.com/search/results/groups" target="_black">添加Groups</a>。<p/>' +
              '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
              "</div>";
            $("#j_myGroups_box").append(n);
            return false;
          }
          var p = q["data"]["*elements"];
          var r = q["included"];
          for (var m = 0; m < p.length; m++) {
            var k = {};
            k["groupsId"] = p[m].substr(17);
            for (var l = 0; l < r.length; l++) {
              if (
                r[l]["$type"] == "com.linkedin.voyager.dash.groups.Group" &&
                r[l]["entityUrn"].substr(17) == p[m].substr(17)
              ) {
                k["name"] = r[l]["name"];
                k["memberCount"] = r[l]["memberCount"];
                if (
                  r[l]["logo"] &&
                  r[l]["logo"]["vectorImage"] &&
                  r[l]["logo"]["vectorImage"]["rootUrl"] &&
                  r[l]["logo"]["vectorImage"]["artifacts"]
                ) {
                  k["img"] =
                    r[l]["logo"]["vectorImage"]["rootUrl"] +
                    r[l]["logo"]["vectorImage"]["artifacts"][0][
                      "fileIdentifyingUrlPathSegment"
                    ];
                } else {
                  k["img"] = "";
                }
                AppendMyGroupsToTable(k);
              }
            }
          }
        } else {
          PointOut("获取失败", 3);
          $("#j_myGroups_box").empty();
          var n =
            '<div class="j-explain-box">' +
            "<p>Groups获取失败，请确检查网络，或确保您打开的领英是领英国际版本。<p/>" +
            '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_myGroups_box").append(n);
          return false;
        }
      },
      error: function () {
        PointOut("获取失败", 3);
        $("#j_myGroups_box").empty();
        var i =
          '<div class="j-explain-box">' +
          "<p>Groups获取失败，请确检查网络，或确保您打开的领英是领英国际版本。<p/>" +
          '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_myGroups_box").append(i);
        return false;
      },
    });
  });
}
function AppendMyGroupsToTable(b) {
  var a =
    '<div class="j-friend j-nowrap" gid="s_' +
    b["groupsId"] +
    '" gN="' +
    b["name"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">' +
    "<div>" +
    '<a href="https://www.linkedin.com/groups/' +
    b["groupsId"] +
    ' "target="_black" title="打开Groups主页"><img src="' +
    b["img"] +
    '"></a>' +
    "</div>" +
    '<div class="j-profile">' +
    '<h3 class="j-oneline">' +
    b["name"] +
    "</h3>" +
    '<p class="j-oneline">成员：' +
    b["memberCount"] +
    "人</p>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<div style="padding:18px 12px;">' +
    '<a class="j-all-groups-member" href="javascript:;" title="显示全部成员">全部成员</a>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_myGroups_box").append(a);
}
function GetMyGroupsSomePage() {
  var a = parseInt($(this).text());
  GetMyGroups(a);
}
function JumpMyGroups() {
  var b = parseInt($("#j_myGroups_paging .j-paging:last").text());
  var c = parseInt($("#j_myGroups_paging .j-jump").val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(c)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var d = parseInt($("#j_myGroups_paging .j-curpage").text());
  if (c == d) {
    PointOut("获取完成");
    return false;
  }
  if (c > b) {
    PointOut("请输入正确页数，1-" + b + " 范围内", 3);
    return false;
  }
  GetMyGroups(c);
}
function JumpMyGroupsEnter() {
  if (event.keyCode == 13) {
    JumpMyGroups();
  }
}
function LookAllGroupsMemeber() {
  var a = $.trim($(this).parents("div.j-friend").attr("gid")).slice(2);
  var b = $.trim($(this).parents("div.j-friend").attr("gN"));
  $("#j_groupsMemberNav").click();
  GetGroupsMember(a, b, 1);
}
function GetGroupsMember(a, e, f) {
  if (f > 250) {
    PointOut("最多显示前10000条");
    return false;
  }
  var b = getCookie("JSESSIONID");
  if (b) {
    b = b.replace(/"/g, "");
  } else {
    PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
    return false;
  }
  var d = 40;
  var g = (f - 1) * 40;
  var c =
    "https://www.linkedin.com/voyager/api/voyagerGroupsDashGroupMemberships?decorationId=com.linkedin.voyager.dash.deco.groups.GroupMembershipInMemberListPage-2&count=" +
    d +
    "&filters=List()&groupUrn=urn%3Ali%3Afsd_group%3A" +
    a +
    "&membershipStatuses=List(OWNER,MANAGER,MEMBER)&q=typeahead&start=" +
    g +
    "&typeaheadQuery=%22%22";
  $.ajax({
    url: c,
    type: "get",
    headers: {
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": b,
      "x-restli-protocol-version": "2.0.0",
      "x-li-lang": "en_US",
    },
    success: function (l) {
      if (l && l["data"] && l["data"]["*elements"] && l["included"]) {
        PointOut("获取完成", 1);
        $("#j_GroupsMember_box").empty();
        $("input[name='selectAllGroupsMember']").prop("checked", false);
        if (l["data"]["paging"]) {
          var h = l["data"]["paging"]["total"];
          if (h > 10000) {
            var j = 10000;
          } else {
            var j = h;
          }
        } else {
          var j = 0;
        }
        ShowPaging("j_GroupsMember_paging", f, j, d);
        if (j == 0) {
          var i =
            '<div class="j-explain-box">' +
            "<p>该Groups中没有成员。<p/>" +
            '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
            "</div>";
          $("#j_GroupsMember_box").append(i);
          return false;
        } else {
          var i =
            '<div class="j-nowrap j-num j-w">' +
            '<div style="width:80%;">' +
            '<h3 id="j_GroupsName" class="j-oneline" gid="' +
            a +
            '" gn="' +
            e +
            '">' +
            e +
            "</h3>" +
            "</div>" +
            "<div><span>" +
            h +
            " 成员</span></div>" +
            "</div>";
          $("#j_GroupsMember_box").append(i);
        }
        var k = l["data"]["*elements"];
        var m = l["included"];
        chrome.storage.sync.get({ my_urn: "" }, function (o) {
          var r = o.my_urn;
          Friend = [];
          for (var q = 0; q < k.length; q++) {
            var n = {};
            n["urn"] = k[q].substr(k[q].length - 40, 39);
            if (n["urn"] != r) {
              for (var p = 0; p < m.length; p++) {
                if (
                  m[p]["$type"] ==
                    "com.linkedin.voyager.dash.identity.profile.Profile" &&
                  m[p]["entityUrn"].substr(19, 39) == n["urn"]
                ) {
                  n["first_name"] = m[p]["firstName"];
                  n["last_name"] = m[p]["lastName"];
                  n["public_id"] = m[p]["publicIdentifier"];
                  if (m[p]["headline"]) {
                    n["position"] = m[p]["headline"].substr(0, 140);
                  } else {
                    n["position"] = "";
                  }
                  if (
                    m[p]["profilePicture"] &&
                    m[p]["profilePicture"]["displayImageReference"] &&
                    m[p]["profilePicture"]["displayImageReference"][
                      "vectorImage"
                    ] &&
                    m[p]["profilePicture"]["displayImageReference"][
                      "vectorImage"
                    ]["rootUrl"]
                  ) {
                    n["img"] =
                      m[p]["profilePicture"]["displayImageReference"][
                        "vectorImage"
                      ]["rootUrl"] +
                      m[p]["profilePicture"]["displayImageReference"][
                        "vectorImage"
                      ]["artifacts"][0]["fileIdentifyingUrlPathSegment"];
                  } else {
                    n["img"] = "";
                  }
                }
                if (
                  m[p]["$type"] ==
                    "com.linkedin.voyager.dash.relationships.MemberRelationship" &&
                  m[p]["entityUrn"].substr(30, 39) == k[q].substr(36, 39)
                ) {
                  if (
                    m[p]["memberRelationshipUnion"] &&
                    m[p]["memberRelationshipUnion"]["noConnection"] &&
                    m[p]["memberRelationshipUnion"]["noConnection"][
                      "memberDistance"
                    ]
                  ) {
                    switch (
                      m[p]["memberRelationshipUnion"]["noConnection"][
                        "memberDistance"
                      ]
                    ) {
                      case "DISTANCE_3":
                        n["distance"] = "3度";
                        break;
                      case "DISTANCE_2":
                        n["distance"] = "2度";
                        break;
                      case "DISTANCE_1":
                        n["distance"] = "1度";
                        break;
                      default:
                        n["distance"] = "";
                        break;
                    }
                  } else {
                    n["distance"] = "";
                  }
                }
              }
              Friend.push(n);
              AppendMemberToTable(n);
            }
          }
        });
      } else {
        PointOut("获取失败", 3);
        $("#j_GroupsMember_box").empty();
        var i =
          '<div class="j-explain-box">' +
          "<p>Groups成员获取失败。请检查网络并确保打开的领英页面是领英国际版本。<p/>" +
          '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
          "</div>";
        $("#j_GroupsMember_box").append(i);
        ShowPaging("j_GroupsMember_paging", 1, 0, 40);
        return false;
      }
    },
    error: function () {
      PointOut("获取失败", 3);
      $("#j_GroupsMember_box").empty();
      var h =
        '<div class="j-explain-box">' +
        "<p>Groups成员获取失败。请检查网络并确保打开的领英页面是领英国际版本。<p/>" +
        '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>' +
        "</div>";
      $("#j_GroupsMember_box").append(h);
      ShowPaging("j_GroupsMember_paging", 1, 0, 40);
      return false;
    },
  });
}
function AppendMemberToTable(c) {
  var a = GetName(c.first_name, c.last_name);
  if (!c["img"]) {
    c["img"] =
      "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/me.png";
  }
  var b =
    '<div class="j-friend j-nowrap" id="m_' +
    c["urn"] +
    '" fn="' +
    c["first_name"] +
    '" ln="' +
    c["last_name"] +
    '" pid="' +
    c["public_id"] +
    '">' +
    '<div class="j-profile-box j-nowrap-left">' +
    "<div>" +
    '<a href="https://www.linkedin.com/in/' +
    c["public_id"] +
    ' "target="_black" title="打开该成员Linkedin主页"><img src="' +
    c["img"] +
    '"></a>' +
    "</div>" +
    '<div class="j-profile">' +
    '<div class="j-nowrap-left">' +
    '<h3 class="j-oneline">' +
    a +
    "</h3>" +
    '<p style="line-height:24px; padding-left:6px">' +
    c["distance"] +
    "</p>" +
    "</div>" +
    "<div>" +
    '<p class="j-oneline j-posi">' +
    c["position"] +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<input type="checkbox" name="GroupsMember">' +
    "</div>" +
    "</div>";
  $("#j_GroupsMember_box").append(b);
}
function SelectAllGroupsMember() {
  if ($(this).prop("checked")) {
    $("input[name='GroupsMember']").prop("checked", true);
    var a = $("input[name='GroupsMember']:checkbox:checked").length;
    if (a == 0) {
      PointOut("没有可选择的成员", 1);
    } else {
      PointOut("选择了 " + a + " 位成员", 1);
    }
  } else {
    $("input[name='GroupsMember']").prop("checked", false);
  }
}
function GetGroupsMemberSomePage() {
  var c = parseInt($(this).text());
  var a = $("#j_GroupsName").attr("gid");
  var b = $("#j_GroupsName").attr("gn");
  GetGroupsMember(a, b, c);
}
function JumpGroupsMember() {
  var c = parseInt($("#j_GroupsMember_paging .j-paging:last").text());
  var e = parseInt($("#j_GroupsMember_paging .j-jump").val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(e)) {
    PointOut("请输入正确的页数", 3);
    return false;
  }
  var f = parseInt($("#j_GroupsMember_paging .j-curpage").text());
  if (e == f) {
    PointOut("获取完成");
    return false;
  }
  if (e > c) {
    PointOut("请输入正确页数，1-" + c + " 范围内", 3);
    return false;
  }
  var a = $("#j_GroupsName").attr("gid");
  var d = $("#j_GroupsName").attr("gn");
  GetGroupsMember(a, d, e);
}
function JumpGroupsMemberEnter() {
  if (event.keyCode == 13) {
    JumpGroupsMember();
  }
}
function StartConnectGroups() {
  var a = $("input[name='GroupsMember']:checkbox:checked").length;
  if (a == 0) {
    PointOut("请先选择人脉");
  } else {
    Friend = [];
    $("input[name='GroupsMember']:checkbox:checked").each(function () {
      var b = {};
      b["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      b["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      b["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      b["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      b["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      b["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      Friend.push(b);
    });
    if (Friend.length > 0) {
      JlHttp("getMesAddFriend", "", "groups", "");
    } else {
      PointOut("请选择人脉");
    }
  }
}
function ConnectGroups() {
  if (Friend.length > 0) {
    Connect(
      Friend[0]["urn"],
      Friend[0]["first_name"],
      Friend[0]["last_name"],
      Friend[0]["img"],
      "groups"
    );
    $("#m_" + Friend[0]["urn"]).remove();
    Friend.shift();
    if (Friend.length == 0) {
      var b = $("#j_GroupsName").attr("gid");
      var c = $("#j_GroupsName").attr("gn");
      var a = parseInt($("#j_GroupsMember_paging .j-paging:last").text());
      var d = parseInt($("#j_GroupsMember_paging .j-curpage").text()) + 1;
      if (d <= a) {
        GetGroupsMember(b, c, d);
      }
    }
    chrome.storage.sync.get(
      { a_today_num: 0, a_min_speed: 30, a_max_speed: 60, risk: true },
      function (e) {
        var f = GetTime(
          parseInt(e.a_today_num),
          parseInt(e.a_min_speed),
          parseInt(e.a_max_speed),
          e.risk
        );
        Delayed_time = f;
        DelayedTime();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "connectGroups", other: "" },
            function (g) {}
          );
        }, f * 1000);
      }
    );
  } else {
    StopAction();
    setTimeout(function () {
      alert("本次已发送 " + ActionCount + " 条邀请");
    }, 50);
    return false;
  }
}
function AddInviteGroups() {
  var b = $("input[name='GroupsMember']:checkbox:checked").length;
  if (b == 0) {
    PointOut("请先选择人脉");
  } else {
    var a = [];
    $("input[name='GroupsMember']:checkbox:checked").each(function () {
      var c = {};
      c["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
        2,
        41
      );
      c["first_name"] = $.trim($(this).parents("div.j-friend").attr("fn"));
      c["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
      c["public_id"] = $.trim($(this).parents("div.j-friend").attr("pid"));
      c["img"] = $.trim(
        $(this).parents("div.j-friend").find("img").attr("src")
      );
      c["position"] = $.trim(
        $(this).parents("div.j-friend").find(".j-posi").text()
      );
      a.push(c);
    });
    if (a.length > 0) {
      a = JSON.stringify(a);
      JlHttp("addInviteQueue", a, "GroupsMember", "");
    } else {
      PointOut("请选择人脉");
    }
  }
}
function StartSendForGroups() {
  chrome.storage.sync.get(
    { account: "", my_urn: "", run: false, level: 0, trial: 0, s_today_num: 0 },
    function (a) {
      if (a.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量群发消息！");
        return;
      }
      var d = String(a.account);
      var b = String(a.my_urn);
      if (!d) {
        ShowLoginDialog();
        PointOut("请先登录领英精灵账号");
        return false;
      }
      if (!b) {
        JlConfirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？");
        $("#j_ok").click(function () {
          BindLinkedin(true);
        });
        return false;
      }
      if (parseInt(a.level) < 1 && parseInt(a.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      var c = $("input[name='GroupsMember']:checkbox:checked").length;
      if (c == 0) {
        PointOut("请先选择要群发的成员");
      } else {
        JlConfirm("确定要给选择的 " + c + " 位成员群发消息吗？");
        $("#j_ok").click(function () {
          Friend = [];
          $("input[name='GroupsMember']:checkbox:checked").each(function () {
            var e = {};
            e["urn"] = $.trim($(this).parents("div.j-friend").attr("id")).slice(
              2,
              41
            );
            e["first_name"] = $.trim(
              $(this).parents("div.j-friend").attr("fn")
            );
            e["last_name"] = $.trim($(this).parents("div.j-friend").attr("ln"));
            e["public_id"] = $.trim(
              $(this).parents("div.j-friend").attr("pid")
            );
            e["img"] = $.trim(
              $(this).parents("div.j-friend").find("img").attr("src")
            );
            Friend.push(e);
          });
          GroupsId = $("#j_GroupsName").attr("gid");
          if (Friend.length > 0) {
            JlHttp("startSendForGroups", "", "", "");
          } else {
            PointOut("请选择要群发的成员");
          }
        });
      }
    }
  );
}
function StartSendForGroupsResult(a) {
  if (a && a["result"] == 1) {
    if (a["data"].length == 0) {
      PointOut("群发前请设置或选择要群发的消息内容");
      NewTidings();
      return false;
    }
    Tidings = a["data"];
    ActionCount = 0;
    ShowStatu("Groups群发消息中...");
    BatchSendGroups();
    ShowOrHideWindow();
    chrome.storage.sync.set({ run: true }, function () {});
  } else {
    PointOut("群发消息内容获取失败");
  }
}
function BatchSendGroups() {
  if (Friend.length <= 0) {
    StopAction();
    setTimeout(function () {
      alert("本次已群发 " + ActionCount + " 条消息");
    }, 50);
    return false;
  }
  chrome.storage.sync.get(
    {
      account: "",
      my_urn: "",
      s_today_num: 0,
      s_limit: 100,
      s_min_speed: 30,
      s_max_speed: 60,
      s_auto: true,
      level: 0,
      risk: true,
    },
    function (c) {
      if (!String(c.account)) {
        StopAction();
        setTimeout(function () {
          alert("没有登录领英精灵账号，可能有其它设备登录，被挤出");
        }, 50);
        return false;
      }
      if (!String(c.my_urn)) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？"
            )
          ) {
            BindLinkedin(false);
          }
        }, 50);
        return false;
      }
      if (parseInt(c.level) < 1 && parseInt(c.s_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "您是试用会员，试用会员每天有" +
                TestCount +
                "个群发名额。今日群发名额已用完，升级会员可无限制群发"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(c.s_today_num) >= parseInt(c.s_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计群发 " +
              c.s_today_num +
              " 条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！"
          );
        }, 50);
        return false;
      }
      $("#j_head_img").attr("src", Friend[0]["img"]);
      var f = RandomTidings(Friend[0]["first_name"], Friend[0]["last_name"]);
      SendMsgGroups(Friend[0]["urn"], f);
      ActionCount++;
      var d = parseInt(c.s_today_num) + 1;
      $("#j_action_count").text("本次已发：" + ActionCount + "条");
      if (d > 100) {
        $("#j_today_count").html(
          '<font style="color:#f00;">今日已发：' + d + "条</font>"
        );
      } else {
        $("#j_today_count").text("今日已发：" + d + "条");
      }
      var h = GetTime(
        parseInt(c.s_today_num),
        parseInt(c.s_min_speed),
        parseInt(c.s_max_speed),
        c.risk
      );
      Delayed_time = h;
      DelayedTime();
      Friend.shift();
      Timeout = setTimeout(function () {
        chrome.runtime.sendMessage(
          { action: "loop", result: "batchSendGroups", other: "" },
          function (i) {}
        );
      }, h * 1000);
      if (c.s_auto && Friend.length <= 0) {
        var b = $("#j_GroupsName").attr("gid");
        var e = $("#j_GroupsName").attr("gn");
        var a = parseInt($("#j_GroupsMember_paging .j-paging:last").text());
        var g = parseInt($("#j_GroupsMember_paging .j-curpage").text()) + 1;
        if (g <= a) {
          GetGroupsMember(b, e, g);
        }
      }
    }
  );
}
function SendMsgGroups(b, c) {
  var a = "c2916c72-d398-4296-ba0b-82997905a6b4";
  chrome.storage.sync.get({ my_urn: "" }, function (f) {
    var d = {
      message: {
        body: { attributes: [], text: c },
        originToken: a,
        renderContentUnions: [],
      },
      mailboxUrn: "urn:li:fsd_profile:" + f.my_urn,
      trackingId: "\bªf1YÇÜ¥,'ªí+`e",
      dedupeByClientGeneratedToken: false,
      hostRecipientUrns: ["urn:li:fsd_profile:" + b],
      messageRequestContextByRecipient: [
        {
          contextEntityUrn: "urn:li:fsd_group:" + GroupsId,
          hostRecipientUrn: "urn:li:fsd_profile:" + b,
        },
      ],
    };
    var e = getCookie("JSESSIONID");
    if (e) {
      e = e.replace(/"/g, "");
    } else {
      PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
      return false;
    }
    var g =
      "https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessages?action=createMessage";
    $.ajax({
      url: g,
      data: JSON.stringify(d),
      type: "post",
      headers: {
        Accept: "application/json",
        "csrf-token": e,
        "content-type": "text/plain;charset=UTF-8",
      },
      success: function (h) {
        chrome.storage.sync.get({ s_today_num: 0 }, function (i) {
          $("#m_" + b).remove();
          var j = parseInt(i.s_today_num) + 1;
          chrome.storage.sync.set({ s_today_num: [j] }, function () {});
          JlHttp("saveSendGroupsRecord", "", "", "");
        });
      },
    });
  });
}
function CopyLink() {
  chrome.storage.sync.get({ level: 0 }, function (a) {
    if (a.level > 0) {
      $("#j_share_link").select();
      document.execCommand("copy");
      PointOut("复制成功");
    } else {
      ShowUpgrade(
        "没有权限",
        "非领英精灵会员没有提成权限，升级领英精灵会员即可享受提成"
      );
    }
  });
}
function ShowSharePage() {
  chrome.storage.sync.get({ account: "" }, function (a) {
    if (!String(a.account)) {
      ShowLoginDialog();
      return false;
    }
    $("#j_share_link").val("linkedinjl.com/r?i=" + a.account);
    JlHttp("getYeji", "", "", "");
  });
}
function GetYejiResult(a) {
  if (a && a["result"]) {
    if (a["total_yeji"] > 0) {
      $("#j_total_yeji").text("￥" + a["total_yeji"] + ".00");
      $("#j_total_commission").text("￥" + (a["total_yeji"] * 0.4).toFixed(2));
    } else {
      $("#j_total_yeji").text("￥0.00");
      $("#j_total_commission").text("￥0.00");
    }
    if (a["today_yeji"] > 0) {
      $("#j_today_yeji").text("￥" + a["today_yeji"] + ".00");
      $("#j_today_commission").text("￥" + (a["today_yeji"] * 0.4).toFixed(2));
    } else {
      $("#j_today_yeji").text("￥0.00");
      $("#j_today_commission").text("￥0.00");
    }
  } else {
  }
}
function ShowSetPage() {
  chrome.storage.sync.get(
    {
      s_min_speed: 30,
      s_max_speed: 60,
      s_limit: 100,
      s_skip: true,
      s_skip_time: 3,
      s_auto: true,
      a_min_speed: 30,
      a_max_speed: 60,
      a_limit: 100,
      i_count: 100,
      d_min_speed: 60,
      d_max_speed: 120,
      d_limit: 100,
      t_min_speed: 20,
      t_max_speed: 40,
      t_limit: 100,
      risk: true,
    },
    function (a) {
      $("#s_min_speed").val(a.s_min_speed);
      $("#s_max_speed").val(a.s_max_speed);
      $("#s_limit").val(a.s_limit);
      $("#s_auto").prop("checked", Boolean(a.s_auto));
      $("#s_skip").prop("checked", Boolean(a.s_skip));
      $("#s_skip_time").val(a.s_skip_time);
      $("#a_min_speed").val(a.a_min_speed);
      $("#a_max_speed").val(a.a_max_speed);
      $("#a_limit").val(a.a_limit);
      $("#j_i_count").val(a.i_count);
      $("#d_min_speed").val(a.d_min_speed);
      $("#d_max_speed").val(a.d_max_speed);
      $("#d_limit").val(a.d_limit);
      $("#t_min_speed").val(a.t_min_speed);
      $("#t_max_speed").val(a.t_max_speed);
      $("#t_limit").val(a.t_limit);
      $("#j_risk").prop("checked", Boolean(a.risk));
    }
  );
}
function ShowSetDetail() {
  $(".j-fold-head").removeClass("j-fold-head-active");
  $(".j-svg-box").removeClass("j-svg-show");
  if ($(this).next().is(":hidden")) {
    $(".j-fold-content").slideUp(100);
    $(this).addClass("j-fold-head-active");
    $(this).find(".j-svg-box").addClass("j-svg-show");
  } else {
    $(this).removeClass("j-fold-head-active");
  }
  $(this).next().slideToggle(100);
}
function RestoreSet() {
  JlConfirm("所有的设置将恢复默认状态，确定要恢复默认吗？");
  $("#j_ok").on("click", function () {
    chrome.storage.sync.set(
      {
        s_min_speed: 30,
        s_max_speed: 60,
        s_limit: 100,
        s_skip: true,
        s_skip_time: 3,
        s_auto: true,
        a_min_speed: 30,
        a_max_speed: 60,
        a_limit: 100,
        i_count: 100,
        d_min_speed: 60,
        d_max_speed: 120,
        d_limit: 100,
        t_min_speed: 20,
        t_max_speed: 40,
        t_limit: 100,
        risk: true,
      },
      function () {
        ShowSetPage();
        PointOut("设置已恢复默认状态", 2);
      }
    );
  });
}
function SetSendMinSpeed() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ s_min_speed: 30 }, function (c) {
      $("#s_min_speed").val(c.s_min_speed);
    });
    return false;
  }
  if (b < 5) {
    JlAlert("最小时间不能小于5秒！");
    chrome.storage.sync.get({ s_min_speed: 30 }, function (c) {
      $("#s_min_speed").val(c.s_min_speed);
    });
    return false;
  }
  if (b > 4999) {
    JlAlert("最小时间不能大于4999秒！");
    chrome.storage.sync.get({ s_min_speed: 30 }, function (c) {
      $("#s_min_speed").val(c.s_min_speed);
    });
    return false;
  }
  if (b < 30) {
    JlConfirm("发送速度太快，确定要设置这么快吗？");
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ s_min_speed: [b] }, function () {
        PointOut("设置成功");
        chrome.storage.sync.get({ s_max_speed: 60 }, function (c) {
          var d = Math.round(2 * b);
          if (c.s_max_speed < d) {
            chrome.storage.sync.set({ s_max_speed: [d] }, function () {
              $("#s_max_speed").val(d);
            });
          }
        });
      });
    });
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ s_min_speed: 30 }, function (c) {
        $("#s_min_speed").val(c.s_min_speed);
      });
    });
  } else {
    chrome.storage.sync.set({ s_min_speed: [b] }, function () {
      PointOut("设置成功");
      chrome.storage.sync.get({ s_max_speed: 60 }, function (c) {
        var d = Math.round(2 * b);
        if (c.s_max_speed < d) {
          chrome.storage.sync.set({ s_max_speed: [d] }, function () {
            $("#s_max_speed").val(d);
          });
        }
      });
    });
  }
}
function SetSendMaxSpeed() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ s_max_speed: 60 }, function (c) {
      $("#s_max_speed").val(c.s_max_speed);
    });
    return false;
  }
  if (b > 9999) {
    JlAlert("最大时间不能超过9999秒");
    chrome.storage.sync.get({ s_max_speed: 60 }, function (c) {
      $("#s_max_speed").val(c.s_max_speed);
    });
    return false;
  }
  chrome.storage.sync.get({ s_min_speed: 30 }, function (c) {
    var d = Math.round(2 * c.s_min_speed);
    if (b < d) {
      JlAlert("最大时间至少是最小时间的2倍");
      chrome.storage.sync.set({ s_max_speed: [d] }, function () {
        $("#s_max_speed").val(d);
      });
    } else {
      chrome.storage.sync.set({ s_max_speed: [b] }, function () {
        PointOut("设置成功");
      });
    }
  });
}
function SetSendLimit() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    chrome.storage.sync.get({ s_limit: 100 }, function (c) {
      $("#s_limit").val(c.s_limit);
      JlAlert("请输入正确数字！");
    });
    return false;
  }
  if (a > 5000) {
    chrome.storage.sync.get({ s_limit: 100 }, function (c) {
      JlAlert("出于账号安全考虑，每天群发数量不可超过5000条！");
      $("#s_limit").val(c.s_limit);
    });
    return false;
  }
  if (a > 100) {
    JlConfirm("每天群发数量不宜太多，坚持要群发这么多吗？");
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ s_limit: 100 }, function (c) {
        $("#s_limit").val(c.s_limit);
      });
      $(".dialog").remove();
    });
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ s_limit: [a] }, function () {
        $(".dialog").remove();
        PointOut("设置成功");
      });
    });
  } else {
    chrome.storage.sync.set({ s_limit: [a] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetSendAutoPageUp() {
  chrome.storage.sync.set({ s_auto: $(this).prop("checked") }, function () {
    PointOut("设置成功");
  });
}
function SetSendSkip() {
  chrome.storage.sync.set({ s_skip: $(this).prop("checked") }, function () {
    PointOut("设置成功");
  });
}
function SetSendSkipTime() {
  var b = $.trim($(this).val());
  var a = /^\d+$/;
  if (!a.test(b)) {
    JlAlert("请输入正确天数!");
    chrome.storage.sync.get({ s_skip_time: 3 }, function (c) {
      $("#s_skip_time").val(c.s_skip_time);
    });
    return false;
  }
  if (b > 9999) {
    JlAlert("最多可跳过9999天");
    chrome.storage.sync.set({ s_skip_time: 9999 }, function () {
      PointOut("设置成功");
    });
    $("#s_skip_time").val(9999);
  } else {
    chrome.storage.sync.set({ s_skip_time: [b] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetAddMinSpeed() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ a_min_speed: 30 }, function (c) {
      $("#a_min_speed").val(c.a_min_speed);
    });
    return false;
  }
  if (b < 5) {
    JlAlert("最小时间不能小于5秒！");
    chrome.storage.sync.get({ a_min_speed: 30 }, function (c) {
      $("#a_min_speed").val(c.a_min_speed);
    });
    return false;
  }
  if (b > 4999) {
    JlAlert("最小时间不能大于4999秒！");
    chrome.storage.sync.get({ a_min_speed: 30 }, function (c) {
      $("#a_min_speed").val(c.a_min_speed);
    });
    return false;
  }
  if (b < 30) {
    JlConfirm("添加好友速度不宜太快，确定要设置这么快吗？");
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ a_min_speed: [b] }, function () {
        chrome.storage.sync.get({ a_max_speed: 60 }, function (c) {
          var d = Math.round(2 * b);
          if (c.a_max_speed < d) {
            chrome.storage.sync.set({ a_max_speed: [d] }, function () {
              $("#a_max_speed").val(d);
              PointOut("设置成功");
            });
          }
        });
      });
    });
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ a_min_speed: 30 }, function (c) {
        $("#a_min_speed").val(c.a_min_speed);
      });
    });
  } else {
    chrome.storage.sync.set({ a_min_speed: [b] }, function () {
      PointOut("设置成功");
      chrome.storage.sync.get({ a_max_speed: 60 }, function (c) {
        var d = Math.round(2 * b);
        if (c.a_max_speed < d) {
          chrome.storage.sync.set({ a_max_speed: [d] }, function () {
            $("#a_max_speed").val(d);
          });
        }
      });
    });
  }
}
function SetAddMaxSpeed() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ a_max_speed: 60 }, function (c) {
      $("#a_max_speed").val(c.a_max_speed);
    });
    return false;
  }
  if (a > 9999) {
    JlAlert("最大时间不能超过9999秒");
    chrome.storage.sync.get({ a_max_speed: 60 }, function (c) {
      $("#a_max_speed").val(c.a_max_speed);
    });
    return false;
  }
  chrome.storage.sync.get({ a_min_speed: 30 }, function (c) {
    var d = Math.round(2 * c.a_min_speed);
    if (a < d) {
      JlAlert("最大时间至少是最小时间的2倍");
      chrome.storage.sync.set({ a_max_speed: [d] }, function () {
        $("#a_max_speed").val(d);
      });
    } else {
      chrome.storage.sync.set({ a_max_speed: [a] }, function () {
        PointOut("设置成功");
      });
    }
  });
}
function SetAddLimit() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    chrome.storage.sync.get({ a_limit: 100 }, function (c) {
      $("#a_limit").val(c.a_limit);
      JlAlert("请输入正确数字！");
    });
    return false;
  }
  if (b > 10000) {
    chrome.storage.sync.get({ a_limit: 100 }, function (c) {
      JlAlert("出于账号安全考虑每天发送邀请量不能超过10000条！");
      $("#a_limit").val(c.a_limit);
    });
    return false;
  }
  if (b > 200) {
    JlConfirm("每天添加好友数量不宜太多，确定要设置这么多吗？");
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ vip: false, a_limit: 100 }, function (c) {
        $("#a_limit").val(c.a_limit);
      });
      $(".dialog").remove();
    });
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ a_limit: [b] }, function () {
        $(".dialog").remove();
        PointOut("设置成功");
      });
    });
  } else {
    chrome.storage.sync.set({ a_limit: [b] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetInviteCount() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    chrome.storage.sync.get({ i_count: 100 }, function (c) {
      $("#j_i_count").val(c.i_count);
      JlAlert("请输入正确数字！");
    });
    return false;
  }
  if (b < 50) {
    chrome.storage.sync.get({ i_count: 100 }, function (c) {
      JlAlert("每页最少显示50条");
      $("#j_i_count").val(c.i_count);
    });
    return false;
  }
  if (b > 1000) {
    chrome.storage.sync.get({ i_count: 100 }, function (c) {
      JlAlert("每页最多显示1000条");
      $("#j_i_count").val(c.i_count);
    });
    return false;
  } else {
    chrome.storage.sync.set({ i_count: [b] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetDigMinSpeed() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ d_min_speed: 60 }, function (c) {
      $("#d_min_speed").val(c.d_min_speed);
    });
    return false;
  }
  if (a < 30) {
    JlAlert("出于账号安全考虑，挖掘最小时间不能小于30秒！");
    chrome.storage.sync.get({ d_min_speed: 60 }, function (c) {
      $("#d_min_speed").val(c.d_min_speed);
    });
    return false;
  }
  if (a > 4999) {
    JlAlert("最小时间不能大于4999秒！");
    chrome.storage.sync.get({ d_min_speed: 60 }, function (c) {
      $("#d_min_speed").val(c.d_min_speed);
    });
    return false;
  }
  if (a < 50) {
    JlConfirm("挖掘速度太快，坚持要设置这么快吗？");
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ d_min_speed: [a] }, function () {
        PointOut("设置成功");
        chrome.storage.sync.get({ d_max_speed: 120 }, function (d) {
          var c = Math.round(2 * a);
          if (d.d_max_speed < c) {
            chrome.storage.sync.set({ d_max_speed: [c] }, function () {
              $("#d_max_speed").val(c);
            });
          }
        });
      });
    });
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ d_min_speed: 60 }, function (c) {
        $("#d_min_speed").val(c.d_min_speed);
      });
    });
  } else {
    chrome.storage.sync.set({ d_min_speed: [a] }, function () {
      PointOut("设置成功");
      chrome.storage.sync.get({ d_max_speed: 120 }, function (d) {
        var c = Math.round(2 * a);
        if (d.d_max_speed < c) {
          chrome.storage.sync.set({ d_max_speed: [c] }, function () {
            $("#d_max_speed").val(c);
          });
        }
      });
    });
  }
}
function SetDigMaxSpeed() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ d_max_speed: 120 }, function (c) {
      $("#d_max_speed").val(c.d_max_speed);
    });
    return false;
  }
  if (a > 9999) {
    JlAlert("最大时间不能超过9999秒");
    chrome.storage.sync.get({ d_max_speed: 120 }, function (c) {
      $("#d_max_speed").val(c.d_max_speed);
    });
    return false;
  }
  chrome.storage.sync.get({ d_min_speed: 60 }, function (c) {
    var d = Math.round(2 * c.d_min_speed);
    if (a < d) {
      JlAlert("最大时间至少是最小时间的2倍");
      chrome.storage.sync.set({ d_max_speed: [d] }, function () {
        $("#d_max_speed").val(d);
      });
    } else {
      chrome.storage.sync.set({ d_max_speed: [a] }, function () {
        PointOut("设置成功");
      });
    }
  });
}
function SetDigLimit() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    chrome.storage.sync.get({ d_limit: 100 }, function (c) {
      $("#d_limit").val(c.d_limit);
      JlAlert("请输入正确数字！");
    });
    return false;
  }
  if (a > 1000) {
    chrome.storage.sync.get({ d_limit: 100 }, function (c) {
      JlAlert("出于账号安全考虑，每天挖掘数量不能超过1000条！");
      $("#d_limit").val(c.d_limit);
    });
    return false;
  }
  if (a > 100) {
    JlConfirm("每天挖掘量不宜太多，坚持要设置这么多吗？");
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ d_limit: 100 }, function (c) {
        $("#d_limit").val(c.d_limit);
      });
      $(".dialog").remove();
    });
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ d_limit: [a] }, function () {
        $(".dialog").remove();
        PointOut("设置成功");
      });
    });
  } else {
    chrome.storage.sync.set({ d_limit: [a] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetThumbsMinSpeed() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ t_min_speed: 20 }, function (c) {
      $("#t_min_speed").val(c.t_min_speed);
    });
    return false;
  }
  if (a < 5) {
    JlAlert("最小时间不能小于5秒！");
    chrome.storage.sync.get({ t_min_speed: 20 }, function (c) {
      $("#t_min_speed").val(c.t_min_speed);
    });
    return false;
  }
  if (a > 4999) {
    JlAlert("最小时间不能大于4999秒！");
    chrome.storage.sync.get({ t_min_speed: 20 }, function (c) {
      $("#t_min_speed").val(c.t_min_speed);
    });
    return false;
  }
  if (a < 30) {
    JlConfirm("点赞速度不宜太快，坚持要设置这么快吗？");
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ t_min_speed: [a] }, function () {
        PointOut("设置成功");
        chrome.storage.sync.get({ t_max_speed: 40 }, function (d) {
          var c = Math.round(2 * a);
          if (d.t_max_speed < c) {
            chrome.storage.sync.set({ t_max_speed: [c] }, function () {
              $("#t_max_speed").val(c);
            });
          }
        });
      });
    });
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ t_min_speed: 20 }, function (c) {
        $("#t_min_speed").val(c.t_min_speed);
      });
    });
  } else {
    chrome.storage.sync.set({ t_min_speed: [a] }, function () {
      PointOut("设置成功");
      chrome.storage.sync.get({ t_max_speed: 40 }, function (d) {
        var c = Math.round(2 * a);
        if (d.t_max_speed < c) {
          chrome.storage.sync.set({ t_max_speed: [c] }, function () {
            $("#t_max_speed").val(c);
          });
        }
      });
    });
  }
}
function SetThumbsMaxSpeed() {
  var a = $.trim($(this).val());
  var b = /^[1-9][0-9]*$/;
  if (!b.test(a)) {
    JlAlert("请输入正确的数字!");
    chrome.storage.sync.get({ t_max_speed: 40 }, function (c) {
      $("#t_max_speed").val(c.t_max_speed);
    });
    return false;
  }
  if (a > 9999) {
    JlAlert("最大时间不能超过9999秒");
    chrome.storage.sync.get({ t_max_speed: 40 }, function (c) {
      $("#t_max_speed").val(c.t_max_speed);
    });
    return false;
  }
  chrome.storage.sync.get({ t_min_speed: 20 }, function (d) {
    var c = Math.round(2 * d.t_min_speed);
    if (a < c) {
      JlAlert("最大时间至少是最小时间的2倍");
      chrome.storage.sync.set({ t_max_speed: [c] }, function () {
        $("#t_max_speed").val(c);
      });
    } else {
      chrome.storage.sync.set({ t_max_speed: [a] }, function () {
        PointOut("设置成功");
      });
    }
  });
}
function SetThumbsLimit() {
  var b = $.trim($(this).val());
  var a = /^[1-9][0-9]*$/;
  if (!a.test(b)) {
    chrome.storage.sync.get({ t_limit: 100 }, function (c) {
      $("#t_limit").val(c.t_limit);
      JlAlert("请输入正确数字！");
    });
    return false;
  }
  if (b > 2000) {
    chrome.storage.sync.get({ t_limit: 100 }, function (c) {
      JlAlert("出于账号安全考虑，每天点赞量不能超过2000条！");
      $("#t_limit").val(c.t_limit);
    });
    return false;
  }
  if (b > 100) {
    JlConfirm("每天点赞数量不宜太多，坚持要设置这么多吗？");
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ t_limit: 100 }, function (c) {
        $("#t_limit").val(c.t_limit);
      });
      $(".dialog").remove();
    });
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ t_limit: [b] }, function () {
        PointOut("设置成功");
        $(".dialog").remove();
      });
    });
  } else {
    chrome.storage.sync.set({ t_limit: [b] }, function () {
      PointOut("设置成功");
    });
  }
}
function SetRisk() {
  if ($(this).prop("checked")) {
    chrome.storage.sync.set({ risk: true }, function () {});
  } else {
    JlConfirm("风控可有效保护Linkedin账号，确定要关闭风控系统吗？");
    $("#j_ok").on("click", function () {
      chrome.storage.sync.set({ risk: false }, function () {
        PointOut("设置成功");
      });
    });
    $("#j_cancel").on("click", function () {
      chrome.storage.sync.get({ risk: true }, function (a) {
        $("#j_risk").prop("checked", Boolean(a.risk));
      });
    });
  }
}
function GetLog() {
  PointOut("获取操作日志中...", 10);
  JlHttp("getLog", "", "", "");
}
function GetLogResult(c) {
  if (c && c["result"] == 1) {
    PointOut("完成", 1);
    $(".j-dialog").remove();
    var b =
      '<div class="j-dialog j-div-center j-close-dialog">' +
      '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">' +
      '<div class="j-prompt-cont">' +
      '<h3 style="text-align:center; margin:12px; color:#000;">操作日志</h3>' +
      '<div style="min-height:200px;" class="j-w">' +
      '<table class="j-tab j-tab-log">' +
      "<thead>" +
      "<tr>" +
      "<th>日期</th>" +
      '<th title="通过领英精灵每天群发消息数量">群发</th>' +
      '<th title="领英精灵每天挖掘到的好友资料数量">挖掘</th>' +
      '<th title="通过领英精灵每天发出的邀请数量">加好友</th>' +
      '<th title="通过领英精灵每天批量点赞的数量">点赞</th>' +
      "</tr>" +
      "</thead>" +
      '<tbody style="max-height: 30px; overflow-y:auto;">';
    for (var a = 0; a < c["data"].length; a++) {
      b +=
        "<tr>" +
        "<td>" +
        c["data"][a]["log_date"] +
        "</td>" +
        "<td>" +
        c["data"][a]["send_num"] +
        "</td>" +
        "<td>" +
        c["data"][a]["dig_num"] +
        "</td>" +
        "<td>" +
        c["data"][a]["add_num"] +
        "</td>" +
        "<td>" +
        c["data"][a]["thumbs_num"] +
        "</td>" +
        "</tr>";
    }
    b +=
      "</tbody>" +
      "</table>" +
      "</div>" +
      "</div>" +
      '<div class="j-prompt-ctrl">' +
      "<p>*以上数据是领英精灵统计的，仅供参考，与实际的会有些出入属于正常现象</p>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("#j_lyjl_window").append(b);
    $(".j-dialog").fadeIn(200);
  } else {
    PointOut("失败，请检查网络，翻墙工具不要使用全局模式！");
  }
}
function PointOut(d, c) {
  var a = c || 3;
  $(".j-point-out").remove();
  var b = '<div class="j-point-out j-div-center">' + d + "</div>";
  $("#j_lyjl_window").append(b);
  setTimeout(function () {
    $(".j-point-out").fadeOut(200);
    setTimeout(function () {
      $(".j-point-out").remove();
    }, 200);
  }, a * 1000);
}
function JlConfirm(b) {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-confirm-box j-div-center j-box-sha">' +
    '<div class="j-nowrap">' +
    '<div class="j-nowrap">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="12" r="10" style="fill:#00f" />' +
    '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>' +
    '<circle cx="12" cy="18" r="1" style="fill:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<h3>确定</h3>" +
    "</div>" +
    "</div>" +
    '<div class="j-marg"><p>' +
    b +
    "</p></div>" +
    '<div style="text-align:right;">' +
    '<button id="j_cancel" class="j-bg-btn j-layout-btn j-close-dialog">取消</button>' +
    '<button id="j_ok" class="j-bg-btn j-layout-btn j-close-dialog">确定</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(0);
}
function JlAlert(b) {
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-confirm-box j-div-center j-box-sha">' +
    '<div class="j-nowrap">' +
    '<div class="j-nowrap">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="12" r="10" style="fill:#f00;" />' +
    '<path d="M11 6 l2 0 l-0.5 9 l-1 0 z" style="fill:#fff;"/>' +
    '<circle cx="12" cy="17" r="1" style="fill:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<h3>注意</h3>" +
    "</div>" +
    "</div>" +
    '<div class="j-marg">' +
    "<p>" +
    b +
    "</p>" +
    "</div>" +
    '<div style="text-align:right;">' +
    '<button class="j-bg-btn j-layout-btn j-close-dialog">确认</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(0);
}
function RemoveDialog() {
  $(".j-dialog").remove();
}
function JlHttp(d, c, b, a) {
  console.log(`type:${d}`);
  console.log(`data:${c}`);
  console.log(`tag:${b}`);
  console.log(`other:${a}`);
  chrome.runtime.sendMessage(
    {
      url: "http://www.linkedinjl.com/actionten",
      action: "jlHttp",
      type: d,
      data: c,
      tag: b,
      other: a,
    },
    function (e) {}
  );
}
function ShowLoginDialog() {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-login-box j-bg-w j-div-center j-box-sha">' +
    '<div class="j-logo" style="margin:auto;"></div>' +
    '<p id="j_errmsg" class="j-errmsg">请登录领英精灵</p>' +
    "<div>" +
    '<input id="j_acc" type="text" placeholder="领英精灵账号">' +
    "</div>" +
    "<div>" +
    '<input id="j_pw" type="password" placeholder="登录密码">' +
    "</div>" +
    "<div>" +
    '<button id="j_login" class="j-login-btn j-bg-btn">登录</button>' +
    "</div>" +
    '<div class="j-nowrap">' +
    '<a href="http://linkedinjl.com/r" target="_black" title="前往免费注册">免费注册</a>' +
    '<a href="http://linkedinjl.com/resetpw" target="_black" title="找回密码">忘记密码</a>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
}
function Login() {
  var c = $.trim($("#j_acc").val());
  var b = /^[0-9a-zA-Z]{6,11}$/;
  if (!b.test(c)) {
    $("#j_errmsg").text("*账号错误");
    $("#j_errmsg").css("color", "#f00");
    $("#j_acc").focus();
    return false;
  } else {
    $("#j_errmsg").text("");
  }
  var a = $.trim($("#j_pw").val());
  b = /^[0-9a-zA-Z]{6,16}$/;
  if (!b.test(a)) {
    $("#j_errmsg").text("*密码错误");
    $("#j_errmsg").css("color", "#f00");
    $("#j_pw").focus();
    return false;
  } else {
    $("#j_errmsg").text("");
  }
  $("#j_errmsg").text("登录中...");
  $("#j_errmsg").css("color", "#00f");
  JlHttp("login", c, "", a);
}
function LoginEnter() {
  if (event.keyCode == 13) {
    Login();
  }
}
function LoginResult(b) {
  switch (parseInt(b["result"])) {
    case 0:
      $("#j_errmsg").html(
        '*账号不存在<a href="http://linkedinjl.com/r" target="_black">立即注册</a>'
      );
      $("#j_errmsg").css("color", "#f00");
      break;
    case 1:
      $(".j-dialog").remove();
      PointOut("登录成功", 1);
      var d = b["data"]["level"];
      var c = b["data"]["trial"];
      var a = b["data"]["account"];
      chrome.storage.sync.set(
        { account: [a], trial: [c], loginCode: [b["login_code"]], level: [d] },
        function () {
          // InitMember();
        }
      );
      break;
    case 2:
      $("#j_errmsg").text("*密码错误");
      $("#j_errmsg").css("color", "#f00");
      break;
    default:
      $("#j_errmsg").text("*登录失败");
      $("#j_errmsg").css("color", "#f00");
      PointOut("登录失败,请尝试重启浏览器");
      break;
  }
}
function GetName(c, b) {
  var a = "";
  if (isChinese(b)) {
    a = b + c;
  } else {
    a = c + " " + b;
  }
  return a;
}
function isChinese(a) {
  var b = new RegExp(/[^\u4e00-\u9fa5]/, "i");
  if (b.test(a)) {
    return false;
  } else {
    return true;
  }
}
function GetFirstName(a) {
  if (a.indexOf(" ") == -1) {
    if (a.length > 3) {
      return a.substring(2, a.length);
    } else {
      return a.substring(1, a.length);
    }
  } else {
    return a.substring(0, a.indexOf(" "));
  }
}
function GetLastName(a) {
  if (a.indexOf(" ") == -1) {
    if (a.length > 3) {
      return a.substring(0, 2);
    } else {
      return a.substring(0, 1);
    }
  } else {
    return a.substring(a.indexOf(" ") + 1);
  }
}
function ShowPaging(j, d, h, g) {
  $("#" + j).empty();
  d = parseInt(d);
  var b = Math.ceil(h / g);
  if (b > 1) {
    var a = d > 2 ? d - 2 : 1;
    var e = d + 2 > b ? b : d + 2;
    var c =
      '<div class="j-nowrap">' +
      '<div class="j-nowrap">' +
      '<input type="text" style="width:42px; margin-right:0px;" class="j-jump" title="输入页码，按回车键，直接跳到相应页" value="' +
      d +
      '">' +
      '<button class="j-bg-btn j-layout-btn j-jump-btn">跳到</button>' +
      "</div>" +
      '<div style="height:32px; padding-top:6px;">';
    if (a != 1) {
      c += '<a class="j-paging" title="首页">1</a>...';
    }
    for (var f = a; f <= e; f++) {
      if (f == d) {
        c += '<a class="j-curpage">' + f + "</a>";
      } else {
        c += '<a class="j-paging">' + f + "</a>";
      }
    }
    if (e != b) {
      c += '...<a class="j-paging" title="未页">' + b + "</a>";
    }
    c += "</div>" + "<div></div>" + "</div>";
    $("#" + j).append(c);
    $("#" + j).css("display", "block");
  } else {
    $("#" + j).css("display", "none");
    $("#" + j).empty();
  }
}
function InsertAfterText(b, e) {
  var a;
  if (document.selection) {
    b.focus();
    a = document.selection.createRange();
    a.text = e;
    b.focus();
  } else {
    if (b.selectionStart || b.selectionStart == "0") {
      var d = b.selectionStart;
      var c = b.selectionEnd;
      var f = b.scrollTop;
      b.value =
        b.value.substring(0, d) + e + b.value.substring(c, b.value.length);
      b.focus();
      b.selectionStart = d + e.length;
      b.selectionEnd = d + e.length;
      b.scrollTop = f;
    } else {
      b.value += e;
    }
  }
}
function ShowUpgrade(d, c, b) {
  b = b || "立即升级";
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-bg-w g-box-sha" style="width:35%;">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >' +
    '<circle cx="12" cy="12" r="10" style="fill:#f00;" />' +
    '<path d="M11 6 l2 0 l-0.5 9 l-1 0 z" style="fill:#fff;"/>' +
    '<circle cx="12" cy="17" r="1" style="fill:#fff;" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>" +
    d +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont" style="width:90%;>' +
    '<div class="j-diff-cont" ><div>' +
    "<p>" +
    c +
    "</p >" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-ctrl" style="width:90%; margin-top:12px;">' +
    '<a href="javascript:;" class="j-upgrade" style="margin-right:12px;" >查看权限</a>' +
    '<button class="j-upgrade j-bg-btn j-layout-btn">' +
    b +
    "</button>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
}
function ShowPropose() {
  $(".j-dialog").remove();
  var a =
    '<div class="j-dialog j-div-center">' +
    '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">' +
    '<div class="j-prompt-title j-bg-0 j-nowrap">' +
    '<div class="j-nowrap-left">' +
    "<div>" +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg">' +
    '<line x1="6" y1="12" x2="18" y2="12" />' +
    '<line x1="12" y1="6" x2="12" y2="18" />' +
    "</svg>" +
    "</div>" +
    "<div>" +
    "<p>我的建议</p>" +
    "</div>" +
    "</div>" +
    '<div title="关闭" class="j-close-dialog j-sha">' +
    '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" class="j-title-svg" >' +
    '<line x1="6" y1="6" x2="18" y2="18" />' +
    '<line x1="18" y1="6" x2="6" y2="18" />' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div class="j-prompt-cont">' +
    '</span><textarea id="j_propose" autofocus="autofocus" placeholder="欢迎提出您的宝贵建议，您的建议是我们改进的方向，我公司将认真听取您的建议（有关产品的问题、功能，需要添加什么功能都可以提出）" maxlength=200></textarea>' +
    "</div>" +
    '<div class="j-prompt-ctrl">' +
    '<button id="j_ok" class="j-bg-btn j-layout-btn">提交</button>' +
    "</div>" +
    "</div>" +
    "</div>";
  $("#j_lyjl_window").append(a);
  $(".j-dialog").fadeIn(200);
  $("#j_propose").focus();
  $("#j_ok").on("click", function () {
    var b = $.trim($("#j_propose").val());
    if (b) {
      JlHttp("propose", b, "", "");
      PointOut("提交成功");
      $(".j-dialog").remove();
    } else {
      PointOut("建议内容不能为空");
      $("#j_propose").focus();
      return false;
    }
  });
}
function StartThumbs() {
  chrome.storage.sync.get(
    { account: "", my_urn: "", trial: 0, run: false, level: 0 },
    function (b) {
      if (!String(b.account)) {
        ShowLoginDialog();
        return false;
      }
      if (!String(b.my_urn)) {
        JlConfirm("没有关联Linkedin账号，请先关联Linkedin账号，确定要关联吗？");
        $("#j_ok").click(function () {
          BindLinkedin(true);
        });
        return false;
      }
      if (b.run) {
        PointOut("正在批量操作中，请先停止操作，再进行批量点赞！");
        return false;
      }
      if (parseInt(b.level) < 1 && parseInt(b.trial) < 1) {
        ShowUpgrade(
          "试用期已过",
          "试用会员可试用一周，您的试用期已过，请升级会员使用",
          "立即升级"
        );
        return false;
      }
      var c = window.location.href;
      var a = new RegExp("/feed", "i");
      if (a.test(c)) {
        ActionCount = 0;
        ShowStatu("批量点赞中...");
        ShowOrHideWindow();
        BatchThumbs();
        chrome.storage.sync.set({ run: true }, function () {});
      } else {
        var d =
          '<div class="j-dialog j-div-center j-close-dialog">' +
          '<div class="j-prompt-box j-bg-w j-div-center j-box-sha" style="width:260px; text-align:center;">' +
          '<div style="margin:36px auto;">' +
          "<p>点赞前，请先切换到Linkedin首页</p>" +
          '<div style="margin:12px;"><a href="/feed/">前往Linkedin首页</a></div>' +
          "</div>" +
          "</div>" +
          "</div>";
        $("#j_lyjl_window").append(d);
        $(".j-dialog").fadeIn(200);
      }
    }
  );
}
function BatchThumbs() {
  chrome.storage.sync.get(
    {
      account: "",
      t_min_speed: 20,
      t_max_speed: 40,
      t_limit: 100,
      t_today_num: 0,
      risk: true,
      level: 0,
    },
    function (b) {
      if (!String(b.account)) {
        StopAction();
        setTimeout(function () {
          alert("没有登录领英精灵账号，可能有其它设备登录，被挤出");
        }, 50);
        return false;
      }
      if (parseInt(b.level) < 1 && parseInt(b.t_today_num) >= TestCount) {
        StopAction();
        setTimeout(function () {
          if (
            confirm(
              "试用名额已用完，试用会员每天有" +
                TestCount +
                "个试用名额，若要点赞更多，请升级会员使用"
            )
          ) {
            Upgrade();
          }
        }, 50);
        return false;
      }
      if (parseInt(b.t_today_num) >= parseInt(b.t_limit)) {
        StopAction();
        setTimeout(function () {
          alert(
            "今日累计点赞 " +
              parseInt(b.t_today_num) +
              " 条，已超设置的每日最多点赞量，请明天再来点赞或将每日点赞量设置大些！"
          );
        }, 50);
        return false;
      }
      var a = $("div.feed-shared-social-action-bar:first");
      if (a.length < 1) {
        StopAction();
        setTimeout(function () {
          alert("本次成功点赞 " + ActionCount + " 条动态");
        }, 50);
        return false;
      }
      if (
        a.find("button.react-button__trigger").attr("aria-pressed") == "true"
      ) {
        a.parents("div.relative").remove();
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "batchThumbs", other: "" },
            function (e) {}
          );
        }, 500);
      } else {
        a.find("button.react-button__trigger").click();
        setTimeout(function () {
          a.parents("div.relative").remove();
        }, 2000);
        ActionCount++;
        var c = parseInt(b.t_today_num) + 1;
        chrome.storage.sync.set({ t_today_num: [c] }, function () {});
        JlHttp("saveThumbsRecord", "", "", "");
        var d = GetTime(
          parseInt(b.t_today_num),
          parseInt(b.t_min_speed),
          parseInt(b.t_max_speed),
          b.risk
        );
        Delayed_time = d;
        DelayedTime();
        $("#j_action_count").text("本次已赞：" + ActionCount + "条");
        if (c > 100) {
          $("#j_today_count").html(
            '<font style="color:#f00;">今日已赞：' + c + "条</font>"
          );
        } else {
          $("#j_today_count").text("今日已赞：" + c + "条");
        }
        Timeout = setTimeout(function () {
          chrome.runtime.sendMessage(
            { action: "loop", result: "batchThumbs", other: "" },
            function (e) {}
          );
        }, d * 1000);
      }
    }
  );
}
function SaveThumbsRecordResult(a) {
  if (a && a["result"] == 1) {
  }
}
function getCookie(b) {
  var a,
    c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
  if ((a = document.cookie.match(c))) {
    return unescape(a[2]);
  } else {
    return null;
  }
}
Date.prototype.Format = function (a) {
  var c = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(a)) {
    a = a.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var b in c) {
    if (new RegExp("(" + b + ")").test(a)) {
      a = a.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? c[b] : ("00" + c[b]).substr(("" + c[b]).length)
      );
    }
  }
  return a;
};
function DelayedTime() {
  clearInterval(Countdown);
  $("#j_countdown").text("倒计时：" + Delayed_time + " 秒");
  Countdown = setInterval(function () {
    if (Delayed_time > 0) {
      Delayed_time--;
      $("#j_countdown").text("倒计时：" + Delayed_time + " 秒");
    } else {
      clearInterval(Countdown);
    }
  }, 1000);
}
function ShowStatu(b) {
  var a =
    '<div id="j_statu_dialog" class="j-gdialog j-box-sha" title="请不要关闭此页面，如要操作，请先停止">' +
    '<div class="j-warn">请不要关闭此页面，并保持此页面显示在最前面。如要操作，请先停止。</div>' +
    '<div class="j-statu-dialog j-box-sha">' +
    '<div class="j-bg-0 j-dialog-title j-nowrap">' +
    "<h3>领英精灵</h3>" +
    "<p>" +
    b +
    "</p>" +
    "</div>" +
    '<div class="j-nowrap">' +
    '<div class="j-statu-content">' +
    '<img id="j_head_img" src="https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/img/logo.png" class="j-statu-img rotation">' +
    "</div>" +
    '<div class="j-statu-content">' +
    '<p id="j_countdown">倒计时：秒</p>' +
    '<p id="j_action_count">本次：0 条</p>' +
    '<p id="j_today_count">今日：0 条</p>' +
    "</div>" +
    '<div class="j-statu-content">' +
    '<button id="j_stop_action" class="j-bg-btn j-layout-btn" title="停止操作">停止</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("body").append(a);
  $(".j-gdialog").fadeIn(0);
  chrome.storage.sync.set({ run: true }, function () {});
}
function StopAction() {
  chrome.storage.sync.set({ run: false }, function () {
    clearTimeout(Timeout);
    clearInterval(Countdown);
    $(".j-gdialog").remove();
  });
}
window.onbeforeunload = function (a) {
  StopAction();
};
function GetTime(c, d, a, f) {
  var b = 1;
  if (f) {
    switch (true) {
      case c < 100:
        b = 1;
        break;
      case c < 200:
        b = (c / 100) * 0.6;
        break;
      case c < 400:
        b = (c / 100) * 0.6;
        break;
      default:
        b = (c / 100) * 1.2;
        break;
    }
  }
  var e = parseInt(b * Math.ceil(Math.random() * (a - d) + d));
  return e;
}
function randomString(b) {
  b = b || 22;
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+0123456789";
  var a = c.length;
  var e = "";
  for (var d = 0; d < b; d++) {
    e += c.charAt(Math.floor(Math.random() * a));
  }
  return e;
}
function RandomTidings(c, a) {
  var e = Tidings.length;
  var d = "";
  if (e > 0) {
    var b = parseInt(e * Math.random());
    d = Tidings[b]["tidings"];
    d = d.replace(/\[FirstName\]/g, c);
    d = d.replace(/\[LastName\]/g, a);
  } else {
    d = false;
  }
  return d;
}
function Upgrade() {
  chrome.storage.sync.get({ account: "" }, function (a) {
    var b = "http://linkedinjl.com/upvip/acc/" + a.account;
    window.open(b);
  });
}
function GetLevel() {
  JlHttp("getLevel", "", "", "");
}
function GetLevelResult(b) {
  if (b && b["result"] == 1) {
    var d = b["data"]["level"];
    var c = b["data"]["trial"];
    var a = b["data"]["account"];
    chrome.storage.sync.set(
      { account: [a], trial: [c], level: [d] },
      function () {
        // InitMember();
      }
    );
    switch (d) {
      case "0":
        ShowUpgrade("试用会员", "你是试用会员，今天升级可享受特价。");
        break;
      case "1":
        PointOut("你是VIP会员！");
        break;
      case "2":
        PointOut("你是钻石会员！");
        break;
      case "3":
        PointOut("你是至尊会员！");
        break;
      default:
        ShowUpgrade("试用会员", "你是试用会员，今天升级可享受特价。");
        break;
    }
  } else {
    PointOut("失败，请尝试刷新页面或重启浏览器");
  }
}
function InitLog() {
  chrome.storage.sync.get({ today: 0 }, function (b) {
    var a = new Date(new Date().toLocaleDateString()).getTime();
    if (a > parseInt(b.today)) {
      chrome.storage.sync.set(
        {
          today: [a],
          s_today_num: 0,
          a_today_num: 0,
          t_today_num: 0,
          d_today_num: 0,
          r_today_num: 0,
          fast: true,
        },
        function () {}
      );
    }
  });
}

function ArrangeFid(c) {
  if (c.length == 0) {
    return "";
  }
  var a = c.split("/in/");
  var b = a[a.length - 1];
  b = b.replace(/\//g, "");
  return b;
}

function GetUrlParam(b, a) {
  var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
  var d = b.substr(1).match(c);
  if (d != null) {
    return unescape(d[2]);
  } else {
    return null;
  }
}

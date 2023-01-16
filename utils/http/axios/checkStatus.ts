// import { useMessage } from '/@/hooks/web/useMessage';
// import { useI18n } from '/@/hooks/web/useI18n';
// import router from '/@/router';
// import { useUserStoreWidthOut } from '/@/store/modules/user';

// const { createMessage } = useMessage();

// const error = createMessage.error!;
export function checkStatus(status: number, msg: string): void {
  // const { t } = useI18n();
  // const userStore = useUserStoreWidthOut();
  switch (status) {
    case 400:
      // error(`${msg}`);
      break;
    // 401: 未登录
    // 如果未登录，跳转到登录页面，并携带当前页面的路径
    // 成功登录后返回当前页面。此步骤需要在登录页面上操作。
    case 401 || 10091:
      // error(t('sys.api.errMsg401'));
      // userStore.setToken(undefined);
      // userStore.setSessionTimeout(true);
      break;
    case 403:
      // error(t('sys.api.errMsg403'));
      break;
    // 404请求不存在
    case 404:
      // error(t('sys.api.errMsg404'));
      break;
    case 405:
      // error(t('sys.api.errMsg405'));
      break;
    case 408:
      // error(t('sys.api.errMsg408'));
      break;
    case 500:
      // error(t('sys.api.errMsg500'));
      break;
    case 501:
      // error(t('sys.api.errMsg501'));
      break;
    case 502:
      // error(t('sys.api.errMsg502'));
      break;
    case 503:
      // error(t('sys.api.errMsg503'));
      break;
    case 504:
      // error(t('sys.api.errMsg504'));
      break;
    case 505:
      // error(t('sys.api.errMsg505'));
      break;
    default:
  }
}

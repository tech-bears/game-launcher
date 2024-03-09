export const CAPTHCHA_CONFIG = {

}

export const clearAliyunCaptcha = () => {
  document.getElementById('aliyunCaptcha-mask')?.remove();
  document.getElementById('aliyunCaptcha-window-popup')?.remove();
}


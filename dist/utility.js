

window.UtilityWidget = function () {
  return {
    iframe: null,
    baseurl: "https://utility-virid.vercel.app/",
    key: '',
    defaultOverflow: '',
    data: null,
    callbacks: {
      ready: null,
      completed: null,
      cancel: null,
      close: null,
      offer: null,
      offerSelected: null,
      request: null,
    },
    init: function (config) {
      if (!config) return alert('Unable to setup!');
      this.configure(config);
      return this;
    },
    configure: function (config = {}) {
      this.key = config.key
      this.data = config.data;
      this.callbacks.ready = config.onReady
      this.callbacks.completed = config.onCompleted;
      this.callbacks.cancel = config.onCancel;
      this.callbacks.close = config.onClose;
      this.callbacks.offer = config.onOffer;
      this.callbacks.offerSelected = config.onOfferSelected;
      this.callbacks.request = config.onRequest;
      this.path = config.path || '';
    },
    open: function () {
      this.disableBodyScroll(true);
      this.launchIframe();
      return this;
    },
    close: function () {
      if (this.iframe) this.iframe.remove();
      this.enableBodyScroll();
    },
    jsonToBase64: function (obj) {
      return btoa(encodeURIComponent(JSON.stringify(obj)));
    },
    launchIframe: function () {
      const token = this.jsonToBase64(this.data);
      const url = new URL(this.baseurl.concat(this.path.replace(/^\//, '')));
      url.searchParams.set('token', token);
      const iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", url.href);
      iframe.setAttribute("allow", "geolocation");
      iframe.setAttribute('allow', 'clipboard-write');
      const style = {
        'z-index': '999999',
        display: 'block',
        background: 'rgba(0, 0, 0, 0.004)',
        border: '0px none transparent',
        overflow: 'hidden',
        visibility: 'visible',
        margin: '0px',
        padding: '0px',
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
      };
      Object.assign(iframe.style, style);
      iframe.marginwidth = "0";
      iframe.marginheight = "0";
      iframe.frameBorder = "0";
      iframe.vspace = "0";
      iframe.id = 'data-collection-widget';
      this.iframe = iframe;
      document.body.append(iframe);
    },
   enableBodyScroll() {
      document.body.style.overflow = this.defaultOverflow;
    },
    disableBodyScroll() {
      this.defaultOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  };
}();
//SLIDER
document.addEventListener('DOMContentLoaded', () => {
    
        
      const lbox_links = document.querySelectorAll('.lbox-open');
      const lbox = document.querySelector('.lbox');
      const lboxClose = document.querySelector('.lbox__close');      
      const lockPadding = document.querySelectorAll('body');
      var body = document.querySelector('body');
      var lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

      for (let i = 0; i < lbox_links.length; i++) {  
        lbox_links[i].onclick = function() {
          lbox.classList.add('show');
          body.classList.add('lock');
          for (let i = 0; i < lockPadding.length; i++) {
            lockPadding[i].style.paddingRight = lockPaddingValue;
          }
        }
      }

      lbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lbox.classList.remove('show');
        setTimeout(function() {
          body.classList.remove('lock');
          for (let i = 0; i < lockPadding.length; i++) {
            lockPadding[i].style.paddingRight = null;
          }
        }, 500);
      })

      lboxClose.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lbox.classList.remove('show');
        setTimeout(function() {
          body.classList.remove('lock');
          for (let i = 0; i < lockPadding.length; i++) {
            lockPadding[i].style.paddingRight = null;
          }
        }, 500);
      })
      
      

      $('[type="tel"]').inputmask('+7 (999) 999-99-99',
      { 
        "greedy": true ,
        "digits": 9
      });

      $('[type="text"]').on('input', function(){     
        this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
        /*if (!this.value.match(/[^0-9]/g) || $(this).val() == "") {
          $('#phone_attention').addClass('show');
        } else {
          setTimeout(function() {            
            $('#phone_attention').removeClass('show');
          }, 1000);
        }*/
      });

      $('form button').attr('disabled', 'disabled');
      $('[type="tel"]').on('click input blur focus change keyup keydown', checkPhone);
      function checkPhone() {
        if ( $(this).val().length >  1 && !$(this).val().includes('_') ) {
          $('form button').removeAttr('disabled');
        }
        else{
          $('form button').attr('disabled', 'disabled');
          $('#phone_attention').addClass('show');
          setTimeout(function() {            
            $('#phone_attention').removeClass('show');
          }, 1000);
        }
      }
      
      let modal = $('#callback');
      let succesModal = $('#consultation');

      $("#form").submit(function() {
        var th = $(this);
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize()
        }).done(function() {
          modal.removeClass('show');
          succesModal.addClass('show');
          setTimeout(function() {
            $('body').removeClass('lock').css('padding-right', 0);
            succesModal.removeClass('show');
          }, 3500);
          th.trigger("reset");
        });
        return false;
      });

      function reinitSwiper(swiper) {
         setTimeout(function () {
            swiper.update();
         }, 500);
      }
      const swiper = new Swiper('.swiper-container', {
         loop: false,
         speed: 1700,
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
      })
      const swiper1 = new Swiper('.swiper-right', {
         speed: 1400,
         lazy: true,
         slidesPerView: 1,
         loop: false,
         preloadImages: true,
         navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
         },
         breakpoints: {
            600: {
               loop: true,
            }
         }
      })
      

      // LAZYLOAD
      reinitSwiper(swiper1);


      //SCROLL

      const a = document.querySelectorAll('[data-goto]') // a = массив ссылок

      if (a.length > 0) {
         a.forEach(menyLink => { //Отслеживаем клик на ссылку
            menyLink.addEventListener("click", onMenyLinkClick) //при нажатии на ссылку
         }) //вызываем функцию
      }

      function onMenyLinkClick(e) { //е переменная которая содержит событие клика
         let menyLink = e.target; //ссылка на объект 
         if (!menyLink.dataset.goto) {
            menyLink = menyLink.closest('[data-goto]');
            console.log(menyLink);
         }
         if (menyLink.dataset.goto && document.querySelector(menyLink.dataset.goto)) {
            //если у этого объекта есть атрибут дата и есть класс с названием этого атрибута
            menuDisplay.classList.remove('_active');
            menuBurger.classList.remove('_active');
            document.body.classList.remove('_lock');
            const gotoBlock = document.querySelector(menyLink.dataset.goto);
            //gotoBlock = блок с классом 
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            //позиция элемента относительно .top + позиция скролла и минус размер хедара
            window.scrollTo({
               top: gotoBlockValue, //перемещаем
               behavior: "smooth" //плавно
            })
            e.preventDefault();
         }
      }

      //========================================================================================================================================================
      //SlideToggle
      let _slideUp = (target, duration = 500) => {
         if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
               target.hidden = true;
               target.style.removeProperty('height');
               target.style.removeProperty('padding-top');
               target.style.removeProperty('padding-bottom');
               target.style.removeProperty('margin-top');
               target.style.removeProperty('margin-bottom');
               target.style.removeProperty('overflow');
               target.style.removeProperty('transition-duration');
               target.style.removeProperty('transition-property');
               target.classList.remove('_slide');
            }, duration);
         }
      }
      let _slideDown = (target, duration = 500) => {
         if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
               target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
               target.style.removeProperty('height');
               target.style.removeProperty('overflow');
               target.style.removeProperty('transition-duration');
               target.style.removeProperty('transition-property');
               target.classList.remove('_slide');
            }, duration);
         }
      }
      let _slideToggle = (target, duration = 500) => {
         if (target.hidden) {
            return _slideDown(target, duration);
         } else {
            return _slideUp(target, duration);
         }
      }

      //MODAL

      const sliderItems = document.querySelectorAll('.slider__item');
      if (sliderItems.length > 0) {
         sliderItems.forEach(menyLink => { //Отслеживаем клик на ссылку
            menyLink.addEventListener("click", moveImg) //при нажатии на ссылку
         }) //вызываем функцию
      }

      function moveImg(e) { //е переменная которая содержит событие клика
         const menyLink = e.target; //ссылка на объект 
         const modal = document.querySelector('.hystmodal__window');
         if (modal.children[1])
            modal.removeChild(modal.children[1]);
         modal.appendChild(menyLink.cloneNode(true));
         e.preventDefault();
      }

      ! function (e) {
         var t = {};

         function n(i) {
            if (t[i]) return t[i].exports;
            var o = t[i] = {
               i: i,
               l: !1,
               exports: {}
            };
            return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
         }
         n.m = e, n.c = t, n.d = function (e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
               enumerable: !0,
               get: i
            })
         }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
               value: "Module"
            }), Object.defineProperty(e, "__esModule", {
               value: !0
            })
         }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                  enumerable: !0,
                  value: e
               }), 2 & t && "string" != typeof e)
               for (var o in e) n.d(i, o, function (t) {
                  return e[t]
               }.bind(null, o));
            return i
         }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
               return e.default
            } : function () {
               return e
            };
            return n.d(t, "a", t), t
         }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
         }, n.p = "", n(n.s = 1)
      }([function (e, t, n) {
         "use strict";

         function i() {
            return (i = Object.assign || function (e) {
               for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
               }
               return e
            }).apply(this, arguments)
         }

         function o(e, t) {
            for (var n = 0; n < t.length; n++) {
               var i = t[n];
               i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
         }
         n.d(t, "a", (function () {
            return l
         }));
         var s, r, a, l = function () {
            function e(t) {
               ! function (e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
               }(this, e);
               this.config = i({
                  backscroll: !0,
                  linkAttributeName: "data-hystmodal",
                  closeOnOverlay: !0,
                  closeOnEsc: !0,
                  closeOnButton: !0,
                  waitTransitions: !1,
                  catchFocus: !0,
                  fixedSelectors: "*[data-hystfixed]",
                  beforeOpen: function () {},
                  afterClose: function () {}
               }, t), this.config.linkAttributeName && this.init(), this._closeAfterTransition = this._closeAfterTransition.bind(this)
            }
            var t, n, s;
            return t = e, (n = [{
               key: "init",
               value: function () {
                  this.isOpened = !1, this.openedWindow = !1, this.starter = !1, this._nextWindows = !1, this._scrollPosition = 0, this._reopenTrigger = !1, this._overlayChecker = !1, this._isMoved = !1, this._focusElements = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], this._modalBlock = !1, e._shadow || (e._shadow = document.createElement("button"), e._shadow.classList.add("hystmodal__shadow"), document.body.appendChild(e._shadow)), this.eventsFeeler()
               }
            }, {
               key: "eventsFeeler",
               value: function () {
                  document.addEventListener("click", function (e) {
                     var t = e.target.closest("[" + this.config.linkAttributeName + "]");
                     if (!this._isMoved && t) {
                        e.preventDefault(), this.starter = t;
                        var n = this.starter.getAttribute(this.config.linkAttributeName);
                        return this._nextWindows = document.querySelector(n), void this.open()
                     }
                     this.config.closeOnButton && e.target.closest("[data-hystclose]") && this.close()
                  }.bind(this)), this.config.closeOnOverlay && (document.addEventListener("mousedown", function (e) {
                     !this._isMoved && e.target instanceof Element && !e.target.classList.contains("hystmodal__wrap") || (this._overlayChecker = !0)
                  }.bind(this)), document.addEventListener("mouseup", function (e) {
                     if (!this._isMoved && e.target instanceof Element && this._overlayChecker && e.target.classList.contains("hystmodal__wrap")) return e.preventDefault(), this._overlayChecker, void this.close();
                     this._overlayChecker = !1
                  }.bind(this))), window.addEventListener("keydown", function (e) {
                     if (!this._isMoved && this.config.closeOnEsc && 27 == e.which && this.isOpened) return e.preventDefault(), void this.close();
                     !this._isMoved && this.config.catchFocus && 9 == e.which && this.isOpened && this.focusCatcher(e)
                  }.bind(this))
               }
            }, {
               key: "open",
               value: function (t) {
                  if (t && (this._nextWindows = "string" == typeof t ? document.querySelector(t) : t), this._nextWindows) {
                     if (this.isOpened) return this._reopenTrigger = !0, void this.close();
                     this.openedWindow = this._nextWindows, this._modalBlock = this.openedWindow.querySelector(".hystmodal__window"), this.config.beforeOpen(this), this._bodyScrollControl(), e._shadow.classList.add("hystmodal__shadow--show"), this.openedWindow.classList.add("hystmodal--active"), this.openedWindow.setAttribute("aria-hidden", "false"), this.config.catchFocus && this.focusContol(), this.isOpened = !0
                  } else console.log("Warinig: hustModal selector is not found")
               }
            }, {
               key: "close",
               value: function () {
                  this.isOpened && (this.config.waitTransitions ? (this.openedWindow.classList.add("hystmodal--moved"), this._isMoved = !0, this.openedWindow.addEventListener("transitionend", this._closeAfterTransition), this.openedWindow.classList.remove("hystmodal--active")) : (this.openedWindow.classList.remove("hystmodal--active"), this._closeAfterTransition()))
               }
            }, {
               key: "_closeAfterTransition",
               value: function () {
                  this.openedWindow.classList.remove("hystmodal--moved"), this.openedWindow.removeEventListener("transitionend", this._closeAfterTransition), this._isMoved = !1, e._shadow.classList.remove("hystmodal__shadow--show"), this.openedWindow.setAttribute("aria-hidden", "true"), this.config.catchFocus && this.focusContol(), this._bodyScrollControl(), this.isOpened = !1, this.openedWindow.scrollTop = 0, this.config.afterClose(this), this._reopenTrigger && (this._reopenTrigger = !1, this.open())
               }
            }, {
               key: "focusContol",
               value: function () {
                  var e = this.openedWindow.querySelectorAll(this._focusElements);
                  this.isOpened && this.starter ? this.starter.focus() : e.length && e[0].focus()
               }
            }, {
               key: "focusCatcher",
               value: function (e) {
                  var t = this.openedWindow.querySelectorAll(this._focusElements),
                     n = Array.prototype.slice.call(t);
                  if (this.openedWindow.contains(document.activeElement)) {
                     var i = n.indexOf(document.activeElement);
                     console.log(i), e.shiftKey && 0 === i && (n[n.length - 1].focus(), e.preventDefault()), e.shiftKey || i !== n.length - 1 || (n[0].focus(), e.preventDefault())
                  } else n[0].focus(), e.preventDefault()
               }
            }, {
               key: "_bodyScrollControl",
               value: function () {
                  if (this.config.backscroll) {
                     var e = Array.prototype.slice.call(document.querySelectorAll(this.config.fixedSelectors)),
                        t = document.documentElement;
                     if (!0 === this.isOpened) return t.classList.remove("hystmodal__opened"), t.style.marginRight = "", e.map((function (e) {
                        e.style.marginRight = ""
                     })), window.scrollTo(0, this._scrollPosition), void(t.style.top = "");
                     this._scrollPosition = window.pageYOffset;
                     var n = window.innerWidth - t.clientWidth;
                     t.style.top = -this._scrollPosition + "px", n && (t.style.marginRight = n + "px", e.map((function (e) {
                        e.style.marginRight = parseInt(getComputedStyle(e).marginRight) + n + "px"
                     }))), t.classList.add("hystmodal__opened")
                  }
               }
            }]) && o(t.prototype, n), s && o(t, s), e
         }();
         a = !1, (r = "_shadow") in (s = l) ? Object.defineProperty(s, r, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
         }) : s[r] = a
      }, function (e, t, n) {
         "use strict";
         n.r(t),
            function (e) {
               var t = n(0);
               n(3), n(4);
               e.HystModal = t.a
            }.call(this, n(2))
      }, function (e, t) {
         var n;
         n = function () {
            return this
         }();
         try {
            n = n || new Function("return this")()
         } catch (e) {
            "object" == typeof window && (n = window)
         }
         e.exports = n
      }, function (e, t) {
         Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function (e) {
            var t = this;
            do {
               if (t.matches(e)) return t;
               t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
         })
      }, function (e, t, n) {}]);
      const myModal = new HystModal({
         linkAttributeName: "data-hystmodal",
         //settings (optional). see Configuration
      });

   })

   /*! lazysizes - v5.3.2 */

   ! function (e) {
      var t = function (u, D, f) {
         "use strict";
         var k, H;
         if (function () {
               var e;
               var t = {
                  lazyClass: "lazyload",
                  loadedClass: "lazyloaded",
                  loadingClass: "lazyloading",
                  preloadClass: "lazypreload",
                  errorClass: "lazyerror",
                  autosizesClass: "lazyautosizes",
                  fastLoadedClass: "ls-is-cached",
                  iframeLoadMode: 0,
                  srcAttr: "data-src",
                  srcsetAttr: "data-srcset",
                  sizesAttr: "data-sizes",
                  minSize: 40,
                  customMedia: {},
                  init: true,
                  expFactor: 1.5,
                  hFac: .8,
                  loadMode: 2,
                  loadHidden: true,
                  ricTimeout: 0,
                  throttleDelay: 125
               };
               H = u.lazySizesConfig || u.lazysizesConfig || {};
               for (e in t) {
                  if (!(e in H)) {
                     H[e] = t[e]
                  }
               }
            }(), !D || !D.getElementsByClassName) {
            return {
               init: function () {},
               cfg: H,
               noSupport: true
            }
         }
         var O = D.documentElement,
            i = u.HTMLPictureElement,
            P = "addEventListener",
            $ = "getAttribute",
            q = u[P].bind(u),
            I = u.setTimeout,
            U = u.requestAnimationFrame || I,
            o = u.requestIdleCallback,
            j = /^picture$/i,
            r = ["load", "error", "lazyincluded", "_lazyloaded"],
            a = {},
            G = Array.prototype.forEach,
            J = function (e, t) {
               if (!a[t]) {
                  a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
               }
               return a[t].test(e[$]("class") || "") && a[t]
            },
            K = function (e, t) {
               if (!J(e, t)) {
                  e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
               }
            },
            Q = function (e, t) {
               var a;
               if (a = J(e, t)) {
                  e.setAttribute("class", (e[$]("class") || "").replace(a, " "))
               }
            },
            V = function (t, a, e) {
               var i = e ? P : "removeEventListener";
               if (e) {
                  V(t, a)
               }
               r.forEach(function (e) {
                  t[i](e, a)
               })
            },
            X = function (e, t, a, i, r) {
               var n = D.createEvent("Event");
               if (!a) {
                  a = {}
               }
               a.instance = k;
               n.initEvent(t, !i, !r);
               n.detail = a;
               e.dispatchEvent(n);
               return n
            },
            Y = function (e, t) {
               var a;
               if (!i && (a = u.picturefill || H.pf)) {
                  if (t && t.src && !e[$]("srcset")) {
                     e.setAttribute("srcset", t.src)
                  }
                  a({
                     reevaluate: true,
                     elements: [e]
                  })
               } else if (t && t.src) {
                  e.src = t.src
               }
            },
            Z = function (e, t) {
               return (getComputedStyle(e, null) || {})[t]
            },
            s = function (e, t, a) {
               a = a || e.offsetWidth;
               while (a < H.minSize && t && !e._lazysizesWidth) {
                  a = t.offsetWidth;
                  t = t.parentNode
               }
               return a
            },
            ee = function () {
               var a, i;
               var t = [];
               var r = [];
               var n = t;
               var s = function () {
                  var e = n;
                  n = t.length ? r : t;
                  a = true;
                  i = false;
                  while (e.length) {
                     e.shift()()
                  }
                  a = false
               };
               var e = function (e, t) {
                  if (a && !t) {
                     e.apply(this, arguments)
                  } else {
                     n.push(e);
                     if (!i) {
                        i = true;
                        (D.hidden ? I : U)(s)
                     }
                  }
               };
               e._lsFlush = s;
               return e
            }(),
            te = function (a, e) {
               return e ? function () {
                  ee(a)
               } : function () {
                  var e = this;
                  var t = arguments;
                  ee(function () {
                     a.apply(e, t)
                  })
               }
            },
            ae = function (e) {
               var a;
               var i = 0;
               var r = H.throttleDelay;
               var n = H.ricTimeout;
               var t = function () {
                  a = false;
                  i = f.now();
                  e()
               };
               var s = o && n > 49 ? function () {
                  o(t, {
                     timeout: n
                  });
                  if (n !== H.ricTimeout) {
                     n = H.ricTimeout
                  }
               } : te(function () {
                  I(t)
               }, true);
               return function (e) {
                  var t;
                  if (e = e === true) {
                     n = 33
                  }
                  if (a) {
                     return
                  }
                  a = true;
                  t = r - (f.now() - i);
                  if (t < 0) {
                     t = 0
                  }
                  if (e || t < 9) {
                     s()
                  } else {
                     I(s, t)
                  }
               }
            },
            ie = function (e) {
               var t, a;
               var i = 99;
               var r = function () {
                  t = null;
                  e()
               };
               var n = function () {
                  var e = f.now() - a;
                  if (e < i) {
                     I(n, i - e)
                  } else {
                     (o || r)(r)
                  }
               };
               return function () {
                  a = f.now();
                  if (!t) {
                     t = I(n, i)
                  }
               }
            },
            e = function () {
               var v, m, c, h, e;
               var y, z, g, p, C, b, A;
               var n = /^img$/i;
               var d = /^iframe$/i;
               var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
               var _ = 0;
               var w = 0;
               var M = 0;
               var N = -1;
               var L = function (e) {
                  M--;
                  if (!e || M < 0 || !e.target) {
                     M = 0
                  }
               };
               var x = function (e) {
                  if (A == null) {
                     A = Z(D.body, "visibility") == "hidden"
                  }
                  return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
               };
               var W = function (e, t) {
                  var a;
                  var i = e;
                  var r = x(e);
                  g -= t;
                  b += t;
                  p -= t;
                  C += t;
                  while (r && (i = i.offsetParent) && i != D.body && i != O) {
                     r = (Z(i, "opacity") || 1) > 0;
                     if (r && Z(i, "overflow") != "visible") {
                        a = i.getBoundingClientRect();
                        r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1
                     }
                  }
                  return r
               };
               var t = function () {
                  var e, t, a, i, r, n, s, o, l, u, f, c;
                  var d = k.elements;
                  if ((h = H.loadMode) && M < 8 && (e = d.length)) {
                     t = 0;
                     N++;
                     for (; t < e; t++) {
                        if (!d[t] || d[t]._lazyRace) {
                           continue
                        }
                        if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
                           R(d[t]);
                           continue
                        }
                        if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                           n = w
                        }
                        if (!u) {
                           u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
                           k._defEx = u;
                           f = u * H.expFactor;
                           c = H.hFac;
                           A = null;
                           if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                              w = f;
                              N = 0
                           } else if (h > 1 && N > 1 && M < 6) {
                              w = u
                           } else {
                              w = _
                           }
                        }
                        if (l !== n) {
                           y = innerWidth + n * c;
                           z = innerHeight + n;
                           s = n * -1;
                           l = n
                        }
                        a = d[t].getBoundingClientRect();
                        if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
                           R(d[t]);
                           r = true;
                           if (M > 9) {
                              break
                           }
                        } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
                           i = v[0] || d[t]
                        }
                     }
                     if (i && !r) {
                        R(i)
                     }
                  }
               };
               var a = ae(t);
               var S = function (e) {
                  var t = e.target;
                  if (t._lazyCache) {
                     delete t._lazyCache;
                     return
                  }
                  L(e);
                  K(t, H.loadedClass);
                  Q(t, H.loadingClass);
                  V(t, B);
                  X(t, "lazyloaded")
               };
               var i = te(S);
               var B = function (e) {
                  i({
                     target: e.target
                  })
               };
               var T = function (e, t) {
                  var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
                  if (a == 0) {
                     e.contentWindow.location.replace(t)
                  } else if (a == 1) {
                     e.src = t
                  }
               };
               var F = function (e) {
                  var t;
                  var a = e[$](H.srcsetAttr);
                  if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
                     e.setAttribute("media", t)
                  }
                  if (a) {
                     e.setAttribute("srcset", a)
                  }
               };
               var s = te(function (t, e, a, i, r) {
                  var n, s, o, l, u, f;
                  if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
                     if (i) {
                        if (a) {
                           K(t, H.autosizesClass)
                        } else {
                           t.setAttribute("sizes", i)
                        }
                     }
                     s = t[$](H.srcsetAttr);
                     n = t[$](H.srcAttr);
                     if (r) {
                        o = t.parentNode;
                        l = o && j.test(o.nodeName || "")
                     }
                     f = e.firesLoad || "src" in t && (s || n || l);
                     u = {
                        target: t
                     };
                     K(t, H.loadingClass);
                     if (f) {
                        clearTimeout(c);
                        c = I(L, 2500);
                        V(t, B, true)
                     }
                     if (l) {
                        G.call(o.getElementsByTagName("source"), F)
                     }
                     if (s) {
                        t.setAttribute("srcset", s)
                     } else if (n && !l) {
                        if (d.test(t.nodeName)) {
                           T(t, n)
                        } else {
                           t.src = n
                        }
                     }
                     if (r && (s || l)) {
                        Y(t, {
                           src: n
                        })
                     }
                  }
                  if (t._lazyRace) {
                     delete t._lazyRace
                  }
                  Q(t, H.lazyClass);
                  ee(function () {
                     var e = t.complete && t.naturalWidth > 1;
                     if (!f || e) {
                        if (e) {
                           K(t, H.fastLoadedClass)
                        }
                        S(u);
                        t._lazyCache = true;
                        I(function () {
                           if ("_lazyCache" in t) {
                              delete t._lazyCache
                           }
                        }, 9)
                     }
                     if (t.loading == "lazy") {
                        M--
                     }
                  }, true)
               });
               var R = function (e) {
                  if (e._lazyRace) {
                     return
                  }
                  var t;
                  var a = n.test(e.nodeName);
                  var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
                  var r = i == "auto";
                  if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
                     return
                  }
                  t = X(e, "lazyunveilread").detail;
                  if (r) {
                     re.updateElem(e, true, e.offsetWidth)
                  }
                  e._lazyRace = true;
                  M++;
                  s(e, t, r, i, a)
               };
               var r = ie(function () {
                  H.loadMode = 3;
                  a()
               });
               var o = function () {
                  if (H.loadMode == 3) {
                     H.loadMode = 2
                  }
                  r()
               };
               var l = function () {
                  if (m) {
                     return
                  }
                  if (f.now() - e < 999) {
                     I(l, 999);
                     return
                  }
                  m = true;
                  H.loadMode = 3;
                  a();
                  q("scroll", o, true)
               };
               return {
                  _: function () {
                     e = f.now();
                     k.elements = D.getElementsByClassName(H.lazyClass);
                     v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
                     q("scroll", a, true);
                     q("resize", a, true);
                     q("pageshow", function (e) {
                        if (e.persisted) {
                           var t = D.querySelectorAll("." + H.loadingClass);
                           if (t.length && t.forEach) {
                              U(function () {
                                 t.forEach(function (e) {
                                    if (e.complete) {
                                       R(e)
                                    }
                                 })
                              })
                           }
                        }
                     });
                     if (u.MutationObserver) {
                        new MutationObserver(a).observe(O, {
                           childList: true,
                           subtree: true,
                           attributes: true
                        })
                     } else {
                        O[P]("DOMNodeInserted", a, true);
                        O[P]("DOMAttrModified", a, true);
                        setInterval(a, 999)
                     }
                     q("hashchange", a, true);
                     ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
                        D[P](e, a, true)
                     });
                     if (/d$|^c/.test(D.readyState)) {
                        l()
                     } else {
                        q("load", l);
                        D[P]("DOMContentLoaded", a);
                        I(l, 2e4)
                     }
                     if (k.elements.length) {
                        t();
                        ee._lsFlush()
                     } else {
                        a()
                     }
                  },
                  checkElems: a,
                  unveil: R,
                  _aLSL: o
               }
            }(),
            re = function () {
               var a;
               var n = te(function (e, t, a, i) {
                  var r, n, s;
                  e._lazysizesWidth = i;
                  i += "px";
                  e.setAttribute("sizes", i);
                  if (j.test(t.nodeName || "")) {
                     r = t.getElementsByTagName("source");
                     for (n = 0, s = r.length; n < s; n++) {
                        r[n].setAttribute("sizes", i)
                     }
                  }
                  if (!a.detail.dataAttr) {
                     Y(e, a.detail)
                  }
               });
               var i = function (e, t, a) {
                  var i;
                  var r = e.parentNode;
                  if (r) {
                     a = s(e, r, a);
                     i = X(e, "lazybeforesizes", {
                        width: a,
                        dataAttr: !!t
                     });
                     if (!i.defaultPrevented) {
                        a = i.detail.width;
                        if (a && a !== e._lazysizesWidth) {
                           n(e, r, i, a)
                        }
                     }
                  }
               };
               var e = function () {
                  var e;
                  var t = a.length;
                  if (t) {
                     e = 0;
                     for (; e < t; e++) {
                        i(a[e])
                     }
                  }
               };
               var t = ie(e);
               return {
                  _: function () {
                     a = D.getElementsByClassName(H.autosizesClass);
                     q("resize", t)
                  },
                  checkElems: t,
                  updateElem: i
               }
            }(),
            t = function () {
               if (!t.i && D.getElementsByClassName) {
                  t.i = true;
                  re._();
                  e._()
               }
            };
         return I(function () {
            H.init && t()
         }), k = {
            cfg: H,
            autoSizer: re,
            loader: e,
            init: t,
            uP: Y,
            aC: K,
            rC: Q,
            hC: J,
            fire: X,
            gW: s,
            rAF: ee
         }
      }(e, e.document, Date);
      e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t)
   }("undefined" != typeof window ? window : {});

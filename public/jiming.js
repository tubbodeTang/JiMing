(function (window, document) {
    var currentPosition = 0; // 记录当前页面位置
    // var currentPoint = -1;   // 记录当前点的位置
    //  var pageNow = 1;   // 当前页码
    //  var points = null; // 页码数

    var isFirstRender = [true, true, true, true, true, true];
    var setPosition = [1995, 2145, 4828, 4958, 7611, 7761];


    //- 设置html标签font-size
    var _root = document.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function () {
            var clientWidth = _root.clientWidth,
                fontSize = 20;
            if (!clientWidth) return;
            if (clientWidth < 640) {
                fontSize = 20 * (clientWidth / 320);
            } else {
                fontSize = 20 * (640 / 320);
            }
            _root.style.fontSize = fontSize + 'px';
        };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvent, resizeCallback, false);
    document.addEventListener('DOMContentLoaded', resizeCallback, false);


    var app = {
        init: function () {
            if (/(windows)/i.test(navigator.userAgent)) {
                location.href = './pc.html';
            }
            document.addEventListener('DOMContentLoaded', function () {
                //  points = document.querySelectorAll('.pagenumber div');
                btn = document.querySelector('#panelBtn');
                btnclose = document.querySelector('#btnclose');
                modal = document.querySelector('#modal');
                app.bindTouchEvent(); // 绑定触摸事件
                app.bindBtnClick();   // 绑定按钮点击事件
                //   app.setPageNow();     // 设置初始页码
            }.bind(app), false);
        }(),


        bindBtnClick: function () {
            btn.addEventListener('touchstart', function () {
                modal.className = "modal show";
            })

            btnclose.addEventListener('touchstart', function () {
                modal.className = "modal hide";
            })
        },


        // 页面平移
        transform: function (translate) {
            this.style.webkitTransform = 'translate3d(0, ' + translate + 'px, 0)';
            currentPosition = translate;
        },


        // 对话
        showConversation: function (setNum, pageHeight) {
            if (currentPosition <= -pageHeight - setPosition[setNum - 1] + 100) {
                if (isFirstRender[setNum - 1]) {
                    var conver = document.querySelector('#conver_' + setNum);
                    var img = conver.children;
                    img[0].className = "show";
                    setInterval(() => {
                        img[0].className = "hide";
                        img[1].className = "show";
                    }, 1500)
                    isFirstRender[setNum - 1] = false;
                }
            }
        },

        /**
         * 设置当前页码
         */
        // setPageNow: function () {
        //     if (currentPoint != -1) {
        //         points[currentPoint].className = '';
        //     }
        //     currentPoint = pageNow - 1;
        //     points[currentPoint].className = 'now';
        // },

        /**
         * 绑定触摸事件
         */
        bindTouchEvent: function () {
            var viewport = document.querySelector('#viewport');
            var pageHeight = window.innerHeight; // 页面高度
            // var maxHeight = - pageHeight * (points.length - 1); // 页面滑动最后一页的位置
            var maxHeight = - viewport.clientHeight; // 页面滑动最后一页的位置
            var startX, startY;
            var initialPos = 0;  // 手指按下的屏幕位置
            var moveLength = 0;  // 手指当前滑动的距离
            var direction = 'left'; // 滑动的方向
            var isMove = false; // 是否发生左右滑动
            var startT = 0; // 记录手指按下去的时间
            var isTouchEnd = true; // 标记当前滑动是否结束(手指已离开屏幕) 

            // 手指放在屏幕上
            viewport.addEventListener('touchstart', function (e) {
                e.preventDefault();
                // 单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
                if (e.touches.length === 1 || isTouchEnd) {
                    var touch = e.touches[0];
                    startX = touch.pageX;
                    startY = touch.pageY;
                    initialPos = currentPosition;   // 本次滑动前的初始位置
                    viewport.style.webkitTransition = ''; // 取消动画效果
                    startT = + new Date(); // 记录手指按下的开始时间
                    isMove = false; // 是否产生滑动
                    isTouchEnd = false; // 当前滑动开始
                }
            }.bind(this), false);

            // 手指在屏幕上滑动，页面跟随手指移动
            viewport.addEventListener('touchmove', function (e) {
                e.preventDefault();

                // 如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
                if (isTouchEnd) return;

                var touch = e.touches[0];
                var deltaX = touch.pageX - startX;
                var deltaY = touch.pageY - startY;

                var translate = initialPos + deltaY; // 当前需要移动到的位置
                //如果translate>0 或 < maxHeight,则表示页面超出边界
                if (translate > 0) {
                    translate = 0;
                }
                if (translate < maxHeight + pageHeight) {
                    translate = maxHeight + pageHeight;
                }
                deltaY = translate - initialPos;
                this.transform.call(viewport, translate);
                isMove = true;
                moveLength = deltaY;
                direction = deltaY > 0 ? 'top' : 'bottom'; // 判断手指滑动的方向


                //按钮显示
                if (currentPosition <= -pageHeight) {
                    btn.className = "show btn";
                } else {
                    btn.className = "hide btn";
                }

                // //对话位置
                this.showConversation(1, pageHeight)
                this.showConversation(2, pageHeight)
                this.showConversation(3, pageHeight)
                this.showConversation(4, pageHeight)
                this.showConversation(5, pageHeight)
                this.showConversation(6, pageHeight)

            }.bind(this), false);

            // 手指离开屏幕时，计算最终需要停留在哪一页
            viewport.addEventListener('touchend', function (e) {
                e.preventDefault();
                var translate = 0;
                // 计算手指在屏幕上停留的时间
                var deltaT = + new Date() - startT;
                // 发生了滑动，并且当前滑动事件未结束
                if (isMove && !isTouchEnd) {
                    isTouchEnd = true; // 标记当前完整的滑动事件已经结束 
                    // 使用动画过渡让页面滑动到最终的位置
                    viewport.style.webkitTransition = '0.3s ease -webkit-transform';
                    if (deltaT < 300) { // 如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        if (currentPosition === 0 && translate === 0 && moveLength === 0) {
                            return;
                        }
                        translate = direction === 'bottom' ?
                            currentPosition + moveLength
                            : currentPosition + moveLength;
                        //如果最终位置超过边界位置，则停留在边界位置
                        // 上边界
                        translate = translate > 0 ? 0 : translate;
                        // 下边界
                        translate = translate < maxHeight + pageHeight ? maxHeight + pageHeight : translate;
                    }
                    else {
                        //如果滑动距离小于屏幕的50 %，则退回到上一页
                        // if (Math.abs(moveLength) / pageHeight < 0.5) {
                        //     translate = currentPosition - moveLength;
                        // } else {
                        //     // 如果滑动距离大于屏幕的50%，则滑动到下一页
                        //     translate = direction === 'bottom' ?
                        //         currentPosition - (pageHeight + moveLength)
                        //         : currentPosition + pageHeight - moveLength;
                        //     translate = translate > 0 ? 0 : translate;
                        //     translate = translate < maxHeight ? maxHeight : translate;
                        // }


                        if (currentPosition === 0 && translate === 0 && moveLength === 0) {
                            return;
                        }
                        translate = direction === 'bottom' ?
                            currentPosition + moveLength
                            : currentPosition + moveLength;
                        //如果最终位置超过边界位置，则停留在边界位置
                        // 上边界
                        translate = translate > 0 ? 0 : translate;
                        // 下边界
                        translate = translate < maxHeight + pageHeight ? maxHeight + pageHeight : translate;
                    }

                    //按钮显示
                    if (currentPosition <= -pageHeight) {
                        btn.className = "show btn";
                    } else {
                        btn.className = "hide btn";
                    }


                    //对话位置
                    this.showConversation(1, pageHeight)
                    this.showConversation(2, pageHeight)
                    this.showConversation(3, pageHeight)
                    this.showConversation(4, pageHeight)
                    this.showConversation(5, pageHeight)
                    this.showConversation(6, pageHeight)



                    // 执行滑动，让页面完整的显示到屏幕上
                    this.transform.call(viewport, translate);
                    // 计算当前的页码
                    //  pageNow = Math.round(Math.abs(translate) / pageHeight) + 1;

                    // setTimeout(function () {
                    //     // 设置页码，DOM操作需要放到异步队列中，否则会出现卡顿
                    //     this.setPageNow();
                    // }.bind(this), 100);
                }
            }.bind(this), false);
        }
    }
})(window, document);

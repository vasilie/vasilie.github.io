(function () {
    if (document.getElementsByTagName('form').length > 0) {
        document.getElementsByTagName('form')[0].addEventListener('submit', function (e) {
            e.preventDefault();

            // Check for spam
            if (document.getElementById('js-validate-robot').value !== '') { return false }

            // Get url for mailchimp
            var url = this.action.replace('/post?', '/post-json?');

            // Add form data to object
            var data = '';
            var inputs = this.querySelectorAll('#js-form-inputs input');
            for (var i = 0; i < inputs.length; i++) {
                data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
            }

            // Create & add post script to the DOM
            var script = document.createElement('script');
            script.src = url + data;
            document.body.appendChild(script);

            // Callback function
            var callback = 'callback';
            window[callback] = function (data) {

                // Remove post script from the DOM
                delete window[callback];
                document.body.removeChild(script);

                console.log(data);
                // Display response message
                var message = '';
                var class_name = '';
                if (data.result && data.result === "success") {
                    message = "Thank you for subscribing!";
                    class_name = "success";
                } else {
                    class_name = "failure";
                    message = data.msg[0] === '0' ? "Please enter a valid email address." : data.msg.split("\/")[0];
                }
                document.getElementById('js-subscribe-response').classList = [class_name];
                document.getElementById('js-subscribe-response').innerHTML = message;
            };
        });
    }
})();

// message field autoincrement
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

// Checkbox 

function toggleCheckbox() {
    var checkbox = document.getElementById('agreement');
    var subscribeButton = document.getElementById('mc-embedded-subscribe');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            subscribeButton.removeAttribute("disabled");
            subscribeButton.classList.remove("disabled");
        } else {
            subscribeButton.setAttribute("disabled", "disabled");
            subscribeButton.classList = ["disabled"];
        }
    });
}

// Handling sticky header onScrolling 

var mobileMenu = document.getElementById("mobile-menu");
var landing = document.getElementById("landing");

var sticky = mobileMenu.offsetTop;
function handleSticky() {

    if (window.pageYOffset > sticky) {
        mobileMenu.classList.add("sticky");
        landing.classList.add("sticky");
    } else {
        mobileMenu.classList.remove("sticky");
        landing.classList.remove("sticky");
    }
}
var scrollTimer, lastScrollFireTime = 0;
window.onscroll = function () {

    var minScrollTime = 50;
    var now = new Date().getTime();
    if (!scrollTimer) {
        if (now - lastScrollFireTime > (3 * minScrollTime)) {
            handleSticky();   // fire immediately on first scroll
            lastScrollFireTime = now;
        }
        scrollTimer = setTimeout(function () {
            scrollTimer = null;
            lastScrollFireTime = new Date().getTime();
            handleSticky();
        }, minScrollTime);
    }
};

// mobile menu (overlay)

var overlay = document.getElementById("overlay");

function openOverlay () {
    overlay.classList.add("overlay-open");
    overlay.setAttribute('aria-hidden',false);
    document.getElementsByTagName("body")[0].classList.add('no-scroll');
}
function closeOverlay () {
    overlay.classList.remove("overlay-open");
    overlay.setAttribute('aria-hidden',true);
    document.getElementsByTagName("body")[0].classList.remove('no-scroll');
}
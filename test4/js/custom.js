(function($) {
	'use strict';
	
	$(window).load(function() {
		$('#preloader').delay(650).fadeOut('slow');
	});
    
    $('header .headerMenu li a').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $('section#'+href).offset().top-100
        }, 1500);
        $('.headerMenu').toggleClass('active');
        $('.toggleMenu').toggleClass('invert');
    });
	
    $('.toggleMenu').click(function() {
        $('.headerMenu').toggleClass('active');
		$('.toggleMenu').toggleClass('invert');
    });
    
    if($(window).width()<650) {
        $('.headerMenu').addClass('transition2s');
    } else {
        $('header .headerMenu').addClass('transition2s');
        $('header .headerLogo').addClass('transition2s');
    }

    $('#contactForm button').click(function(e){
        e.preventDefault();
        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
                
        if(name.length === 0){
            error = true;
            $('#name').css('border-color','#ffbaba');
        }else{
            $('#name').css('border-color','#8ca5c6');
        }
        if(email.length === 0 || email.indexOf('@') === '-1'){
            error = true;
            $('#email').css('border-color','#ffbaba');
        }else{
            $('#email').css('border-color','#8ca5c6');
        }
        if(error === false){
            $('#contactForm button').prop('disabled', true);
            $.post('send_email.php', $('#contactForm').serialize(),function(result){
                if(result=='send') {
                    $('#mail_fail').hide();
                    $('#mail_success').show();
                }else{
                    $('#mail_success').hide();
                    $('#mail_fail').show();
                }
            });
        }else{
            $('#contactForm button').prop('disabled', false);
        }
    });

    /** back to top
	================================================== */
	function backToTop() {
		$(document).scroll(function () {
            var y = $(this).scrollTop();
            if (y > 200) {
                $('#backToTop').fadeIn(500);
                $('header').addClass('bg');
            } else {
                $('#backToTop').fadeOut(500);
                $('header').removeClass('bg');
            }
        });
		$('#backToTop').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
	}
	backToTop();
})(jQuery);

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
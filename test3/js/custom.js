(function($) {
	'use strict';
	
	$(window).load(function() {
		$('#preloader').delay(650).fadeOut('slow');
	});
    
    $('section#news .newsItem').addClass('transition2s');
    $('section#news .newsItem .overlay').addClass('transition2s');
	
    $('.toggleMenu').click(function() {
        $('.headerMenu').slideToggle();
		$('.toggleMenu').toggleClass('invert');
    });

    if($('#order_form').length) {
        $('#order_form button').click(function(e){
            e.preventDefault();
            
            var error = false;
            var ime = $('#ime').val();
            var prezime = $('#prezime').val();
            var adresa = $('#adresa').val();
            var grad = $('#grad').val();
            var zip = $('#zip').val();
            var telefon = $('#telefon').val();
            var email = $('#email').val();
            
            if(ime.length === 0){
                error = true;
                $('#ime').css('border-color','#fe646e');
            } else {
                $('#ime').css('border-color','#d5d5d5');
            }
            if(prezime.length === 0){
                error = true;
                $('#prezime').css('border-color','#fe646e');
            } else {
                $('#prezime').css('border-color','#d5d5d5');
            }
            if(adresa.length === 0){
                error = true;
                $('#adresa').css('border-color','#fe646e');
            } else {
                $('#adresa').css('border-color','#d5d5d5');
            }
            if(grad.length === 0){
                error = true;
                $('#grad').css('border-color','#fe646e');
            } else {
                $('#grad').css('border-color','#d5d5d5');
            }
            if(zip.length === 0){
                error = true;
                $('#zip').css('border-color','#fe646e');
            } else {
                $('#zip').css('border-color','#d5d5d5');
            }
            if(telefon.length === 0){
                error = true;
                $('#telefon').css('border-color','#fe646e');
            } else {
                $('#telefon').css('border-color','#d5d5d5');
            }
            if(email.length === 0 || email.indexOf('@') === '-1'){
                error = true;
                $('#email').css('border-color','#fe646e');
            } else {
                $('#email').css('border-color','#d5d5d5');
            }
            if(error === false){					
                $('#order_form button').attr({'disabled' : 'true' });
                $.post('mod/korpa/wf.cart.php', $('#order_form').serialize(), function(result){
                    if(result == 'ok'){
                        window.location = 'naruci-uspesno?wf_s=ok';
                    }else{
                        alert(result);
                    }			
                });
            }
        });
    }
    
    /** back to top
	================================================== */
	function backToTop() {
		$(document).scroll(function () {
            var y = $(this).scrollTop();
            if (y > 200) {
                $('#backToTop').fadeIn(500);
            } else {
                $('#backToTop').fadeOut(500);
            }
        });
		$('#backToTop').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
	}
	backToTop();
})(jQuery);
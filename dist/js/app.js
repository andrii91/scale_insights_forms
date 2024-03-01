$( document ).ready(function() {
  if ($(window).scrollTop() > 0) {
    $('.auntefication-nav').addClass("fixed");
  }

  $(window).scroll(function () {
    return $('.auntefication-nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  $('.auntefication-form input').blur(function(){
    let value = $(this).val();

    if(value.length == 0) {
      $(this).parents('.auntefication-label-wrap').removeClass('active')
    }else{
      $(this).parents('.auntefication-label-wrap').addClass('active')
    }
  });


  /* form valid*/
  let error;
  $('.submit').click(function (e) {
    e.preventDefault();
    let ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      let thisFiled = $(this);

      if ($(this).val().trim() === '') {
          let errorText = thisFiled.data('error')
          thisFiled.addClass('error').parents('.auntefication-label-wrap').addClass('error').find('.auntefication-label').text(errorText);
          error = 1;
          $(":input.error:first").focus();
          return false;
      } else {
        if (thisFiled.attr("type") === 'email') {
          let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!pattern.test(thisFiled.val())) {
            $("input[name=email]").val('');
            let errorText = thisFiled.data('error')
            thisFiled.addClass('error').parents('.auntefication-label-wrap').addClass('error').find('.auntefication-label').text(errorText);

            error = 1;
            $(":input.error:first").focus();
            return false;
          }else{
            error = 0;
            let placeholder = thisFiled.data('placeholder')
            thisFiled.removeClass('error').parents('.auntefication-label-wrap').removeClass('error').find('.auntefication-label').text(placeholder);
          }
        } else {
          let placeholder = thisFiled.data('placeholder')
          thisFiled.removeClass('error').parents('.auntefication-label-wrap').removeClass('error').find('.auntefication-label').text(placeholder);
        }
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);


    setTimeout(function () {
      alert('Success');
      
      $form.find('.submit').removeClass('inactive');
      $form.find('.submit').prop('disabled', false);
      $form[0].reset();
      $('.auntefication-label-wrap').removeClass('active')

    }, 1000);

  });
}) 

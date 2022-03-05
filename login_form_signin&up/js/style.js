$('.tap_sign button').each(function(idx){
    $(this).on({
        click:function(){
            if (idx === 0){
                $('.remember_help_wrap').removeClass('sign_up');
                $('.id_area').removeClass('sign_up');
                $('.id_area').addClass('sign_in');
                $('.btn_login').html('Sign in');
            } else if(idx === 1) {
                $('.remember_help_wrap').addClass('sign_up');
                $('.id_area').removeClass('sign_in');
                $('.id_area').addClass('sign_up');
                $('.btn_login').html('Sign up');
            }
        }
    })
})
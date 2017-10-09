/*
 * 作者：KeHan
 * 修改时间：2017-09-27 
 * 备注：项目中引用requireJS[模块化处理]
 */
require(['bootstrap/bootstrap.min',	
		 'toolJs/wow',
],function(bootstrap,wow){
	//页面加载隐藏gif动画
	$(window).load(function(){
		//load方法--当window结构加载时，隐藏gif动画
		$('#status').fadeOut(); // will first fade out the loading animation 淡出效果
     	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      	$('body').delay(350).css({'overflow':'visible'});
	});
	// Sticky Header
	//顶部header--transition动画css样式
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.main_header').addClass('sticky');
        } else {
            $('.main_header').removeClass('sticky');
        }
    });
     // Mobile Navigation--移动端header显示样式修改（transform）
    $('.mobile-toggle').click(function() {
        if ($('.main_header').hasClass('open-nav')) {
            $('.main_header').removeClass('open-nav');
        } else {
            $('.main_header').addClass('open-nav');
        }
    });

    $('.main_header li a').click(function() {
        if ($('.main_header').hasClass('open-nav')) {
            $('.navigation').removeClass('open-nav');
            $('.main_header').removeClass('open-nav');
        }
    });
    // navigation scroll lijepo radi materem--导航条点击栏目跳转对应位置
    /*
     * jquery animate方法和scrollTop结合（html,body选择器名称兼容火狐和谷歌浏览器）
     */
    $('nav a').click(function(event) {
        var id = $(this).attr("href");
        var offset = 70;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 500);
        //阻止元素触发原本动作（例如当前就是阻止了a标签的跳转href）
        event.preventDefault();
    });
    // wow js---wow js初始化用于滚动中元素显示方式
    new WOW().init();
     // nice scroll---滚动条初始化样式
    $("html").niceScroll(
    	 {cursorwidth:"8",
		  cursorborderradius:"none",
		  cursorborder:"none",
		  cursorcolor:"#3498db",
		  mousescrollstep:"60"
    	});
    // portfolio filter mixitup--百叶窗jquery样式
    var filterList = {
          init: function () {
            // MixItUp plugin
            // http://mixitup.io
            $('#portfoliolist').mixitup({
              targetSelector: '.portfolio',
              filterSelector: '.filter',
              effects: ['fade'],
              easing: 'snap',
              // call the hover effect
              onMixEnd: filterList.hoverEffect()
            });       
          
          },
          
          hoverEffect: function () {
          
            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
              function () {
                $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');       
              },
              function () {
                $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');               
              }   
            );        
          
          }

        };
        
    // Run the show!
    filterList.init();
});

       

        



    

        

      

      // Skillset js 

      var object = [

        {

          'headline':'HTML & CSS',
          'value':8,
          'length':9,
          'description':'Significant experience and knowlage of HTML(5) and CSS functionality and use.'

        },
        {

          'headline':'JavaScript & jQuery',
          'value':6,
          'length':5,
          'description':'Experience with object-oriented JavaScript. </br> Extended knowlage of DOM manipulation in aiding and extending the UI.'

        },
        {

          'headline':'Ruby & Python',
          'value':3,
          'length':5,
          'description':'Experience with object-oriented JavaScript. </br> Extended knowlage of DOM manipulation in aiding and extending the UI.'

        }

      ];

      $(document).ready(function(){

        $("#skillset").skillset({

          object:object,
          duration:10

        });

      });


        // Owl carousel

      $(document).ready(function() {
               
      $("#testimonial_carosule").owlCarousel({
               
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true,
                    autoPlay : true,
                    transitionStyle : "backSlide",
                    // "singleItem:true" is a shortcut for:
                    // items : 1, 
                    // itemsDesktop : false,
                    // itemsDesktopSmall : false,
                    // itemsTablet: false,
                    // itemsMobile : false
               
                });
               
      });

      // Up to top js

      $(document).ready(function() {
        
        $().UItoTop({ easingType: 'easeOutQuart' });
        
      });



/* ==========================================================================
   CONTACT FORM JS
   ========================================================================== */

  $(document).ready(function() {
      $("#submit_btn").click(function() { 
          //get input field values
          var user_name       = $('input[name=name]').val(); 
          var user_email      = $('input[name=email]').val();
          var user_phone      = $('input[name=phone]').val();
          var user_message    = $('textarea[name=message]').val();
          
          //simple validation at client's end
          //we simply change border color to red if empty field using .css()
          var proceed = true;
          if(user_name==""){ 
              $('input[name=name]').css('border-color','red'); 
              proceed = false;
          }
          if(user_email==""){ 
              $('input[name=email]').css('border-color','red'); 
              proceed = false;
          }
          if(user_phone=="") {    
              $('input[name=phone]').css('border-color','red'); 
              proceed = false;
          }
          if(user_message=="") {  
              $('textarea[name=message]').css('border-color','red'); 
              proceed = false;
          }

          //everything looks good! proceed...
          if(proceed) 
          {
              //data to be sent to server
              post_data = {'userName':user_name, 'userEmail':user_email, 'userPhone':user_phone, 'userMessage':user_message};
              
              //Ajax post data to server
              $.post('contact_me.php', post_data, function(response){  
                  
                  //load json data from server and output message     
                  if(response.type == 'error')
                  {
                      output = '<div class="error">'+response.text+'</div>';
                  }else{
                  
                      output = '<div class="success">'+response.text+'</div>';
                      
                      //reset values in all input fields
                      $('#contact_form input').val(''); 
                      $('#contact_form textarea').val(''); 
                  }
                  
                  $("#result").hide().html(output).slideDown();
              }, 'json');
              
          }
      });
      
      //reset previously set border colors and hide all message on .keyup()
      $("#contact_form input, #contact_form textarea").keyup(function() { 
          $("#contact_form input, #contact_form textarea").css('border-color',''); 
          $("#result").slideUp();
      });
  });
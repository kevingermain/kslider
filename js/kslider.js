(function($){

	 $.fn.kslider = function(options) {

		var kslider = $(this);
		
		//Ajout de la class kbig à la 1ère div du conteneur kslider
		var kbig = $('div:eq(0)', kslider).addClass('kbig');
		
		//Récupération de la hauteur la plus haute entre les images
		var kbigheightMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).height(); }).get());
		
		//Récupération de la largeur entre les images
		var kbigwidthMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).width(); }).get());
		
		var ksmallheightMax = 0;
		var ksmallwidthMax = 0;
		if($('div:eq(1)', kslider).length == 0)
		{
			kbig.clone().appendTo(kslider);
			ksmallheightMax = kbigheightMax / 4;
			ksmallwidthMax = kbigwidthMax / 4;
		}
		else
		{
			ksmallheightMax = Math.max.apply(Math, $('div:eq(1) img', kslider).map(function(){return $(this).height();}).get());
			ksmallwidthMax = Math.max.apply(Math, $('div:eq(1) img', kslider).map(function(){return $(this).width();}).get());
		}
		
		//Ajout de la class ksmall à la 2ème div du conteneur kslider
		var ksmall = $('div:eq(1)', kslider).removeClass().addClass('ksmall');
			
		//Paramètres par défaut
		var defaults = {
			width: kbigwidthMax,
			height: kbigheightMax,
			widthThumb: ksmallwidthMax,
			heightThumb: ksmallheightMax,
			nbImage: $('div:eq(0) img', kslider).length,
			speed: 750,
			sameArea: true
		};
		
		//Application des paramètres de l'utilisateur
		var options = $.extend(defaults, options);
		
		//Cacher toutes les grandes images sauf la 1ère
		$('.kbig img', kslider).not(':first-child').hide();
		
		//Définition de la taille du slider complet : grand conteneur + petit conteneur
		kslider.css({'width': options.width,'height' : options.height+options.heightThumb});
		
		//Définition de la taille du grand conteneur
		kbig.css({'height': options.height,'width':options.width});
			
		//Opérations sur les grandes images
		$('.kbig img', kslider).css({'width':'auto', 'height':'auto', 'max-width': options.width, 'max-height':options.height});
		$('.kbig img', kslider).map(function(){
			var differenceHauteur = options.height - $(this).height();
			var differenceLargeur = options.width - $(this).width();
			if(differenceHauteur == 0);
				$(this).css({'margin-top': differenceHauteur/2, 
								 'margin-bottom': differenceHauteur/2,
								 'margin-right': differenceLargeur/2,
								 'margin-left': differenceLargeur/2, });
		});
		
		//Opérations sur les miniatures
		var ksmallwidth = 0;
		$('.ksmall img', kslider).css({'width':'auto', 'height':'auto', 'max-width': options.widthThumb, 'max-height':options.heightThumb});
		$('.ksmall img', kslider).map(function(){
			if(options.sameArea)
				ksmallwidth += options.widthThumb;
			else
				ksmallwidth += $(this).width();
			
			var differenceHauteur = options.heightThumb - $(this).height();
			var differenceLargeur = options.widthThumb - $(this).width();
			if(differenceHauteur > 0)
				$(this).css({'padding-top': differenceHauteur/2, 
								 'padding-bottom': differenceHauteur/2});
			
			if(differenceLargeur > 0 && options.sameArea)
				$(this).css({'padding-right': differenceLargeur/2,
								 'padding-left': differenceLargeur/2, });
		})
		
		//Définition de la taille du petit conteneur
		
		if(ksmallwidth < options.width)
			ksmall.css({'width': options.width, 'height':options.heightThumb, 'padding-left': (options.width - ksmallwidth) / 2 });
		else
			ksmall.css({'width': ksmallwidth, 'height':options.heightThumb});

		//Ajout des flèches de navigation
		kslider.append('<div style="" class="kleft"></div><div style="" class="kright"></div>');
		
		ksmallimg = $('.ksmall img', kslider);
		kbigimg = $('.kbig img', kslider);
		
		//Move mouse hover thumnails - Bouger la souris au dessus des miniatures
		ksmall.mousemove(function(e){
			var position = e.pageX - kslider.offset().left;
			var deplacement = -position / ((options.width)/(ksmallwidth-options.width));
			if(position < options.width && ksmallwidth > options.width) 
				$(this).css('margin-left', deplacement);
		}); 
		
		// Hover on the thumbnails - Survol des miniatures
		ksmallimg.hover(function(){
			$(this).animate({opacity: 1}, 500, 'swing');
		},
		function(){
			if(!$('.kbig img', kslider).eq($(this).index()).is(':visible'))
				$(this).stop(true,true).animate({opacity: 0.5}, 300, 'swing');
		}); 
		
		// click on the big image - click sur la grande image
		$('.kbig img', kslider).on('click', function() {
			var index = $(this).index();

			$(this).fadeOut(options.speed);
			
			if($(this).next().length == 0)
			{
				$('.kbig img', kslider).first().fadeIn(options.speed);
				$('.ksmall img', kslider).eq(index).animate({opacity: 0.5}, 300, 'swing');
				$('.ksmall img', kslider).first().animate({opacity: 1}, 500, 'swing');
				if(ksmallwidth > options.width)
				ksmall.animate({marginLeft: 0}, 500);
			}
			else
			{
				$(this).next().fadeIn(options.speed);
				$('.ksmall img', kslider).eq(index).animate({opacity: 0.5}, 300, 'swing');
				$('.ksmall img', kslider).eq(index+1).animate({opacity: 1}, 500, 'swing');
				var deplacement = (((options.width-ksmallwidth) / options.nbImage) * (index+2));
				if((deplacement<-options.widthThumb*(index+1)))
					deplacement = -options.widthThumb*index;
				if(ksmallwidth > options.width)
				ksmall.animate({marginLeft: deplacement}, 500);
			}
		});
		
		// click on the thumbnails - click sur les miniatures
		ksmallimg.on('click', function() {

			var index = $(this).index();
			if(!$('.kbig img', kslider).eq(index).is(':visible'))
			{
				$('.kbig img', kslider).fadeOut(options.speed);
				$('.ksmall img', kslider).not(this).animate({opacity: 0.5}, 500, 'swing');
			}
			$('.kbig img', kslider).eq(index).fadeIn(options.speed);
			
		});
	 };
})(jQuery);
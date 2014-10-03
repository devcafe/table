$(function(){
	var table_gerLinhas = $('#gerLinhas_table tbody');
	var regsLimit = $('#gerLinhas_regs option:selected').val();
	var page = $('#paginationController').val();
	var paginationWrapper = $('#gerLinhas_pagination');

	loadTable('1', regsLimit);

	function loadTable(page, regsLimit){
		var pagination = '';

		$.ajax({
			url: 'remoto.php',
			type: 'POST',
			data: {
				regsLimit: regsLimit,
				page: page,
				op: 'loadTable'
			},
			dataType: 'json',
			success: function(data){					
				$('#gerLinhas_tableRegTotal').html(data['totalRegs']);
				$('#gerLinhas_tableRegPage').html(data['actualPage'])

				if(page > data['totalPages']){
					alert("Esta página não existe");
				} else {
					table_gerLinhas.empty();
					paginationWrapper.empty();

					if(page != 1){
						pagination += '<li><a href="#" class = "onePage" id = "prev_'+(parseInt(page)-1)+'">&laquo;</a></li>';
					} else {
						pagination += '<li><a href="#" class = "onePage" id = "prev_1">&laquo;</a></li>';
					}

					for(var i=1;i<=data['totalPages'];i++){
						if(i == data['totalPages']){
							if(i == page){
								pagination += '<li class = "active"><a href="#" class = "current" id = "page_'+i+'">'+i+'</a></li>';
							} else {
								pagination += '<li><a href="#" id = "page_'+i+'">'+i+'</a></li>';
							}
						} else if(i <= 5) {
							if(i == page){
								pagination += '<li class = "active"><a href="#" class = "current" id = "page_'+i+'">'+i+'</a></li>';
							} else{
								pagination += '<li><a href="#" id = "page_'+i+'">'+i+'</a></li>';
							}
						} else if(i == data['maxRegsPage']) {
							pagination += '<li><a href="#" class = "reticence" >...</a></li>';
						}
					}

					if(page >= data['totalPages']){
						pagination += '<li><a href="#" class = "onePage" id = "next_'+page+'">&raquo;</a></li>';
					} else {
						pagination += '<li><a href="#" class = "onePage" id = "next_'+(parseInt(page)+1)+'">&raquo;</a></li>';
					}

					paginationWrapper.append(pagination);
				}

				for(var i=0;i<data[1].length;i++){					
					table_gerLinhas.append(""+
						"<tr>"+
							"<td>"+data[1][i].numLinha+"</td>"+
							"<td>"+data[1][i].plano+"</td>"+
						"</tr>"+
					"");
				}

				

			}
		})
	}

	$("#gerLinhas_pagination").on('click', 'li a:not(.reticence)', function(){
		var page = $(this).attr('id').split('_')[1];
		var regsLimit = $('#gerLinhas_regs option:selected').val();

		loadTable(page, regsLimit);
	})

	$("#gerLinhas_pagination").on('click', 'li a.onePage', function(){
		var op = $(this).attr('id').split('_')[0];
		var regsLimit = $('#gerLinhas_regs option:selected').val();

		if(op == 'next'){
			var page = $(this).attr('id').split('_')[1];

			loadTable(page, regsLimit);
		} else {
			var page = $(this).attr('id').split('_')[1];
			console.log(page);

			loadTable(page, regsLimit);
		}
	});

	$('#gerLinhas_regs').change(function(){
		//var page = $('#gerLinhas_pagination li a.current').attr('id').split('_')[1];
		var regsLimit = $('#gerLinhas_regs option:selected').val();

		loadTable('1', regsLimit);
	})

	$('#gerLinhas_pagination_go').click(function(){
		var page = $('#gerLinhas_pagination_goPage').val();
		var regsLimit = $('#gerLinhas_regs option:selected').val();

		loadTable(page, regsLimit);
	})

	// $('#gerLinhas_pagination').on('click', 'li a.reticence', function(){
	// 	var adjacentPage = $("#gerLinhas_pagination li:nth-child(6) a").attr('id').split('_')[1];
	// 	leftPage = parseInt(adjacentPage) + 1;

	// 	$('#gerLinhas_pagination li:nth-child(6)').html('<a href="#" id = "page_'+leftPage+'">'+leftPage+'</a>');
	// 	$('#gerLinhas_pagination li:nth-child(2)').remove();


	// 	var actualPage = $('#gerLinhas_pagination li a.current').attr('id').split('_')[1];
	// 	var show = 5;

	// 	// var page = $('#gerLinhas_pagination li a.current').attr('id').split('_')[1];
		
	// 	// var regsLimit = $('#gerLinhas_regs option:selected').val();

	// 	// loadTable(page, regsLimit);
	// })
	
})
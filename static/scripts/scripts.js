setInterval(function() {
	$.ajax({
		url: "api/tokensLeft",
		success: function(result) {
			$("#tokenLeft").text(result);
		}
	});
}, 1000);

setInterval(function() {
	$.ajax({
		url: "api/addressTokensLeft?address=" + $("#address").text(),
		success: function(result) {
			$("#addressTokensLeft").text(result);
		}
	});
}, 1000);


var interval = setInterval(function() {
	if ($("[name=h-captcha-response]").val()) {
		clearInterval(interval);
		var formData = {
			token: $("[name=h-captcha-response]").val()
		};
		$("#loading").show();
		$.ajax({
			type: "POST",
			url: "api/captchaAddress",
			data: formData,
			dataType: "json",
			encode: true,
		}).done(function(data) {
			console.log(data);
			$("#reveal").show();
			$("#loading").hide();
			$("#address").text(data.address);
		});
	}
}, 100);

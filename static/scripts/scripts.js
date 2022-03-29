setInterval(function() {
	$.ajax({
		url: "api/tokensLeft",
		success: function(result) {
			$("#tokenLeft").text(result);
		}
	});
}, 1000);

if (useCaptcha) {
	setInterval(function() {
		if ($("#address").text()) {
			$.ajax({
				url: "api/addressTokensLeft?address=" + $("#address").text(),
				success: function(result) {
					$("#addressTokensLeft").text(result);
				}
			});
		}
	}, 1000);
}


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

$(document).ready(function() {
	const clipboard = new ClipboardJS('.btn-clipboard');
	clipboard.on('success', function(e) {
		console.log(e)
		$(e.trigger).tooltip('show');
		$(e.trigger).on('mouseout', function() {
			$(e.trigger).tooltip('dispose');
		})
		e.clearSelection();
	});
});

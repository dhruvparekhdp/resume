<?php
/*
if (!empty($_POST['url'])) {
	header('Location: '. $_POST['url'], true, 302);
	exit;
}
*/
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
<?php
	if (!empty($_POST['url'])) {
		echo "window.location.href= '$_POST[url]';";
	}
?>
</script>
</head>
<body>
</body>
</html>
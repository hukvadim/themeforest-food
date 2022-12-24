<?php


/**
 * Форматований вивід масива
 * @param  [type] $arr [ Масив для розпаковки ]
 */
function print_arr($arr)
{
	echo '<pre>';
	print_r($arr);
	echo '</pre>';
}




/**
 * Заносимо всі файли, папки в масив
 * @param  [type]  $dir      [ Шлях до папки ]
 * @param  boolean $skip_add [ Які папки пропустити ]
 * @return [type]            [ array || false ]
 */
function dirToArray($dir = '.', $skipAdd = false)
{
	// Якщо назва папки без слеша, core/modal > core/modal/
	if($dir[-1] !== '/')
		$dir .= '/';

	// Вказуємо значення, що будемо пропускати
	$skip = ['.', '..', 'index.html'];

	// Якщо передали папки (через кому), що треба пропустити, тоді об'єднюємо з масивом $skip
	if($skipAdd)
		$skip = array_unique(array_merge($skip, explode(',', str_replace(' ', '', $skipAdd)))); // Очищаємо від пробілів, розбиваємо в масив і об'єднуємо з масивом $skip

	// Скануємо вказану папку
	$files = scandir($dir);

	// Провіряємо чи це папка і заносимо в масив + забираємо непотрібні значення
	foreach($files as $file) {
		
		// Пропускаємо файли, папки, які вказали вище
		if(in_array($file, $skip))
			continue;

		// Формуємо масив, який будемо повертати
		$dirArr[$file] = $file;
	}

	return (is_array($dirArr)) ? $dirArr : false;
}



/**
 * Вивести через цикл всі іконки
 * @return [type] [description]
 */
function viewIcons()
{
	// В якій папці будемо шукати іконки
	$dataDir = 'feather/';
	// $dataDir = 'icons/';

	// Відбираємо з папки всю графіку
	if($dataArray = dirToArray($dataDir))

		// Перебираємо іконки і формуємо
		foreach($dataArray as $file)
			echo '<a href="'.$dataDir.$file.'" target="_blank"><img src="'.$dataDir.$file.'" alt=""></a>';
}
?>


<style>
	.icons-list {
		display: flex;
		flex-wrap: wrap;
	}
	.icons-list a {
		display: inline-block;
		padding: 20px;
	}
	.icons-list img {
		width: 50px;
		height: 50px;
	}
</style>
<div class="icons-list">
	<? viewIcons() ?>
</div>

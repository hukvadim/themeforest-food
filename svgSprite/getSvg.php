<?php

/**
 * Підключаємо інші файли з функціями
 */
$dataDir = 'feather/';

// Відбираємо з папки всю графіку
if($dataArray = dirToArray($dataDir)) {

	// Початок файлу
	$svgPart = "<div hidden='hidden' style='display: none;'><svg xmlns='http://www.w3.org/2000/svg'>\r\n";

	// Перебираємо іконки і формуємо
	foreach($dataArray as $file)
		$svgPart .= setSvgIcon($file, $dataDir);

	// Кінець файлу
	$svgPart .= "</svg></div>";

	// Створюємо файл
	file_put_contents('0--system--header-svg.html', $svgPart);

}







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
 * Очистка svg іконки для svg sprite
 * @param [type] $icon   [description]
 * @param [type] $folder [description]
 */
function setSvgIcon($iconFile, $folder)
{
	// Отримуємо назву іконки
	$iconName = str_replace('.svg', '', $iconFile);

	// Витягуємо іконку
	$icon = file_get_contents($folder.$iconFile);

	// Видаляємо з неї закінчення </svg>
	$icon = str_replace(["\n", '</svg>'], '', $icon);

	// Очищуємо місце перед стрілкою. Часто на початку відступ перед <[path, line, circle...]
	$arr = [' <', '  <', '   <','    <', '     <'];
	$icon = str_replace($arr, '<', $icon);


	// Вирізаємо частину <svg з атрибутами, щоб забрати потрібні
	$getSvgAttr = stristr($icon, '><', true);
	$icon = substr(stristr($icon, '><'), 1);

	// Забираємо непотрібні частини з іконки
	$getSvgAttr = trim(str_replace('<svg', '', $getSvgAttr));

	// Щоб гарно розбити атрибути вибираємо значення [" ] -> ["||]
	$getSvgAttr = explode('||', trim(str_replace('" ', '"||', $getSvgAttr)));

	// Якщо масив не пустий перебираємо і добавляємо потрібні атрибути
	if (is_array($getSvgAttr) and !empty($getSvgAttr)) {

		// Початок svg symbol
		$svgStart = '<symbol id="icon-'.$iconName.'"';

		// Атрибути які нам не потрібні
		$noAllowAttr = ['class', 'xmlns', 'width', 'height'];

		// Перебираємо атрибути і добавляємо до іконки
		foreach ($getSvgAttr as $attr) {

			// Розбиваємо атрибут і дивимося чи він є у заборонений
			$attrParts = explode('=', $attr);

			// Забороняємо добавляти відібрані атрибути
			if (!in_array($attrParts[0], $noAllowAttr))

				// Добавляємо дозволені атрибути
				$svgStart .= ' '.trim($attr);
		}

		// Закінчуємо запис іконки
		$icon = $svgStart.'>'.$icon."</symbol>\r\n";
	}

	return $icon;
}
?>

<a href="0--system--header-svg.html" download="">Скачати 0--system--header-svg.html</a>
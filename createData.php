<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php

  $words = ['paks', 'rõõmus','nuga','armas','kallis','päike','sale','muruniiduk','hekk','käärid','kahvel','lusikas','televiisor','arvuti','hiir','karu','hunt','rebane','lamp','õlg','käsi','klaviatuur','nupp','pilt','maal','roomaja','kiri','male','tool','laud','tahvel','marker','vesi','hapnik','sool','meri','ookena','vaal','uks','kilpkonn','aken','kott','selg','juhe','lift','valgus','generaator','elekter','gravitatsioon', 'tume', 'särav', 'turske', 'jäme', 'kandiline', 'ümar', 'suursugune', 'massiivne', 'ebaviisakas', 'kole', 'tõmmu', 'kahepaikne', 'silmakirjalik', 'mustanahaline', 'mongol', 'automaatne', 'kiire', 'aeglane', 'karvane', 'hele', 'kiilakas', 'paindlik', 'ümar', 'ilus', 'suursugune', 'suurepärane','auto','postkast','prügikast','lammas','internet','hing','start','väljapääs','viirus','haige','kell','sügis','jooksmine','ühendus','nupp','kodu','rull', 'tark', 'loll', 'üksik', 'eraldiseisev', 'traagiline', 'libe', 'kummaline', 'pahatahtlik', 'kitsas', 'lai', 'tahke', 'vedel', 'gaasiline', 'täielik', 'laud', 'kuri', 'nunnu', 'armas', 'libekeelne', 'sujuv', 'rumal', 'tark', 'tere', 'mina', 'olema', 'inimene', 'ja', 'mina', 'meeldima', 'auto', 'sõitma', 'õhtu', 'tore', 'sest', 'siis', 'saama', 'muusika', 'kuulama', 'meloodia', 'mahe', 'kruiis', 'kruiisima', 'hunt', 'hallivatimees', 'rebane', 'karu', 'arvuti', 'internet', 'mustlane', 'juut', 'sibul', 'kanep', 'õlu', 'mesi', 'raadio', 'kapp', 'lihas', 'kott', 'madrats', 'voodi', 'ranits', 'maagia', 'mustkunst', 'täht', 'püha', 'jeesus', 'grammofon', 'klaver', 'turakas', 'katel', '1',	'18karaadine',	'2',	'200hobujĆµuline',	'500frangine',	'A',	'a',	'aĢ€',	'Ć ',	'aa',	'aabe',	'aabits',	'aabitsa',	'aabitsajĆ¼nger',	'aabitsajĆ¼ts',	'aabitsakirjandus',	'aabitsakukk',	'aabitsakursus',	'aabitsakĆ¼tt',	'aabitsalik',	'aabitsaraamat',	'aabitsatarkus',	'aabitsateadmised',	'aabitsatĆµde',	'aabitsatĆ¼kk',	'Aadam',	'aadam',	'aadama',	'aadamaaegne',	'aadamakahvel',	'aadamast',	'aadamaĆµun',	'aadamaĆ¼likond',	'aade',	'aadel',	'aadeldaja',	'aadeldama',	'aadeldamine',	'aadelkond',	'aadellik',	'aadellikkus',	'aadellikult',	'aader',	'aaderdama',	'aaderdus',	'aadli',	'aadliarmukiri',	'aadlidaam',	'aadlik',	'aadlikonvent',	'aadlilipkond',	'aadlimarssal',	'aadlimatrikkel',	'aadlimees',	'aadlimĆµis',	'aadlineiu',	'aadlinooruk',	'aadlipeamees',	'aadliperekond',	'aadlipreili',	'aadlipĆ¤ritolu',	'aadliriik',	'aadliseisus',	'aadlisugu',	'aadlisuguvĆµsa',	'aadlitiitel',	'aadliuhkus',	'aadlivapp',	'aadlivastane',	'aadlivĆµsu',	'aadliĆ¼rik',	'aadress',	'aadressbĆ¼roo',	'aadressi',	'aadressikleeps',	'aadressima',	'aadressimasin',	'aadressipĆ¤ring',	'aadressiraamat',	'aadresslaud',	'aadri',	'aadrilaskja',	'aadrilaskmine',	'aadriraud',	'aadrit',	'Aafrika',	'aafrika',	'aafrikalik',	'aafrikalikult',	'aafriklane',	'aafriklanna',	'aafriklikkus',	'aagenpits',	'aagreht',	'aaker',	'aakrik',	'aakrine',	'aaloe',	'aaloeekstrakt',	'aaloegeel',	'aaloekanep',	'aaloemahl',	'aam',	'aamen',	'aamis',	'aamissepatĆ¶Ć¶koda',	'aamissepp',	'aamitĆ¤is',	'aamor',	'aamori',	'aamoripost',	'aamorpost',	'aampalk',	'aamvĆµlv',	'aanika',	'aaniline',	'aanis',	'aanispits',	'aapestik',	'aar',	'aara',	'aarde',	'aardeleid',	'aardla',	'aare',	'aaria',	'aarialane',	'aarine',	'aarja',	'aarjalane',	'aarjalased',	'aas',	'aasa',	'aasahein',	'aasaheinamaa',	'aasakas',	'aasakujuline',	'aasalill',	'aasaline',	'aasama',	'aasasisalik',	'aasatriinu',	'Aasia',	'aasia',	'aasialane',	'aasialanna',	'aasialik',	'aasialikult',	'aasija',	'aasima',	'aasimine',	'aas-jĆ¼rilill',	'aasjĆ¼rilill',	'aaskaerand',	'aaskannike',	'aaskarukell',	'aas-karukell',	'aaskinnis',	'aaslina',	'aasnelk',	'aasnurmikas',	'aas-rebasesaba',	'aasristik',	'aasroomad',	'aasseahernes',	'aas-seahernes',	'aassĆµlm',	'aasÅ�ampinjon',	'aasta',	'aastaaastalt',	'aasta-aastalt',	'aastaaeg',	'aastaajakatarr',	'aastaamplituud',	'aastaaruanne',	'aastaarv',	'aastabibliograafia',	'aastabilanss',	'aastaeelarve',	'aastahinne',	'aastahĆ¼vitus',	'aastaintress',	'aastainventuur',	'aastais',	'aastajuurdekasv',	'aastak',	'-aastak',	'aastakasum',	'aastakasv',	'aastakaup',	'aastakaupa',	'aastake',	'aastakene',	'aastakokkuvĆµte',	'aastakomplekt',	'aastakongress',	'aastakonverents',	'aastakoosolek',	'aastakĆ¤ik',	'aastakĆ¤ive',	'aastakĆ¼mme',	'aastakĆ¼mnetepikkune',	'aastalaat',	'aastalehm',	'aastaleping',	'aastamaks',	'aastamakse',	'aastamiljon',	'aastamoon',	'aastane',	'aastanorm',	'aastanumber',	'aastapalk',	'aastaparallaks',	'aastapidu',	'aastapikkune',	'aastapilet',	'aastaplaan',	'aastapoiss',	'aastapreemia',	'aastapuhkus',	'aastapĆ¤ev',	'aastapĆ¤evad',	'aastapĆ¤evakontsert',	'aastapĆ¤evapidu',	'aastapĆ¤evapidustus',	'aastapĆ¤evapidustused',	'aastaraamat',	'aastaring',	'aastaringne',	'aastaringselt',	'aastarĆµngas',	'aastarĆ¼tm',	'aastasaak',	'aastasada',	'aastasadadepikkune',	'aastaselt',	'aastasissetulek',	'aastastipendium',	'aastasulane',	'aastate',	'aastateenistus',	'aastatellimus',	'aastatepikkune',	'aastates',	'aastati',	'aastatoodang',	'aastatootlus',	'aastatuhat',	'aastatulu',	'aastatĆ¼druk',	'aastavahetus',	'aastavanune',	'aastaĆ¼lesanne',	'aastaĆ¼levaade',	'aaÅ¾io',	'aaÅ¾iospekulatsioon',	'aate',	'aateinimene',	'aatekaaslane',	'aateline',	'aateliselt',	'aatelisus',	'aatemees',	'aatetu',	'aatleja',	'aatlema',	'aatlemine',	'aatman',	'aatom',	'aatomi',	'aatomiajastu',	'aatomiallveelaev',	'aatomielektrijaam',	'aatomienergia',	'aatomifĆ¼Ć¼sik',	'aatomifĆ¼Ć¼sika',	'aatomijĆ¤Ć¤lĆµhkuja',	'aatomikaitse',	'aatomikatel',	'aatomilaev',	'aatomimootor',	'aatomimudel',	'aatomimĆ¼rsk',	'aatomipatarei',	'aatomiplahvatus',	'aatomipomm',	'aatomireaktor',	'aatomirelv',	'aatomirelvastamine',	'aatomirelvastumine',	'aatomirelvastus',	'aatomirĆ¼nnak',	'aatomisajand',	'aatomiseen',	'aatomisisene',	'aatomispekter',	'aatomisĆµda',	'aatomiteooria',	'aatomitevaheline',	'aatomituum',	'aatomivaba',	'aatomkaal',	'aatomkell',	'aatomkĆ¼tus',	'aatommass',	'aatommassiĆ¼hik',	'aatomnumber',	'aatomruumala',	'aatomsoojus',	'aatrium',	'aatriumelamu',	'ab',	'aba',	'abaasi',	'abajas',	'abajasopp',	'abakala',	'abakus',	'abaluu',	'abandoon',	'abar',	'abarapĆ¼Ć¼k',	'abasiin',	'abasiini',	'abasiinid',	'abaÅ¾uur',	'abdominaalne',	'abdoomen',	'abee',	'aberratsioon',	'Abessiinia',	'abessiinia',	'abessiinlane',	'abessiinlanna',	'abessiinlased',	'abessiiv',	'abessiivne',	'abhaas',	'abhaasi',	'abhaasid',	'abhaaslanna',	'abi',	'abiaeg',	'abiaine',	'abiallikas',	'abiandja',	'abiandmine',	'abidistsipliin',	'abiehitis',	'abiellu',	'abielluja',	'abielluma',	'abiellumine',	'abiellumisealine',	'abiellumisettepanek',	'abiellumishimu',	'abiellumishimuline',	'abiellumisiga',	'abiellumiskeeld',	'abiellumisplaan',	'abiellumus',	'abielu',	'abieluaasta',	'abieluahelad',	'abieluakt',	'abieludraama',	'abielueelne',	'abieluettepanek',	'abieluike',	'abieluinimene',	'abielukeeld',	'abielukolmnurk',	'abielukĆ¼tke',	'abielukĆ¼tked',	'abielulahutaja',	'abielulahutus',	'abielulahutusakt',	'abielulahutusavaldus',	'abielulahutusprotsess',	'abielulaps',	'abieluleping',	'abieluline',	'abielulisus',	'abielumees',	'abielunaine',	'abielunĆµuandla',	'abielupaar',	'abielupool',	'abielurahvas',	'abielurikkuja',	'abielurikkumine',	'abielusadam',	'abieluseadusandlus',	'abieluside',	'abielusidemed',	'abielusuhted',	'abielusĆµrmus',	'abielusĆ¤ng',	'abielutruudus',	'abielutunnistus',	'abielutĆ¼li',	'abieluvara',	'abieluvaraleping',	'abieluvoodi'];

	$newArray = array();

	foreach (  $words as $key => $word) {
		$syns = results($word);

		//echo count(	$syns);

		if(count(	$syns) > 2){



			$o = new stdClass();
			$o->word = $word;
			$o->syns = $syns;

			array_push($newArray, $o);
		}


	}
	//echo count($newArray);
	echo json_encode($newArray);


function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://www.eki.ee/dict/sys/index.cgi?Q='.$search.'&F=M&C06=et');
	//var_dump($contents);

	$html = str_get_html( mb_convert_encoding($contents, 'HTML-ENTITIES', 'UTF-8'));

	//http://simplehtmldom.sourceforge.net/manual.htm

  $syns = array();

	foreach($html->find('.tervikart span[class=x_m m]') as $element){


			$syn =$element->innertext;
      array_push($syns, $syn);

      //obje
			//echo $syn;
			//echo " ";
	}

	return $syns;
  //var_dump($syns);




}


	//$file_name = "cache.txt";

	//$requestMethod = "GET";

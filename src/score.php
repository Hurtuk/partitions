<?php
    include '../partitionsServer/php/datamodel.php';
    
    global $db;
    $tag = $_GET['score'];

    $score = $db->selectVal("SELECT s.id, s.name, creation, source, composer, s.tag, commentary, note, id_band, b.name AS name_band, b.tag AS tag_band,
                                    GROUP_CONCAT(t.word ORDER BY t.word SEPARATOR ';') AS tags
                            FROM partotheque_scores s
                            INNER JOIN partotheque_bands b
                            ON id_band = b.id
                            LEFT JOIN partotheque_keywords t
                            ON s.id = t.id_score
                            WHERE s.tag LIKE ?",
                            array($tag));

?><!doctype html>
<html lang="en" xmlns:og=”http://ogp.me/ns#”>
<head>
  <meta charset="utf-8">
  <title>L'Ouïe Cinéphile - arrangements pour toutes formations</title>
  <base href="/partitions/">
  <!--<base href="/">-->

  <link rel="apple-touch-icon" sizes="57x57" href="./assets/images/favicon/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="./assets/images/favicon/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="./assets/images/favicon/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/images/favicon/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="./assets/images/favicon/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="./assets/images/favicon/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="./assets/images/favicon/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="./assets/images/favicon/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="./assets/images/favicon/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="./assets/images/favicon/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="./assets/images/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="./assets/images/favicon/favicon-16x16.png">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="./assets/images/favicon/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">

  <meta name="keywords" lang="fr" content="musique, partition, partitions, musiques, arrangement, arrangements, cinephile, film, films, ouie"/>
  <meta name="Description" content="Arrangements pour orchestres à vents, à cordes, duos, etc."/>
  <meta http-equiv="content-language" content="fr" />
  <meta name="author" lang="fr" content="Nicolas Lethuillier" />

  <meta property="og:title" content="<?php echo $score['name']; ?> - L'Ouïe Cinéphile"/>
  <meta property="og:type" content="product.item"/>
  <meta property="og:image" content="http://www.louiecinephile.fr/partitionsServer/scores/<?php echo $tag; ?>/preview.jpg"/>
  <?php
    $desc = $score['name'];
    if ($score['source']) {
        $desc .= ' ('.$score['source'].')';
    }
    $desc .= ' pour '.strtolower($score['name_band']);
    ?>
  <meta property="og:description" content="<?php echo $desc; ?>"/>
  <meta property="og:site_name" content="L'Ouïe Cinéphile - Partitions gratuites"/>
  <meta property="og:url" content="http://www.louiecinephile.fr/partitions/#/score/<?php echo $tag; ?>"/>

</head>
<body>
    <script type="text/javascript">
        window.location.replace("http://www.louiecinephile.fr/partitions/#/score/<?php echo $tag; ?>");
    </script>
</body>
</html>
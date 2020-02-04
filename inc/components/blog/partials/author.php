<?php
$company_name = get_bloginfo('name');
$site_url = get_bloginfo('url');
$author_id = get_the_author_meta('ID');
$team_id = get_field('team_id', 'user_' . $author_id);
$logo_img_url = get_field('company_logo', 'options');
$schemaType = $logo_img_url = get_field('company_type', 'options');
$prefix = get_field('prefix', $team_id);
$suffix = get_field('suffix', $team_id);
$name = get_the_author_meta('display_name');
$full_name = '';
$full_name .= (!empty($prefix)) ? $prefix . ' ' : '';
$full_name .= $name;
$full_name .= (!empty($suffix)) ? ', ' . $suffix : '';
$full_name_html = '';
$full_name_html .= (!empty($prefix)) ? '<span itemprop="honorificPrefix">' . $prefix . '</span> ' : '';
$full_name_html .= '<span itemprop="name">' . $name . '</span>';
$full_name_html .= (!empty($suffix)) ? ', <span itemprop="honorificSuffix">' . $suffix . '</span>' : '';
$job_title = (!empty(get_field('job_title', $team_id))) ? '<p class="team-title small" itemprop="jobTitle">' . get_field('job_title', $team_id) . '</p>' : '';
$author_img = get_the_post_thumbnail($team_id, 'medium', array('class' => 'author-image embed-responsive-item', 'title' => $full_name, 'alt' => $full_name, 'itemprop' => 'image'));
?>

<?php if (is_single()) : ?>
    <div class="widget post-author">
        <h4 class="widget-title"><i class="maat maat-pen-solid"></i> Written By:</h4>
        <div itemscope itemprop="author" itemtype="http://schema.org/Person" class="post-author-inner">
            <a itemprop="url" href="<?php echo get_permalink($team_id); ?>" rel="author">
            <?php if (!empty($author_img)) {
                echo $author_img;
            } ?>
            <div class="author-name">
                <h3 class="h5"><?php echo $full_name_html; ?></h3>
                <?php echo $job_title; ?>
            </div>
            </a>
        </div>

        <div itemscope itemprop="publisher" itemtype="http://schema.org/<?php echo $schemaType; ?>" class="post-publisher d-none">
            <img itemprop="logo" src="<?php echo $logo_img_url; ?>" title="<?php echo $company_name; ?> Logo" alt="<?php echo $company_name; ?> Logo" class="publisher-logo" />
            <h5><span itemprop="name"><?php echo $company_name; ?></span></a></h5>
        </div>
    </div>
<?php else : ?>
    <span itemscope itemprop="author" itemtype="http://schema.org/Person" class="post-author meta-item d-flex align-items-center">
        <i class="maat maat-pen-solid"></i> <span>By: <?php echo $full_name_html; ?></span>
        <link itemprop="url" href="<?php echo get_permalink($team_id); ?>" rel="author" />
    </span>
<?php endif ?>

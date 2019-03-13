<?php

if (!function_exists('gt3_footer_area')) {
    function gt3_footer_area()
    {
        // footer option
        $id = gt3_get_queried_object_id();
        $footer_switch = gt3_option('footer_switch');
        $footer_spacing = gt3_option('footer_spacing');
        $footer_column = gt3_option_compare('footer_column', 'mb_footer_switch', 'yes');
        $footer_column2 = gt3_option_compare('footer_column2', 'mb_footer_switch', 'yes');
        $footer_column3 = gt3_option_compare('footer_column3', 'mb_footer_switch', 'yes');
        $footer_column5 = gt3_option_compare('footer_column5', 'mb_footer_switch', 'yes');
        $footer_align = gt3_option_compare('footer_align', 'mb_footer_switch', 'yes');
        $footer_full_width = gt3_option_compare('footer_full_width', 'mb_footer_switch', 'yes');
        $footer_bg_color = gt3_option_compare('footer_bg_color', 'mb_footer_switch', 'yes');
        $footer_top_margin = gt3_option_compare('footer_top_margin', 'mb_footer_switch', 'yes');

        // copyright option
        $copyright_switch = gt3_option('copyright_switch');
        $copyright_spacing = gt3_option('copyright_spacing');
        $copyright_editor = gt3_option_compare('copyright_editor', 'mb_copyright_switch', '1', 'mb_footer_switch', 'yes');
        $copyright_align = gt3_option_compare('copyright_align', 'mb_copyright_switch', '1', 'mb_footer_switch', 'yes');
        $copyright_bg_color = gt3_option_compare('copyright_bg_color', 'mb_copyright_switch', '1', 'mb_footer_switch', 'yes');
        $copyright_top_border = gt3_option("copyright_top_border");
        $copyright_top_border_color = gt3_option("copyright_top_border_color");

        // Pre Footer option
        $pre_footer_switch = gt3_option('pre_footer_switch');
        $pre_footer_spacing = gt3_option('pre_footer_spacing');
        $pre_footer_editor = gt3_option_compare('pre_footer_editor', 'mb_pre_footer_switch', '1', 'mb_footer_switch', 'yes');
        $pre_footer_align = gt3_option_compare('pre_footer_align', 'mb_pre_footer_switch', '1', 'mb_footer_switch', 'yes');
        $pre_footer_bottom_border = gt3_option("pre_footer_bottom_border");
        $pre_footer_bottom_border_color = gt3_option("pre_footer_bottom_border_color");

        // METABOX VAR
        if (class_exists('RWMB_Loader') && $id !== 0) {
            $mb_footer_switch = rwmb_meta('mb_footer_switch', array(), $id);
            if ($mb_footer_switch == 'yes') {
                $footer_switch = true;
                $footer_spacing = array();
                $mb_padding_top = rwmb_meta('mb_padding_top', array(), $id);
                $mb_padding_bottom = rwmb_meta('mb_padding_bottom', array(), $id);
                $mb_padding_left = rwmb_meta('mb_padding_left', array(), $id);
                $mb_padding_right = rwmb_meta('mb_padding_right', array(), $id);
                $footer_spacing['padding-top'] = !empty($mb_padding_top) ? $mb_padding_top : '';
                $footer_spacing['padding-bottom'] = !empty($mb_padding_bottom) ? $mb_padding_bottom : '';
                $footer_spacing['padding-left'] = !empty($mb_padding_left) ? $mb_padding_left : '';
                $footer_spacing['padding-right'] = !empty($mb_padding_right) ? $mb_padding_right : '';
                $mb_footer_sidebar_1 = rwmb_meta('mb_footer_sidebar_1', array(), $id);
                $mb_footer_sidebar_2 = rwmb_meta('mb_footer_sidebar_2', array(), $id);
                $mb_footer_sidebar_3 = rwmb_meta('mb_footer_sidebar_3', array(), $id);
                $mb_footer_sidebar_4 = rwmb_meta('mb_footer_sidebar_4', array(), $id);
                $mb_footer_sidebar_5 = rwmb_meta('mb_footer_sidebar_5', array(), $id);
            } elseif (rwmb_meta('mb_footer_switch', array(), $id) == 'no') {
                $footer_switch = false;
            }

            if ($mb_footer_switch == 'yes') {
                $mb_copyright_switch = rwmb_meta('mb_copyright_switch', array(), $id);
                if ($mb_copyright_switch == '1') {
                    $copyright_switch = true;
                    $mb_copyright_padding_top = rwmb_meta('mb_copyright_padding_top', array(), $id);
                    $mb_copyright_padding_bottom = rwmb_meta('mb_copyright_padding_bottom', array(), $id);
                    $mb_copyright_padding_left = rwmb_meta('mb_copyright_padding_left', array(), $id);
                    $mb_copyright_padding_right = rwmb_meta('mb_copyright_padding_right', array(), $id);
                    $copyright_spacing['padding-top'] = !empty($mb_copyright_padding_top) ? $mb_copyright_padding_top : '';
                    $copyright_spacing['padding-bottom'] = !empty($mb_copyright_padding_bottom) ? $mb_copyright_padding_bottom : '';
                    $copyright_spacing['padding-left'] = !empty($mb_copyright_padding_left) ? $mb_copyright_padding_left : '';
                    $copyright_spacing['padding-right'] = !empty($mb_copyright_padding_right) ? $mb_copyright_padding_right : '';

                    $copyright_top_border = rwmb_meta("mb_copyright_top_border", array(), $id);
                    $mb_copyright_top_border_color = rwmb_meta("mb_copyright_top_border_color", array(), $id);
                    $mb_copyright_top_border_color_opacity = rwmb_meta("mb_copyright_top_border_color_opacity", array(), $id);

                    if (!empty($mb_copyright_top_border_color) && $copyright_top_border == '1') {
                        $copyright_top_border_color['rgba'] = 'rgba(' . (gt3_HexToRGB($mb_copyright_top_border_color)) . ',' . $mb_copyright_top_border_color_opacity . ')';
                    } else {
                        $copyright_top_border_color = '';
                    }

                } else {
                    $copyright_switch = false;
                }

                $mb_pre_footer_switch = rwmb_meta('mb_pre_footer_switch', array(), $id);
                if ($mb_pre_footer_switch == '1') {
                    $pre_footer_switch = true;
                    $mb_pre_footer_padding_top = rwmb_meta('mb_pre_footer_padding_top', array(), $id);
                    $mb_pre_footer_padding_bottom = rwmb_meta('mb_pre_footer_padding_bottom', array(), $id);
                    $mb_pre_footer_padding_left = rwmb_meta('mb_pre_footer_padding_left', array(), $id);
                    $mb_pre_footer_padding_right = rwmb_meta('mb_pre_footer_padding_right', array(), $id);
                    $pre_footer_spacing['padding-top'] = !empty($mb_pre_footer_padding_top) ? $mb_pre_footer_padding_top : '';
                    $pre_footer_spacing['padding-bottom'] = !empty($mb_pre_footer_padding_bottom) ? $mb_pre_footer_padding_bottom : '';
                    $pre_footer_spacing['padding-left'] = !empty($mb_pre_footer_padding_left) ? $mb_pre_footer_padding_left : '';
                    $pre_footer_spacing['padding-right'] = !empty($mb_pre_footer_padding_right) ? $mb_pre_footer_padding_right : '';

                    $pre_footer_bottom_border = rwmb_meta("mb_pre_footer_bottom_border", array(), $id);
                    $mb_pre_footer_bottom_border_color = rwmb_meta("mb_pre_footer_bottom_border_color", array(), $id);
                    $mb_pre_footer_bottom_border_color_opacity = rwmb_meta("mb_pre_footer_bottom_border_color_opacity", array(), $id);

                    if (!empty($mb_pre_footer_bottom_border_color) && $pre_footer_bottom_border == '1') {
                        $pre_footer_bottom_border_color['rgba'] = 'rgba(' . (gt3_HexToRGB($mb_pre_footer_bottom_border_color)) . ',' . $mb_pre_footer_bottom_border_color_opacity . ')';
                    } else {
                        $pre_footer_bottom_border_color = '';
                    }

                } else {
                    $pre_footer_switch = false;
                }

            } elseif (rwmb_meta('mb_footer_switch', array(), $id) == 'no') {
                $copyright_switch = false;
                $pre_footer_switch = false;
            }

        } else {
            $mb_footer_switch = false;
        }

        //footer container style
        $footer_cont_style = !empty($footer_bg_color) ? ' background-color :' . esc_attr($footer_bg_color) . ';' : '';
        $footer_cont_style .= !empty($footer_top_margin) && !empty($footer_top_margin['margin-top']) ? 'margin-top :' . (int)esc_attr($footer_top_margin['margin-top']) . 'px;' : '';
        $footer_cont_style .= gt3_background_render('footer', 'mb_footer_switch', 'yes');

        // $footer_cont_style = !empty($footer_cont_style) ? ' style="' . $footer_cont_style . '"' : '';

        //footer container class
        $footer_class = '';
        $footer_class .= ' align-' . esc_attr($footer_align);

        //footer padding
        $footer_top_padding = !empty($footer_spacing['padding-top']) ? $footer_spacing['padding-top'] : '';
        $footer_bottom_padding = !empty($footer_spacing['padding-bottom']) ? $footer_spacing['padding-bottom'] : '';
        $footer_left_padding = !empty($footer_spacing['padding-left']) ? $footer_spacing['padding-left'] : '';
        $footer_right_padding = !empty($footer_spacing['padding-right']) ? $footer_spacing['padding-right'] : '';

        //footer style
        $footer_style = '';
        $footer_style .= !empty($footer_top_padding) ? 'padding-top:' . esc_attr($footer_top_padding) . 'px;' : '';
        $footer_style .= !empty($footer_bottom_padding) ? 'padding-bottom:' . esc_attr($footer_bottom_padding) . 'px;' : '';
        $footer_style .= !empty($footer_left_padding) ? 'padding-left:' . esc_attr($footer_left_padding) . 'px;' : '';
        $footer_style .= !empty($footer_right_padding) ? 'padding-right:' . esc_attr($footer_right_padding) . 'px;' : '';
        // $footer_style = !empty($footer_style) ? ' style="' . $footer_style . '"' : '';

        /*
         *
         * copyright code
         */
        // copyright class
        $copyright_class = '';
        $copyright_class .= ' align-' . esc_attr($copyright_align);

        // copyright container style
        $copyright_cont_style = '';
        // $copyright_cont_style .= !empty($copyright_bg_color) ? 'background-color:' . esc_attr($copyright_bg_color) . ';' : '';

        if ($copyright_top_border == '1') {
            $copyright_cont_border_style = !empty($copyright_top_border_color['rgba']) ? ' style="border-top: 1px solid ' . esc_attr($copyright_top_border_color['rgba']) . ';"' : '';
            if ($footer_full_width) {
                $copyright_cont_style = !empty($copyright_top_border_color['rgba']) ? 'border-top: 1px solid ' . esc_attr($copyright_top_border_color['rgba']) . ';' : '';
            }
        } else {
            $copyright_cont_border_style = '';
        }
        $copyright_cont_style = !empty($copyright_cont_style) ? ' style="' . $copyright_cont_style . '"' : '';

        // copyright padding
        $copyright_top_padding = !empty($copyright_spacing['padding-top']) ? $copyright_spacing['padding-top'] : '';
        $copyright_bottom_padding = !empty($copyright_spacing['padding-bottom']) ? $copyright_spacing['padding-bottom'] : '';
        $copyright_left_padding = !empty($copyright_spacing['padding-left']) ? $copyright_spacing['padding-left'] : '';
        $copyright_right_padding = !empty($copyright_spacing['padding-right']) ? $copyright_spacing['padding-right'] : '';
        // copyright style
        $copyright_style = '';
        $copyright_style .= !empty($copyright_top_padding) ? 'padding-top:' . esc_attr($copyright_top_padding) . 'px;' : '';
        $copyright_style .= !empty($copyright_bottom_padding) ? 'padding-bottom:' . esc_attr($copyright_bottom_padding) . 'px;' : '';
        $copyright_style .= !empty($copyright_left_padding) ? 'padding-left:' . esc_attr($copyright_left_padding) . 'px;' : '';
        $copyright_style .= !empty($copyright_right_padding) ? 'padding-right:' . esc_attr($copyright_right_padding) . 'px;' : '';
        // $copyright_style = !empty($copyright_style) ? ' style="' . $copyright_style . '"' : '';

        // copyright class
        $pre_footer_class = '';
        $pre_footer_class .= ' align-' . esc_attr($pre_footer_align);

        // copyright container style
        $pre_footer_cont_style = '';
        if ($pre_footer_bottom_border == '1') {
            $pre_footer_cont_style .= !empty($pre_footer_bottom_border_color['rgba']) ? 'border-bottom: 1px solid ' . esc_attr($pre_footer_bottom_border_color['rgba']) . ';border-top: 1px solid ' . esc_attr($pre_footer_bottom_border_color['rgba']) . ';' : '';
        }
        $pre_footer_cont_style = !empty($pre_footer_cont_style) ? ' style="' . $pre_footer_cont_style . '"' : '';

        // copyright padding
        $pre_footer_top_padding = !empty($pre_footer_spacing['padding-top']) ? $pre_footer_spacing['padding-top'] : '';
        $pre_footer_bottom_padding = !empty($pre_footer_spacing['padding-bottom']) ? $pre_footer_spacing['padding-bottom'] : '';
        $pre_footer_left_padding = !empty($pre_footer_spacing['padding-left']) ? $pre_footer_spacing['padding-left'] : '';
        $pre_footer_right_padding = !empty($pre_footer_spacing['padding-right']) ? $pre_footer_spacing['padding-right'] : '';
        // copyright style
        $pre_footer_style = '';
        $pre_footer_style .= !empty($pre_footer_top_padding) ? 'padding-top:' . esc_attr($pre_footer_top_padding) . 'px;' : '';
        $pre_footer_style .= !empty($pre_footer_bottom_padding) ? 'padding-bottom:' . esc_attr($pre_footer_bottom_padding) . 'px;' : '';
        $pre_footer_style .= !empty($pre_footer_left_padding) ? 'padding-left:' . esc_attr($pre_footer_left_padding) . 'px;' : '';
        $pre_footer_style .= !empty($pre_footer_right_padding) ? 'padding-right:' . esc_attr($pre_footer_right_padding) . 'px;' : '';
        // $pre_footer_style = !empty($pre_footer_style) ? ' style="' . $pre_footer_style . '"' : '';
        /*
         *
         * column build
         */
        $column_sizes = array();
        switch ((int)$footer_column) {
            case 1:
                $column_sizes = array('12');
                break;
            case 2:
                $column_sizes = explode("-", $footer_column2);
                break;
            case 3:
                $column_sizes = explode("-", $footer_column3);
                break;
            case 4:
                $column_sizes = array('3', '3', '3', '3');
                break;
            case 5:
                $column_sizes = explode("-", $footer_column5);
                break;
            default:
                $column_sizes = array('3', '3', '3', '3');
                break;
        }
        /*
         *
         * footer out
         */
        if ($footer_switch || $copyright_switch || $pre_footer_switch) {
            echo "<footer class='main_footer fadeOnLoad clearfix' id='footer'>";

            if ($pre_footer_switch && !empty($pre_footer_editor)) {
                echo "<div class='pre_footer container-wrapper" . $pre_footer_class . "'" . ($footer_full_width ? $pre_footer_cont_style : '') . "><div class='container-wrapper-inner'>";
                echo ($footer_full_width) ? "" : "<div class='container-fluid'" . $pre_footer_cont_style . ">";
                echo "<div class='row'>";
                echo "<div class='col-12'><div class='col-inner'>";
                echo do_shortcode($pre_footer_editor);
                echo "</div></div></div></div></div>";
                echo ($footer_full_width) ? "" : "</div>";
                echo "</div>";
            }

            if ($footer_switch) {
                echo "<div class='container-wrapper top_footer column_" . (int)$footer_column . $footer_class . "'><div class='container-wrapper-inner'>";
                echo ($footer_full_width ? "" : "<div class='container'>");
                echo "<div class='row'>";
                for ($i = 0; $i < (int)$footer_column; $i++) {
                    echo "<div id='footer-col-" . ($i + 1) . "' class='footer-col col-ms-6 col-lg-" . $column_sizes[$i] . "'><div class='col-inner'>";
                    if ($mb_footer_switch == 'yes') {
                        if (is_active_sidebar(${'mb_footer_sidebar_' . ($i + 1)})) {
                            dynamic_sidebar(${'mb_footer_sidebar_' . ($i + 1)});
                        }
                    } else {
                        if (is_active_sidebar('footer_column_' . ($i + 1))) {
                            dynamic_sidebar('footer_column_' . ($i + 1));
                        }
                    }

                    echo "</div></div>";
                }
                echo "</div></div>";
                echo ($footer_full_width ? "" : "</div>");
                echo "</div>";
            }

            if ($copyright_switch) {
                echo "<div class='container-wrapper copyright" . $copyright_class . "'" . $copyright_cont_style . "><div class='container-wrapper-inner'>";
                echo ($footer_full_width ? "" : "<div class='container'>");
                echo "<div class='row'>";
                echo "<div class='col-12'>";
                echo do_shortcode($copyright_editor);
                echo "</div></div>";
                echo "</div>";
                echo ($footer_full_width ? "" : "</div>");
                echo "</div>";
            }

            echo "</footer>";
        }
    }
}

const dark = `
    bg_base: #212121;
    bg_sections: #000000;
    color_border: #37393e;
    
    color_base: #c8c8c8;

    color_text_1: #fff;
    color_text_2: #d4d4d4;
    color_text_3: #747677;
    color_muted: #000;

    color_accent: 16,161,68;

    bg_primary: #1c1b23;
    color_primary: #e1f5fe;
    bg_hover_primary: #3e3d42;
    color_hover_primary: #fff;

    bg_success: #4caf50;
    color_success: #e8f5e9;
    bg_hover_success: #43a047;
    color_hover_success: #fff;
    
    bg_danger: #e64a19 ;
    color_danger: #fbe9e7;
    bg_hover_danger: #d84315;
    color_hover_danger: #fff;

    ${
      "" +
        "" /* Create a shade of the bg_base color. 
        If the base color is dark then go from drak => light
        If the base color is light then go from light => dark
     */
    }
    base_shade_1: #212121
    base_shade_2: #393838
    base_shade_3: #616161
    base_shade_4: #757575
    base_shade_5: #9e9e9e
    base_shade_6: #bdbdbd
    base_shade_7: #e0e0e0
    base_shade_8: #eeeeee
    base_shade_9: #f5f5f5

    box_shadow:  0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);

    box_shadow_inset: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.72);
`;

export default dark;

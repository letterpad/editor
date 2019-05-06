const dark = `
    --bg-base: #212121;
    --bg-sections: #000000;
    --color-border: #37393e;
    
    --color-base: #c8c8c8;

    --color-text-1: #fff;
    --color-text-2: #d4d4d4;
    --color-text-3: #747677;
    --color-muted: #000;

    --color-accent: 16,161,68;

    --bg-primary: #1c1b23;
    --color-primary: #e1f5fe;
    --bg-hover-primary: #3e3d42;
    --color-hover-primary: #fff;

    --bg-success: #4caf50;
    --color-success: #e8f5e9;
    --bg-hover-success: #43a047;
    --color-hover-success: #fff;
    
    --bg-danger: #e64a19 ;
    --color-danger: #fbe9e7;
    --bg-hover-danger: #d84315;
    --color-hover-danger: #fff;

    ${
      "" +
        "" /* Create a shade of the --bg-base color. 
        If the base color is dark then go from drak => light
        If the base color is light then go from light => dark
     */
    }
    --base-shade-1: #212121
    --base-shade-2: #393838
    --base-shade-3: #616161
    --base-shade-4: #757575
    --base-shade-5: #9e9e9e
    --base-shade-6: #bdbdbd
    --base-shade-7: #e0e0e0
    --base-shade-8: #eeeeee
    --base-shade-9: #f5f5f5

    --box-shadow:  0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);

    --box-shadow-inset: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.72);
`;

export default dark;

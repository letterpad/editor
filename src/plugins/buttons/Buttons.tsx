import {
  createBlockStyleButton,
  createInlineStyleButton,
} from "@draft-js-plugins/buttons";

export const ButtonBold = createInlineStyleButton({
  style: "BOLD",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
    </svg>
  ),
});

export const ButtonItalic = createInlineStyleButton({
  style: "ITALIC",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
    </svg>
  ),
});

export const ButtonUnderline = createInlineStyleButton({
  style: "UNDERLINE",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      fill="#000000"
    >
      <rect
        id="backgroundrect"
        width="100%"
        height="100%"
        x="0"
        y="0"
        fill="none"
        stroke="none"
      />
      <g>
        <path
          d="M-0.2597402483224869,-0.43290044367313374 h24 v24 H-0.2597402483224869 V-0.43290044367313374 z"
          fill="none"
          id="svg_1"
        />
        <path
          d="M12,15.970659211277962 c3.31,0 6,-2.392405044436455 6,-5.3362194299697885 V3.519480541348458 h-2.5 v7.114959239959717 c0,1.716483916640282 -1.57,3.112794667482376 -3.5,3.112794667482376 S8.5,12.350923697948456 8.5,10.634439781308174 V3.519480541348458 H6 v7.114959239959717 c0,2.943814385533333 2.6900000000000004,5.3362194299697885 6,5.3362194299697885 zm-7,1.7787398099899292 v1.7787398099899292 h14 v-1.7787398099899292 H5 z"
          id="svg_2"
        />
      </g>
    </svg>
  ),
});

export const ButtonLink = createInlineStyleButton({
  style: "LINK",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
    </svg>
  ),
});

export const ButtonHighlight = createInlineStyleButton({
  style: "CODE",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      fill="#000000"
    >
      <rect
        id="backgroundrect"
        width="100%"
        height="100%"
        x="0"
        y="0"
        fill="none"
        stroke="none"
      />
      <g>
        <title>Layer 1</title>
        <path d="M0 0h24v24H0V0z" fill="none" id="svg_1" />
        <path
          d="M7.90663645480163,15.222562246024609 c0.4791178226470948,0 0.8711233139038117,0.3920054912567154 0.8711233139038117,0.8711233139038117 c0,0.9582356452941927 -0.7840109825134277,1.7422466278076172 -1.7422466278076172,1.7422466278076172 c-0.14809096336364747,0 -0.28747069358825933,-0.017422466278076174 -0.4355616569519043,-0.043556165695190836 c0.2700482273101808,-0.4791178226470948 0.4355616569519043,-1.0540592098236083 0.4355616569519043,-1.698690462112433 c0,-0.4791178226470948 0.3920054912567154,-0.8711233139038117 0.8711233139038117,-0.8711233139038117 M18.072645528059077,3.897959165275097 c-0.22649206161499136,0 -0.44427289009094506,0.08711233139038092 -0.6184975528717046,0.2526257610321048 L9.648883082609245,11.955849818885326 L12.044472195844719,14.3514389321208 l7.805264892578125,-7.805264892578125 c0.3397380924224854,-0.3397380924224854 0.3397380924224854,-0.8885457801818875 0,-1.2282838726043703 l-1.1673052406311035,-1.1673052406311035 c-0.17422466278076174,-0.17422466278076174 -0.3920054912567154,-0.2526257610321048 -0.609786319732663,-0.2526257610321048 zM7.90663645480163,13.480315618216991 c-1.4460647010803225,0 -2.613369941711426,1.1673052406311035 -2.613369941711426,2.613369941711426 c0,1.1411715412139893 -1.0105030441284182,1.7422466278076172 -1.7422466278076172,1.7422466278076172 c0.8014334487915035,1.0627704429626466 2.1690970516204837,1.7422466278076172 3.4844932556152344,1.7422466278076172 c1.925182523727417,0 3.4844932556152344,-1.5593107318878174 3.4844932556152344,-3.4844932556152344 c0,-1.4460647010803225 -1.1673052406311035,-2.613369941711426 -2.613369941711426,-2.613369941711426 z"
          id="svg_2"
        />
      </g>
    </svg>
  ),
});

export const ButtonBlockQuote = createBlockStyleButton({
  blockType: "blockquote",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18.62 18h-5.24l2-4H13V6h8v7.24L18.62 18zm-2-2h.76L19 12.76V8h-4v4h3.62l-2 4zm-8 2H3.38l2-4H3V6h8v7.24L8.62 18zm-2-2h.76L9 12.76V8H5v4h3.62l-2 4z" />
    </svg>
  ),
});

export const ButtonImage = createBlockStyleButton({
  blockType: "IMAGE",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
    </svg>
  ),
});
export const ButtonVideo = createBlockStyleButton({
  blockType: "VIDEO",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <g>
        <rect fill="none" height="24" width="24" y="0" />
      </g>
      <g>
        <g>
          <polygon points="9.5,7.5 9.5,16.5 16.5,12" />
          <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,18.01H4V5.99h16V18.01z" />
        </g>
      </g>
    </svg>
  ),
});

export const ButtonCode = createBlockStyleButton({
  blockType: "code-block",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
});
export const ButtonHeadingOne = createBlockStyleButton({
  blockType: "header-one",
  children: (
    <span
      style={{
        letterSpacing: "-0.07rem",
        fontWeight: "bold",
        display: "block",
        marginBottom: "3px",
        fontSize: "95%",
        padding: "0.2rem 0",
      }}
    >
      H1
    </span>
  ),
});

export const ButtonHeadingTwo = createBlockStyleButton({
  blockType: "header-two",
  children: (
    <span
      style={{
        letterSpacing: "-0.07rem",
        display: "block",
        marginBottom: "3px",
        fontSize: "95%",
        padding: "0.2rem 0",
      }}
    >
      H2
    </span>
  ),
});

export const ButtonUnOrderedList = createBlockStyleButton({
  blockType: "unordered-list-item",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <g fill="none">
        <path d="M0 0h24v24H0V0z" />
        <path d="M0 0h24v24H0V0z" opacity=".87" />
      </g>
      <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
    </svg>
  ),
});

export const ButtonOrderedList = createBlockStyleButton({
  blockType: "ordered-list-item",
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
    </svg>
  ),
});

# Design QA

Target: the approved Stitch section structure combined with the previous site's hero and navigation behavior. Implementation checked at 1440 × 900 and 500 × 844 browser viewports.

- Section order, alternating split sections, 520 px wide image section, four-card category grid, burgundy contact band, typography, radii, and controls retain the selected structure.
- The previous meat hero is restored at exactly one viewport high, so the next section does not appear on initial load. Its image is fixed while its gradient stays inside and scrolls with the hero.
- Hero scale, lift, and subtle bottom-origin perspective are driven by scroll position. The production background uses a separate image, fills one viewport, and remains fixed inside its clipped section.
- The existing Et Sarrafı brand mark and animated scroll cue are retained. Desktop navigation starts transparent with centered links and changes to a translucent blurred surface after scrolling.
- Mobile layout stacks content, wraps hero actions, exposes the keyboard-operable menu, and keeps images and copy inside the viewport.
- Approved project copy replaces unverified claims from Stitch. Supplied Stitch imagery is labeled as representative where it carries content meaning.
- Motion preserves visible server-rendered content, respects reduced motion, and keeps the wide-photo text outside the zoomed layer.
- Text and medium-image reveals begin after the block reaches the 58% viewport line, follow scroll continuously, and reverse as the block leaves through the top.
- The contact area keeps its fixed photographic background. The footer uses a white surface and the same 1184 px content alignment. Their complementary minimum heights total one viewport.

Final result: passed.

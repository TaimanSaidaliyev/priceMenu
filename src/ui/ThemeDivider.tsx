import { borderBottomWidth } from "html2canvas/dist/types/css/property-descriptors/border-width";

interface PaddingThemeDivider {
    pt?: number,
    pb?: number,
    ps?: number,
    pe?: number,
}

export default function ThemeDivider(padding: PaddingThemeDivider) {
    const { pt = 0, pb = 0, ps = 0, pe = 0 } = padding;

    return (
        <>
        <div className={`pt-${pt} pb-${pb} ps-${ps} pe-${pe}`}>
            <div className="border-gray-150" style={{borderBottomWidth: 1}}></div>
        </div>
        </>
    )
}

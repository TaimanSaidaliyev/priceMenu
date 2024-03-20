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
            <div className="border-b-2 border-gray-150"></div>
        </div>
        </>
    )
}

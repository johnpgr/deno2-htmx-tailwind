const createElement = (tag, attrs, children = [])=>{
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name)=>{
        element.setAttribute(name, String(attrs[name]));
    });
    if (children.length) {
        children.forEach((child)=>{
            const childElement = createElement(...child);
            element.appendChild(childElement);
        });
    }
    return element;
};
var createElement$1 = ([tag, attrs, children])=>createElement(tag, attrs, children);
const getAttrs = (element)=>Array.from(element.attributes).reduce((attrs, attr)=>{
        attrs[attr.name] = attr.value;
        return attrs;
    }, {});
const getClassNames = (attrs)=>{
    if (typeof attrs === "string") return attrs;
    if (!attrs || !attrs.class) return "";
    if (attrs.class && typeof attrs.class === "string") {
        return attrs.class.split(" ");
    }
    if (attrs.class && Array.isArray(attrs.class)) {
        return attrs.class;
    }
    return "";
};
const combineClassNames = (arrayOfClassnames)=>{
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray.map((classItem)=>classItem.trim()).filter(Boolean).filter((value, index, self)=>self.indexOf(value) === index).join(" ");
};
const toPascalCase = (string)=>string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2)=>g1.toUpperCase() + g2.toLowerCase());
const replaceElement = (element, { nameAttr, icons, attrs })=>{
    const iconName = element.getAttribute(nameAttr);
    if (iconName == null) return;
    const ComponentName = toPascalCase(iconName);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
        return console.warn(`${element.outerHTML} icon name was not found in the provided icons object.`);
    }
    const elementAttrs = getAttrs(element);
    const [tag, iconAttributes, children] = iconNode;
    const iconAttrs = {
        ...iconAttributes,
        "data-lucide": iconName,
        ...attrs,
        ...elementAttrs
    };
    const classNames = combineClassNames([
        "lucide",
        `lucide-${iconName}`,
        elementAttrs,
        attrs
    ]);
    if (classNames) {
        Object.assign(iconAttrs, {
            class: classNames
        });
    }
    const svgElement = createElement$1([
        tag,
        iconAttrs,
        children
    ]);
    return element.parentNode?.replaceChild(svgElement, element);
};
const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
};
const LoaderCircle = [
    "svg",
    defaultAttributes,
    [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-6.219-8.56"
            }
        ]
    ]
];
const LockKeyhole = [
    "svg",
    defaultAttributes,
    [
        [
            "circle",
            {
                cx: "12",
                cy: "16",
                r: "1"
            }
        ],
        [
            "rect",
            {
                x: "3",
                y: "10",
                width: "18",
                height: "12",
                rx: "2"
            }
        ],
        [
            "path",
            {
                d: "M7 10V7a5 5 0 0 1 10 0v3"
            }
        ]
    ]
];
const Mail = [
    "svg",
    defaultAttributes,
    [
        [
            "rect",
            {
                width: "20",
                height: "16",
                x: "2",
                y: "4",
                rx: "2"
            }
        ],
        [
            "path",
            {
                d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
            }
        ]
    ]
];
const User = [
    "svg",
    defaultAttributes,
    [
        [
            "path",
            {
                d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "7",
                r: "4"
            }
        ]
    ]
];
const createIcons = ({ icons = {}, nameAttr = "data-lucide", attrs = {} } = {})=>{
    if (!Object.values(icons).length) {
        throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");
    }
    if (typeof document === "undefined") {
        throw new Error("`createIcons()` only works in a browser environment.");
    }
    const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach((element)=>replaceElement(element, {
            nameAttr,
            icons,
            attrs
        }));
    if (nameAttr === "data-lucide") {
        const deprecatedElements = document.querySelectorAll("[icon-name]");
        if (deprecatedElements.length > 0) {
            console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide");
            Array.from(deprecatedElements).forEach((element)=>replaceElement(element, {
                    nameAttr: "icon-name",
                    icons,
                    attrs
                }));
        }
    }
};
createIcons({
    icons: {
        User,
        Mail,
        LockKeyhole,
        Loader2: LoaderCircle
    }
});

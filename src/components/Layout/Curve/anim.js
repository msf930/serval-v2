export const blur = {
    initial: {
        
        filter: "blur(10px)"
        // transition: {duration: .2, delay: .1, ease: [0.76, 0, 0.24, 1]},
        // transitionEnd: { filter: "blur(0px)"}
    },
    enter: {
        
        filter: "blur(0px)",
        transition: {duration: .2, delay: .1, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {filter: "blur(0px)"}
    },
    exit: {
        
        filter: "blur(10px)",
        transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]}
    }
}

export const text = {
    initial: {
        opacity: 1,
        // transition: {duration: .0, delay: .0, ease: [0.76, 0, 0.24, 1]},
        // transitionEnd: { opacity: 1}
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {top: "47.5%"}
    },
    exit: {
        opacity: 0,
        top: "40%",
        transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]}
    }
}

export const curve = (initialPath, targetPath) => {
    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: initialPath,
            transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
        }
    }
}

export const translate = {
    initial: {
        top: "-300px"
    },
    enter: {
        top: "-100vh",
        transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd : {
            top: "100vh"
        }
    },
    exit: {
        top: "-300px",
        transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
    }
}
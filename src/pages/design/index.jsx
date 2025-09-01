'use client';
import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

import Curve from '@/components/Layout/Curve';

import { motion, animate } from 'motion/react';

export default function design({ pageRoute }) {

    const [innerHeight, setInnerHeight] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [overlay1Width, setOverlay1Width] = useState(0);
    const [overlay2Width, setOverlay2Width] = useState(0);
    const [overlay3Width, setOverlay3Width] = useState(0);
    const [overlay4Width, setOverlay4Width] = useState(0);
    const [overlay1Radius, setOverlay1Radius] = useState(50);
    const [overlay2Radius, setOverlay2Radius] = useState(50);
    const [overlay3Radius, setOverlay3Radius] = useState(50);
    const [overlay4Radius, setOverlay4Radius] = useState(50);
    const [dragText, setDragText] = useState("");
    const [dragBg, setDragBg] = useState("goldenrod");
    const designContOverlayRef = useRef(null);
    useEffect(() => {

        setInnerHeight(window.innerHeight);
        setSectionHeight((window.innerHeight - 100) / 2);
    }, []);

    const onDrag = (e, info) => {
        let x = info.offset.x;
        let y = info.offset.y;
        if (Math.abs(x) > 50 || Math.abs(y) > 50) {
            setDragBg("transparent");
            
            if (x > 0 && y < 0) {
                setDragText("2");
                animate(overlay2Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay2Width(latest);
                    }
                });
                animate(overlay2Radius, 0, {
                    onUpdate: latest => {
                        setOverlay2Radius(latest);
                    }
                });
            } else {
                animate(overlay2Width, 0, {
                    onUpdate: latest => {
                        setOverlay2Width(latest);
                    }
                });
                animate(overlay2Radius, 50, {
                    onUpdate: latest => {
                        setOverlay2Radius(latest);
                    }
                });
            }
            if (x < 0 && y < 0) {
                setDragText("1");
                animate(overlay1Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay1Width(latest);
                    }
                });
                animate(overlay1Radius, 0, {
                    onUpdate: latest => {
                        setOverlay1Radius(latest);
                    }
                });
            } else {
                animate(overlay1Width, 0, {
                    onUpdate: latest => {
                        setOverlay1Width(latest);
                    }
                });
                animate(overlay1Radius, 50, {
                    onUpdate: latest => {
                        setOverlay1Radius(latest);
                    }
                });
            }
            if (x < 0 && y > 0) {
                setDragText("3");
                animate(overlay3Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay3Width(latest);
                    }
                });
                animate(overlay3Radius, 0, {
                    onUpdate: latest => {
                        setOverlay3Radius(latest);
                    }
                });

            } else {
                animate(overlay3Width, 0, {
                    onUpdate: latest => {
                        setOverlay3Width(latest);
                    }
                });
                animate(overlay3Radius, 50, {
                    onUpdate: latest => {
                        setOverlay3Radius(latest);
                    }
                });
            }
            if (x > 0 && y > 0) {
                setDragText("4");
                animate(overlay4Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay4Width(latest);
                    }
                });
                animate(overlay4Radius, 0, {
                    onUpdate: latest => {
                        setOverlay4Radius(latest);
                    }
                });

            } else {
                animate(overlay4Width, 0, {
                    onUpdate: latest => {
                        setOverlay4Width(latest);
                    }
                });
                animate(overlay4Radius, 50, {
                    onUpdate: latest => {
                        setOverlay4Radius(latest);
                    }
                });
            }
        } else {
            setDragText("");
            setDragBg("goldenrod");
            animate(overlay1Width, 0, {
                onUpdate: latest => {
                    setOverlay1Width(latest);
                }
            });
            animate(overlay1Radius, 50, {
                onUpdate: latest => {
                    setOverlay1Radius(latest);
                }
            });
            animate(overlay2Width, 0, {
                onUpdate: latest => {
                    setOverlay2Width(latest);
                }
            });
            animate(overlay2Radius, 50, {
                onUpdate: latest => {
                    setOverlay2Radius(latest);
                }
            });
            animate(overlay3Width, 0, {
                onUpdate: latest => {
                    setOverlay3Width(latest);
                }
            });
            animate(overlay3Radius, 50, {
                onUpdate: latest => {
                    setOverlay3Radius(latest);
                }
            });
            animate(overlay4Width, 0, {
                onUpdate: latest => {
                    setOverlay4Width(latest);
                }
            });
            animate(overlay4Radius, 50, {
                onUpdate: latest => {
                    setOverlay4Radius(latest);
                }
            });
        }
    }
    const onDragEnd = (e, info) => {
        setDragText("");
        setDragBg("goldenrod");
        animate(overlay1Width, 0, {
            onUpdate: latest => {
                setOverlay1Width(latest);
            }
        });
        animate(overlay1Radius, 50, {
            onUpdate: latest => {
                setOverlay1Radius(latest);
            }
        });
        animate(overlay2Width, 0, {
            onUpdate: latest => {
                setOverlay2Width(latest);
            }
        });
        animate(overlay2Radius, 50, {
            onUpdate: latest => {
                setOverlay2Radius(latest);
            }
        });
        animate(overlay3Width, 0, {
            onUpdate: latest => {
                setOverlay3Width(latest);
            }
        });
        animate(overlay3Radius, 50, {
            onUpdate: latest => {
                setOverlay3Radius(latest);
            }
        });
        animate(overlay4Width, 0, {
            onUpdate: latest => {
                setOverlay4Width(latest);
            }
        });
        animate(overlay4Radius, 50, {
            onUpdate: latest => {
                setOverlay4Radius(latest);
            }
        });
    }
    return (
        <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>
                <div className={styles.mobileMain}>
                    <div className={styles.designContOverlay} ref={designContOverlayRef}>
                        <motion.div className={styles.designContDrag}
                            drag   
                            dragSnapToOrigin
                            onDrag={onDrag}
                            onDragEnd={onDragEnd}
                            dragConstraints={designContOverlayRef}
                            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                            style={{ backgroundColor: dragBg }}
                        >
                            <h1>{dragText}</h1>
                        </motion.div>
                        <div className={styles.designContOverlayItem}>

                        </div>
                    </div>
                    <div className={styles.designCont}>
                        <div className={styles.designContItem}>
                            <h1>1</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay1Width, height: overlay1Width, borderRadius: overlay1Radius }}></div>
                        </div>
                        <div className={styles.designContItem}>
                            <h1>2</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay2Width, height: overlay2Width, borderRadius: overlay2Radius }}></div>
                        </div>

                        <div className={styles.designContItem}>
                            <h1>3</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay3Width, height: overlay3Width, borderRadius: overlay3Radius }}></div>
                        </div>
                        <div className={styles.designContItem}>
                            <h1>4</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay4Width, height: overlay4Width, borderRadius: overlay4Radius }}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.designCard}></div>
            </Curve>
        </motion.div>
    );
}


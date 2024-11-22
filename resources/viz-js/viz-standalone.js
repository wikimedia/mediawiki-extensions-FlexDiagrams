/*!
Viz.js 3.9.0
Copyright (c) 2023 Michael Daines

This distribution contains other software in object code form:
Graphviz https://www.graphviz.org
Expat https://libexpat.github.io
*/
! function(A, I) {
    "object" == typeof exports && "undefined" != typeof module ? I(exports) : "function" == typeof define && define.amd ? define(["exports"], I) : I((A = "undefined" != typeof globalThis ? globalThis : A || self).Viz = {})
}(this, (function(A) {
    "use strict";
    var I = function() {
        var A, I, g, B, C, Q, E, D, w, i, o, G = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            M = new Promise(((I, g) => {
                A = I
            })),
            R = A => console.log(A);

        function F(A) {
            throw A
        }

        function y() {
            var A = o.buffer;
            g = new Int8Array(A), B = new Int16Array(A), Q = new Uint8Array(A), C = new Int32Array(A), E = new Uint32Array(A), D = new Float32Array(A), w = new Float64Array(A), i = new BigInt64Array(A), new BigUint64Array(A)
        }
        G.agerrMessages = [], G.stderrMessages = [], I = A => G.stderrMessages.push(A);
        var K = "undefined" != typeof TextDecoder ? new TextDecoder : void 0,
            h = (A, I, g) => {
                for (var B = I + g, C = I; A[C] && !(C >= B);) ++C;
                if (C - I > 16 && A.buffer && K) return K.decode(A.subarray(I, C));
                for (var Q = ""; I < C;) {
                    var E = A[I++];
                    if (128 & E) {
                        var D = 63 & A[I++];
                        if (192 != (224 & E)) {
                            var w = 63 & A[I++];
                            if ((E = 224 == (240 & E) ? (15 & E) << 12 | D << 6 | w : (7 & E) << 18 | D << 12 | w << 6 | 63 & A[I++]) < 65536) Q += String.fromCharCode(E);
                            else {
                                var i = E - 65536;
                                Q += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
                            }
                        } else Q += String.fromCharCode((31 & E) << 6 | D)
                    } else Q += String.fromCharCode(E)
                }
                return Q
            },
            s = (A, I) => A ? h(Q, A, I) : "";
        class N {
            constructor(A) {
                this.excPtr = A, this.ptr = A - 24
            }
            set_type(A) {
                E[this.ptr + 4 >> 2] = A
            }
            get_type() {
                return E[this.ptr + 4 >> 2]
            }
            set_destructor(A) {
                E[this.ptr + 8 >> 2] = A
            }
            get_destructor() {
                return E[this.ptr + 8 >> 2]
            }
            set_caught(A) {
                A = A ? 1 : 0, g[this.ptr + 12] = A
            }
            get_caught() {
                return 0 != g[this.ptr + 12]
            }
            set_rethrown(A) {
                A = A ? 1 : 0, g[this.ptr + 13] = A
            }
            get_rethrown() {
                return 0 != g[this.ptr + 13]
            }
            init(A, I) {
                this.set_adjusted_ptr(0), this.set_type(A), this.set_destructor(I)
            }
            set_adjusted_ptr(A) {
                E[this.ptr + 16 >> 2] = A
            }
            get_adjusted_ptr() {
                return E[this.ptr + 16 >> 2]
            }
            get_exception_ptr() {
                if (T(this.get_type())) return E[this.excPtr >> 2];
                var A = this.get_adjusted_ptr();
                return 0 !== A ? A : this.excPtr
            }
        }
        var L = {
                isAbs: A => "/" === A.charAt(0),
                splitPath: A => /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(A).slice(1),
                normalizeArray: (A, I) => {
                    for (var g = 0, B = A.length - 1; B >= 0; B--) {
                        var C = A[B];
                        "." === C ? A.splice(B, 1) : ".." === C ? (A.splice(B, 1), g++) : g && (A.splice(B, 1), g--)
                    }
                    if (I)
                        for (; g; g--) A.unshift("..");
                    return A
                },
                normalize: A => {
                    var I = L.isAbs(A),
                        g = "/" === A.substr(-1);
                    return (A = L.normalizeArray(A.split("/").filter((A => !!A)), !I).join("/")) || I || (A = "."), A && g && (A += "/"), (I ? "/" : "") + A
                },
                dirname: A => {
                    var I = L.splitPath(A),
                        g = I[0],
                        B = I[1];
                    return g || B ? (B && (B = B.substr(0, B.length - 1)), g + B) : "."
                },
                basename: A => {
                    if ("/" === A) return "/";
                    var I = (A = (A = L.normalize(A)).replace(/\/$/, "")).lastIndexOf("/");
                    return -1 === I ? A : A.substr(I + 1)
                },
                join: function() {
                    for (var A = arguments.length, I = new Array(A), g = 0; g < A; g++) I[g] = arguments[g];
                    return L.normalize(I.join("/"))
                },
                join2: (A, I) => L.normalize(A + "/" + I)
            },
            k = A => (k = (() => {
                if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) return A => crypto.getRandomValues(A);
                F("initRandomDevice")
            })())(A),
            U = {
                resolve: function() {
                    for (var A = "", I = !1, g = arguments.length - 1; g >= -1 && !I; g--) {
                        var B = g >= 0 ? g < 0 || arguments.length <= g ? void 0 : arguments[g] : q.cwd();
                        if ("string" != typeof B) throw new TypeError("Arguments to path.resolve must be strings");
                        if (!B) return "";
                        A = B + "/" + A, I = L.isAbs(B)
                    }
                    return (I ? "/" : "") + (A = L.normalizeArray(A.split("/").filter((A => !!A)), !I).join("/")) || "."
                },
                relative: (A, I) => {
                    function g(A) {
                        for (var I = 0; I < A.length && "" === A[I]; I++);
                        for (var g = A.length - 1; g >= 0 && "" === A[g]; g--);
                        return I > g ? [] : A.slice(I, g - I + 1)
                    }
                    A = U.resolve(A).substr(1), I = U.resolve(I).substr(1);
                    for (var B = g(A.split("/")), C = g(I.split("/")), Q = Math.min(B.length, C.length), E = Q, D = 0; D < Q; D++)
                        if (B[D] !== C[D]) {
                            E = D;
                            break
                        } var w = [];
                    for (D = E; D < B.length; D++) w.push("..");
                    return (w = w.concat(C.slice(E))).join("/")
                }
            },
            S = [],
            J = A => {
                for (var I = 0, g = 0; g < A.length; ++g) {
                    var B = A.charCodeAt(g);
                    B <= 127 ? I++ : B <= 2047 ? I += 2 : B >= 55296 && B <= 57343 ? (I += 4, ++g) : I += 3
                }
                return I
            },
            Y = (A, I, g, B) => {
                if (!(B > 0)) return 0;
                for (var C = g, Q = g + B - 1, E = 0; E < A.length; ++E) {
                    var D = A.charCodeAt(E);
                    if (D >= 55296 && D <= 57343) D = 65536 + ((1023 & D) << 10) | 1023 & A.charCodeAt(++E);
                    if (D <= 127) {
                        if (g >= Q) break;
                        I[g++] = D
                    } else if (D <= 2047) {
                        if (g + 1 >= Q) break;
                        I[g++] = 192 | D >> 6, I[g++] = 128 | 63 & D
                    } else if (D <= 65535) {
                        if (g + 2 >= Q) break;
                        I[g++] = 224 | D >> 12, I[g++] = 128 | D >> 6 & 63, I[g++] = 128 | 63 & D
                    } else {
                        if (g + 3 >= Q) break;
                        I[g++] = 240 | D >> 18, I[g++] = 128 | D >> 12 & 63, I[g++] = 128 | D >> 6 & 63, I[g++] = 128 | 63 & D
                    }
                }
                return I[g] = 0, g - C
            };

        function c(A, I, g) {
            var B = g > 0 ? g : J(A) + 1,
                C = new Array(B),
                Q = Y(A, C, 0, C.length);
            return I && (C.length = Q), C
        }
        var a = {
                ttys: [],
                init() {},
                shutdown() {},
                register(A, I) {
                    a.ttys[A] = {
                        input: [],
                        output: [],
                        ops: I
                    }, q.registerDevice(A, a.stream_ops)
                },
                stream_ops: {
                    open(A) {
                        var I = a.ttys[A.node.rdev];
                        if (!I) throw new q.ErrnoError(43);
                        A.tty = I, A.seekable = !1
                    },
                    close(A) {
                        A.tty.ops.fsync(A.tty)
                    },
                    fsync(A) {
                        A.tty.ops.fsync(A.tty)
                    },
                    read(A, I, g, B, C) {
                        if (!A.tty || !A.tty.ops.get_char) throw new q.ErrnoError(60);
                        for (var Q = 0, E = 0; E < B; E++) {
                            var D;
                            try {
                                D = A.tty.ops.get_char(A.tty)
                            } catch (A) {
                                throw new q.ErrnoError(29)
                            }
                            if (void 0 === D && 0 === Q) throw new q.ErrnoError(6);
                            if (null == D) break;
                            Q++, I[g + E] = D
                        }
                        return Q && (A.node.timestamp = Date.now()), Q
                    },
                    write(A, I, g, B, C) {
                        if (!A.tty || !A.tty.ops.put_char) throw new q.ErrnoError(60);
                        try {
                            for (var Q = 0; Q < B; Q++) A.tty.ops.put_char(A.tty, I[g + Q])
                        } catch (A) {
                            throw new q.ErrnoError(29)
                        }
                        return B && (A.node.timestamp = Date.now()), Q
                    }
                },
                default_tty_ops: {
                    get_char: A => (() => {
                        if (!S.length) {
                            var A = null;
                            if ("undefined" != typeof window && "function" == typeof window.prompt && null !== (A = window.prompt("Input: ")) && (A += "\n"), !A) return null;
                            S = c(A, !0)
                        }
                        return S.shift()
                    })(),
                    put_char(A, I) {
                        null === I || 10 === I ? (R(h(A.output, 0)), A.output = []) : 0 != I && A.output.push(I)
                    },
                    fsync(A) {
                        A.output && A.output.length > 0 && (R(h(A.output, 0)), A.output = [])
                    },
                    ioctl_tcgets: A => ({
                        c_iflag: 25856,
                        c_oflag: 5,
                        c_cflag: 191,
                        c_lflag: 35387,
                        c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }),
                    ioctl_tcsets: (A, I, g) => 0,
                    ioctl_tiocgwinsz: A => [24, 80]
                },
                default_tty1_ops: {
                    put_char(A, g) {
                        null === g || 10 === g ? (I(h(A.output, 0)), A.output = []) : 0 != g && A.output.push(g)
                    },
                    fsync(A) {
                        A.output && A.output.length > 0 && (I(h(A.output, 0)), A.output = [])
                    }
                }
            },
            H = A => {
                A = ((A, I) => Math.ceil(A / I) * I)(A, 65536);
                var I = z(65536, A);
                return I ? ((A, I) => (Q.fill(0, A, A + I), A))(I, A) : 0
            },
            Z = {
                ops_table: null,
                mount: A => Z.createNode(null, "/", 16895, 0),
                createNode(A, I, g, B) {
                    if (q.isBlkdev(g) || q.isFIFO(g)) throw new q.ErrnoError(63);
                    Z.ops_table ||= {
                        dir: {
                            node: {
                                getattr: Z.node_ops.getattr,
                                setattr: Z.node_ops.setattr,
                                lookup: Z.node_ops.lookup,
                                mknod: Z.node_ops.mknod,
                                rename: Z.node_ops.rename,
                                unlink: Z.node_ops.unlink,
                                rmdir: Z.node_ops.rmdir,
                                readdir: Z.node_ops.readdir,
                                symlink: Z.node_ops.symlink
                            },
                            stream: {
                                llseek: Z.stream_ops.llseek
                            }
                        },
                        file: {
                            node: {
                                getattr: Z.node_ops.getattr,
                                setattr: Z.node_ops.setattr
                            },
                            stream: {
                                llseek: Z.stream_ops.llseek,
                                read: Z.stream_ops.read,
                                write: Z.stream_ops.write,
                                allocate: Z.stream_ops.allocate,
                                mmap: Z.stream_ops.mmap,
                                msync: Z.stream_ops.msync
                            }
                        },
                        link: {
                            node: {
                                getattr: Z.node_ops.getattr,
                                setattr: Z.node_ops.setattr,
                                readlink: Z.node_ops.readlink
                            },
                            stream: {}
                        },
                        chrdev: {
                            node: {
                                getattr: Z.node_ops.getattr,
                                setattr: Z.node_ops.setattr
                            },
                            stream: q.chrdev_stream_ops
                        }
                    };
                    var C = q.createNode(A, I, g, B);
                    return q.isDir(C.mode) ? (C.node_ops = Z.ops_table.dir.node, C.stream_ops = Z.ops_table.dir.stream, C.contents = {}) : q.isFile(C.mode) ? (C.node_ops = Z.ops_table.file.node, C.stream_ops = Z.ops_table.file.stream, C.usedBytes = 0, C.contents = null) : q.isLink(C.mode) ? (C.node_ops = Z.ops_table.link.node, C.stream_ops = Z.ops_table.link.stream) : q.isChrdev(C.mode) && (C.node_ops = Z.ops_table.chrdev.node, C.stream_ops = Z.ops_table.chrdev.stream), C.timestamp = Date.now(), A && (A.contents[I] = C, A.timestamp = C.timestamp), C
                },
                getFileDataAsTypedArray: A => A.contents ? A.contents.subarray ? A.contents.subarray(0, A.usedBytes) : new Uint8Array(A.contents) : new Uint8Array(0),
                expandFileStorage(A, I) {
                    var g = A.contents ? A.contents.length : 0;
                    if (!(g >= I)) {
                        I = Math.max(I, g * (g < 1048576 ? 2 : 1.125) >>> 0), 0 != g && (I = Math.max(I, 256));
                        var B = A.contents;
                        A.contents = new Uint8Array(I), A.usedBytes > 0 && A.contents.set(B.subarray(0, A.usedBytes), 0)
                    }
                },
                resizeFileStorage(A, I) {
                    if (A.usedBytes != I)
                        if (0 == I) A.contents = null, A.usedBytes = 0;
                        else {
                            var g = A.contents;
                            A.contents = new Uint8Array(I), g && A.contents.set(g.subarray(0, Math.min(I, A.usedBytes))), A.usedBytes = I
                        }
                },
                node_ops: {
                    getattr(A) {
                        var I = {};
                        return I.dev = q.isChrdev(A.mode) ? A.id : 1, I.ino = A.id, I.mode = A.mode, I.nlink = 1, I.uid = 0, I.gid = 0, I.rdev = A.rdev, q.isDir(A.mode) ? I.size = 4096 : q.isFile(A.mode) ? I.size = A.usedBytes : q.isLink(A.mode) ? I.size = A.link.length : I.size = 0, I.atime = new Date(A.timestamp), I.mtime = new Date(A.timestamp), I.ctime = new Date(A.timestamp), I.blksize = 4096, I.blocks = Math.ceil(I.size / I.blksize), I
                    },
                    setattr(A, I) {
                        void 0 !== I.mode && (A.mode = I.mode), void 0 !== I.timestamp && (A.timestamp = I.timestamp), void 0 !== I.size && Z.resizeFileStorage(A, I.size)
                    },
                    lookup(A, I) {
                        throw q.genericErrors[44]
                    },
                    mknod: (A, I, g, B) => Z.createNode(A, I, g, B),
                    rename(A, I, g) {
                        if (q.isDir(A.mode)) {
                            var B;
                            try {
                                B = q.lookupNode(I, g)
                            } catch (A) {}
                            if (B)
                                for (var C in B.contents) throw new q.ErrnoError(55)
                        }
                        delete A.parent.contents[A.name], A.parent.timestamp = Date.now(), A.name = g, I.contents[g] = A, I.timestamp = A.parent.timestamp
                    },
                    unlink(A, I) {
                        delete A.contents[I], A.timestamp = Date.now()
                    },
                    rmdir(A, I) {
                        var g = q.lookupNode(A, I);
                        for (var B in g.contents) throw new q.ErrnoError(55);
                        delete A.contents[I], A.timestamp = Date.now()
                    },
                    readdir(A) {
                        var I = [".", ".."];
                        for (var g of Object.keys(A.contents)) I.push(g);
                        return I
                    },
                    symlink(A, I, g) {
                        var B = Z.createNode(A, I, 41471, 0);
                        return B.link = g, B
                    },
                    readlink(A) {
                        if (!q.isLink(A.mode)) throw new q.ErrnoError(28);
                        return A.link
                    }
                },
                stream_ops: {
                    read(A, I, g, B, C) {
                        var Q = A.node.contents;
                        if (C >= A.node.usedBytes) return 0;
                        var E = Math.min(A.node.usedBytes - C, B);
                        if (E > 8 && Q.subarray) I.set(Q.subarray(C, C + E), g);
                        else
                            for (var D = 0; D < E; D++) I[g + D] = Q[C + D];
                        return E
                    },
                    write(A, I, B, C, Q, E) {
                        if (I.buffer === g.buffer && (E = !1), !C) return 0;
                        var D = A.node;
                        if (D.timestamp = Date.now(), I.subarray && (!D.contents || D.contents.subarray)) {
                            if (E) return D.contents = I.subarray(B, B + C), D.usedBytes = C, C;
                            if (0 === D.usedBytes && 0 === Q) return D.contents = I.slice(B, B + C), D.usedBytes = C, C;
                            if (Q + C <= D.usedBytes) return D.contents.set(I.subarray(B, B + C), Q), C
                        }
                        if (Z.expandFileStorage(D, Q + C), D.contents.subarray && I.subarray) D.contents.set(I.subarray(B, B + C), Q);
                        else
                            for (var w = 0; w < C; w++) D.contents[Q + w] = I[B + w];
                        return D.usedBytes = Math.max(D.usedBytes, Q + C), C
                    },
                    llseek(A, I, g) {
                        var B = I;
                        if (1 === g ? B += A.position : 2 === g && q.isFile(A.node.mode) && (B += A.node.usedBytes), B < 0) throw new q.ErrnoError(28);
                        return B
                    },
                    allocate(A, I, g) {
                        Z.expandFileStorage(A.node, I + g), A.node.usedBytes = Math.max(A.node.usedBytes, I + g)
                    },
                    mmap(A, I, B, C, Q) {
                        if (!q.isFile(A.node.mode)) throw new q.ErrnoError(43);
                        var E, D, w = A.node.contents;
                        if (2 & Q || w.buffer !== g.buffer) {
                            if ((B > 0 || B + I < w.length) && (w = w.subarray ? w.subarray(B, B + I) : Array.prototype.slice.call(w, B, B + I)), D = !0, !(E = H(I))) throw new q.ErrnoError(48);
                            g.set(w, E)
                        } else D = !1, E = w.byteOffset;
                        return {
                            ptr: E,
                            allocated: D
                        }
                    },
                    msync: (A, I, g, B, C) => (Z.stream_ops.write(A, I, 0, B, g, !1), 0)
                }
            },
            d = (A, I) => {
                var g = 0;
                return A && (g |= 365), I && (g |= 146), g
            },
            q = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                ErrnoError: class {
                    constructor(A) {
                        this.name = "ErrnoError", this.errno = A
                    }
                },
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                FSStream: class {
                    constructor() {
                        this.shared = {}
                    }
                    get object() {
                        return this.node
                    }
                    set object(A) {
                        this.node = A
                    }
                    get isRead() {
                        return 1 != (2097155 & this.flags)
                    }
                    get isWrite() {
                        return 0 != (2097155 & this.flags)
                    }
                    get isAppend() {
                        return 1024 & this.flags
                    }
                    get flags() {
                        return this.shared.flags
                    }
                    set flags(A) {
                        this.shared.flags = A
                    }
                    get position() {
                        return this.shared.position
                    }
                    set position(A) {
                        this.shared.position = A
                    }
                },
                FSNode: class {
                    constructor(A, I, g, B) {
                        A || (A = this), this.parent = A, this.mount = A.mount, this.mounted = null, this.id = q.nextInode++, this.name = I, this.mode = g, this.node_ops = {}, this.stream_ops = {}, this.rdev = B, this.readMode = 365, this.writeMode = 146
                    }
                    get read() {
                        return (this.mode & this.readMode) === this.readMode
                    }
                    set read(A) {
                        A ? this.mode |= this.readMode : this.mode &= ~this.readMode
                    }
                    get write() {
                        return (this.mode & this.writeMode) === this.writeMode
                    }
                    set write(A) {
                        A ? this.mode |= this.writeMode : this.mode &= ~this.writeMode
                    }
                    get isFolder() {
                        return q.isDir(this.mode)
                    }
                    get isDevice() {
                        return q.isChrdev(this.mode)
                    }
                },
                lookupPath(A) {
                    let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!(A = U.resolve(A))) return {
                        path: "",
                        node: null
                    };
                    if (I = Object.assign({
                            follow_mount: !0,
                            recurse_count: 0
                        }, I), I.recurse_count > 8) throw new q.ErrnoError(32);
                    for (var g = A.split("/").filter((A => !!A)), B = q.root, C = "/", Q = 0; Q < g.length; Q++) {
                        var E = Q === g.length - 1;
                        if (E && I.parent) break;
                        if (B = q.lookupNode(B, g[Q]), C = L.join2(C, g[Q]), q.isMountpoint(B) && (!E || E && I.follow_mount) && (B = B.mounted.root), !E || I.follow)
                            for (var D = 0; q.isLink(B.mode);) {
                                var w = q.readlink(C);
                                if (C = U.resolve(L.dirname(C), w), B = q.lookupPath(C, {
                                        recurse_count: I.recurse_count + 1
                                    }).node, D++ > 40) throw new q.ErrnoError(32)
                            }
                    }
                    return {
                        path: C,
                        node: B
                    }
                },
                getPath(A) {
                    for (var I;;) {
                        if (q.isRoot(A)) {
                            var g = A.mount.mountpoint;
                            return I ? "/" !== g[g.length - 1] ? `${g}/${I}` : g + I : g
                        }
                        I = I ? `${A.name}/${I}` : A.name, A = A.parent
                    }
                },
                hashName(A, I) {
                    for (var g = 0, B = 0; B < I.length; B++) g = (g << 5) - g + I.charCodeAt(B) | 0;
                    return (A + g >>> 0) % q.nameTable.length
                },
                hashAddNode(A) {
                    var I = q.hashName(A.parent.id, A.name);
                    A.name_next = q.nameTable[I], q.nameTable[I] = A
                },
                hashRemoveNode(A) {
                    var I = q.hashName(A.parent.id, A.name);
                    if (q.nameTable[I] === A) q.nameTable[I] = A.name_next;
                    else
                        for (var g = q.nameTable[I]; g;) {
                            if (g.name_next === A) {
                                g.name_next = A.name_next;
                                break
                            }
                            g = g.name_next
                        }
                },
                lookupNode(A, I) {
                    var g = q.mayLookup(A);
                    if (g) throw new q.ErrnoError(g);
                    for (var B = q.hashName(A.id, I), C = q.nameTable[B]; C; C = C.name_next) {
                        var Q = C.name;
                        if (C.parent.id === A.id && Q === I) return C
                    }
                    return q.lookup(A, I)
                },
                createNode(A, I, g, B) {
                    var C = new q.FSNode(A, I, g, B);
                    return q.hashAddNode(C), C
                },
                destroyNode(A) {
                    q.hashRemoveNode(A)
                },
                isRoot: A => A === A.parent,
                isMountpoint: A => !!A.mounted,
                isFile: A => 32768 == (61440 & A),
                isDir: A => 16384 == (61440 & A),
                isLink: A => 40960 == (61440 & A),
                isChrdev: A => 8192 == (61440 & A),
                isBlkdev: A => 24576 == (61440 & A),
                isFIFO: A => 4096 == (61440 & A),
                isSocket: A => 49152 == (49152 & A),
                flagsToPermissionString(A) {
                    var I = ["r", "w", "rw"][3 & A];
                    return 512 & A && (I += "w"), I
                },
                nodePermissions: (A, I) => q.ignorePermissions || (!I.includes("r") || 292 & A.mode) && (!I.includes("w") || 146 & A.mode) && (!I.includes("x") || 73 & A.mode) ? 0 : 2,
                mayLookup(A) {
                    if (!q.isDir(A.mode)) return 54;
                    var I = q.nodePermissions(A, "x");
                    return I || (A.node_ops.lookup ? 0 : 2)
                },
                mayCreate(A, I) {
                    try {
                        q.lookupNode(A, I);
                        return 20
                    } catch (A) {}
                    return q.nodePermissions(A, "wx")
                },
                mayDelete(A, I, g) {
                    var B;
                    try {
                        B = q.lookupNode(A, I)
                    } catch (A) {
                        return A.errno
                    }
                    var C = q.nodePermissions(A, "wx");
                    if (C) return C;
                    if (g) {
                        if (!q.isDir(B.mode)) return 54;
                        if (q.isRoot(B) || q.getPath(B) === q.cwd()) return 10
                    } else if (q.isDir(B.mode)) return 31;
                    return 0
                },
                mayOpen: (A, I) => A ? q.isLink(A.mode) ? 32 : q.isDir(A.mode) && ("r" !== q.flagsToPermissionString(I) || 512 & I) ? 31 : q.nodePermissions(A, q.flagsToPermissionString(I)) : 44,
                MAX_OPEN_FDS: 4096,
                nextfd() {
                    for (var A = 0; A <= q.MAX_OPEN_FDS; A++)
                        if (!q.streams[A]) return A;
                    throw new q.ErrnoError(33)
                },
                getStreamChecked(A) {
                    var I = q.getStream(A);
                    if (!I) throw new q.ErrnoError(8);
                    return I
                },
                getStream: A => q.streams[A],
                createStream(A) {
                    let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
                    return A = Object.assign(new q.FSStream, A), -1 == I && (I = q.nextfd()), A.fd = I, q.streams[I] = A, A
                },
                closeStream(A) {
                    q.streams[A] = null
                },
                dupStream(A) {
                    let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
                    var g = q.createStream(A, I);
                    return g.stream_ops?.dup?.(g), g
                },
                chrdev_stream_ops: {
                    open(A) {
                        var I = q.getDevice(A.node.rdev);
                        A.stream_ops = I.stream_ops, A.stream_ops.open?.(A)
                    },
                    llseek() {
                        throw new q.ErrnoError(70)
                    }
                },
                major: A => A >> 8,
                minor: A => 255 & A,
                makedev: (A, I) => A << 8 | I,
                registerDevice(A, I) {
                    q.devices[A] = {
                        stream_ops: I
                    }
                },
                getDevice: A => q.devices[A],
                getMounts(A) {
                    for (var I = [], g = [A]; g.length;) {
                        var B = g.pop();
                        I.push(B), g.push(...B.mounts)
                    }
                    return I
                },
                syncfs(A, g) {
                    "function" == typeof A && (g = A, A = !1), q.syncFSRequests++, q.syncFSRequests > 1 && I(`warning: ${q.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
                    var B = q.getMounts(q.root.mount),
                        C = 0;

                    function Q(A) {
                        return q.syncFSRequests--, g(A)
                    }

                    function E(A) {
                        if (A) return E.errored ? void 0 : (E.errored = !0, Q(A));
                        ++C >= B.length && Q(null)
                    }
                    B.forEach((I => {
                        if (!I.type.syncfs) return E(null);
                        I.type.syncfs(I, A, E)
                    }))
                },
                mount(A, I, g) {
                    var B, C = "/" === g,
                        Q = !g;
                    if (C && q.root) throw new q.ErrnoError(10);
                    if (!C && !Q) {
                        var E = q.lookupPath(g, {
                            follow_mount: !1
                        });
                        if (g = E.path, B = E.node, q.isMountpoint(B)) throw new q.ErrnoError(10);
                        if (!q.isDir(B.mode)) throw new q.ErrnoError(54)
                    }
                    var D = {
                            type: A,
                            opts: I,
                            mountpoint: g,
                            mounts: []
                        },
                        w = A.mount(D);
                    return w.mount = D, D.root = w, C ? q.root = w : B && (B.mounted = D, B.mount && B.mount.mounts.push(D)), w
                },
                unmount(A) {
                    var I = q.lookupPath(A, {
                        follow_mount: !1
                    });
                    if (!q.isMountpoint(I.node)) throw new q.ErrnoError(28);
                    var g = I.node,
                        B = g.mounted,
                        C = q.getMounts(B);
                    Object.keys(q.nameTable).forEach((A => {
                        for (var I = q.nameTable[A]; I;) {
                            var g = I.name_next;
                            C.includes(I.mount) && q.destroyNode(I), I = g
                        }
                    })), g.mounted = null;
                    var Q = g.mount.mounts.indexOf(B);
                    g.mount.mounts.splice(Q, 1)
                },
                lookup: (A, I) => A.node_ops.lookup(A, I),
                mknod(A, I, g) {
                    var B = q.lookupPath(A, {
                            parent: !0
                        }).node,
                        C = L.basename(A);
                    if (!C || "." === C || ".." === C) throw new q.ErrnoError(28);
                    var Q = q.mayCreate(B, C);
                    if (Q) throw new q.ErrnoError(Q);
                    if (!B.node_ops.mknod) throw new q.ErrnoError(63);
                    return B.node_ops.mknod(B, C, I, g)
                },
                create: (A, I) => (I = void 0 !== I ? I : 438, I &= 4095, I |= 32768, q.mknod(A, I, 0)),
                mkdir: (A, I) => (I = void 0 !== I ? I : 511, I &= 1023, I |= 16384, q.mknod(A, I, 0)),
                mkdirTree(A, I) {
                    for (var g = A.split("/"), B = "", C = 0; C < g.length; ++C)
                        if (g[C]) {
                            B += "/" + g[C];
                            try {
                                q.mkdir(B, I)
                            } catch (A) {
                                if (20 != A.errno) throw A
                            }
                        }
                },
                mkdev: (A, I, g) => (void 0 === g && (g = I, I = 438), I |= 8192, q.mknod(A, I, g)),
                symlink(A, I) {
                    if (!U.resolve(A)) throw new q.ErrnoError(44);
                    var g = q.lookupPath(I, {
                        parent: !0
                    }).node;
                    if (!g) throw new q.ErrnoError(44);
                    var B = L.basename(I),
                        C = q.mayCreate(g, B);
                    if (C) throw new q.ErrnoError(C);
                    if (!g.node_ops.symlink) throw new q.ErrnoError(63);
                    return g.node_ops.symlink(g, B, A)
                },
                rename(A, I) {
                    var g, B, C = L.dirname(A),
                        Q = L.dirname(I),
                        E = L.basename(A),
                        D = L.basename(I);
                    if (g = q.lookupPath(A, {
                            parent: !0
                        }).node, B = q.lookupPath(I, {
                            parent: !0
                        }).node, !g || !B) throw new q.ErrnoError(44);
                    if (g.mount !== B.mount) throw new q.ErrnoError(75);
                    var w, i = q.lookupNode(g, E),
                        o = U.relative(A, Q);
                    if ("." !== o.charAt(0)) throw new q.ErrnoError(28);
                    if ("." !== (o = U.relative(I, C)).charAt(0)) throw new q.ErrnoError(55);
                    try {
                        w = q.lookupNode(B, D)
                    } catch (A) {}
                    if (i !== w) {
                        var G = q.isDir(i.mode),
                            M = q.mayDelete(g, E, G);
                        if (M) throw new q.ErrnoError(M);
                        if (M = w ? q.mayDelete(B, D, G) : q.mayCreate(B, D)) throw new q.ErrnoError(M);
                        if (!g.node_ops.rename) throw new q.ErrnoError(63);
                        if (q.isMountpoint(i) || w && q.isMountpoint(w)) throw new q.ErrnoError(10);
                        if (B !== g && (M = q.nodePermissions(g, "w"))) throw new q.ErrnoError(M);
                        q.hashRemoveNode(i);
                        try {
                            g.node_ops.rename(i, B, D), i.parent = B
                        } catch (A) {
                            throw A
                        } finally {
                            q.hashAddNode(i)
                        }
                    }
                },
                rmdir(A) {
                    var I = q.lookupPath(A, {
                            parent: !0
                        }).node,
                        g = L.basename(A),
                        B = q.lookupNode(I, g),
                        C = q.mayDelete(I, g, !0);
                    if (C) throw new q.ErrnoError(C);
                    if (!I.node_ops.rmdir) throw new q.ErrnoError(63);
                    if (q.isMountpoint(B)) throw new q.ErrnoError(10);
                    I.node_ops.rmdir(I, g), q.destroyNode(B)
                },
                readdir(A) {
                    var I = q.lookupPath(A, {
                        follow: !0
                    }).node;
                    if (!I.node_ops.readdir) throw new q.ErrnoError(54);
                    return I.node_ops.readdir(I)
                },
                unlink(A) {
                    var I = q.lookupPath(A, {
                        parent: !0
                    }).node;
                    if (!I) throw new q.ErrnoError(44);
                    var g = L.basename(A),
                        B = q.lookupNode(I, g),
                        C = q.mayDelete(I, g, !1);
                    if (C) throw new q.ErrnoError(C);
                    if (!I.node_ops.unlink) throw new q.ErrnoError(63);
                    if (q.isMountpoint(B)) throw new q.ErrnoError(10);
                    I.node_ops.unlink(I, g), q.destroyNode(B)
                },
                readlink(A) {
                    var I = q.lookupPath(A).node;
                    if (!I) throw new q.ErrnoError(44);
                    if (!I.node_ops.readlink) throw new q.ErrnoError(28);
                    return U.resolve(q.getPath(I.parent), I.node_ops.readlink(I))
                },
                stat(A, I) {
                    var g = q.lookupPath(A, {
                        follow: !I
                    }).node;
                    if (!g) throw new q.ErrnoError(44);
                    if (!g.node_ops.getattr) throw new q.ErrnoError(63);
                    return g.node_ops.getattr(g)
                },
                lstat: A => q.stat(A, !0),
                chmod(A, I, g) {
                    var B;
                    "string" == typeof A ? B = q.lookupPath(A, {
                        follow: !g
                    }).node : B = A;
                    if (!B.node_ops.setattr) throw new q.ErrnoError(63);
                    B.node_ops.setattr(B, {
                        mode: 4095 & I | -4096 & B.mode,
                        timestamp: Date.now()
                    })
                },
                lchmod(A, I) {
                    q.chmod(A, I, !0)
                },
                fchmod(A, I) {
                    var g = q.getStreamChecked(A);
                    q.chmod(g.node, I)
                },
                chown(A, I, g, B) {
                    var C;
                    "string" == typeof A ? C = q.lookupPath(A, {
                        follow: !B
                    }).node : C = A;
                    if (!C.node_ops.setattr) throw new q.ErrnoError(63);
                    C.node_ops.setattr(C, {
                        timestamp: Date.now()
                    })
                },
                lchown(A, I, g) {
                    q.chown(A, I, g, !0)
                },
                fchown(A, I, g) {
                    var B = q.getStreamChecked(A);
                    q.chown(B.node, I, g)
                },
                truncate(A, I) {
                    if (I < 0) throw new q.ErrnoError(28);
                    var g;
                    "string" == typeof A ? g = q.lookupPath(A, {
                        follow: !0
                    }).node : g = A;
                    if (!g.node_ops.setattr) throw new q.ErrnoError(63);
                    if (q.isDir(g.mode)) throw new q.ErrnoError(31);
                    if (!q.isFile(g.mode)) throw new q.ErrnoError(28);
                    var B = q.nodePermissions(g, "w");
                    if (B) throw new q.ErrnoError(B);
                    g.node_ops.setattr(g, {
                        size: I,
                        timestamp: Date.now()
                    })
                },
                ftruncate(A, I) {
                    var g = q.getStreamChecked(A);
                    if (0 == (2097155 & g.flags)) throw new q.ErrnoError(28);
                    q.truncate(g.node, I)
                },
                utime(A, I, g) {
                    var B = q.lookupPath(A, {
                        follow: !0
                    }).node;
                    B.node_ops.setattr(B, {
                        timestamp: Math.max(I, g)
                    })
                },
                open(A, I, g) {
                    if ("" === A) throw new q.ErrnoError(44);
                    var B;
                    if (g = 64 & (I = "string" == typeof I ? (A => {
                            var I = {
                                r: 0,
                                "r+": 2,
                                w: 577,
                                "w+": 578,
                                a: 1089,
                                "a+": 1090
                            } [A];
                            if (void 0 === I) throw new Error(`Unknown file open mode: ${A}`);
                            return I
                        })(I) : I) ? 4095 & (g = void 0 === g ? 438 : g) | 32768 : 0, "object" == typeof A) B = A;
                    else {
                        A = L.normalize(A);
                        try {
                            B = q.lookupPath(A, {
                                follow: !(131072 & I)
                            }).node
                        } catch (A) {}
                    }
                    var C = !1;
                    if (64 & I)
                        if (B) {
                            if (128 & I) throw new q.ErrnoError(20)
                        } else B = q.mknod(A, g, 0), C = !0;
                    if (!B) throw new q.ErrnoError(44);
                    if (q.isChrdev(B.mode) && (I &= -513), 65536 & I && !q.isDir(B.mode)) throw new q.ErrnoError(54);
                    if (!C) {
                        var Q = q.mayOpen(B, I);
                        if (Q) throw new q.ErrnoError(Q)
                    }
                    512 & I && !C && q.truncate(B, 0), I &= -131713;
                    var E = q.createStream({
                        node: B,
                        path: q.getPath(B),
                        flags: I,
                        seekable: !0,
                        position: 0,
                        stream_ops: B.stream_ops,
                        ungotten: [],
                        error: !1
                    });
                    return E.stream_ops.open && E.stream_ops.open(E), !G.logReadFiles || 1 & I || (q.readFiles || (q.readFiles = {}), A in q.readFiles || (q.readFiles[A] = 1)), E
                },
                close(A) {
                    if (q.isClosed(A)) throw new q.ErrnoError(8);
                    A.getdents && (A.getdents = null);
                    try {
                        A.stream_ops.close && A.stream_ops.close(A)
                    } catch (A) {
                        throw A
                    } finally {
                        q.closeStream(A.fd)
                    }
                    A.fd = null
                },
                isClosed: A => null === A.fd,
                llseek(A, I, g) {
                    if (q.isClosed(A)) throw new q.ErrnoError(8);
                    if (!A.seekable || !A.stream_ops.llseek) throw new q.ErrnoError(70);
                    if (0 != g && 1 != g && 2 != g) throw new q.ErrnoError(28);
                    return A.position = A.stream_ops.llseek(A, I, g), A.ungotten = [], A.position
                },
                read(A, I, g, B, C) {
                    if (B < 0 || C < 0) throw new q.ErrnoError(28);
                    if (q.isClosed(A)) throw new q.ErrnoError(8);
                    if (1 == (2097155 & A.flags)) throw new q.ErrnoError(8);
                    if (q.isDir(A.node.mode)) throw new q.ErrnoError(31);
                    if (!A.stream_ops.read) throw new q.ErrnoError(28);
                    var Q = void 0 !== C;
                    if (Q) {
                        if (!A.seekable) throw new q.ErrnoError(70)
                    } else C = A.position;
                    var E = A.stream_ops.read(A, I, g, B, C);
                    return Q || (A.position += E), E
                },
                write(A, I, g, B, C, Q) {
                    if (B < 0 || C < 0) throw new q.ErrnoError(28);
                    if (q.isClosed(A)) throw new q.ErrnoError(8);
                    if (0 == (2097155 & A.flags)) throw new q.ErrnoError(8);
                    if (q.isDir(A.node.mode)) throw new q.ErrnoError(31);
                    if (!A.stream_ops.write) throw new q.ErrnoError(28);
                    A.seekable && 1024 & A.flags && q.llseek(A, 0, 2);
                    var E = void 0 !== C;
                    if (E) {
                        if (!A.seekable) throw new q.ErrnoError(70)
                    } else C = A.position;
                    var D = A.stream_ops.write(A, I, g, B, C, Q);
                    return E || (A.position += D), D
                },
                allocate(A, I, g) {
                    if (q.isClosed(A)) throw new q.ErrnoError(8);
                    if (I < 0 || g <= 0) throw new q.ErrnoError(28);
                    if (0 == (2097155 & A.flags)) throw new q.ErrnoError(8);
                    if (!q.isFile(A.node.mode) && !q.isDir(A.node.mode)) throw new q.ErrnoError(43);
                    if (!A.stream_ops.allocate) throw new q.ErrnoError(138);
                    A.stream_ops.allocate(A, I, g)
                },
                mmap(A, I, g, B, C) {
                    if (0 != (2 & B) && 0 == (2 & C) && 2 != (2097155 & A.flags)) throw new q.ErrnoError(2);
                    if (1 == (2097155 & A.flags)) throw new q.ErrnoError(2);
                    if (!A.stream_ops.mmap) throw new q.ErrnoError(43);
                    return A.stream_ops.mmap(A, I, g, B, C)
                },
                msync: (A, I, g, B, C) => A.stream_ops.msync ? A.stream_ops.msync(A, I, g, B, C) : 0,
                ioctl(A, I, g) {
                    if (!A.stream_ops.ioctl) throw new q.ErrnoError(59);
                    return A.stream_ops.ioctl(A, I, g)
                },
                readFile(A) {
                    let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (I.flags = I.flags || 0, I.encoding = I.encoding || "binary", "utf8" !== I.encoding && "binary" !== I.encoding) throw new Error(`Invalid encoding type "${I.encoding}"`);
                    var g, B = q.open(A, I.flags),
                        C = q.stat(A).size,
                        Q = new Uint8Array(C);
                    return q.read(B, Q, 0, C, 0), "utf8" === I.encoding ? g = h(Q, 0) : "binary" === I.encoding && (g = Q), q.close(B), g
                },
                writeFile(A, I) {
                    let g = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    g.flags = g.flags || 577;
                    var B = q.open(A, g.flags, g.mode);
                    if ("string" == typeof I) {
                        var C = new Uint8Array(J(I) + 1),
                            Q = Y(I, C, 0, C.length);
                        q.write(B, C, 0, Q, void 0, g.canOwn)
                    } else {
                        if (!ArrayBuffer.isView(I)) throw new Error("Unsupported data type");
                        q.write(B, I, 0, I.byteLength, void 0, g.canOwn)
                    }
                    q.close(B)
                },
                cwd: () => q.currentPath,
                chdir(A) {
                    var I = q.lookupPath(A, {
                        follow: !0
                    });
                    if (null === I.node) throw new q.ErrnoError(44);
                    if (!q.isDir(I.node.mode)) throw new q.ErrnoError(54);
                    var g = q.nodePermissions(I.node, "x");
                    if (g) throw new q.ErrnoError(g);
                    q.currentPath = I.path
                },
                createDefaultDirectories() {
                    q.mkdir("/tmp"), q.mkdir("/home"), q.mkdir("/home/web_user")
                },
                createDefaultDevices() {
                    q.mkdir("/dev"), q.registerDevice(q.makedev(1, 3), {
                        read: () => 0,
                        write: (A, I, g, B, C) => B
                    }), q.mkdev("/dev/null", q.makedev(1, 3)), a.register(q.makedev(5, 0), a.default_tty_ops), a.register(q.makedev(6, 0), a.default_tty1_ops), q.mkdev("/dev/tty", q.makedev(5, 0)), q.mkdev("/dev/tty1", q.makedev(6, 0));
                    var A = new Uint8Array(1024),
                        I = 0,
                        g = () => (0 === I && (I = k(A).byteLength), A[--I]);
                    q.createDevice("/dev", "random", g), q.createDevice("/dev", "urandom", g), q.mkdir("/dev/shm"), q.mkdir("/dev/shm/tmp")
                },
                createSpecialDirectories() {
                    q.mkdir("/proc");
                    var A = q.mkdir("/proc/self");
                    q.mkdir("/proc/self/fd"), q.mount({
                        mount() {
                            var I = q.createNode(A, "fd", 16895, 73);
                            return I.node_ops = {
                                lookup(A, I) {
                                    var g = +I,
                                        B = q.getStreamChecked(g),
                                        C = {
                                            parent: null,
                                            mount: {
                                                mountpoint: "fake"
                                            },
                                            node_ops: {
                                                readlink: () => B.path
                                            }
                                        };
                                    return C.parent = C, C
                                }
                            }, I
                        }
                    }, {}, "/proc/self/fd")
                },
                createStandardStreams() {
                    G.stdin ? q.createDevice("/dev", "stdin", G.stdin) : q.symlink("/dev/tty", "/dev/stdin"), G.stdout ? q.createDevice("/dev", "stdout", null, G.stdout) : q.symlink("/dev/tty", "/dev/stdout"), G.stderr ? q.createDevice("/dev", "stderr", null, G.stderr) : q.symlink("/dev/tty1", "/dev/stderr"), q.open("/dev/stdin", 0), q.open("/dev/stdout", 1), q.open("/dev/stderr", 1)
                },
                staticInit() {
                    [44].forEach((A => {
                        q.genericErrors[A] = new q.ErrnoError(A), q.genericErrors[A].stack = "<generic error, no stack>"
                    })), q.nameTable = new Array(4096), q.mount(Z, {}, "/"), q.createDefaultDirectories(), q.createDefaultDevices(), q.createSpecialDirectories(), q.filesystems = {
                        MEMFS: Z
                    }
                },
                init(A, I, g) {
                    q.init.initialized = !0, G.stdin = A || G.stdin, G.stdout = I || G.stdout, G.stderr = g || G.stderr, q.createStandardStreams()
                },
                quit() {
                    q.init.initialized = !1;
                    for (var A = 0; A < q.streams.length; A++) {
                        var I = q.streams[A];
                        I && q.close(I)
                    }
                },
                findObject(A, I) {
                    var g = q.analyzePath(A, I);
                    return g.exists ? g.object : null
                },
                analyzePath(A, I) {
                    try {
                        A = (B = q.lookupPath(A, {
                            follow: !I
                        })).path
                    } catch (A) {}
                    var g = {
                        isRoot: !1,
                        exists: !1,
                        error: 0,
                        name: null,
                        path: null,
                        object: null,
                        parentExists: !1,
                        parentPath: null,
                        parentObject: null
                    };
                    try {
                        var B = q.lookupPath(A, {
                            parent: !0
                        });
                        g.parentExists = !0, g.parentPath = B.path, g.parentObject = B.node, g.name = L.basename(A), B = q.lookupPath(A, {
                            follow: !I
                        }), g.exists = !0, g.path = B.path, g.object = B.node, g.name = B.node.name, g.isRoot = "/" === B.path
                    } catch (A) {
                        g.error = A.errno
                    }
                    return g
                },
                createPath(A, I, g, B) {
                    A = "string" == typeof A ? A : q.getPath(A);
                    for (var C = I.split("/").reverse(); C.length;) {
                        var Q = C.pop();
                        if (Q) {
                            var E = L.join2(A, Q);
                            try {
                                q.mkdir(E)
                            } catch (A) {}
                            A = E
                        }
                    }
                    return E
                },
                createFile(A, I, g, B, C) {
                    var Q = L.join2("string" == typeof A ? A : q.getPath(A), I),
                        E = d(B, C);
                    return q.create(Q, E)
                },
                createDataFile(A, I, g, B, C, Q) {
                    var E = I;
                    A && (A = "string" == typeof A ? A : q.getPath(A), E = I ? L.join2(A, I) : A);
                    var D = d(B, C),
                        w = q.create(E, D);
                    if (g) {
                        if ("string" == typeof g) {
                            for (var i = new Array(g.length), o = 0, G = g.length; o < G; ++o) i[o] = g.charCodeAt(o);
                            g = i
                        }
                        q.chmod(w, 146 | D);
                        var M = q.open(w, 577);
                        q.write(M, g, 0, g.length, 0, Q), q.close(M), q.chmod(w, D)
                    }
                },
                createDevice(A, I, g, B) {
                    var C = L.join2("string" == typeof A ? A : q.getPath(A), I),
                        Q = d(!!g, !!B);
                    q.createDevice.major || (q.createDevice.major = 64);
                    var E = q.makedev(q.createDevice.major++, 0);
                    return q.registerDevice(E, {
                        open(A) {
                            A.seekable = !1
                        },
                        close(A) {
                            B?.buffer?.length && B(10)
                        },
                        read(A, I, B, C, Q) {
                            for (var E = 0, D = 0; D < C; D++) {
                                var w;
                                try {
                                    w = g()
                                } catch (A) {
                                    throw new q.ErrnoError(29)
                                }
                                if (void 0 === w && 0 === E) throw new q.ErrnoError(6);
                                if (null == w) break;
                                E++, I[B + D] = w
                            }
                            return E && (A.node.timestamp = Date.now()), E
                        },
                        write(A, I, g, C, Q) {
                            for (var E = 0; E < C; E++) try {
                                B(I[g + E])
                            } catch (A) {
                                throw new q.ErrnoError(29)
                            }
                            return C && (A.node.timestamp = Date.now()), E
                        }
                    }), q.mkdev(C, Q, E)
                },
                forceLoadFile(A) {
                    if (A.isDevice || A.isFolder || A.link || A.contents) return !0;
                    if ("undefined" != typeof XMLHttpRequest) throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                    try {
                        A.contents = readBinary(A.url), A.usedBytes = A.contents.length
                    } catch (A) {
                        throw new q.ErrnoError(29)
                    }
                },
                createLazyFile(A, I, B, C, Q) {
                    class E {
                        constructor() {
                            this.lengthKnown = !1, this.chunks = []
                        }
                        get(A) {
                            if (!(A > this.length - 1 || A < 0)) {
                                var I = A % this.chunkSize,
                                    g = A / this.chunkSize | 0;
                                return this.getter(g)[I]
                            }
                        }
                        setDataGetter(A) {
                            this.getter = A
                        }
                        cacheLength() {
                            var A = new XMLHttpRequest;
                            if (A.open("HEAD", B, !1), A.send(null), !(A.status >= 200 && A.status < 300 || 304 === A.status)) throw new Error("Couldn't load " + B + ". Status: " + A.status);
                            var I, g = Number(A.getResponseHeader("Content-length")),
                                C = (I = A.getResponseHeader("Accept-Ranges")) && "bytes" === I,
                                Q = (I = A.getResponseHeader("Content-Encoding")) && "gzip" === I,
                                E = 1048576;
                            C || (E = g);
                            var D = this;
                            D.setDataGetter((A => {
                                var I = A * E,
                                    C = (A + 1) * E - 1;
                                if (C = Math.min(C, g - 1), void 0 === D.chunks[A] && (D.chunks[A] = ((A, I) => {
                                        if (A > I) throw new Error("invalid range (" + A + ", " + I + ") or no bytes requested!");
                                        if (I > g - 1) throw new Error("only " + g + " bytes available! programmer error!");
                                        var C = new XMLHttpRequest;
                                        if (C.open("GET", B, !1), g !== E && C.setRequestHeader("Range", "bytes=" + A + "-" + I), C.responseType = "arraybuffer", C.overrideMimeType && C.overrideMimeType("text/plain; charset=x-user-defined"), C.send(null), !(C.status >= 200 && C.status < 300 || 304 === C.status)) throw new Error("Couldn't load " + B + ". Status: " + C.status);
                                        return void 0 !== C.response ? new Uint8Array(C.response || []) : c(C.responseText || "", !0)
                                    })(I, C)), void 0 === D.chunks[A]) throw new Error("doXHR failed!");
                                return D.chunks[A]
                            })), !Q && g || (E = g = 1, g = this.getter(0).length, E = g, R("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = g, this._chunkSize = E, this.lengthKnown = !0
                        }
                        get length() {
                            return this.lengthKnown || this.cacheLength(), this._length
                        }
                        get chunkSize() {
                            return this.lengthKnown || this.cacheLength(), this._chunkSize
                        }
                    }
                    if ("undefined" != typeof XMLHttpRequest) {
                        if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                        var D = {
                            isDevice: !1,
                            contents: new E
                        }
                    } else D = {
                        isDevice: !1,
                        url: B
                    };
                    var w = q.createFile(A, I, D, C, Q);
                    D.contents ? w.contents = D.contents : D.url && (w.contents = null, w.url = D.url), Object.defineProperties(w, {
                        usedBytes: {
                            get: function() {
                                return this.contents.length
                            }
                        }
                    });
                    var i = {};

                    function o(A, I, g, B, C) {
                        var Q = A.node.contents;
                        if (C >= Q.length) return 0;
                        var E = Math.min(Q.length - C, B);
                        if (Q.slice)
                            for (var D = 0; D < E; D++) I[g + D] = Q[C + D];
                        else
                            for (D = 0; D < E; D++) I[g + D] = Q.get(C + D);
                        return E
                    }
                    return Object.keys(w.stream_ops).forEach((A => {
                        var I = w.stream_ops[A];
                        i[A] = function() {
                            return q.forceLoadFile(w), I(...arguments)
                        }
                    })), i.read = (A, I, g, B, C) => (q.forceLoadFile(w), o(A, I, g, B, C)), i.mmap = (A, I, B, C, Q) => {
                        q.forceLoadFile(w);
                        var E = H(I);
                        if (!E) throw new q.ErrnoError(48);
                        return o(A, g, E, I, B), {
                            ptr: E,
                            allocated: !0
                        }
                    }, w.stream_ops = i, w
                }
            },
            r = {
                DEFAULT_POLLMASK: 5,
                calculateAt(A, I, g) {
                    if (L.isAbs(I)) return I;
                    var B; - 100 === A ? B = q.cwd() : B = r.getStreamFromFD(A).path;
                    if (0 == I.length) {
                        if (!g) throw new q.ErrnoError(44);
                        return B
                    }
                    return L.join2(B, I)
                },
                doStat(A, I, g) {
                    var B = A(I);
                    C[g >> 2] = B.dev, C[g + 4 >> 2] = B.mode, E[g + 8 >> 2] = B.nlink, C[g + 12 >> 2] = B.uid, C[g + 16 >> 2] = B.gid, C[g + 20 >> 2] = B.rdev, i[g + 24 >> 3] = BigInt(B.size), C[g + 32 >> 2] = 4096, C[g + 36 >> 2] = B.blocks;
                    var Q = B.atime.getTime(),
                        D = B.mtime.getTime(),
                        w = B.ctime.getTime();
                    return i[g + 40 >> 3] = BigInt(Math.floor(Q / 1e3)), E[g + 48 >> 2] = Q % 1e3 * 1e3, i[g + 56 >> 3] = BigInt(Math.floor(D / 1e3)), E[g + 64 >> 2] = D % 1e3 * 1e3, i[g + 72 >> 3] = BigInt(Math.floor(w / 1e3)), E[g + 80 >> 2] = w % 1e3 * 1e3, i[g + 88 >> 3] = BigInt(B.ino), 0
                },
                doMsync(A, I, g, B, C) {
                    if (!q.isFile(I.node.mode)) throw new q.ErrnoError(43);
                    if (2 & B) return 0;
                    var E = Q.slice(A, A + g);
                    q.msync(I, E, C, g, B)
                },
                getStreamFromFD: A => q.getStreamChecked(A),
                varargs: void 0,
                getStr: A => s(A)
            };

        function t() {
            var A = C[+r.varargs >> 2];
            return r.varargs += 4, A
        }
        var W = t;
        var b = A => A < -9007199254740992 || A > 9007199254740992 ? NaN : Number(A);
        var x = (A, I, g) => Y(A, Q, I, g),
            m = A => {
                var I = (A - o.buffer.byteLength + 65535) / 65536;
                try {
                    return o.grow(I), y(), 1
                } catch (A) {}
            },
            l = {},
            n = () => {
                if (!n.strings) {
                    var A = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: "./this.program"
                    };
                    for (var I in l) void 0 === l[I] ? delete A[I] : A[I] = l[I];
                    var g = [];
                    for (var I in A) g.push(`${I}=${A[I]}`);
                    n.strings = g
                }
                return n.strings
            },
            O = A => {
                throw `exit(${A})`
            };
        var V = A => e(A);
        q.createPreloadedFile = (A, I, g, B, C, Q, E, D, w, i) => {
            var o = I ? U.resolve(L.join2(A, I)) : A,
                G = getUniqueRunDependency(`cp ${o}`);

            function M(g) {
                ! function(g) {
                    i?.(), D || ((A, I, g, B, C, Q) => {
                        q.createDataFile(A, I, g, B, C, Q)
                    })(A, I, g, B, C, w), Q?.(), removeRunDependency(G)
                }(g)
            }
            addRunDependency(G), "string" == typeof g ? ((A, I, g, B) => {
                var C = B ? "" : getUniqueRunDependency(`al ${A}`);
                readAsync(A).then((A => {
                    I(new Uint8Array(A)), C && removeRunDependency(C)
                }), (I => {
                    if (!g) throw `Loading data file "${A}" failed.`;
                    g()
                })), C && addRunDependency(C)
            })(g, M, E) : M(g)
        }, q.staticInit();
        var z, X, e, P, T, f = {
            a: (A, I, g, B) => {
                F(`Assertion failed: ${s(A)}, at: ` + [I ? s(I) : "unknown filename", g, B ? s(B) : "unknown function"])
            },
            b: (A, I, g) => {
                throw new N(A).init(I, g), A
            },
            v: function(A, I, g, B) {
                try {
                    if (I = r.getStr(I), I = r.calculateAt(A, I), -8 & g) return -28;
                    var C = q.lookupPath(I, {
                        follow: !0
                    }).node;
                    if (!C) return -44;
                    var Q = "";
                    return 4 & g && (Q += "r"), 2 & g && (Q += "w"), 1 & g && (Q += "x"), Q && q.nodePermissions(C, Q) ? -2 : 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            f: function(A, I, g) {
                r.varargs = g;
                try {
                    var C = r.getStreamFromFD(A);
                    switch (I) {
                        case 0:
                            if ((Q = t()) < 0) return -28;
                            for (; q.streams[Q];) Q++;
                            return q.dupStream(C, Q).fd;
                        case 1:
                        case 2:
                        case 13:
                        case 14:
                            return 0;
                        case 3:
                            return C.flags;
                        case 4:
                            var Q = t();
                            return C.flags |= Q, 0;
                        case 12:
                            Q = W();
                            return B[Q + 0 >> 1] = 2, 0
                    }
                    return -28
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            u: function(A, I) {
                try {
                    var g = r.getStreamFromFD(A);
                    return r.doStat(q.stat, g.path, I)
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            j: function(A, I, Q) {
                r.varargs = Q;
                try {
                    var E = r.getStreamFromFD(A);
                    switch (I) {
                        case 21509:
                        case 21510:
                        case 21511:
                        case 21512:
                        case 21524:
                        case 21515:
                            return E.tty ? 0 : -59;
                        case 21505:
                            if (!E.tty) return -59;
                            if (E.tty.ops.ioctl_tcgets) {
                                var D = E.tty.ops.ioctl_tcgets(E),
                                    w = W();
                                C[w >> 2] = D.c_iflag || 0, C[w + 4 >> 2] = D.c_oflag || 0, C[w + 8 >> 2] = D.c_cflag || 0, C[w + 12 >> 2] = D.c_lflag || 0;
                                for (var i = 0; i < 32; i++) g[w + i + 17] = D.c_cc[i] || 0;
                                return 0
                            }
                            return 0;
                        case 21506:
                        case 21507:
                        case 21508:
                            if (!E.tty) return -59;
                            if (E.tty.ops.ioctl_tcsets) {
                                w = W();
                                var o = C[w >> 2],
                                    G = C[w + 4 >> 2],
                                    M = C[w + 8 >> 2],
                                    R = C[w + 12 >> 2],
                                    F = [];
                                for (i = 0; i < 32; i++) F.push(g[w + i + 17]);
                                return E.tty.ops.ioctl_tcsets(E.tty, I, {
                                    c_iflag: o,
                                    c_oflag: G,
                                    c_cflag: M,
                                    c_lflag: R,
                                    c_cc: F
                                })
                            }
                            return 0;
                        case 21519:
                            if (!E.tty) return -59;
                            w = W();
                            return C[w >> 2] = 0, 0;
                        case 21520:
                            return E.tty ? -28 : -59;
                        case 21531:
                            w = W();
                            return q.ioctl(E, I, w);
                        case 21523:
                            if (!E.tty) return -59;
                            if (E.tty.ops.ioctl_tiocgwinsz) {
                                var y = E.tty.ops.ioctl_tiocgwinsz(E.tty);
                                w = W();
                                B[w >> 1] = y[0], B[w + 2 >> 1] = y[1]
                            }
                            return 0;
                        default:
                            return -28
                    }
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            s: function(A, I, g, B) {
                try {
                    I = r.getStr(I);
                    var C = 256 & B,
                        Q = 4096 & B;
                    return B &= -6401, I = r.calculateAt(A, I, Q), r.doStat(C ? q.lstat : q.stat, I, g)
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            m: function(A, I, g, B) {
                r.varargs = B;
                try {
                    I = r.getStr(I), I = r.calculateAt(A, I);
                    var C = B ? t() : 0;
                    return q.open(I, g, C).fd
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            t: function(A, I) {
                try {
                    return A = r.getStr(A), r.doStat(q.stat, A, I)
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            i: () => {
                F("")
            },
            n: function(A, I, g, B, Q, D, w) {
                Q = b(Q);
                try {
                    if (isNaN(Q)) return 61;
                    var i = r.getStreamFromFD(B),
                        o = q.mmap(i, A, Q, I, g),
                        G = o.ptr;
                    return C[D >> 2] = o.allocated, E[w >> 2] = G, 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            o: function(A, I, g, B, C, Q) {
                Q = b(Q);
                try {
                    var E = r.getStreamFromFD(C);
                    2 & g && r.doMsync(A, E, I, B, Q)
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return -A.errno
                }
            },
            k: (A, I, g, B) => {
                var Q = (new Date).getFullYear(),
                    D = new Date(Q, 0, 1),
                    w = new Date(Q, 6, 1),
                    i = D.getTimezoneOffset(),
                    o = w.getTimezoneOffset(),
                    G = Math.max(i, o);
                E[A >> 2] = 60 * G, C[I >> 2] = Number(i != o);
                var M = A => {
                        var I = A >= 0 ? "-" : "+",
                            g = Math.abs(A);
                        return `UTC${I}${String(Math.floor(g/60)).padStart(2,"0")}${String(g%60).padStart(2,"0")}`
                    },
                    R = M(i),
                    F = M(o);
                o < i ? (x(R, g, 17), x(F, B, 17)) : (x(R, B, 17), x(F, g, 17))
            },
            h: () => Date.now(),
            l: A => {
                var I = Q.length,
                    g = 2147483648;
                if ((A >>>= 0) > g) return !1;
                for (var B, C, E = 1; E <= 4; E *= 2) {
                    var D = I * (1 + .2 / E);
                    D = Math.min(D, A + 100663296);
                    var w = Math.min(g, (B = Math.max(A, D)) + ((C = 65536) - B % C) % C);
                    if (m(w)) return !0
                }
                return !1
            },
            q: (A, I) => {
                var B = 0;
                return n().forEach(((C, Q) => {
                    var D = I + B;
                    E[A + 4 * Q >> 2] = D, ((A, I) => {
                        for (var B = 0; B < A.length; ++B) g[I++] = A.charCodeAt(B);
                        g[I] = 0
                    })(C, D), B += C.length + 1
                })), 0
            },
            r: (A, I) => {
                var g = n();
                E[A >> 2] = g.length;
                var B = 0;
                return g.forEach((A => B += A.length + 1)), E[I >> 2] = B, 0
            },
            g: O,
            e: function(A) {
                try {
                    var I = r.getStreamFromFD(A);
                    return q.close(I), 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return A.errno
                }
            },
            d: function(A, I, B, C) {
                try {
                    var Q = ((A, I, B, C) => {
                        for (var Q = 0, D = 0; D < B; D++) {
                            var w = E[I >> 2],
                                i = E[I + 4 >> 2];
                            I += 8;
                            var o = q.read(A, g, w, i, C);
                            if (o < 0) return -1;
                            if (Q += o, o < i) break;
                            void 0 !== C && (C += o)
                        }
                        return Q
                    })(r.getStreamFromFD(A), I, B);
                    return E[C >> 2] = Q, 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return A.errno
                }
            },
            p: function(A, I, g, B) {
                I = b(I);
                try {
                    if (isNaN(I)) return 61;
                    var C = r.getStreamFromFD(A);
                    return q.llseek(C, I, g), i[B >> 3] = BigInt(C.position), C.getdents && 0 === I && 0 === g && (C.getdents = null), 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return A.errno
                }
            },
            c: function(A, I, B, C) {
                try {
                    var Q = ((A, I, B, C) => {
                        for (var Q = 0, D = 0; D < B; D++) {
                            var w = E[I >> 2],
                                i = E[I + 4 >> 2];
                            I += 8;
                            var o = q.write(A, g, w, i, C);
                            if (o < 0) return -1;
                            Q += o, void 0 !== C && (C += o)
                        }
                        return Q
                    })(r.getStreamFromFD(A), I, B);
                    return E[C >> 2] = Q, 0
                } catch (A) {
                    if (void 0 === q || "ErrnoError" !== A.name) throw A;
                    return A.errno
                }
            },
            w: function(A) {
                return G.agerrMessages.push(s(A)), 0
            }
        };
        G.ccall = (A, I, B, C, Q) => {
            var E = {
                string: A => {
                    var I = 0;
                    return null != A && 0 !== A && (I = (A => {
                        var I = J(A) + 1,
                            g = V(I);
                        return x(A, g, I), g
                    })(A)), I
                },
                array: A => {
                    var I, B, C = V(A.length);
                    return I = A, B = C, g.set(I, B), C
                }
            };
            var D = (A => G["_" + A])(A),
                w = [],
                i = 0;
            if (C)
                for (var o = 0; o < C.length; o++) {
                    var M = E[B[o]];
                    M ? (0 === i && (i = P()), w[o] = M(C[o])) : w[o] = C[o]
                }
            var R = D(...w);
            return R = function(A) {
                return 0 !== i && X(i),
                    function(A) {
                        return "string" === I ? s(A) : "boolean" === I ? Boolean(A) : A
                    }(A)
            }(R)
        }, G.getValue = function(A) {
            let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "i8";
            switch (I.endsWith("*") && (I = "*"), I) {
                case "i1":
                case "i8":
                    return g[A];
                case "i16":
                    return B[A >> 1];
                case "i32":
                    return C[A >> 2];
                case "i64":
                    return i[A >> 3];
                case "float":
                    return D[A >> 2];
                case "double":
                    return w[A >> 3];
                case "*":
                    return E[A >> 2];
                default:
                    F(`invalid type for getValue: ${I}`)
            }
        }, G.PATH = L, G.UTF8ToString = s, G.stringToUTF8 = x, G.lengthBytesUTF8 = J, G.FS = q;
        var v = {
            a: f
        };
        return WebAssembly.instantiate(G.wasm, v).then((I => {
            var g = I.instance.exports;
            G._viz_set_y_invert = g.z, G._viz_set_reduce = g.A, G._viz_get_graphviz_version = g.B, G._viz_get_plugin_list = g.C, G._viz_create_graph = g.D, G._viz_read_one_graph = g.E, G._viz_string_dup = g.F, G._viz_string_dup_html = g.G, G._viz_string_free = g.H, G._viz_add_node = g.I, G._viz_add_edge = g.J, G._viz_add_subgraph = g.K, G._viz_set_default_graph_attribute = g.L, G._viz_set_default_node_attribute = g.M, G._viz_set_default_edge_attribute = g.N, G._viz_set_attribute = g.O, G._viz_free_graph = g.P, G._viz_render_graph = g.Q, G._free = g.S, G._malloc = g.T, z = g.U, X = g.V, e = g.W, P = g.X, T = g.Y, o = g.x, y(),
                function(A) {
                    A.y(), G.noFSInit || q.init.initialized || q.init(), q.ignorePermissions = !1
                }(g), A(G)
        })), M
    };
    const g = [
        [/^Error: (.*)/, "error"],
        [/^Warning: (.*)/, "warning"]
    ];

    function B(A) {
        return function(A) {
            const I = [];
            let g;
            for (let B = 0; B < A.length; B++) "Error" == A[B] && ": " == A[B + 1] ? (g = "error", B += 1) : "Warning" == A[B] && ": " == A[B + 1] ? (g = "warning", B += 1) : I.push({
                message: A[B].trimEnd(),
                level: g
            });
            return I
        }(A.agerrMessages).concat(A.stderrMessages.map((A => {
            for (let I = 0; I < g.length; I++) {
                const [B, C] = g[I];
                let Q;
                if (null !== (Q = B.exec(A))) return {
                    message: Q[1].trimEnd(),
                    level: C
                }
            }
            return {
                message: A.trimEnd()
            }
        })))
    }

    function C(A, I, g, B) {
        let C;
        if (C = "object" == typeof g && "html" in g ? A.ccall("viz_string_dup_html", "number", ["number", "string"], [I, String(g.html)]) : A.ccall("viz_string_dup", "number", ["number", "string"], [I, String(g)]), 0 == C) throw new Error("couldn't dup string");
        B(C), A.ccall("viz_string_free", "number", ["number", "number"], [I, C])
    }

    function Q(A, I, g) {
        if (g.graphAttributes)
            for (const [B, Q] of Object.entries(g.graphAttributes)) C(A, I, Q, (g => {
                A.ccall("viz_set_default_graph_attribute", "number", ["number", "string", "number"], [I, B, g])
            }));
        if (g.nodeAttributes)
            for (const [B, Q] of Object.entries(g.nodeAttributes)) C(A, I, Q, (g => {
                A.ccall("viz_set_default_node_attribute", "number", ["number", "string", "number"], [I, B, g])
            }));
        if (g.edgeAttributes)
            for (const [B, Q] of Object.entries(g.edgeAttributes)) C(A, I, Q, (g => {
                A.ccall("viz_set_default_edge_attribute", "number", ["number", "string", "number"], [I, B, g])
            }))
    }

    function E(A, I, g, B) {
        for (const [Q, E] of Object.entries(B)) C(A, I, E, (I => {
            A.ccall("viz_set_attribute", "number", ["number", "string", "number"], [g, Q, I])
        }))
    }

    function D(A, I, g) {
        Q(A, I, g), g.nodes && g.nodes.forEach((g => {
            const B = A.ccall("viz_add_node", "number", ["number", "string"], [I, String(g.name)]);
            g.attributes && E(A, I, B, g.attributes)
        })), g.edges && g.edges.forEach((g => {
            const B = A.ccall("viz_add_edge", "number", ["number", "string", "string"], [I, String(g.tail), String(g.head)]);
            g.attributes && E(A, I, B, g.attributes)
        })), g.subgraphs && g.subgraphs.forEach((g => {
            const B = A.ccall("viz_add_subgraph", "number", ["number", "string"], [I, String(g.name)]);
            D(A, B, g)
        }))
    }

    function w(A, I, g) {
        const B = A.ccall("viz_create_graph", "number", ["string", "number", "number"], [I.name, void 0 === I.directed || I.directed, void 0 !== I.strict && I.strict]);
        return D(A, B, I), B
    }

    function i(A, I, g) {
        let C, E, D;
        try {
            if (A.agerrMessages = [], A.stderrMessages = [], D = function(A, I) {
                    return I ? I.map((I => {
                        if ("string" != typeof I.name) throw new Error("image name must be a string");
                        if ("number" != typeof I.width && "string" != typeof I.width) throw new Error("image width must be a number or string");
                        if ("number" != typeof I.height && "string" != typeof I.height) throw new Error("image height must be a number or string");
                        const g = A.PATH.join("/", I.name),
                            B = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${I.width}" height="${I.height}"></svg>\n`;
                        return A.FS.createPath("/", A.PATH.dirname(g)), A.FS.writeFile(g, B), g
                    })) : []
                }(A, g.images), "string" == typeof I) C = function(A, I, g) {
                let B;
                try {
                    const g = A.lengthBytesUTF8(I);
                    return B = A.ccall("malloc", "number", ["number"], [g + 1]), A.stringToUTF8(I, B, g + 1), A.ccall("viz_read_one_graph", "number", ["number"], [B])
                } finally {
                    B && A.ccall("free", "number", ["number"], [B])
                }
            }(A, I);
            else {
                if ("object" != typeof I) throw new Error("input must be a string or object");
                C = w(A, I)
            }
            return 0 === C ? {
                status: "failure",
                output: void 0,
                errors: B(A)
            } : (Q(A, C, g), A.ccall("viz_set_y_invert", "number", ["number"], [g.yInvert ? 1 : 0]), A.ccall("viz_set_reduce", "number", ["number"], [g.reduce ? 1 : 0]), E = A.ccall("viz_render_graph", "number", ["number", "string", "string"], [C, g.format, g.engine]), 0 === E ? {
                status: "failure",
                output: void 0,
                errors: B(A)
            } : {
                status: "success",
                output: A.UTF8ToString(E),
                errors: B(A)
            })
        } catch (I) {
            if (/^exit\(\d+\)/.test(I)) return {
                status: "failure",
                output: void 0,
                errors: B(A)
            };
            throw I
        } finally {
            C && A.ccall("viz_free_graph", "number", ["number"], [C]), E && A.ccall("free", "number", ["number"], [E]), D && function(A, I) {
                for (const g of I) A.FS.analyzePath(g).exists && A.FS.unlink(g)
            }(A, D)
        }
    }

    function o(A, I) {
        const g = A.ccall("viz_get_plugin_list", "number", ["string"], [I]);
        if (0 == g) throw new Error(`couldn't get plugin list: ${I}`);
        const B = [];
        let C, Q = g;
        for (; C = A.getValue(Q, "*");) B.push(A.UTF8ToString(C)), A.ccall("free", "number", ["number"], [C]), Q += 4;
        return A.ccall("free", "number", ["number"], [g]), B
    }
    class G {
        constructor(A) {
            this.module = A
        }
        get graphvizVersion() {
            return function(A) {
                const I = A.ccall("viz_get_graphviz_version", "number", [], []);
                return A.UTF8ToString(I)
            }(this.module)
        }
        get formats() {
            return o(this.module, "device")
        }
        get engines() {
            return o(this.module, "layout")
        }
        render(A) {
            let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return i(this.module, A, {
                format: "dot",
                engine: "dot",
                ...I
            })
        }
        renderString(A) {
            let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const g = this.render(A, I);
            if ("success" !== g.status) throw new Error(g.errors.find((A => "error" == A.level))?.message || "render failed");
            return g.output
        }
        renderSVGElement(A) {
            let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const g = this.renderString(A, {
                ...I,
                format: "svg"
            });
            return (new DOMParser).parseFromString(g, "image/svg+xml").documentElement
        }
        renderJSON(A) {
            let I = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const g = this.renderString(A, {
                ...I,
                format: "json"
            });
            return JSON.parse(g)
        }
    }

    function R() {
        const A = atob(M),
            I = new Uint8Array(A.length);
        for (let g = 0; g < A.length; g++) I[g] = A.charCodeAt(g);
        return I.buffer
    }
    A.engines = ["circo", "dot", "fdp", "neato", "nop", "nop1", "nop2", "osage", "patchwork", "sfdp", "twopi"], A.formats = ["canon", "cmap", "cmapx", "cmapx_np", "dot", "dot_json", "eps", "fig", "gv", "imap", "imap_np", "ismap", "json", "json0", "pic", "plain", "plain-ext", "pov", "ps", "ps2", "svg", "svg_inline", "tk", "xdot", "xdot1.2", "xdot1.4", "xdot_json"], A.graphvizVersion = "12.1.1", A.instance = function() {
        return I({
            wasm: R()
        }).then((A => new G(A)))
    }
}));
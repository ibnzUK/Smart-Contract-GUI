effects: function(e) {
    return {
        reloadTronWebWallet: function() {
            var t = Object(o.a)(c.a.mark(function t() {
                var n, r;
                return c.a.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            n = 10;
                        case 1:
                            if (!(n-- > 0)) {
                                t.next = 12;
                                break
                            }
                            return t.next = 4,
                            Object(B.b)();
                        case 4:
                            if (!(r = t.sent) || !r.defaultAddress) {
                                t.next = 8;
                                break
                            }
                            return e.wallet.setWalletAddress(r.defaultAddress.base58),
                            t.abrupt("break", 12);
                        case 8:
                            return t.next = 10,
                            Object(C.a)(1e3);
                        case 10:
                            t.next = 1;
                            break;
                        case 12:
                        case "end":
                            return t.stop()
                        }
                }, t)
            }));
            return function() {
                return t.apply(this, arguments)
            }
        }(),
        reloadWallet: function() {
            var t = Object(o.a)(c.a.mark(function t(n) {
                return c.a.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            e.wallet.reloadExchangeWallet(n);
                        case 1:
                        case "end":
                            return t.stop()
                        }
                }, t)
            }));
            return function(e) {
                return t.apply(this, arguments)
            }
        }(),
    }
}
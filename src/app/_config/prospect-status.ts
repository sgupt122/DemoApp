export const PROSPECTSTATUS: any = {
	/* Admin Only */
	1: { class: 'orange-fg', icon: 'hourglass_empty' }, //pingPending
	2: { class: 'red-fg', icon: 'clear' }, //pingDq
	3: { class: 'green-fg', icon: 'check' }, //pingQual
	4: { class: 'red-fg', icon: 'watch_later' }, //pingTimeout
	5: { class: 'orange-fg', icon: 'hourglass_empty' }, //postPending
	6: { class: 'red-fg', icon: 'cancel' }, //postDQ
	/* End Admin Only */

	7: { class: 'green-fg', icon: 'done_all' }, //postQual
	8: { class: 'red-fg', icon: 'warning' }, //postDeliveryError

	9: { class: 'blue-fg', icon: 'check' }, //postDelivered

	10: { class: 'orange-fg', icon: 'remove' }, //creditPending
	11: { class: 'red-fg', icon: 'error_outline' }, //creditError
	12: { class: 'green-fg', icon: 'arrow_upward' }, //creditAccepted
	13: { class: 'red-fg', icon: 'arrow_downward' }, //creditRejected

	14: { class: 'quotes-fg', icon: 'format_quote' }, //quoted
	15: { class: 'customer', icon: 'perm_identity' } //customer
};

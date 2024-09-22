import * as dgram from "dgram";
import { TDNSHeader, OpCode, ResponseCode, DNSHeader } from "./dns/header"
import {DNSQuestion, DNSClass, DNSType, IDNSQuestion } from "./dns/question"

const defaultHeaders: TDNSHeader = {
	id: 1234,
	qr: 1,
	opcode: OpCode.STANDARD_QUERY,
	aa: 0,
	tc: 0,
	rd: 0,
	ra: 0,
	z: 0,
	rcode: ResponseCode.NO_ERROR,
	qdcount: 0,
	ancount: 0,
	nscount: 0,
	arcount: 0,
};

const defaultQuestion: IDNSQuestion = {
	name: 'codecrafters.io',
	classCode: DNSClass.IN,
	type: DNSType.A,
};

const defaultAns: IDNSans = {
	name: "vedant.io",
	className: DNSClass.IN,
	type: DNSType.A,
	ttl: 60,
	data: "\x08\x08\x08\x08"
}

const udpSocket: dgram.Socket = dgram.createSocket("udp4"); //Ipv4

udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try { 
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);

        const header = DNSHeader.write({...defaultHeaders, qdcount: 1});
        const question = DNSQuestion.write([defaultQuestion])
        const ans = DNSanswere.write([defaultAns])
        // const response = Buffer.from("");
        // const response = header;
        const response = Buffer.concat([header, question, ans]);

        udpSocket.send(response, remoteAddr.port, remoteAddr.address);

    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
 
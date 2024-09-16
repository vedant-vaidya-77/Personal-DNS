import { Buffer } from "buffer"

export enum OpCode{
	STANDARD_QUERY = 0,
}

export enum ResponseCode{
	NO_ERROR = 0,
	FORMAT_ERROR = 1,
}

export interface TDNSHeader{
	id : number; // id of queries and response packets
	qr : number; // 0 for a question, 1 for response
	opcode : OpCode; // kind of query
	aa : null; // 1 if response owner owns the server
	tc : number; // exceed lim to truncate
	rd : number; // recursion desired ?
	ra : number; // Recursion available ?
	z : number; // reserved or not
	rcode : ResponseCode; // status of response
	qdcount : number; // que count
	ancount : number; // ans count
	nscount : number; // ns count
	arcount : number; // autho count 
}

export class DNSHeader{
	static write(values: TDNSHeader){
		const header = Buffer.alloc(12);

		const flags = values.qr | 
					values.opcode | 
					values.aa | 
					values.rd |
					values.ra |
					values.tc | 
					values.z | 
					values.rcode;

		header.writeInt16BE(values.id, 0);
		header.writeInt16BE(flags, 2);
		header.writeInt16BE(values.qdcount, 4);
		header.writeInt16BE(values.ancount, 6);
		header.writeInt16BE(values.nscount, 8);
		header.writeInt16BE(values.arcount, 10);

		return header;
	}
}

export default DNSHeader;
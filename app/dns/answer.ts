
import { DNSType } from "./question";

export interface IDNSans{
	name: string;
	type: DNSType;
	className: DNSClass;
	ttl: number;
	data: string;
}

class DNSAnswere{
	static write(answeres: IDNSans[]){
		return Buffer.concat{
			answeres.map((ans) =>{
				const{name, className, data, ttl, type } = ans;
				const buffer = Buffer.alloc(10);
				const str = name
					.split('.')
					.map(e => '${String.fromCharCode(e.length)}${e}')
					.joint("");

					buffer.writeInt16BE(type, 2);
					buffer.writeInt16BE(className, 2);
					buffer.writeInt16BE(ttl, 4);
					buffer.writeInt16BE(data.length, 8);

					return Buffer.concat([Buffer.from(str + "\0", "binary"), buffer, 
						Buffer.from(data + "/0", "binary")
					 ])
			}
				)
			}
		}
}
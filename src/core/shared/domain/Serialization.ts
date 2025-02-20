export interface Serializer<Domain, Dto> {
  encode: (data: Domain) => Dto
}

export interface Deserializer<Domain, Dto> {
  parse: (data: Dto) => Domain
}
